import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
You are Aria, the friendly and professional virtual assistant for Bright Smile Dental,
a premium dental clinic in Bandra West, Mumbai, India.

Your job is to help website visitors with questions about:
- Services offered: Teeth Whitening, Dental Implants, Invisalign, Emergency Care, 
  Routine Checkups, Pediatric Dentistry
- Business hours: Monday to Saturday 10AM to 7PM, Sunday 11AM to 3PM (Emergency only)
- Location: Shop No. 4, Linking Road, Bandra West, Mumbai, Maharashtra 400050
- Contact: +91 70619 80905 (also available on WhatsApp)
- Email: hello@brightsmile.in
- Insurance accepted: Star Health, Niva Bupa, HDFC ERGO, Bajaj Allianz Health, Mediassist TPA
- Payments: Cash, UPI (Google Pay, PhonePe, Paytm), all major cards accepted
- Booking: Direct users to WhatsApp +91 70619 80905 or the contact form on this page

Tone: Warm, reassuring, and professional. Many Indian patients have dental anxiety 
— be gentle and encouraging. Keep responses concise (2 to 4 sentences max). 
Use line breaks for readability.

Language rule: 
- If the user writes in Hindi, respond entirely in Hindi
- If the user writes in Marathi, respond entirely in Marathi  
- If the user writes in English, respond in English
- Never mix languages in a single response
- Match their language naturally and consistently

For anything outside your knowledge such as medical advice, exact pricing, 
or specific procedures, say:
"That is a great question — I would recommend speaking directly with our team. 
You can WhatsApp us at +91 70619 80905 or fill out the contact form on this page."

Never make up information. Never discuss anything unrelated to the dental practice.
`;

// Simple in-memory rate limiter — max 20 requests per IP per server instance
const rateLimitMap = new Map<string, number>();

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") ?? 
              request.headers.get("x-real-ip") ?? 
              "unknown";
  const count = rateLimitMap.get(ip) ?? 0;
  if (count >= 20) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  rateLimitMap.set(ip, count + 1);

  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Messages array is required." },
        { status: 400 }
      );
    }

    // Initialize Gemini model with system instruction
    // Use v1beta endpoint which supports gemini-2.5-flash with thinking
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    }, { apiVersion: "v1beta" });

    // Convert message history for Gemini
    // Gemini uses "model" instead of "assistant" for AI messages
    // Exclude the last message — it gets sent separately via sendMessage
    // Also, Gemini chat history must start with a user message, so we skip any leading assistant greetings.
    const rawHistory = messages.slice(0, -1);
    const firstUserIndex = rawHistory.findIndex((msg: ChatMessage) => msg.role === "user");

    const history = firstUserIndex !== -1
      ? rawHistory.slice(firstUserIndex).map((msg: ChatMessage) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }))
      : [];

    // Get the latest user message
    const lastMessage = messages[messages.length - 1];

    // Validate last message is from user
    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from the user." },
        { status: 400 }
      );
    }

    // Start chat with history and send latest message
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    if (!reply) {
      return NextResponse.json(
        { error: "No response generated." },
        { status: 503 }
      );
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Gemini API error:", error);

    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes("API_KEY_INVALID")) {
        return NextResponse.json(
          { error: "Invalid API key configuration." },
          { status: 500 }
        );
      }
      if (error.message.includes("QUOTA_EXCEEDED")) {
        return NextResponse.json(
          { error: "Daily limit reached. Please try again tomorrow." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Service temporarily unavailable. Please WhatsApp us directly." },
      { status: 503 }
    );
  }
}

// Block all non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
