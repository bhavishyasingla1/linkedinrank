#!/bin/bash

# Test script to verify AI integration is working

echo "🧪 Testing LinkedIn Rank AI Integration..."
echo ""

# 1. Check API health
echo "1️⃣ Checking API health..."
HEALTH=$(curl -s http://localhost:3000/api/health)
echo "$HEALTH" | jq '.'
echo ""

# Check if Gemini is configured
GEMINI_CONFIG=$(echo "$HEALTH" | jq -r '.gemini_configured')
if [ "$GEMINI_CONFIG" == "true" ]; then
    echo "✅ Gemini API is configured"
else
    echo "❌ Gemini API NOT configured"
    exit 1
fi

echo ""
echo "2️⃣ Testing PDF upload..."
echo "Please provide your LinkedIn PDF path when prompted."
echo ""
read -p "Enter path to your LinkedIn PDF: " PDF_PATH

if [ ! -f "$PDF_PATH" ]; then
    echo "❌ File not found: $PDF_PATH"
    exit 1
fi

echo ""
echo "Uploading and analyzing (this should take 8-10 seconds for AI)..."
echo ""

# Upload the PDF and capture the response
RESPONSE=$(curl -s -X POST http://localhost:3000/api/analyze \
  -F "file=@$PDF_PATH" \
  -w "\nHTTP_CODE:%{http_code}")

# Extract HTTP code
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

echo "HTTP Status: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Upload successful!"
    echo ""
    echo "3️⃣ Analyzing response for personalization..."
    echo ""
    
    # Check if response contains actual data
    echo "$BODY" | jq '.data' > /tmp/analysis_result.json
    
    # Extract key fields
    SCORE=$(echo "$BODY" | jq -r '.data.linkedInScore')
    ARCHETYPE=$(echo "$BODY" | jq -r '.data.archetype.label // "N/A"')
    ARCHETYPE_DESC=$(echo "$BODY" | jq -r '.data.archetype.description // "N/A"')
    AI_ENHANCED=$(echo "$BODY" | jq -r '.data.aiEnhanced // false')
    
    echo "📊 LinkedIn Score: $SCORE"
    echo "🎭 Archetype: $ARCHETYPE"
    echo "📝 Archetype Description: $ARCHETYPE_DESC"
    echo "🤖 AI Enhanced: $AI_ENHANCED"
    echo ""
    
    echo "📋 Recommendations:"
    echo "$BODY" | jq -r '.data.recommendations[] | "  • \(.title)"'
    echo ""
    
    # Check for personalization markers
    echo "🔍 Checking for personalization..."
    
    # Save full response for inspection
    echo "$BODY" | jq '.' > /tmp/full_analysis.json
    echo "Full response saved to: /tmp/full_analysis.json"
    echo ""
    
    # Check if archetype description contains generic patterns
    if echo "$ARCHETYPE_DESC" | grep -qi "user\|profile\|individual"; then
        echo "⚠️  WARNING: Archetype description looks generic (contains 'user/profile/individual')"
    else
        echo "✅ Archetype description appears personalized"
    fi
    
    echo ""
    echo "✅ Test complete! Check server logs for [AI] messages showing personalization."
    
else
    echo "❌ Upload failed with HTTP $HTTP_CODE"
    echo "$BODY" | jq '.'
fi
