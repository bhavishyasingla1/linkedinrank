import { analyzeProfile } from '../lib/scoringEngine'
import { generateHeadlines } from '../lib/tools'

async function run() {
    console.log('Testing Profile & Upload Pipeline...')
    
    // Simulate what /api/analyze does with a profile
    const mockProfile = {
        name: 'Sarah Chen',
        headline: 'Senior Product Manager | AI & Search Platform | Ex-Google',
        about: 'Product leader with 7+ years of experience leading cross-functional teams from 0 to 1 in machine learning infrastructure and search algorithms. Scaled daily query throughput by 3x.',
        experience: [
            {
                title: 'Senior Product Manager',
                company: 'Google',
                duration: '2021 - Present',
                description: 'Led a 14-engineer team building core semantic search ranking models, improving click-through rate by 18% across 100M+ queries.'
            },
            {
                title: 'Product Manager',
                company: 'Uber',
                duration: '2018 - 2021',
                description: 'Launched dispatch pricing algorithm optimization that reduced driver wait times by 12% across 4 major metropolitan markets.'
            }
        ],
        skills: ['Product Strategy', 'Machine Learning', 'Search Algorithms', 'Data Analysis', 'Cross-Functional Leadership', 'A/B Testing', 'Roadmapping'],
        education: ['Stanford University - BS Computer Science'],
        certifications: [],
        honors: []
    }

    const analysis = analyzeProfile(mockProfile as any)
    console.log('LinkedIn Score:', analysis.linkedInScore)
    console.log('Category Scores:', analysis.categoryScores.map(c => `${c.category}: ${c.earnedPoints}/${c.maxPoints}`))
    
    const headlines = generateHeadlines({
        role: mockProfile.headline,
        company: mockProfile.experience[0].company,
        skills: mockProfile.skills.slice(0, 5)
    })
    console.log('Generated headlines count:', headlines.length)

    if (!analysis.linkedInScore || headlines.length === 0) {
        throw new Error('Analysis pipeline failed')
    }

    console.log('✓ All upload analysis components functioning perfectly!')
}

run().catch(err => {
    console.error('Test error:', err)
    process.exit(1)
})
