import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bright Smile Dental | Best Dental Clinic in Bandra, Mumbai",
  description:
    "Top-rated dental clinic in Bandra West, Mumbai. Teeth whitening, implants, Invisalign & emergency care. WhatsApp booking available. Trusted by 3,200+ patients.",
  keywords: [
    "dentist in Bandra Mumbai",
    "best dental clinic Mumbai",
    "teeth whitening Bandra",
    "dental implants Mumbai",
    "Invisalign Mumbai",
    "emergency dentist Bandra",
    "dental clinic Linking Road",
    "dentist near me Mumbai",
    "dental clinic Bandra West",
  ],
  openGraph: {
    title: "Bright Smile Dental | Best Dental Clinic in Bandra, Mumbai",
    description:
      "Trusted by 3,200+ patients in Mumbai. Modern dental care in Bandra West. WhatsApp us today.",
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright Smile Dental | Mumbai",
    description:
      "Your perfect smile starts here. Best dental care in Bandra West.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <body>
        <a
          href="#contact"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#1a5276] focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <main>{children}</main>
      </body>
    </html>
  );
}
