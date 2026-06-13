"use client";

import { motion } from "framer-motion";

/* ─── Testimonial Data ─── */
interface Testimonial {
  initials: string;
  color: string;
  name: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "PS",
    color: "#e74c3c",
    name: "Priya Sharma",
    quote:
      "I had been avoiding the dentist for years, but the team at Bright Smile made me feel so comfortable from the very first visit. My teeth whitening results are absolutely stunning — so many colleagues asked what I did differently! Honestly the best money I have spent on myself this year.",
  },
  {
    initials: "RM",
    color: "#2980b9",
    name: "Rahul Mehta",
    quote:
      "I was very skeptical about getting implants — the cost, the procedure, everything felt overwhelming. But Doctor sahab explained everything patiently and the results are indistinguishable from my natural teeth. Two years later and I have zero regrets. This clinic changed my life.",
  },
  {
    initials: "SK",
    color: "#27ae60",
    name: "Sunita Kulkarni",
    quote:
      "I came for Invisalign and ended up bringing my daughter for her first dental visit too. What I love most is how easy the WhatsApp follow-ups are — I just send a photo and they respond within the hour. A clinic that truly understands how busy Mumbai families are.",
  },
];

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Star Rating ─── */
function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#f59e0b"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ backgroundColor: "#eef2f7" }}
    >
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
            style={{
              color: "#2ecc71",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Patient Stories
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#1a5276",
            }}
          >
            What Our Patients Say
          </h2>
        </motion.div>

        {/* Desktop: 3-col grid / Mobile: horizontal scroll snap */}
        <motion.div
          className="
            hidden md:grid md:grid-cols-3 gap-6
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 16px rgba(26,82,118,0.05)",
              }}
            >
              <Stars />

              <p
                className="text-base leading-relaxed mb-6 flex-1 italic"
                style={{
                  color: "#1c1c1e",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#e5e9f0" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{
                    backgroundColor: t.color,
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {t.initials}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: "#1a5276",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {t.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll snap */}
        <div
          className="
            flex md:hidden gap-4 overflow-x-auto pb-4
            snap-x snap-mandatory
            -mx-6 px-6
            hide-scrollbar
          "
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl p-7 flex flex-col shrink-0 snap-start"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 16px rgba(26,82,118,0.05)",
                width: "85vw",
                maxWidth: "360px",
              }}
            >
              <Stars />

              <p
                className="text-base leading-relaxed mb-6 flex-1 italic"
                style={{
                  color: "#1c1c1e",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#e5e9f0" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{
                    backgroundColor: t.color,
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {t.initials}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: "#1a5276",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {t.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
