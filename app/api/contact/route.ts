import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Types ─── */
interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website?: string; // honeypot
}

/* ─── Validation ─── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+91|0)?[6-9]\d{9}$/;

/* ─── Nodemailer Transporter ─── */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/* ─── POST Handler ─── */
export async function POST(req: NextRequest) {
  try {
    const body: ContactRequest = await req.json();
    const { name, email, phone, service, message, website } = body;

    // Honeypot check — silently succeed
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    const errors: string[] = [];

    if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      errors.push("Valid email is required");
    }
    if (!phone || !PHONE_REGEX.test(phone.replace(/\s/g, ""))) {
      errors.push("Valid Indian phone number is required");
    }
    if (!message || message.trim().length < 10) {
      errors.push("Message must be at least 10 characters");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill all required fields correctly.",
        },
        { status: 400 }
      );
    }

    // IST Timestamp
    const now = new Date();
    const istTime = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // ─── Notification Email (to clinic) ─── */
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,sans-serif;background-color:#f8fafb;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <div style="background-color:#1a5276;padding:24px 32px;">
            <h1 style="color:white;margin:0;font-size:20px;font-weight:600;">
              🦷 Bright Smile Dental — New Inquiry
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#6b7280;font-size:14px;width:130px;vertical-align:top;">
                  <strong>Name</strong>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#1c1c1e;font-size:14px;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#6b7280;font-size:14px;vertical-align:top;">
                  <strong>Email</strong>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#1c1c1e;font-size:14px;">
                  <a href="mailto:${email}" style="color:#1a5276;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#6b7280;font-size:14px;vertical-align:top;">
                  <strong>Phone</strong>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#1c1c1e;font-size:14px;">
                  <a href="tel:${phone}" style="color:#1a5276;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#6b7280;font-size:14px;vertical-align:top;">
                  <strong>Service</strong>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#1c1c1e;font-size:14px;">
                  ${service}
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#6b7280;font-size:14px;vertical-align:top;">
                  <strong>Message</strong>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e9f0;color:#1c1c1e;font-size:14px;line-height:1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#6b7280;font-size:14px;vertical-align:top;">
                  <strong>Received</strong>
                </td>
                <td style="padding:12px 0;color:#6b7280;font-size:13px;">
                  ${istTime} IST
                </td>
              </tr>
            </table>

            <!-- CTA Button -->
            <div style="margin-top:24px;">
              <a href="mailto:${email}" style="display:inline-block;background-color:#1a5276;color:white;padding:12px 28px;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;">
                Reply to Patient
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // ─── Auto-Reply Email (to patient) ─── */
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,sans-serif;background-color:#f8fafb;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <div style="background-color:#1a5276;padding:24px 32px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:20px;font-weight:600;">
              🦷 Bright Smile Dental
            </h1>
          </div>

          <!-- Content -->
          <div style="padding:32px;">
            <p style="color:#1c1c1e;font-size:15px;line-height:1.7;margin:0 0 16px 0;">
              Dear ${name},
            </p>
            <p style="color:#1c1c1e;font-size:15px;line-height:1.7;margin:0 0 16px 0;">
              Thank you for reaching out to Bright Smile Dental. We have received your inquiry about <strong>${service}</strong> and will get back to you within 24 hours.
            </p>
            <p style="color:#1c1c1e;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
              For a faster response, feel free to WhatsApp us directly:
            </p>

            <!-- WhatsApp CTA -->
            <div style="text-align:center;margin:0 0 24px 0;">
              <a href="https://wa.me/917061980905" style="display:inline-block;background-color:#25D366;color:white;padding:12px 28px;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;">
                💬 WhatsApp Us: +91 70619 80905
              </a>
            </div>

            <!-- Clinic Info -->
            <div style="background-color:#f8fafb;border-radius:12px;padding:20px;margin-top:16px;">
              <p style="color:#6b7280;font-size:13px;line-height:1.8;margin:0;">
                📍 Shop No. 4, Linking Road, Bandra West, Mumbai 400050<br>
                📞 +91 70619 80905<br>
                📧 hello@brightsmile.in<br>
                🕐 Mon–Sat: 10AM–7PM | Sun: 11AM–3PM (Emergency only)
              </p>
            </div>

            <p style="color:#6b7280;font-size:14px;line-height:1.7;margin:24px 0 0 0;">
              Warm regards,<br>
              <strong style="color:#1a5276;">The Bright Smile Dental Team</strong>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send both emails
    await Promise.all([
      transporter.sendMail({
        from: `"Bright Smile Dental" <${process.env.GMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Patient Inquiry — ${service} — ${name} — ${phone}`,
        html: notificationHtml,
      }),
      transporter.sendMail({
        from: `"Bright Smile Dental" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "We received your message — Bright Smile Dental",
        html: autoReplyHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}

/* ─── Reject other methods ─── */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
