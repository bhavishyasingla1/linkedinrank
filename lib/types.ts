export interface HeadlineRewriteItem {
    text: string
    score?: number
    style?: string
    tip?: string
}

// Analysis result from scoring engine
export interface AnalysisResult {
    linkedInScore: number
    archetype: Archetype
    categoryScores: CategoryScore[]
    recommendations: Recommendation[]
    potentialGain: number
    profile?: ProfileData
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
    peerContext: string
    improvementPath: ImprovementStep[]
    headlineRewrites?: (string | HeadlineRewriteItem)[]
    careerStage?: string
    aiEnhanced?: boolean
}

// Improvement step for "Path to Higher Score"
export interface ImprovementStep {
    action: string
    gain: number
    area: string
}

// Category score breakdown
export interface CategoryScore {
    category: string
    percentage: number
    weight: number
    breakdown: string[]
    earnedPoints: number
    maxPoints: number
}

// Personalized recommendation card
export interface Recommendation {
    title: string
    whyItMatters: string
    fix: string
    impact: 'High' | 'Medium' | 'Low'
    before?: string
    after?: string
}

// User archetype
export interface Archetype {
    label: string
    description: string
}

// Parsed profile data
export interface ProfileData {
    name: string
    headline: string
    about: string
    experience: ExperienceItem[]
    skills: string[]
    recommendations: number
    education: string[]
    certifications: string[]
    honors: string[]
}

export interface ExperienceItem {
    title: string
    company: string
    description: string
    duration: string
}
