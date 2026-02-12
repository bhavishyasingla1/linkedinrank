import { NextRequest, NextResponse } from 'next/server'
import { parseLinkedInPDF } from '@/lib/pdfParser'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Parse PDF and return raw extracted data
        const profileData = await parseLinkedInPDF(buffer)

        return NextResponse.json({
            success: true,
            extracted_data: {
                name: profileData.name,
                headline: profileData.headline,
                about_length: profileData.about?.length || 0,
                about_preview: profileData.about?.substring(0, 200) + '...',
                experience_count: profileData.experience.length,
                experience_preview: profileData.experience.slice(0, 2).map(e => ({
                    title: e.title,
                    company: e.company,
                    description_length: e.description?.length || 0,
                    description_preview: e.description?.substring(0, 150)
                })),
                skills_count: profileData.skills.length,
                skills_preview: profileData.skills.slice(0, 10),
                recommendations: profileData.recommendations,
                education_count: profileData.education.length,
                certifications_count: profileData.certifications.length
            }
        })
    } catch (error: any) {
        console.error('Debug extraction error:', error)
        return NextResponse.json({
            error: 'Failed to extract data',
            details: error.message
        }, { status: 500 })
    }
}
