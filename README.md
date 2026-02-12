# LinkedIn Rank

> **Know Your LinkedIn Strength in 60 Seconds**

A premium web application that analyzes LinkedIn profile PDFs and generates data-backed scores with personalized recommendations.

## 🚀 Features

- **Rule-Based Scoring** - 25+ LinkedIn best-practice signals analyzed instantly
- **AI-Powered Suggestions** - Groq API provides personalized improvement tips
- **Premium UX** - LinkedIn-inspired design with smooth animations
- **100% Private** - No data storage, in-memory processing only
- **Mobile Responsive** - Works perfectly on all devices

## 📊 Scoring Categories

1. **Profile Clarity** (30%) - Headline, about section, experience quality
2. **Credibility Signals** (20%) - Recommendations, certifications, metrics
3. **Personal Brand** (20%) - Niche clarity, differentiation, messaging
4. **Recruiter Readiness** (15%) - Skills, keywords, searchability  
5. **Visibility Potential** (15%) - Shareability, engagement keywords

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **PDF Parsing**: pdf-parse
- **AI**: Groq API (free tier - LLaMA/Mixtral models)
- **Animations**: Framer Motion
- **Deploy**: Vercel

## 📦 Installation

```bash
# Clone the repository
cd linkedinrank

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Groq API key to .env
# Get free key at: https://console.groq.com
GROQ_API_KEY=your_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🎯 How It Works

1. **Upload** - User uploads their LinkedIn PDF
2. **Parse** - Extract text and structure profile data
3. **Score** - Rule-based engine calculates scores instantly
4. **Enhance** - Groq API generates AI suggestions (parallel, optional)
5. **Display** - Beautiful results dashboard with recommendations
6. **Share** - Downloadable score card (coming soon)

## 🧠 Scoring Logic

### Rule-Based (Primary - Instant)

- **Headline**: Length (40-120 chars), keywords, avoids generic phrases
- **Experience**: Regex detection for numbers, %, $, growth keywords
- **Skills**: Count, keyword matching, relevance
- **Recommendations**: Tier system (0/1-2/3+)
- **Completeness**: Checks for About, Experience, Skills, Education, Certifications

### AI Suggestions (Secondary - Optional)

- Only used for generating specific improvement suggestions
- Archetype labeling
- Headline/about rewrite examples
- Falls back to templates if API unavailable

## 📁 Project Structure

```
linkedinrank/
├── app/
│   ├── api/analyze/route.ts    # PDF upload & analysis endpoint
│   ├── results/page.tsx         # Results dashboard
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/
│   ├── FileUpload.tsx           # Drag & drop upload
│   ├── AnalysisLoading.tsx      # Loading animation
│   ├── ScoreHero.tsx            # Score display with confetti
│   ├── CategoryScores.tsx       # Category breakdown  
│   └── RecommendationCards.tsx  # Swipeable suggestions
├── lib/
│   ├── scoringEngine.ts         # PRIMARY: Rule-based scoring
│   ├── pdfParser.ts             # PDF text extraction
│   ├── aiSuggestions.ts         # SECONDARY: Groq AI suggestions
│   ├── types.ts                 # TypeScript definitions
│   └── constants.ts             # App constants
└── tailwind.config.js           # Design system
```

## 🎨 Design System

### Colors
- Primary: `#0A66C2` (LinkedIn blue)
- Secondary: `#004182`
- Accent: `#66B2FF`
- Success: `#1DB954`
- Warning: `#F5A623`
- Error: `#E24A4A`

### Typography
- Font: Inter
- Premium animations
- Smooth transitions

## 🔐 Privacy

- ✅ In-memory PDF processing
- ✅ Files auto-deleted after analysis  
- ✅ No database, no persistent storage
- ✅ No login required
- ✅ No tracking

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add `GROQ_API_KEY` to your Vercel environment variables.

## 📝 To-Do

- [ ] Share card image generation (PNG download)
- [ ] More archetype variations
- [ ] Industry-specific scoring
- [ ] LinkedIn profile URL input (alternative to PDF)

## 🤝 Contributing

Contributions welcome! This is a production-ready SaaS MVP.

## 📄 License

MIT

---

**Built with ❤️ for LinkedIn creators and job seekers**
