# Nautilus Fitness NSB — Website

Production-grade Next.js site for Nautilus Fitness NSB, a community gym in New Smyrna Beach, FL.

## Stack

- **Next.js 14** (App Router, Server Components where possible)
- **TypeScript**
- **Tailwind CSS** (custom brand palette + display fonts)
- **Framer Motion** for entrance animations & micro-interactions
- **Lenis** for cinematic smooth scroll
- **Google Calendar API** for the live class schedule
- **Web3Forms** for the contact form
- **Anthropic API** (optional) for the chatbot — falls back to a rules-based FAQ without it

## Getting started

```bash
# 1. install
npm install

# 2. set env vars
cp .env.example .env.local
# fill in the values you have — everything is optional, the site works without any of them

# 3. dev
npm run dev
```

Open http://localhost:3000.

## Env vars

| Variable | What it does | Required? |
|---|---|---|
| `GOOGLE_CALENDAR_API_KEY` | Read-only API key for the public Nautilus calendar | No (mock schedule used otherwise) |
| `GOOGLE_CALENDAR_ID` | Public calendar ID (e.g. `xxx@group.calendar.google.com`) | No |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the contact form | Required to actually send mail |
| `ANTHROPIC_API_KEY` | Enables the AI chatbot via Claude | No (falls back to FAQ keywords) |

## Setting up Google Calendar

1. Create a Google Calendar named "Nautilus Classes" and make it **public**.
2. In Google Cloud Console, enable the Calendar API and create an API key.
3. Restrict the key to:
   - HTTP referrer: your domain
   - API: Google Calendar API only
4. Drop the key + the calendar ID into `.env.local`.

## File structure

```
nautilus-fitness-nsb/
├── public/
│   ├── logo.svg                    # Brand mark used in the hero
│   └── images/                     # Black-and-white gym photography
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Fonts, metadata, smooth-scroll provider
│   │   ├── page.tsx                # Composes all sections
│   │   ├── globals.css             # Reset, brand vars, grain texture, buttons
│   │   └── api/
│   │       ├── schedule/route.ts   # Google Calendar fetch
│   │       └── chat/route.ts       # Anthropic chat proxy + FAQ fallback
│   └── components/
│       ├── SmoothScrollProvider.tsx
│       ├── Nav.tsx
│       ├── Hero.tsx                # Full-viewport video, logo, scroll cue
│       ├── About.tsx               # Marquee strip + features
│       ├── Services.tsx            # 3 large 3D-tilt cards
│       ├── Classes.tsx             # Filterable grid + Live Schedule toggle
│       ├── Wellness.tsx            # Forever Health & Wellness
│       ├── Testimonials.tsx        # Auto-advancing carousel
│       ├── Contact.tsx             # Web3Forms-powered contact form
│       ├── Footer.tsx              # Newsletter, socials, sitemap
│       └── Chatbot.tsx             # Floating AI assistant
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Design notes

- **Type pairing**: Anton (heavy condensed display) + Inter (utility) + JetBrains Mono (eyebrow labels). The condensed display gives the grunge/cinematic punch without leaning on Space Grotesk like every other modern gym site.
- **Color**: Black + charcoal dominate, with brand sky-blue (`#6CBBDE`) used sparingly as the single accent. Deep blue (`#216081`) for hover/scrollbar, warm sand (`#C29E6A`) only for "high intensity" tags.
- **Texture**: Site-wide SVG grain overlay (`globals.css → .grain::before`) gives the photos a film feel without making the UI noisy.
- **Photography**: All black-and-white via CSS `grayscale()` so future colour photos still feel cohesive.

## Deploying to Vercel

```bash
npm run build       # double-check it builds clean locally
git push            # then "Import Project" in Vercel
```

Add the env vars in Vercel's project settings → Environment Variables.
# nautilus-nsb-rebrand
  # adds a blank line
