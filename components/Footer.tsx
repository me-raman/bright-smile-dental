"use client";

/* ─── Social SVG Icons ─── */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
    </svg>
  );
}

/* ─── Social Links ─── */
const socials = [
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YouTubeIcon, href: "#", label: "YouTube" },
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
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M26 16C28 14 30 13 32 13C34 13 36 14 38 16"
        stroke="#2ecc71"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Quick Links ─── */
const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Appointment", href: "#contact" },
  { label: "Contact", href: "#contact" },
];


export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a5276" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* ─── Column 1: Brand ─── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ToothIcon />
              <span
                className="text-xl font-semibold tracking-tight text-white"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Bright Smile
              </span>
            </div>
            <p
              className="text-sm mb-1"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Where Confidence Meets Care
            </p>
            <p
              className="text-sm mb-6"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Serving Mumbai since 2009
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => {
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.color = "#2ecc71";
                  }}
                  onMouseLeave={(e) => {
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.color = "white";
                  }}
                >
                  <span className="text-white" style={{ transition: "color 0.2s" }}><s.Icon /></span>
                </a>
              ))}
            </div>
          </div>

          {/* ─── Column 2: Quick Links ─── */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{
                color: "#2ecc71",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#2ecc71]"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 3: Contact Info ─── */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{
                color: "#2ecc71",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Contact Us
            </p>
            <ul className="flex flex-col gap-3">
              <li
                className="text-sm"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                📞 +91 70619 80905
              </li>
              <li className="text-sm" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                <span style={{ color: "rgba(255,255,255,0.8)" }}>💬 </span>
                <a
                  href="https://wa.me/917061980905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline"
                  style={{ color: "#2ecc71" }}
                >
                  wa.me/917061980905
                </a>
              </li>
              <li
                className="text-sm"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                📧 hello@brightsmile.in
              </li>
              <li
                className="text-sm"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                📍 Shop No. 4, Linking Road, Bandra West, Mumbai 400050
              </li>
              <li
                className="text-sm"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                🕐 Mon–Sat: 10AM–7PM | Sun: Emergency only
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div
          className="my-10"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        />

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center md:text-left"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            © 2025 Bright Smile Dental. All rights reserved. | Mumbai, India
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-xs transition-colors hover:text-white"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Privacy Policy
            </a>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <a
              href="#"
              className="text-xs transition-colors hover:text-white"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
