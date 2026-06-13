"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CreditCard } from "lucide-react";

/* ─── Types ─── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string; // honeypot
}

type FormStatus = "idle" | "loading" | "success" | "error";

/* ─── Validation ─── */
const PHONE_REGEX = /^(\+91|0)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const serviceOptions = [
  "Select a service",
  "Teeth Whitening",
  "Dental Implants",
  "Invisalign",
  "Emergency Care",
  "Routine Checkup",
  "Pediatric Dentistry",
];

/* ─── WhatsApp Icon ─── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#25D366"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.114-1.14l-.286-.17-2.97.78.793-2.897-.187-.297A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
        fill="#25D366"
      />
    </svg>
  );
}

/* ─── Spinner ─── */
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Input styles ─── */
const inputClass =
  "w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2";
const inputStyle = {
  borderColor: "#e5e9f0",
  fontFamily: '"DM Sans", sans-serif',
  color: "#1c1c1e",
  backgroundColor: "#ffffff",
};
const inputFocusRing = "focus:border-[#1a5276] focus:ring-[#1a5276]/20";

/* ─── Contact Info Items ─── */
const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 70619 80905",
    href: "tel:+917061980905",
  },
  {
    icon: null, // WhatsApp custom
    label: "WhatsApp",
    value: "+91 70619 80905",
    href: "https://wa.me/917061980905",
    isWhatsApp: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@brightsmile.in",
    href: "mailto:hello@brightsmile.in",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Shop No. 4, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 10AM–7PM | Sun: 11AM–3PM (Emergency only)",
  },
  {
    icon: CreditCard,
    label: "Payments",
    value: "UPI (GPay, PhonePe, Paytm) | Cards | Cash",
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!PHONE_REGEX.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Indian phone number";
    }
    if (!formData.service || formData.service === "Select a service") {
      newErrors.service = "Please select a service";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Honeypot check
    if (formData.website) return;

    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading Block */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "#2ecc71", fontFamily: '"DM Sans", sans-serif' }}
          >
            Get In Touch
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: '"Playfair Display", serif', color: "#1a5276" }}
          >
            Book Your Appointment
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "#6b7280", fontFamily: '"DM Sans", sans-serif' }}
          >
            Fill the form below or WhatsApp us directly — we respond within 24
            hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* ─── Left: Contact Info ─── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            {contactItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: item.isWhatsApp
                      ? "rgba(37,211,102,0.1)"
                      : "rgba(46,204,113,0.1)",
                  }}
                >
                  {item.isWhatsApp ? (
                    <WhatsAppIcon size={20} />
                  ) : (
                    item.icon && (
                      <item.icon
                        size={18}
                        color="#2ecc71"
                        strokeWidth={1.8}
                      />
                    )
                  )}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{
                      color: "#6b7280",
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-medium transition-colors hover:underline"
                      style={{
                        color: item.isWhatsApp ? "#25D366" : "#1a5276",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm"
                      style={{
                        color: "#1c1c1e",
                        fontFamily: '"DM Sans", sans-serif',
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div variants={fadeUp} className="mt-4">
              <div
                className="rounded-2xl flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#eef2f7",
                  height: "200px",
                }}
              >
                <p
                  className="text-lg mb-2"
                  style={{
                    color: "#1a5276",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  📍 Bandra West, Mumbai
                </p>
                <a
                  href="https://maps.google.com/?q=Linking+Road+Bandra+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:underline"
                  style={{
                    color: "#2ecc71",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  View on Google Maps →
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border p-8"
            style={{
              borderColor: "#e5e9f0",
              backgroundColor: "#f8fafb",
            }}
          >
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Full Name <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Your full name"
                  aria-required="true"
                  className={`${inputClass} ${inputFocusRing}`}
                  style={inputStyle}
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "#e74c3c", fontFamily: '"DM Sans", sans-serif' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Email Address <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  aria-required="true"
                  className={`${inputClass} ${inputFocusRing}`}
                  style={inputStyle}
                />
                {errors.email && (
                  <p className="text-xs mt-1" style={{ color: "#e74c3c", fontFamily: '"DM Sans", sans-serif' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Phone Number <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  aria-required="true"
                  className={`${inputClass} ${inputFocusRing}`}
                  style={inputStyle}
                />
                {errors.phone && (
                  <p className="text-xs mt-1" style={{ color: "#e74c3c", fontFamily: '"DM Sans", sans-serif' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Service Interested In{" "}
                  <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  aria-required="true"
                  className={`${inputClass} ${inputFocusRing} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
                  style={{
                    ...inputStyle,
                    color: formData.service && formData.service !== "Select a service" ? "#1c1c1e" : "#6b7280",
                  }}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-xs mt-1" style={{ color: "#e74c3c", fontFamily: '"DM Sans", sans-serif' }}>
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Message <span style={{ color: "#e74c3c" }}>*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Tell us about your dental needs..."
                  rows={4}
                  aria-required="true"
                  className={`${inputClass} ${inputFocusRing} resize-none`}
                  style={inputStyle}
                />
                {errors.message && (
                  <p className="text-xs mt-1" style={{ color: "#e74c3c", fontFamily: '"DM Sans", sans-serif' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Submit Button */}
              {status === "success" ? (
                <div
                  className="w-full py-3.5 rounded-full text-center text-sm font-semibold text-white"
                  style={{
                    backgroundColor: "#2ecc71",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  ✅ Message Sent! We&apos;ll get back to you within 24 hours.
                </div>
              ) : status === "error" ? (
                <div
                  className="w-full py-3.5 rounded-full text-center text-sm font-semibold text-white"
                  style={{
                    backgroundColor: "#e74c3c",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  ❌ Something went wrong. Please WhatsApp us at +91 70619
                  80905
                </div>
              ) : (
                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 30px rgba(26,82,118,0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  style={{
                    backgroundColor: "#1a5276",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
