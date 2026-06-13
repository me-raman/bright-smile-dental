"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Smile,
  Zap,
  Calendar,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description:
      "Achieve a dazzling, naturally bright smile in just one session with our advanced whitening treatments.",
  },
  {
    icon: Shield,
    title: "Dental Implants",
    description:
      "Permanent, natural-looking tooth replacements that restore your confidence and bite function completely.",
  },
  {
    icon: Smile,
    title: "Invisalign",
    description:
      "Straighten your teeth discreetly with clear aligners custom-fitted to your unique smile.",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    description:
      "Same-day emergency dental appointments available Monday to Saturday for urgent pain relief.",
  },
  {
    icon: Calendar,
    title: "Routine Checkups",
    description:
      "Comprehensive dental exams and professional cleaning to keep your smile healthy year-round.",
  },
  {
    icon: Heart,
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care in a warm environment your little ones will love.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ backgroundColor: "#f8fafb" }}
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
            What We Offer
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#1a5276",
            }}
          >
            Everything Your Smile Needs
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px rgba(26,82,118,0.10)",
                }}
                className="rounded-2xl p-8 border transition-shadow cursor-default"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e9f0",
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(46,204,113,0.1)" }}
                >
                  <Icon size={28} color="#2ecc71" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: "#1a5276",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "#6b7280",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-all hover:underline"
                  style={{
                    color: "#2ecc71",
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                >
                  Learn More
                  <span className="transition-transform inline-block group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
