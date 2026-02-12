// LinkedIn-inspired color palette
export const COLORS = {
    PRIMARY: '#0A66C2',
    SECONDARY: '#004182',
    ACCENT: '#66B2FF',
    LIGHT: '#F5F7FA',
    DARK: '#1D2226',
    BLACK: '#0B0F14',
    SUCCESS: '#1DB954',
    WARNING: '#F5A623',
    ERROR: '#E24A4A',
}

// Category definitions
export const CATEGORIES = [
    {
        id: 'clarity',
        name: 'Profile Clarity',
        weight: 0.30,
        description: 'How clear and compelling your profile is'
    },
    {
        id: 'credibility',
        name: 'Credibility Signals',
        weight: 0.20,
        description: 'Evidence of expertise and trust'
    },
    {
        id: 'brand',
        name: 'Personal Brand',
        weight: 0.20,
        description: 'How well you communicate your unique value'
    },
    {
        id: 'recruiter',
        name: 'Recruiter Readiness',
        weight: 0.15,
        description: 'How attractive you are to recruiters'
    },
    {
        id: 'visibility',
        name: 'Visibility Potential',
        weight: 0.15,
        description: 'How discoverable and shareable you are'
    }
]

// Archetype definitions
export const ARCHETYPES = [
    {
        label: 'The Emerging Authority',
        condition: (scores: any) => scores.credibility > 70 && scores.brand < 60,
        description: 'You show strong expertise but under-communicate results.'
    },
    {
        label: 'The Hidden Gem',
        condition: (scores: any) => scores.clarity < 60 && scores.credibility > 60,
        description: 'Strong background, but your profile doesn\'t do it justice.'
    },
    {
        label: 'The Rising Star',
        condition: (scores: any) => scores.overall >= 80,
        description: 'Excellent profile presence across all dimensions.'
    },
    {
        label: 'The Specialist',
        condition: (scores: any) => scores.visibility > 75,
        description: 'You have a clear niche and communicate it well.'
    },
    {
        label: 'The Builder',
        condition: (scores: any) => scores.overall >= 60 && scores.overall < 80,
        description: 'Solid foundation with room for strategic improvements.'
    },
    {
        label: 'The Diamond in the Rough',
        condition: (scores: any) => scores.overall < 60,
        description: 'Great potential, needs refinement to shine.'
    }
]

// Loading animation steps
export const LOADING_STEPS = [
    'Extracting headline strength...',
    'Measuring keyword relevance...',
    'Checking recruiter readiness...',
    'Evaluating personal brand...',
    'Reviewing experience impact...',
    'Detecting credibility signals...',
    'Analyzing skills alignment...',
    'Calculating visibility score...',
    'Generating personalized insights...',
    'Calculating final score...'
]

// Generic phrases to avoid in headlines
export const GENERIC_PHRASES = [
    'seeking opportunities',
    'looking for',
    'motivated individual',
    'hardworking',
    'team player',
    'results-oriented',
    'detail-oriented',
    'self-starter',
    'passionate about',
    'experienced professional'
]

// Growth/impact keywords
export const GROWTH_KEYWORDS = [
    'increased',
    'reduced',
    'scaled',
    'optimized',
    'improved',
    'grew',
    'launched',
    'led',
    'achieved',
    'delivered',
    'generated',
    'created',
    'built',
    'drove',
    'transformed'
]

// File size limit (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024
