import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const isGeminiConfigured = Boolean(
        process.env.GEMINI_API_KEY && 
        process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    )

    return NextResponse.json({
        status: 'ok',
        message: 'LinkedInRank API is running',
        gemini_configured: isGeminiConfigured,
        timestamp: new Date().toISOString()
    })
}

