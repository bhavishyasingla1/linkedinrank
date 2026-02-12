# LinkedInRank

> **Find What's Holding Your LinkedIn Profile Back — In Under 60 Seconds**

Upload your LinkedIn PDF. Get a score out of 100, see exactly which sections need work, and get AI-powered rewrites you can copy-paste.

**Live:** [linkedinrank.com](https://linkedinrank.com)

## Features

- **30+ Signal Scoring** — Rule-based engine evaluates headline, about, experience, skills, education, and completeness
- **AI-Powered Recommendations** — Google Gemini generates personalized rewrites with before/after examples
- **Career Stage Adaptation** — Scoring adjusts for Student, Early-career, Mid-career, and Senior/Founder/Academic profiles
- **Tier System** — Bronze (0–54), Silver (55–69), Gold (70–84), Platinum (85–100)
- **Improvement Roadmap** — Prioritized actions ranked by point gain
- **100% Private** — No login, no data storage, in-memory processing, PDF deleted immediately
- **Mobile Responsive** — Optimized headers with hamburger navigation on all 50+ pages

## Scoring Categories

| Category | Points | Signals |
|----------|--------|---------|
| **Headline** | 20 | Role clarity, keywords, specificity, positioning |
| **About / Summary** | 20 | Direction, skills mention, structure, credibility |
| **Experience** | 25 | Descriptions, action verbs, impact, quantification |
| **Skills** | 15 | Relevance, specificity, alignment with role |
| **Education & Credentials** | 10 | Completeness, field alignment, certifications |
| **Completeness & Structure** | 10 | Section coverage, content depth, logical flow |

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** TailwindCSS 3
- **PDF Parsing:** pdf-parse
- **AI:** Google Gemini (`@google/generative-ai`)
- **Image Processing:** sharp
- **Deploy:** Vercel
- **SEO:** 53-page sitemap, structured data (JSON-LD), robots.txt, llm.txt

## Quick Start

```bash
# Clone and install
git clone https://github.com/your-username/linkedinrank.git
cd linkedinrank
npm install

# Configure environment
cp .env.example .env
# Add your Google Gemini API key to .env
# Get a key at: https://aistudio.google.com/apikey
# GEMINI_API_KEY=your_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

1. **Upload** — User exports LinkedIn profile as PDF and uploads it
2. **Parse** — `pdfParser.ts` extracts structured data (name, headline, about, experience, skills, education, certifications)
3. **Score** — `scoringEngine.ts` evaluates 30+ signals across 6 categories with career-stage adaptation
4. **AI Analysis** — `aiSuggestions.ts` sends profile data to Google Gemini for personalized recommendations and rewrites
5. **Results** — Interactive dashboard with score breakdown, recommendations, improvement roadmap, and downloadable report

## Project Structure

```
linkedinrank/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts        # PDF upload & analysis endpoint
│   │   ├── debug/route.ts          # Debug extraction endpoint
│   │   └── health/route.ts         # Health check
│   ├── page.tsx                     # Homepage
│   ├── results/page.tsx             # Results dashboard
│   ├── loading-analysis/page.tsx    # Analysis loading screen
│   ├── layout.tsx                   # Root layout with metadata
│   ├── globals.css                  # Global styles & animations
│   ├── sitemap.ts                   # Dynamic sitemap (53 URLs)
│   ├── about/                       # About page
│   ├── methodology/                 # Scoring methodology
│   ├── faq/                         # FAQ with schema markup
│   ├── linkedin-optimization-guide/ # Pillar SEO guide
│   ├── linkedin-headline-guide/     # Headline writing guide
│   └── [40+ more content pages]
├── components/
│   ├── SiteHeader.tsx               # Reusable header with mobile menu
│   ├── FileUpload.tsx               # Drag & drop PDF upload
│   ├── ScoreHero.tsx                # Score display with tier badge
│   ├── CategoryScores.tsx           # Category breakdown cards
│   ├── RecommendationCards.tsx      # AI recommendation cards
│   ├── ImprovementPath.tsx          # Prioritized improvement roadmap
│   ├── HeadlineRewriter.tsx         # AI headline rewrite tool
│   ├── AnalysisLoading.tsx          # Loading animation
│   ├── LoadingScreen.tsx            # Generic loading screen
│   └── TierBadge.tsx                # Bronze/Silver/Gold/Platinum badge
├── lib/
│   ├── scoringEngine.ts             # Rule-based scoring (30+ signals)
│   ├── pdfParser.ts                 # LinkedIn PDF text extraction
│   ├── aiSuggestions.ts             # Google Gemini AI integration
│   ├── types.ts                     # TypeScript definitions
│   └── constants.ts                 # App constants & tier definitions
├── public/
│   ├── robots.txt                   # Search engine directives
│   └── llm.txt                      # LLM-readable site description
├── next.config.js                   # Security headers, server config
├── tailwind.config.js               # Design system tokens
└── tsconfig.json                    # TypeScript configuration
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI recommendations |

## Privacy & Security

- In-memory PDF processing — no files stored
- No database, no persistent storage
- No login or accounts required
- No cookies or tracking
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`
- API routes return `Cache-Control: no-store`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add `GEMINI_API_KEY` in Settings → Environment Variables
4. Deploy — Vercel auto-detects Next.js, no extra config needed

**Node.js requirement:** `>=18.18.0`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT

---

**Built by [Bhavishya Singla](https://www.linkedin.com/in/bhavishyasingla1/) for LinkedIn creators and job seekers.**
