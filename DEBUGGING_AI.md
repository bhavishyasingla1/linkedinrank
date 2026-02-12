# 🚨 AI Not Working - Debugging Guide

## Issue: Changes Not Visible

The server has been restarted with new code, but you're not seeing personalized results. Here's how to debug:

## Step 1: Check Server Logs

When you upload a PDF, you should see these logs in the terminal running `npm run dev`:

```
[AI] Starting PERSONALIZED analysis for John Doe (Software Engineer)
[AI] Profile data - Name: John Doe, Headline: "Software Engineer...", Experience entries: 3
[AI] Headline analysis response: ...
[AI] About analysis response: ...
[AI] Experience analysis response: ...
[AI] Skills analysis response: ...
[AI] Archetype detection response: ...
[AI] Recommendations response: ...
[AI] Completed analysis for John Doe
[AI] Headline score: 65, About score: 72
```

**If you DON'T see these logs:**
- AI is not being called at all
- Check `.env` file has `GEMINI_API_KEY=...`
- Server may not have restarted properly

**If analysis completes in < 5 seconds:**
- AI is timing out or not being called
- Using rule-based results only

## Step 2: Use Test Script

I've created a test script to verify everything:

```bash
cd /Users/bhavishyasingla/downloads/linkedinrank
./test_ai.sh
```

This will:
1. Check API health
2. Verify Gemini is configured
3. Upload your PDF
4. Show the response
5. Check for personalization

## Step 3: Manual Test

1. **Open browser console** (F12) at http://localhost:3000
2. **Upload your PDF**
3. **Watch Network tab** for `/api/analyze` request
4. **Check response time**: Should be 8-10 seconds
5. **Inspect response**: Look for `aiEnhanced: true`

## Step 4: Check What's Actually Returned

After uploading, open browser console and run:

```javascript
const data = JSON.parse(sessionStorage.getItem('linkedinRankAnalysis'))
console.log('AI Enhanced:', data.aiEnhanced)
console.log('Archetype:', data.archetype)
console.log('Recommendations:', data.recommendations)
```

Look for:
- `aiEnhanced: true` (means AI was called)
- Archetype description with specific details
- Recommendations that mention your name/role

## Common Issues

### Issue 1: AI Not Being Called
**Symptoms:** Results appear instantly (< 2 seconds)

**Fix:**
```bash
# Check .env file
cat .env
# Should show: GEMINI_API_KEY=AIzaSy...

# Restart server
kill $(lsof -ti:3000)
npm run dev
```

### Issue 2: AI Timing Out
**Symptoms:** Takes 8-10 seconds but results still generic

**Possible causes:**
- Gemini API rate limiting
- API key invalid
- Network issues

**Check:**
```bash
# Test Gemini API directly
curl -s https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: AIzaSyDJCaIFeSGlYsXrhPRcz8p0CFi2nTRDMZQ" \
  -d '{"contents":[{"parts":[{"text":"Say hello"}]}]}' | jq '.candidates[0].content.parts[0].text'
```

Should return a response. If not, API key issue.

### Issue 3: PDF Not Being Parsed Correctly
**Symptoms:** Name is "User", no content extracted

**Test PDF extraction:**
```bash
curl -X POST http://localhost:3000/api/debug \
  -F "file=@/path/to/your-linkedin.pdf" | jq '.'
```

Should show your actual name, headline, experience.

## What to Share

If still not working, please share:

1. **Do you see `[AI]` logs in terminal?** (Yes/No)
2. **How long does analysis take?** (1 second vs 8-10 seconds)
3. **Output of:** `curl http://localhost:3000/api/health`
4. **Output of:** `cat .env` (just confirm API key is there)
5. **One example recommendation** you're getting

## Next Steps

Based on the issue, I can:
- Fix API integration
- Adjust timeout settings
- Use different AI provider (OpenAI, Anthropic)
- Add more detailed logging
- Simplify AI calls

Let me know what you see! 🔍
