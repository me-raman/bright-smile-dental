"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function ToothIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 4C24 4 20 8 18 12C16 16 14 18 10 18C6 18 4 22 4 26C4 30 6 34 10 36C12 37 14 40 15 44C16 48 17 56 20 60C22 62 24 60 25 56C26 52 27 46 28 42C29 40 30 38 32 38C34 38 35 40 36 42C37 46 38 52 39 56C40 60 42 62 44 60C47 56 48 48 49 44C50 40 52 37 54 36C58 34 60 30 60 26C60 22 58 18 54 18C50 18 48 16 46 12C44 8 40 4 32 4Z"
        fill="#1a5276"
        stroke="#1a5276"
        strokeWidth="1"
      />
      <path
        d="M26 16C28 14 30 13 32 13C34 13 36 14 38 16"
        stroke="#2ecc71"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="26" cy="22" r="2" fill="#2ecc71" opacity="0.6" />
      <circle cx="38" cy="22" r="2" fill="#2ecc71" opacity="0.6" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ backgroundColor: "rgba(255,255,255,0)" }}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottomColor: scrolled
          ? "rgba(229,233,240,1)"
          : "rgba(229,233,240,0)",
        borderBottomWidth: "1px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ borderBottomStyle: "solid" }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group"
        >
          <ToothIcon />
          <span
            className="text-xl font-semibold tracking-tight"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#1a5276",
            }}
          >
            Bright Smile
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-[#2ecc71]"
              style={{
                color: "#1c1c1e",
                fontFamily: '"DM Sans", sans-serif',
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick("#contact")}
            className="text-sm font-medium px-6 py-2.5 rounded-full text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "#1a5276",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{ color: "#1a5276" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white w-full border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              borderColor: "#e5e9f0",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left text-base font-medium py-3 px-4 rounded-xl transition-colors hover:bg-gray-50"
                  style={{
                    color: "#1c1c1e",
                    fontFamily: '"DM Sans", sans-serif',
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: navLinks.length * 0.05,
                  duration: 0.25,
                }}
                onClick={() => handleLinkClick("#contact")}
                className="mt-3 text-base font-medium px-6 py-3 rounded-full text-white text-center transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "#1a5276",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
