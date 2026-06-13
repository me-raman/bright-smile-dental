"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight } from "lucide-react";

/* ─── Types ─── */
interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ─── WhatsApp SVG Icon ─── */
function WhatsAppFloatIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="white"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.114-1.14l-.286-.17-2.97.78.793-2.897-.187-.297A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
        fill="white"
      />
    </svg>
  );
}

/* ─── Typing Dots ─── */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 border flex items-center gap-1.5"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e9f0",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2 h-2 rounded-full"
            style={{ backgroundColor: "#1a5276" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Initial Greeting ─── */
const GREETING: Message = {
  role: "assistant",
  content:
    "नमस्ते! 👋 I'm Aria, your virtual assistant at Bright Smile Dental, Bandra. I can help you with appointments, our services, insurance, and more. You can also type in Hindi or Marathi. How can I help you today?",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  // Initialize greeting on mount
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setMessages([GREETING]);
    }
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send last 10 messages to avoid token waste
      const history = [...messages, userMessage].slice(-10);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please WhatsApp us at +91 70619 80905 for immediate help. 😊",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ─── Floating Buttons ─── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <div className="relative">
          <motion.a
            href="https://wa.me/917061980905"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "#25D366" }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1, 1.08, 1, 1.08, 1] }}
            transition={{ duration: 4, ease: "easeInOut" }}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppFloatIcon />
          </motion.a>

          {/* Tooltip */}
          <AnimatePresence>
            {showWhatsAppTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-md"
                style={{
                  backgroundColor: "#1c1c1e",
                  color: "white",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Chat on WhatsApp
                <div
                  className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45"
                  style={{ backgroundColor: "#1c1c1e" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Chat Button */}
        <motion.button
          aria-label="Open chat with Aria"
          onClick={handleOpen}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "#1a5276" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={22} color="white" />

          {/* Unread Dot */}
          {hasUnread && (
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#ef4444" }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.button>
      </div>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed z-50
              bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl
              sm:bottom-[88px] sm:right-6 sm:left-auto sm:h-auto sm:rounded-2xl
            "
            style={{
              width: "auto",
              maxHeight: "85vh",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Desktop sizing */}
            <div
              className="
                flex flex-col h-full
                sm:w-[380px] sm:h-[520px]
              "
              style={{ backgroundColor: "#f8fafb" }}
            >
              {/* ─── Header ─── */}
              <div
                className="flex items-start justify-between px-4 py-4 shrink-0 rounded-t-2xl sm:rounded-t-2xl"
                style={{
                  backgroundColor: "#ffffff",
                  borderBottom: "1px solid #e5e9f0",
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Online dot */}
                  <motion.span
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: "#2ecc71" }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div>
                    <p
                      className="text-sm font-bold leading-tight"
                      style={{
                        color: "#1a5276",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      Aria · Bright Smile Assistant
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: "#6b7280",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      हिंदी में बात करें | मराठीत बोला
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-1 rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: "#6b7280" }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ─── Messages Area ─── */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                style={{ backgroundColor: "#f8fafb" }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className="px-4 py-2.5 text-sm leading-relaxed"
                      style={{
                        maxWidth: "75%",
                        fontFamily: '"DM Sans", sans-serif',
                        ...(msg.role === "user"
                          ? {
                            backgroundColor: "#1a5276",
                            color: "white",
                            borderRadius: "16px 16px 4px 16px",
                          }
                          : {
                            backgroundColor: "#ffffff",
                            color: "#1c1c1e",
                            border: "1px solid #e5e9f0",
                            borderRadius: "16px 16px 16px 4px",
                          }),
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && <TypingIndicator />}

                <div ref={messagesEndRef} />
              </div>

              {/* ─── Input Area ─── */}
              <div
                className="shrink-0 flex items-center gap-2 px-4 py-3"
                style={{
                  backgroundColor: "#ffffff",
                  borderTop: "1px solid #e5e9f0",
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 resize-none text-sm outline-none bg-transparent"
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    color: "#1c1c1e",
                  }}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: "#1a5276" }}
                  aria-label="Send message"
                >
                  <ArrowRight size={16} color="white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
