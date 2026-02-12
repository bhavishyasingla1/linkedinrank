# LinkedIn Rank - Premium LinkedIn Profile Analyzer

## Quick Start

```bash
npm install
cp .env.example .env
# Add your Groq API key to .env
npm run dev
```

Visit: http://localhost:3000

## Get Groq API Key (Free)

1. Visit: https://console.groq.com
2. Sign up (free)
3. Create API key
4. Add to `.env`:
   ```
   GROQ_API_KEY=your_key_here
   ```

## Features Built

✅ Rule-based scoring (25+ LinkedIn signals)  
✅ PDF upload & parsing  
✅ Premium UI with animations  
✅ AI suggestions (Groq API)  
✅ Mobile responsive  
✅ Privacy-first (no data storage)  

## Tech Stack

- Next.js 14 + TypeScript
- TailwindCSS
- Groq SDK (free AI)
- pdf-parse

## Deployment

Deploy to Vercel in one click or use:
```bash
vercel
```

Remember to set `GROQ_API_KEY` environment variable in Vercel dashboard.
