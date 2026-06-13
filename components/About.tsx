"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Count-Up Hook ─── */
function useCountUp(
  target: number,
  duration: number,
  isInView: boolean,
  isDecimal = false
) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isDecimal) {
        setValue(Math.round(current * 10) / 10);
      } else {
        setValue(Math.floor(current));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration, isDecimal]);

  return value;
}

/* ─── Stat Card ─── */
interface StatData {
  target: number;
  suffix: string;
  label: string;
  isDecimal?: boolean;
}

function StatCard({
  stat,
  isInView,
}: {
  stat: StatData;
  isInView: boolean;
}) {
  const value = useCountUp(stat.target, 2000, isInView, stat.isDecimal);

  const display = stat.isDecimal ? value.toFixed(1) : value.toLocaleString();

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ backgroundColor: "#f8fafb" }}
    >
      <p
        className="text-5xl font-bold mb-2"
        style={{
          fontFamily: '"Playfair Display", serif',
          color: "#1a5276",
          fontSize: "48px",
        }}
      >
        {display}
        {stat.suffix}
      </p>
      <p
        className="text-sm"
        style={{
          color: "#6b7280",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ─── Stats Data ─── */
const stats: StatData[] = [
  { target: 3200, suffix: "+", label: "Patients Served" },
  { target: 15, suffix: "+", label: "Years in Practice" },
  { target: 4.9, suffix: "★", label: "Google Rating", isDecimal: true },
  { target: 98, suffix: "%", label: "Patient Satisfaction" },
];

/* ─── Fade-up variants ─── */
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
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{
                color: "#2ecc71",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Our Story
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "#1a5276",
              }}
            >
              Two Decades of Trusted Smiles in Mumbai
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-5"
              style={{
                color: "#6b7280",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Nestled in the heart of Bandra West, Bright Smile Dental has been
              serving Mumbai families for over fifteen years. What began as a
              small neighbourhood practice on Linking Road has grown into one of
              the city&apos;s most respected dental clinics — where cutting-edge
              technology meets the warmth and compassion of personalised care.
              Every patient who walks through our doors is treated like family,
              because to us, dentistry is about people, not just teeth.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed"
              style={{
                color: "#6b7280",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Our patient community is as diverse as Mumbai itself — from young
              professionals in BKC to families in Khar and grandparents in
              Dadar. Our multilingual team converses fluently in English, Hindi,
              and Marathi, ensuring every patient feels heard and understood. We
              believe exceptional dental care shouldn&apos;t be a luxury, which
              is why we remain committed to offering affordable, transparent
              pricing across all our treatments — from routine check-ups to
              advanced cosmetic procedures.
            </motion.p>
          </motion.div>

          {/* Right Column — Stats */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} isInView={isInView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
