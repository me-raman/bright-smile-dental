"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#1a5276"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.114-1.14l-.286-.17-2.97.78.793-2.897-.187-.297A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
        fill="#1a5276"
      />
    </svg>
  );
}

function DentalIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-md mx-auto"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Dental care illustration"
      >
        {/* Background circle */}
        <circle cx="200" cy="200" r="180" fill="#d6eaf8" opacity="0.3" />
        <circle cx="200" cy="200" r="140" fill="#d6eaf8" opacity="0.2" />

        {/* Main tooth shape */}
        <path
          d="M200 60C172 60 158 78 152 94C146 110 138 118 122 118C106 118 96 134 96 150C96 166 106 182 122 190C134 196 142 210 146 226C150 242 154 274 166 290C174 300 182 296 186 282C190 268 194 244 198 228C200 220 204 212 210 212C216 212 220 220 222 228C226 244 230 268 234 282C238 296 246 300 254 290C266 274 270 242 274 226C278 210 286 196 298 190C314 182 324 166 324 150C324 134 314 118 298 118C282 118 274 110 268 94C262 78 248 60 200 60Z"
          fill="white"
          stroke="#1a5276"
          strokeWidth="3"
        />

        {/* Tooth shine / highlights */}
        <path
          d="M178 90C186 82 194 78 200 78C206 78 214 82 222 90"
          stroke="#2ecc71"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
        <ellipse
          cx="175"
          cy="130"
          rx="12"
          ry="16"
          fill="#d6eaf8"
          opacity="0.5"
        />

        {/* Sparkle elements */}
        {/* Top-right sparkle */}
        <g transform="translate(310, 80)">
          <line
            x1="0"
            y1="-12"
            x2="0"
            y2="12"
            stroke="#2ecc71"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="-12"
            y1="0"
            x2="12"
            y2="0"
            stroke="#2ecc71"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="-8"
            y1="-8"
            x2="8"
            y2="8"
            stroke="#2ecc71"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="-8"
            x2="-8"
            y2="8"
            stroke="#2ecc71"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Top-left sparkle */}
        <g transform="translate(90, 70)">
          <line
            x1="0"
            y1="-8"
            x2="0"
            y2="8"
            stroke="#1a5276"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-8"
            y1="0"
            x2="8"
            y2="0"
            stroke="#1a5276"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Small sparkle */}
        <g transform="translate(340, 180)">
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="#2ecc71"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="#2ecc71"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Circular smile arc below tooth */}
        <path
          d="M150 320 Q200 350 250 320"
          stroke="#2ecc71"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Decorative dots */}
        <circle cx="80" cy="280" r="5" fill="#2ecc71" opacity="0.3" />
        <circle cx="330" cy="300" r="4" fill="#1a5276" opacity="0.25" />
        <circle cx="60" cy="160" r="3" fill="#2ecc71" opacity="0.4" />
        <circle cx="350" cy="250" r="6" fill="#d6eaf8" opacity="0.5" />

        {/* Shield / checkmark badge */}
        <g transform="translate(300, 280)">
          <circle cx="0" cy="0" r="22" fill="#2ecc71" opacity="0.15" />
          <circle cx="0" cy="0" r="16" fill="#2ecc71" opacity="0.25" />
          <path
            d="M-6 0L-2 4L8 -6"
            stroke="#2ecc71"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </motion.div>
  );
}

const trustBadges = [
  { icon: "⭐", text: "4.9/5 Google Rating" },
  { icon: "🏆", text: "Best Dental Clinic Mumbai 2024" },
  { icon: "✅", text: "15+ Years Experience" },
  { icon: "📱", text: "WhatsApp Booking Available" },
];

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, #eaf4fb 0%, #f8fafb 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full py-12 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 items-center">
          {/* Left Content — 60% (3/5 cols) */}
          <motion.div
            className="md:col-span-3 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: "#2ecc71",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Mumbai&apos;s Most Trusted Dental Care
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="leading-tight font-bold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "#1a5276",
                fontSize: "clamp(36px, 5vw, 56px)",
              }}
            >
              Your Perfect Smile
              <br />
              Starts Here
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-lg"
              style={{
                color: "#6b7280",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "18px",
                lineHeight: 1.7,
              }}
            >
              Award-winning dental care in the heart of Mumbai. Trusted by
              3,200+ patients across Maharashtra.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(26,82,118,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollTo("#contact")}
                className="px-8 py-3.5 rounded-full text-white text-sm font-semibold transition-all"
                style={{
                  backgroundColor: "#1a5276",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Book Free Consultation
              </motion.button>

              <motion.a
                href="https://wa.me/917061980905"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(26,82,118,0.10)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold border-2 transition-all"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#1a5276",
                  color: "#1a5276",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-x-5 gap-y-2 mt-4"
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge.text}
                  className="flex items-center gap-1.5 text-xs font-medium"
                  style={{
                    color: "#6b7280",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  <span className="text-sm">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Illustration — 40% (2/5 cols) */}
          <motion.div
            className="md:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <DentalIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
