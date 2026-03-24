// Central SEO page registry for internal linking and metadata management
export const SITE_URL = 'https://linkedinrank.com'

export interface PageSEO {
  slug: string
  title: string
  description: string
  primaryKeyword: string
  tags: string[]
  pillarSlug?: string
  lastModified: string
  type: 'pillar' | 'guide' | 'profession' | 'tool' | 'audience' | 'comparison' | 'legal' | 'core'
  label: string // short display label for internal links
}

export const ALL_PAGES: PageSEO[] = [
  // ── Pillar pages ──────────────────────────────────────────
  {
    slug: 'linkedin-optimization-guide',
    title: '47 LinkedIn Profile Tips That Get Interviews (2026)',
    description: 'Score 85+ on LinkedIn with 47 expert tips covering headline, about, experience, and skills. Free checker inside.',
    primaryKeyword: 'linkedin profile optimization',
    tags: ['optimization', 'linkedin', 'profile', 'guide', 'headline', 'about', 'experience', 'skills'],
    lastModified: '2026-03-24',
    type: 'pillar',
    label: 'Full Optimization Guide',
  },
  {
    slug: 'linkedin-headline-guide',
    title: '50+ LinkedIn Headline Examples & Formulas (2026 Guide)',
    description: 'Write a headline recruiters actually click. 50+ examples, 5 formulas, and common mistakes to avoid. Free scoring.',
    primaryKeyword: 'linkedin headline examples',
    tags: ['headline', 'examples', 'formulas', 'linkedin', 'recruiters'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Headline Guide',
  },

  // ── Section guides ────────────────────────────────────────
  {
    slug: 'linkedin-about-guide',
    title: 'Write a LinkedIn About Section That Converts (2026)',
    description: 'Templates, real examples, and the 3-part formula for a LinkedIn summary that turns visitors into opportunities.',
    primaryKeyword: 'linkedin about section',
    tags: ['about', 'summary', 'linkedin', 'templates', 'profile'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'About Section Guide',
  },
  {
    slug: 'linkedin-keywords-guide',
    title: 'LinkedIn Keywords Guide: Get Found by Recruiters (2026)',
    description: 'Place keywords where LinkedIn search actually looks. Strategy for headline, about, and skills sections.',
    primaryKeyword: 'linkedin keywords',
    tags: ['keywords', 'seo', 'linkedin', 'search', 'recruiters', 'profile'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Keywords Guide',
  },
  {
    slug: 'linkedin-profile-photo-guide',
    title: 'LinkedIn Profile Photo Guide: 7 Rules for 2026',
    description: 'A professional photo gets 21x more views. Follow these 7 rules for headshots that build instant trust.',
    primaryKeyword: 'linkedin profile photo',
    tags: ['photo', 'headshot', 'linkedin', 'profile', 'tips'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Profile Photo Guide',
  },
  {
    slug: 'linkedin-profile-checklist',
    title: 'LinkedIn Profile Checklist: 15-Point Audit (2026)',
    description: 'Audit your LinkedIn in 15 minutes. This checklist covers headline, about, experience, skills, and keywords.',
    primaryKeyword: 'linkedin profile checklist',
    tags: ['checklist', 'audit', 'linkedin', 'profile', 'optimization'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Profile Checklist',
  },

  // ── Strategy guides ───────────────────────────────────────
  {
    slug: 'linkedin-best-practices',
    title: '12 LinkedIn Best Practices for Professionals (2026)',
    description: 'Evidence-based LinkedIn tips from headline to posting. Increase profile views and recruiter messages.',
    primaryKeyword: 'linkedin best practices',
    tags: ['best practices', 'linkedin', 'tips', 'profile', 'optimization'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Best Practices',
  },
  {
    slug: 'linkedin-personal-branding',
    title: 'LinkedIn Personal Branding: 8-Step Playbook (2026)',
    description: 'Build a personal brand that attracts opportunities. 8 steps from niche selection to content strategy.',
    primaryKeyword: 'linkedin personal branding',
    tags: ['personal branding', 'linkedin', 'strategy', 'content', 'authority'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Personal Branding',
  },
  {
    slug: 'linkedin-content-strategy',
    title: 'LinkedIn Content Strategy: Post Plan for 2026',
    description: 'What to post, when to post, and how to grow on LinkedIn. A complete content strategy for professionals.',
    primaryKeyword: 'linkedin content strategy',
    tags: ['content', 'strategy', 'posting', 'linkedin', 'engagement'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Content Strategy',
  },
  {
    slug: 'viral-post-formulas',
    title: '7 LinkedIn Post Formulas That Go Viral (2026)',
    description: 'Copy these 7 proven post structures used by top LinkedIn creators. Hooks, stories, and engagement tactics.',
    primaryKeyword: 'viral linkedin post',
    tags: ['viral', 'posts', 'content', 'linkedin', 'formulas', 'hooks'],
    pillarSlug: 'linkedin-content-strategy',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Viral Post Formulas',
  },
  {
    slug: 'linkedin-mistakes',
    title: '10 LinkedIn Mistakes Costing You Interviews (2026)',
    description: 'Weak headline, no keywords, empty about section — fix these 10 common mistakes killing your profile views.',
    primaryKeyword: 'linkedin mistakes',
    tags: ['mistakes', 'linkedin', 'profile', 'tips', 'optimization'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Top 10 Mistakes',
  },

  // ── Recruiter / career guides ─────────────────────────────
  {
    slug: 'recruiter-psychology',
    title: 'What Recruiters Look For on LinkedIn (2026 Study)',
    description: '7-second scan, keyword filters, and trust signals. Understand how recruiters evaluate your profile.',
    primaryKeyword: 'what recruiters look for linkedin',
    tags: ['recruiters', 'psychology', 'linkedin', 'hiring', 'search'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Recruiter Psychology',
  },
  {
    slug: 'get-noticed-recruiters',
    title: 'How to Get Noticed by Recruiters on LinkedIn (2026)',
    description: '5 tactics to appear in recruiter searches and get messages. Keyword placement, engagement, and visibility.',
    primaryKeyword: 'get noticed recruiters linkedin',
    tags: ['recruiters', 'visibility', 'linkedin', 'search', 'profile'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Get Noticed by Recruiters',
  },
  {
    slug: 'top-1-percent-profiles',
    title: 'What Top 1% LinkedIn Profiles Do Differently (2026)',
    description: 'Reverse-engineered patterns from the highest-ranking LinkedIn profiles. Headline, about, and content strategy.',
    primaryKeyword: 'top linkedin profiles',
    tags: ['top profiles', 'linkedin', 'best', 'inspiration', 'optimization'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'Top 1% Profiles',
  },
  {
    slug: 'linkedin-resume-vs-profile',
    title: 'LinkedIn vs Resume: 6 Key Differences in 2026',
    description: 'Your LinkedIn is not your resume. Learn the 6 key differences and how to optimise each for maximum impact.',
    primaryKeyword: 'linkedin vs resume',
    tags: ['resume', 'linkedin', 'profile', 'comparison', 'career'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'LinkedIn vs Resume',
  },

  // ── Audience pages ────────────────────────────────────────
  {
    slug: 'for-jobseekers',
    title: 'LinkedIn Guide for Job Seekers: Get Hired in 2026',
    description: 'Optimise your LinkedIn for job search. Keyword strategy, recruiter visibility tips, and a free profile scorer.',
    primaryKeyword: 'linkedin for job seekers',
    tags: ['job seekers', 'linkedin', 'career', 'recruiters', 'interview'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'audience',
    label: 'For Job Seekers',
  },
  {
    slug: 'for-founders',
    title: 'LinkedIn for Founders: Build Authority in 2026',
    description: 'Show traction, attract investors, and build credibility on LinkedIn. Strategies for startup founders.',
    primaryKeyword: 'linkedin for founders',
    tags: ['founders', 'linkedin', 'startup', 'authority', 'branding'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'audience',
    label: 'For Founders',
  },
  {
    slug: 'linkedin-profile-for-students',
    title: 'LinkedIn for Students: Build Your Profile (2026 Guide)',
    description: 'No experience? No problem. Build a LinkedIn profile that impresses recruiters with projects and positioning.',
    primaryKeyword: 'linkedin for students',
    tags: ['students', 'linkedin', 'freshers', 'profile', 'college'],
    pillarSlug: 'linkedin-optimization-guide',
    lastModified: '2026-03-24',
    type: 'audience',
    label: 'For Students',
  },

  // ── Profession-specific headline pages ────────────────────
  {
    slug: 'linkedin-headline-software-engineers',
    title: '30+ LinkedIn Headlines for Engineers That Get Hired (2026)',
    description: 'Stand out from 5M+ engineers on LinkedIn. Copy 30+ recruiter-approved headlines for frontend, backend, and DevOps roles.',
    primaryKeyword: 'linkedin headline software engineer',
    tags: ['headline', 'software engineer', 'developer', 'tech', 'linkedin', 'frontend', 'backend'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Engineers',
  },
  {
    slug: 'linkedin-headline-finance',
    title: '25+ LinkedIn Headlines for Finance Pros (2026 Guide)',
    description: 'CPA, CFA, or investment banking? Copy these 25+ LinkedIn headlines built for finance professionals. Free scoring.',
    primaryKeyword: 'linkedin headline finance',
    tags: ['headline', 'finance', 'accounting', 'CPA', 'CFA', 'linkedin', 'banking'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Finance',
  },
  {
    slug: 'linkedin-headline-hr',
    title: '25+ LinkedIn Headlines for HR & Recruiters (2026 Guide)',
    description: 'Write a headline candidates actually trust. 25+ proven examples for recruiters, HRBPs, and talent acquisition leaders.',
    primaryKeyword: 'linkedin headline HR',
    tags: ['headline', 'HR', 'recruiters', 'talent acquisition', 'linkedin', 'people ops'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: HR',
  },
  {
    slug: 'linkedin-headline-sales',
    title: '25+ LinkedIn Headlines for Sales Reps That Win Deals (2026)',
    description: 'Stop sounding like every other SDR. Copy 25+ LinkedIn headlines that build trust and generate inbound leads.',
    primaryKeyword: 'linkedin headline sales',
    tags: ['headline', 'sales', 'SDR', 'BDR', 'account executive', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Sales',
  },
  {
    slug: 'linkedin-headline-marketers',
    title: '25+ LinkedIn Headlines for Marketers That Get Clicks (2026)',
    description: 'SEO, growth, or content marketing? Grab 25+ LinkedIn headline examples that position you as an expert.',
    primaryKeyword: 'linkedin headline marketer',
    tags: ['headline', 'marketing', 'seo', 'content', 'growth', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Marketers',
  },
  {
    slug: 'linkedin-headline-designers',
    title: '25+ LinkedIn Headlines for Designers That Stand Out (2026)',
    description: 'UX, UI, or graphic design? Copy 25+ LinkedIn headlines that showcase your portfolio and attract recruiters.',
    primaryKeyword: 'linkedin headline designer',
    tags: ['headline', 'designer', 'UX', 'UI', 'graphic design', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Designers',
  },
  {
    slug: 'linkedin-headline-data-scientists',
    title: '25+ LinkedIn Headlines for Data Scientists (2026 Guide)',
    description: 'ML, NLP, or analytics? Copy 25+ LinkedIn headlines data science recruiters actually search for.',
    primaryKeyword: 'linkedin headline data scientist',
    tags: ['headline', 'data science', 'ML', 'analytics', 'AI', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Data Scientists',
  },
  {
    slug: 'linkedin-headline-product-managers',
    title: '25+ LinkedIn Headlines for Product Managers (2026 Guide)',
    description: 'From APM to VP Product — 25+ LinkedIn headline examples that signal strategic thinking. Free headline scoring.',
    primaryKeyword: 'linkedin headline product manager',
    tags: ['headline', 'product manager', 'PM', 'strategy', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Product Managers',
  },
  {
    slug: 'linkedin-headline-consultants',
    title: '25+ LinkedIn Headlines for Consultants (2026 Guide)',
    description: 'Build credibility before the first call. 25+ LinkedIn headlines for strategy, management, and tech consultants.',
    primaryKeyword: 'linkedin headline consultant',
    tags: ['headline', 'consultant', 'strategy', 'management', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Consultants',
  },
  {
    slug: 'linkedin-headline-mba',
    title: '25+ LinkedIn Headlines for MBA Students & Grads (2026)',
    description: 'Leverage your MBA on LinkedIn. 25+ headline examples for career switchers, consultants, and aspiring leaders.',
    primaryKeyword: 'linkedin headline MBA',
    tags: ['headline', 'MBA', 'students', 'career switch', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: MBA',
  },
  {
    slug: 'linkedin-headline-healthcare',
    title: '25+ LinkedIn Headlines for Healthcare Workers (2026)',
    description: 'Doctors, nurses, and health tech? Copy 25+ LinkedIn headlines that signal clinical expertise.',
    primaryKeyword: 'linkedin headline healthcare',
    tags: ['headline', 'healthcare', 'medical', 'nursing', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Healthcare',
  },
  {
    slug: 'linkedin-headline-teachers',
    title: '25+ LinkedIn Headlines for Educators & Teachers (2026)',
    description: 'EdTech, curriculum design, or classroom teaching? 25+ LinkedIn headlines that attract the right opportunities.',
    primaryKeyword: 'linkedin headline teacher',
    tags: ['headline', 'teacher', 'educator', 'EdTech', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Teachers',
  },
  {
    slug: 'linkedin-headline-for-graphic-designer',
    title: '30+ LinkedIn Headlines for Graphic Designers (2026)',
    description: 'From freelance to agency — 30+ LinkedIn headline examples for graphic designers that attract clients and recruiters.',
    primaryKeyword: 'linkedin headline graphic designer',
    tags: ['headline', 'graphic designer', 'design', 'freelance', 'linkedin'],
    pillarSlug: 'linkedin-headline-guide',
    lastModified: '2026-03-24',
    type: 'profession',
    label: 'Headlines: Graphic Design',
  },

  // ── Comparison pages ──────────────────────────────────────
  {
    slug: 'compare-linkedin-review-tools',
    title: 'Best LinkedIn Profile Review Tools Compared (2026)',
    description: 'Side-by-side comparison of LinkedIn analysis tools. Features, pricing, and which one gives the best recommendations.',
    primaryKeyword: 'linkedin review tools comparison',
    tags: ['comparison', 'tools', 'linkedin', 'review', 'analysis'],
    lastModified: '2026-03-24',
    type: 'comparison',
    label: 'Compare Tools',
  },
  {
    slug: 'linkedinrank-vs-manual-audits',
    title: 'LinkedInRank vs Manual Audits: Which Is Better? (2026)',
    description: 'AI-powered scoring vs manual LinkedIn audits. Compare speed, accuracy, and actionability side by side.',
    primaryKeyword: 'linkedinrank vs manual audit',
    tags: ['comparison', 'linkedinrank', 'audit', 'linkedin', 'analysis'],
    lastModified: '2026-03-24',
    type: 'comparison',
    label: 'vs Manual Audits',
  },
  {
    slug: 'linkedin-rank-vs-ssi',
    title: 'LinkedIn Rank vs SSI Score: What Matters More? (2026)',
    description: 'LinkedIn SSI measures engagement. LinkedInRank measures profile strength. Learn which score matters for your goals.',
    primaryKeyword: 'linkedin rank vs ssi',
    tags: ['comparison', 'SSI', 'linkedin rank', 'score', 'linkedin'],
    lastModified: '2026-03-24',
    type: 'comparison',
    label: 'Rank vs SSI',
  },

  // ── Core product / concept pages ──────────────────────────
  {
    slug: 'what-is-linkedin-rank',
    title: 'What Is LinkedIn Rank? Profile Scoring Explained (2026)',
    description: 'LinkedIn Rank is your profile strength score across 30+ signals. Learn how it works and how to improve yours.',
    primaryKeyword: 'what is linkedin rank',
    tags: ['linkedin rank', 'score', 'linkedin', 'explanation', 'profile'],
    lastModified: '2026-03-24',
    type: 'core',
    label: 'What Is LinkedIn Rank?',
  },
  {
    slug: 'linkedin-ranking',
    title: 'LinkedIn Ranking: How to Rank Higher in Search (2026)',
    description: 'Understand LinkedIn search ranking factors. Optimise headline, skills, and connections to rank above competitors.',
    primaryKeyword: 'linkedin ranking',
    tags: ['ranking', 'search', 'linkedin', 'seo', 'visibility'],
    lastModified: '2026-03-24',
    type: 'core',
    label: 'LinkedIn Ranking',
  },
  {
    slug: 'linkedin-profile-score',
    title: 'LinkedIn Profile Score: Check Yours Free (2026)',
    description: 'Get your LinkedIn profile score out of 100 across 30+ signals. AI-powered recommendations included. No login needed.',
    primaryKeyword: 'linkedin profile score',
    tags: ['score', 'linkedin', 'profile', 'checker', 'analysis'],
    lastModified: '2026-03-24',
    type: 'core',
    label: 'Profile Score',
  },

  // ── AI Prompts pages ──────────────────────────────────────
  {
    slug: 'ai-prompts-linkedin',
    title: '50+ AI Prompts for LinkedIn Profile Optimisation (2026)',
    description: 'Copy-paste AI prompts for headlines, about sections, experience, and skills. Works with ChatGPT and Claude.',
    primaryKeyword: 'ai prompts linkedin',
    tags: ['AI', 'prompts', 'linkedin', 'ChatGPT', 'optimization'],
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: All Sections',
  },
  {
    slug: 'ai-prompts-linkedin-headline',
    title: 'AI Prompts for LinkedIn Headlines (2026 Templates)',
    description: 'Generate compelling LinkedIn headlines using AI. 15+ copy-paste prompts with placeholders for any profession.',
    primaryKeyword: 'ai prompts linkedin headline',
    tags: ['AI', 'prompts', 'headline', 'linkedin', 'ChatGPT'],
    pillarSlug: 'ai-prompts-linkedin',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: Headlines',
  },
  {
    slug: 'ai-prompts-linkedin-about',
    title: 'AI Prompts for LinkedIn About Section (2026 Guide)',
    description: 'Write your LinkedIn summary with AI. 10+ tested prompts that produce professional, keyword-rich about sections.',
    primaryKeyword: 'ai prompts linkedin about',
    tags: ['AI', 'prompts', 'about', 'summary', 'linkedin'],
    pillarSlug: 'ai-prompts-linkedin',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: About',
  },
  {
    slug: 'ai-prompts-linkedin-experience',
    title: 'AI Prompts for LinkedIn Experience Section (2026)',
    description: 'Transform job descriptions into achievement bullets. AI prompts that use the XYZ formula for LinkedIn experience.',
    primaryKeyword: 'ai prompts linkedin experience',
    tags: ['AI', 'prompts', 'experience', 'bullet points', 'linkedin'],
    pillarSlug: 'ai-prompts-linkedin',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: Experience',
  },
  {
    slug: 'ai-prompts-linkedin-skills',
    title: 'AI Prompts for LinkedIn Skills Section (2026)',
    description: 'Find the best skills for your LinkedIn profile using AI. Prompts for keyword research and skill prioritisation.',
    primaryKeyword: 'ai prompts linkedin skills',
    tags: ['AI', 'prompts', 'skills', 'keywords', 'linkedin'],
    pillarSlug: 'ai-prompts-linkedin',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: Skills',
  },
  {
    slug: 'ai-prompts-linkedin-summary',
    title: 'AI Prompts for LinkedIn Summary & Positioning (2026)',
    description: 'Craft your professional positioning with AI. Prompts for personal branding, niche selection, and thought leadership.',
    primaryKeyword: 'ai prompts linkedin summary',
    tags: ['AI', 'prompts', 'summary', 'positioning', 'linkedin'],
    pillarSlug: 'ai-prompts-linkedin',
    lastModified: '2026-03-24',
    type: 'guide',
    label: 'AI Prompts: Summary',
  },
]

/**
 * Find related pages based on tag overlap, excluding self.
 * Returns up to `count` pages sorted by relevance.
 */
export function getRelatedPages(currentSlug: string, count: number = 3): PageSEO[] {
  const current = ALL_PAGES.find(p => p.slug === currentSlug)
  if (!current) return []

  const scored = ALL_PAGES
    .filter(p => p.slug !== currentSlug)
    .map(page => {
      const overlap = page.tags.filter(t => current.tags.includes(t)).length
      // Boost pages in same pillar cluster
      const pillarBoost = (page.pillarSlug === current.pillarSlug && current.pillarSlug) ? 2 : 0
      // Boost same type
      const typeBoost = page.type === current.type ? 1 : 0
      return { page, score: overlap + pillarBoost + typeBoost }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map(s => s.page)
}

/**
 * Get the pillar page for a given slug.
 */
export function getPillarPage(currentSlug: string): PageSEO | undefined {
  const current = ALL_PAGES.find(p => p.slug === currentSlug)
  if (!current?.pillarSlug) return undefined
  return ALL_PAGES.find(p => p.slug === current.pillarSlug)
}

/**
 * Topic cluster hierarchy for topical authority.
 * Each cluster has a pillar page and spoke (child) pages.
 */
export interface TopicCluster {
  pillarSlug: string
  label: string
  description: string
  spokes: string[] // slugs of child pages
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    pillarSlug: 'linkedin-optimization-guide',
    label: 'LinkedIn Profile Optimization',
    description: 'Master guide covering every aspect of LinkedIn profile optimization',
    spokes: [
      'linkedin-headline-guide',
      'linkedin-about-guide',
      'linkedin-keywords-guide',
      'linkedin-profile-photo-guide',
      'linkedin-profile-checklist',
      'linkedin-best-practices',
      'linkedin-personal-branding',
      'linkedin-mistakes',
      'recruiter-psychology',
      'get-noticed-recruiters',
      'top-1-percent-profiles',
      'linkedin-resume-vs-profile',
      'for-jobseekers',
      'for-founders',
      'linkedin-profile-for-students',
    ],
  },
  {
    pillarSlug: 'linkedin-headline-guide',
    label: 'LinkedIn Headlines',
    description: 'Headline writing formulas and profession-specific examples',
    spokes: [
      'linkedin-headline-software-engineers',
      'linkedin-headline-finance',
      'linkedin-headline-hr',
      'linkedin-headline-sales',
      'linkedin-headline-marketers',
      'linkedin-headline-designers',
      'linkedin-headline-data-scientists',
      'linkedin-headline-product-managers',
      'linkedin-headline-consultants',
      'linkedin-headline-mba',
      'linkedin-headline-healthcare',
      'linkedin-headline-teachers',
      'linkedin-headline-for-graphic-designer',
    ],
  },
  {
    pillarSlug: 'linkedin-content-strategy',
    label: 'LinkedIn Content & Engagement',
    description: 'Content creation and engagement strategies for LinkedIn',
    spokes: [
      'viral-post-formulas',
    ],
  },
  {
    pillarSlug: 'ai-prompts-linkedin',
    label: 'AI-Powered LinkedIn Optimization',
    description: 'AI prompts and tools for LinkedIn profile optimization',
    spokes: [
      'ai-prompts-linkedin-headline',
      'ai-prompts-linkedin-about',
      'ai-prompts-linkedin-experience',
      'ai-prompts-linkedin-skills',
      'ai-prompts-linkedin-summary',
    ],
  },
]

/**
 * Get the cluster a page belongs to.
 */
export function getClusterForPage(slug: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find(c =>
    c.pillarSlug === slug || c.spokes.includes(slug)
  )
}

/**
 * Get sibling pages in the same cluster (excluding self).
 */
export function getSiblingPages(slug: string, count: number = 5): PageSEO[] {
  const cluster = getClusterForPage(slug)
  if (!cluster) return []
  const allInCluster = [cluster.pillarSlug, ...cluster.spokes].filter(s => s !== slug)
  return allInCluster
    .slice(0, count)
    .map(s => ALL_PAGES.find(p => p.slug === s))
    .filter((p): p is PageSEO => !!p)
}
