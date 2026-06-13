# Bright Smile Dental — AI-Integrated Business Website

## Overview

A production-ready dental clinic website for **Bright Smile Dental**, a fictional premium dental practice in Bandra West, Mumbai. Built to demonstrate a modern, AI-integrated business website suitable for freelancing portfolios and client demos.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router, API routes, SSR |
| **TypeScript** | Type-safe development across frontend and backend |
| **Tailwind CSS 3** | Utility-first styling with custom design tokens |
| **Framer Motion** | Scroll-triggered animations, staggered reveals, hover effects |
| **Claude API** (Anthropic) | AI chatbot assistant "Aria" with multilingual support |
| **Nodemailer** | Email notifications and auto-replies via Gmail SMTP |
| **Lucide React** | Consistent, lightweight icon system |
| **Vercel** | Deployment platform with environment variable management |

## Features

- 🤖 **AI Chatbot** — "Aria" virtual assistant powered by Claude, with Hindi & Marathi language support
- 💬 **WhatsApp Integration** — Floating WhatsApp button linking to `wa.me` for instant patient booking
- 📧 **Contact Form with Email** — Server-side validation, honeypot spam protection, branded notification + auto-reply emails
- 📱 **Fully Mobile Responsive** — Bottom-sheet chat on mobile, horizontal scroll-snap testimonials, hamburger navigation
- 🔍 **SEO Optimized** — OpenGraph, Twitter Cards, semantic HTML, `lang="en-IN"`, keyword targeting for Mumbai local search
- 🕐 **IST Timestamps** — All email notifications display Indian Standard Time
- 🛡️ **Rate Limiting** — Per-IP chat API rate limiting (20 requests per server instance)
- ♿ **Accessible** — Skip-to-content link, ARIA labels, focus-visible styles, semantic landmarks
- 🎨 **Premium Design** — Playfair Display + DM Sans typography, animated count-up stats, staggered scroll reveals

## Local Setup

### Prerequisites

- Node.js 18+ and npm
- A Gmail account with [App Password](https://support.google.com/accounts/answer/185833) enabled
- An [Anthropic API key](https://console.anthropic.com) for the AI chatbot

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/bright-smile-dental.git
   cd bright-smile-dental
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local`** in the project root with these variables:

   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   NOTIFICATION_EMAIL=clinic_email@yourdomain.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=917061980905
   ```

4. **Get a Gmail App Password**

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Navigate to **App passwords** → Generate a 16-character password
   - Use this as `GMAIL_APP_PASSWORD`
   - Docs: https://support.google.com/accounts/answer/185833

5. **Get an Anthropic API Key**

   - Sign up at [console.anthropic.com](https://console.anthropic.com)
   - Create an API key in the dashboard
   - Use this as `ANTHROPIC_API_KEY`

6. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/bright-smile-dental.git
   git push -u origin main
   ```

2. **Import on Vercel**

   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository

3. **Add Environment Variables**

   In the Vercel project dashboard → Settings → Environment Variables, add:

   | Variable | Value |
   |----------|-------|
   | `ANTHROPIC_API_KEY` | Your Anthropic API key |
   | `GMAIL_USER` | Your Gmail address |
   | `GMAIL_APP_PASSWORD` | Your 16-char app password |
   | `NOTIFICATION_EMAIL` | Email to receive form submissions |
   | `NEXT_PUBLIC_SITE_URL` | Your Vercel deployment URL |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (e.g., 917061980905) |

4. **Deploy** — Vercel will automatically build and deploy.

## Project Structure

```
bright-smile-dental/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page composing all sections
│   ├── globals.css         # Tailwind + custom CSS variables
│   └── api/
│       ├── chat/route.ts   # Claude AI chatbot endpoint
│       └── contact/route.ts # Contact form + email endpoint
├── components/
│   ├── Navbar.tsx          # Sticky navbar with scroll frost effect
│   ├── Hero.tsx            # Full-viewport hero with SVG illustration
│   ├── Services.tsx        # 6 service cards with Lucide icons
│   ├── About.tsx           # Clinic story + animated count-up stats
│   ├── Testimonials.tsx    # Patient reviews with mobile scroll-snap
│   ├── ContactForm.tsx     # Validated form + contact info panel
│   ├── ChatWidget.tsx      # AI chat + WhatsApp floating buttons
│   └── Footer.tsx          # 3-column footer with social links
├── lib/
│   └── claude.ts           # Anthropic SDK client
├── .env.local              # Environment variables (not committed)
├── vercel.json             # Vercel deployment config
├── tailwind.config.ts      # Custom design tokens
└── package.json
```

## Live Demo

[Your live URL here]

---

Built with ❤️ in Mumbai
