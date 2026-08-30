// Central SEO metadata for all tools
export const SITE_URL = 'https://linkedinrank.com'
export const SITE_NAME = 'LinkedInRank'

export interface ToolFAQ { question: string; answer: string }
export interface ToolBlogBrief { slug: string; title: string; targetKeyword: string; metaDescription: string; h2Outline: string[]; summary: string }

export interface ToolMeta {
    id: string
    slug: string
    name: string
    shortDesc?: string
    seoTitle: string
    metaDescription: string
    h1: string
    heroText: string
    primaryKeyword: string
    secondaryKeywords: string[]
    category: string
    categoryLabel: string
    features: { title: string; description: string }[]
    faqs: ToolFAQ[]
    relatedTools: string[]
    tag?: string
}

export const TOOL_SLUGS: Record<string, string> = {
    headline: 'linkedin-headline-generator',
    about: 'linkedin-about-generator',
    bullets: 'linkedin-experience-generator',
    ring: 'linkedin-profile-photo-ring',
    seo: 'linkedin-profile-keyword-analyzer',
    postideas: 'linkedin-post-idea-generator',
    storytopost: 'linkedin-story-to-post-converter',
    hooks: 'linkedin-post-hook-generator',
    pillars: 'linkedin-content-planner',
    comments: 'linkedin-comment-generator',
    messages: 'linkedin-connection-message-generator',
    qrcode: 'linkedin-qr-code-generator',
}

export const SLUG_TO_TOOL_ID: Record<string, string> = Object.fromEntries(
    Object.entries(TOOL_SLUGS).map(([id, slug]) => [slug, id])
)

export function getToolBySlug(slug: string): ToolMeta | undefined {
    return ALL_TOOLS.find(t => t.slug === slug)
}

export function getToolById(id: string): ToolMeta | undefined {
    return ALL_TOOLS.find(t => t.id === id)
}

export function getAllToolSlugs(): string[] {
    return ALL_TOOLS.map(t => t.slug)
}

export const ALL_TOOLS: ToolMeta[] = [
    {
        id: 'headline', slug: 'linkedin-headline-generator', name: 'LinkedIn Headline Generator',
        shortDesc: 'Generate keyword-optimized, recruiter-ready headlines scored for impact and clarity.',
        seoTitle: 'LinkedIn Headline Generator | AI Examples & Templates (2026)',
        metaDescription: 'Generate professional LinkedIn headlines for students, graduates, and professionals. Try AI-powered headline examples, analyzer, and keyword-optimized suggestions free.',
        h1: 'LinkedIn Headline Generator', heroText: 'Your LinkedIn headline is the first thing recruiters see. Generate keyword-optimized, recruiter-ready headlines in seconds with AI-powered suggestions tailored to your role and industry.',
        primaryKeyword: 'LinkedIn headline generator', secondaryKeywords: ['LinkedIn headline examples', 'LinkedIn headline analyzer', 'professional LinkedIn headline', 'LinkedIn headline for students', 'best LinkedIn headlines'],
        category: 'profile-optimization', categoryLabel: 'Profile Optimization', tag: 'Most Popular',
        features: [
            { title: 'AI-Powered Generation', description: 'Get 6 unique headlines scored by keyword strength, positioning clarity, and recruiter appeal.' },
            { title: 'PDF Upload Support', description: 'Upload your LinkedIn PDF and auto-fill your role, company, industry, and skills.' },
            { title: 'Multiple Headline Styles', description: 'Value Proposition, Authority, Outcome-Focused, Intersection, Mission-Driven, and Builder styles.' },
            { title: 'Keyword Optimization', description: 'Every headline includes 2-3 keywords recruiters actually search for in your industry.' },
            { title: 'Character Limit Check', description: 'All headlines stay under LinkedIn\'s 120-character limit.' },
            { title: 'Scoring System', description: 'Each headline scored 75-98 based on keyword density, specificity, positioning clarity, and curiosity factor.' },
        ],
        faqs: [
            { question: 'What is a good headline for LinkedIn?', answer: 'A good LinkedIn headline clearly communicates your role, value proposition, and 2-3 keywords recruiters search for. It should be under 120 characters, avoid generic titles like "Looking for opportunities", and use separators like | for readability.' },
            { question: 'How to write a good LinkedIn headline?', answer: 'Start with your core role, add your key differentiator or value you deliver, and include 2-3 industry keywords. Use: [Role] | [Value Proposition] | [Key Skill/Industry]. Avoid buzzwords like "passionate" or "motivated".' },
            { question: 'What should a student put in their LinkedIn headline?', answer: 'Students should lead with their area of study and career direction, not just "Student at [University]". Example: "Computer Science Student | Building ML Tools for Healthcare | Python, TensorFlow".' },
            { question: 'How long should a LinkedIn headline be?', answer: 'LinkedIn allows up to 220 characters, but only the first 120 are visible in search results. Keep your headline under 120 characters for full visibility.' },
            { question: 'Can I use AI to generate a LinkedIn headline?', answer: 'Yes. AI headline generators analyze your role, skills, and industry to create keyword-optimized headlines. Use AI as a starting point, then personalize with your specific achievements.' },
            { question: 'What is the LinkedIn headline 532 rule?', answer: 'The 532 rule: 5 words describing what you do, 3 words about who you help, 2 words about the result. Example: "Data Engineer Building Pipelines | Helping Startups Scale Fast".' },
        ],
        relatedTools: ['linkedin-about-generator', 'linkedin-profile-keyword-analyzer', 'linkedin-experience-generator'],
    },
    {
        id: 'about', slug: 'linkedin-about-generator', name: 'LinkedIn About Section Generator',
        shortDesc: 'Write compelling, first-person summary bios in 3 brand voices tailored to your career.',
        seoTitle: 'LinkedIn About Section Generator | AI Summary Writer (2026)',
        metaDescription: 'Generate a compelling LinkedIn About section in 3 styles. AI-powered summary writer creates first-person, keyword-rich About sections from your experience.',
        h1: 'LinkedIn About Section Generator', heroText: 'Your About section is where connections decide to reach out or scroll past. Generate a first-person, keyword-rich summary in three distinct styles tailored to your actual experience.',
        primaryKeyword: 'LinkedIn about section generator', secondaryKeywords: ['LinkedIn summary generator', 'LinkedIn about section examples', 'LinkedIn summary writer', 'AI LinkedIn about section'],
        category: 'profile-optimization', categoryLabel: 'Profile Optimization',
        features: [
            { title: 'Three Writing Styles', description: 'Narrative Arc, Bold Opener, or Conversational tone to match your personal brand.' },
            { title: 'PDF Auto-Fill', description: 'Upload your LinkedIn PDF to auto-extract role, experience, skills, and achievements.' },
            { title: 'Student-Aware', description: 'Smart detection for student profiles with authentic, non-inflated content.' },
            { title: 'SEO Keywords', description: 'Weaves 3-5 industry keywords naturally for LinkedIn search visibility.' },
            { title: 'Mobile-Optimized Output', description: 'Short paragraphs with line breaks for mobile reading.' },
            { title: 'Character Limit Compliant', description: 'Every section stays under LinkedIn\'s 2,600-character limit.' },
        ],
        faqs: [
            { question: 'What should I write in my LinkedIn About section?', answer: 'Open with a hook, follow with your professional background, key achievements with numbers, core skills, and a clear call-to-action. Write in first person and focus on the value you bring.' },
            { question: 'How long should a LinkedIn summary be?', answer: 'Ideal is 150-300 words. LinkedIn truncates after ~300 characters with "see more", so your opening must be compelling enough to earn the click.' },
            { question: 'Should I write in first or third person?', answer: 'Write in first person ("I"). It feels more personal, authentic, and approachable. Third person sounds overly formal on LinkedIn.' },
            { question: 'How do I start my LinkedIn About section?', answer: 'Never start with "I am a [title]". Open with a hook: a surprising insight, bold statement, question, or specific achievement.' },
        ],
        relatedTools: ['linkedin-headline-generator', 'linkedin-experience-generator', 'linkedin-profile-keyword-analyzer'],
    },
    {
        id: 'bullets', slug: 'linkedin-experience-generator', name: 'LinkedIn Experience Description Generator',
        shortDesc: 'Rewrite plain job duties into high-impact, quantified achievement bullet points.',
        seoTitle: 'LinkedIn Experience Generator | Bullet Point Examples (2026)',
        metaDescription: 'Rewrite your LinkedIn experience bullet points with AI. Transform weak descriptions into achievement-focused, keyword-rich bullets that attract recruiters.',
        h1: 'LinkedIn Experience Description Generator', heroText: 'Transform bland job descriptions into achievement-focused, recruiter-optimized bullet points. Paste your current descriptions and get AI-rewritten versions instantly.',
        primaryKeyword: 'LinkedIn experience description generator', secondaryKeywords: ['LinkedIn bullet point rewriter', 'LinkedIn experience examples', 'LinkedIn job description writer'],
        category: 'profile-optimization', categoryLabel: 'Profile Optimization',
        features: [
            { title: 'AI Bullet Rewriting', description: 'Transforms passive descriptions into achievement-focused bullets with quantified results.' },
            { title: 'Multiple Versions', description: 'Get 3 different rewritten versions of each bullet point.' },
            { title: 'Action Verb Optimization', description: 'Replaces weak verbs with strong action verbs that signal impact.' },
            { title: 'Keyword Integration', description: 'Adds relevant industry keywords recruiters search for.' },
            { title: 'Rule-Based Fallback', description: 'Works even without AI with proven rewriting patterns.' },
            { title: 'Copy and Paste', description: 'One-click copy for each rewritten bullet point.' },
        ],
        faqs: [
            { question: 'How do I write LinkedIn experience descriptions?', answer: 'Use the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Lead with a strong action verb, include a quantified result, and explain the method.' },
            { question: 'Should I use bullet points on LinkedIn?', answer: 'Yes. Bullet points make your experience scannable. Use 3-5 per role, each starting with an action verb and focusing on a different achievement.' },
            { question: 'What action verbs should I use?', answer: 'Use verbs that signal impact: Led, Built, Increased, Reduced, Launched, Designed, Negotiated, Streamlined, Generated, Transformed.' },
        ],
        relatedTools: ['linkedin-headline-generator', 'linkedin-about-generator', 'linkedin-profile-keyword-analyzer'],
    },
    {
        id: 'ring', slug: 'linkedin-profile-photo-ring', name: 'LinkedIn Profile Photo Ring Creator',
        shortDesc: 'Add eye-catching colored borders and gradient rings to make your photo pop in feeds.',
        seoTitle: 'LinkedIn Profile Photo Ring Creator | Free Templates (2026)',
        metaDescription: 'Add a professional colored ring to your LinkedIn profile photo for free. Choose from branded ring styles to make your profile picture stand out.',
        h1: 'LinkedIn Profile Photo Ring Creator', heroText: 'Make your profile photo stand out in the LinkedIn feed with a professional colored ring. Upload your photo and add a custom ring in seconds.',
        primaryKeyword: 'LinkedIn profile photo ring', secondaryKeywords: ['LinkedIn profile picture ring', 'LinkedIn photo border', 'LinkedIn profile ring creator'],
        category: 'profile-optimization', categoryLabel: 'Profile Optimization',
        features: [
            { title: 'Custom Ring Colors', description: 'Choose from preset brand colors or pick any custom color.' },
            { title: 'Instant Preview', description: 'See your photo with the ring applied in real-time.' },
            { title: 'Free Download', description: 'Download in high resolution, ready for LinkedIn.' },
            { title: 'No Watermark', description: 'Completely free with no watermark.' },
            { title: 'Multiple Ring Styles', description: 'Solid, gradient, or patterned ring styles.' },
            { title: 'Mobile Friendly', description: 'Works on any device.' },
        ],
        faqs: [
            { question: 'Does a ring on your LinkedIn photo increase views?', answer: 'Yes. A colored ring makes your photo visually distinct. Profiles with distinctive photos get up to 14x more views.' },
            { question: 'What color ring should I use?', answer: 'Choose a color that aligns with your brand. Blue and green convey trust, red and orange signal energy.' },
            { question: 'Are LinkedIn profile photo rings free?', answer: 'Yes, our ring creator is completely free with no watermark or signup required.' },
        ],
        relatedTools: ['linkedin-headline-generator', 'linkedin-qr-code-generator'],
    },
    {
        id: 'seo', slug: 'linkedin-profile-keyword-analyzer', name: 'LinkedIn Profile Keyword Analyzer',
        shortDesc: 'Identify missing keywords and optimize section density to maximize recruiter search rank.',
        seoTitle: 'LinkedIn Keyword Analyzer | Free SEO Checker (2026)',
        metaDescription: 'Analyze your LinkedIn profile keywords and SEO score. Get keyword coverage analysis, missing keywords, and optimization recommendations.',
        h1: 'LinkedIn Profile Keyword Analyzer', heroText: 'Discover which keywords are missing from your LinkedIn profile. Upload your PDF and get a keyword coverage score with specific recommendations.',
        primaryKeyword: 'LinkedIn profile keyword analyzer', secondaryKeywords: ['LinkedIn SEO checker', 'LinkedIn keyword optimization', 'LinkedIn profile SEO', 'LinkedIn keyword tool'],
        category: 'analytics', categoryLabel: 'Analytics & Optimization',
        features: [
            { title: 'Keyword Coverage Score', description: 'Percentage score showing keyword coverage for your industry.' },
            { title: 'Missing Keyword Alerts', description: 'See which high-impact keywords are absent from your profile.' },
            { title: 'Industry-Specific Analysis', description: 'Analysis tailored to your industry with relevant benchmarks.' },
            { title: 'Section-by-Section Breakdown', description: 'Keyword coverage for headline, about, experience, and skills.' },
            { title: 'PDF Upload', description: 'Upload your LinkedIn PDF for instant analysis.' },
            { title: 'Actionable Recommendations', description: 'Specific suggestions on where to add missing keywords.' },
        ],
        faqs: [
            { question: 'What is LinkedIn SEO?', answer: 'LinkedIn SEO is optimizing your profile with keywords recruiters search for. The right keywords in the right sections make you appear higher in search results.' },
            { question: 'Where should I put keywords on LinkedIn?', answer: 'Headline (highest weight), About section, experience descriptions, skills section, and job titles.' },
            { question: 'How many keywords should I have?', answer: 'Aim for 15-25 relevant keywords spread across sections. Each section should have 3-5 naturally integrated.' },
        ],
        relatedTools: ['linkedin-headline-generator', 'linkedin-about-generator', 'linkedin-experience-generator'],
    },
    {
        id: 'postideas', slug: 'linkedin-post-idea-generator', name: 'LinkedIn Post Idea Generator',
        shortDesc: 'Generate viral, niche-tailored post concepts, structured outlines, and strategic angles.',
        seoTitle: 'LinkedIn Post Idea Generator | Content Ideas & Templates (2026)',
        metaDescription: 'Generate engaging LinkedIn post ideas tailored to your industry. AI-powered content ideas for thought leadership, job search, and audience growth.',
        h1: 'LinkedIn Post Idea Generator', heroText: 'Never stare at a blank screen again. Get AI-generated post ideas tailored to your industry, goals, and audience.',
        primaryKeyword: 'LinkedIn post idea generator', secondaryKeywords: ['LinkedIn content ideas', 'what to post on LinkedIn', 'LinkedIn post topics', 'LinkedIn content generator'],
        category: 'content-creation', categoryLabel: 'Content Creation',
        features: [
            { title: 'Industry-Tailored Ideas', description: 'Post ideas specific to your industry with relevant angles.' },
            { title: 'Goal-Driven Content', description: 'Ideas for thought leadership, job search, audience growth, or networking.' },
            { title: 'Multiple Post Types', description: 'Evergreen, trending, and custom angles.' },
            { title: 'PDF Auto-Fill', description: 'Upload PDF to auto-fill industry and niche.' },
            { title: 'Ready-to-Write Briefs', description: 'Each idea includes a hook, key points, and strategy.' },
            { title: 'AI-Powered', description: 'Unique, non-generic ideas based on trends.' },
        ],
        faqs: [
            { question: 'What should I post on LinkedIn?', answer: 'Post content that demonstrates expertise, shares lessons, or provides value. Combine personal stories with professional insights.' },
            { question: 'How often should I post on LinkedIn?', answer: 'Post 3-5 times per week. Quality matters more than quantity. One great post beats five mediocre ones.' },
            { question: 'What type of posts get the most engagement?', answer: 'Personal stories with lessons, contrarian opinions, behind-the-scenes content, and data-backed insights.' },
        ],
        relatedTools: ['linkedin-post-hook-generator', 'linkedin-story-to-post-converter', 'linkedin-content-planner'],
    },
    {
        id: 'storytopost', slug: 'linkedin-story-to-post-converter', name: 'LinkedIn Story to Post Converter',
        shortDesc: 'Transform rough notes and career anecdotes into ready-to-publish viral post formats.',
        seoTitle: 'LinkedIn Story to Post Converter | Free AI Tool (2026)',
        metaDescription: 'Convert raw stories into polished LinkedIn posts. AI-powered converter transforms rough ideas into engaging, structured posts ready to publish.',
        h1: 'LinkedIn Story to Post Converter', heroText: 'Turn your raw experiences into polished, engaging LinkedIn posts. Describe what happened and what you learned, get a ready-to-publish post.',
        primaryKeyword: 'LinkedIn story to post converter', secondaryKeywords: ['LinkedIn post writer', 'convert story to LinkedIn post', 'LinkedIn post creator'],
        category: 'content-creation', categoryLabel: 'Content Creation',
        features: [
            { title: 'AI Story Transformation', description: 'Converts rough stories into structured posts with hooks and lessons.' },
            { title: 'Multiple Post Styles', description: 'Classic, Contrarian, or Listicle style.' },
            { title: 'Rule-Based Fallback', description: 'Works without AI using proven templates.' },
            { title: 'Word Count Optimization', description: 'Optimized for ideal LinkedIn length.' },
            { title: 'One-Click Copy', description: 'Copy finished post to clipboard.' },
            { title: 'Hook Generation', description: 'Automatically creates scroll-stopping first lines.' },
        ],
        faqs: [
            { question: 'How do I turn a story into a LinkedIn post?', answer: 'Start with the key lesson. Write a curiosity hook, share context briefly, describe what happened, end with the takeaway. Keep paragraphs short.' },
            { question: 'How long should a LinkedIn post be?', answer: 'Optimal is 150-300 words. Posts over 200 words get truncated, so first 2-3 lines must hook the reader.' },
        ],
        relatedTools: ['linkedin-post-idea-generator', 'linkedin-post-hook-generator', 'linkedin-content-planner'],
    },
    {
        id: 'hooks', slug: 'linkedin-post-hook-generator', name: 'LinkedIn Post Hook Generator',
        shortDesc: 'Craft curiosity-driven opening lines designed to stop the scroll and win "see more" clicks.',
        seoTitle: 'LinkedIn Post Hook Generator | Opening Line Examples (2026)',
        metaDescription: 'Generate scroll-stopping LinkedIn post hooks. AI-powered hook generator creates attention-grabbing opening lines tailored to your topic and audience.',
        h1: 'LinkedIn Post Hook Generator', heroText: 'Your first line decides if anyone reads the rest. Generate scroll-stopping hooks for your LinkedIn posts that create curiosity and drive engagement.',
        primaryKeyword: 'LinkedIn post hook generator', secondaryKeywords: ['LinkedIn opening line generator', 'LinkedIn hook examples', 'scroll-stopping LinkedIn hooks'],
        category: 'content-creation', categoryLabel: 'Content Creation',
        features: [
            { title: 'Topic-Based Generation', description: 'Enter your topic and get multiple hook variations.' },
            { title: 'Angle Selection', description: 'Contrarian, personal story, or data-driven angles.' },
            { title: 'Audience Targeting', description: 'Specify target audience for resonant hooks.' },
            { title: 'Multiple Hook Styles', description: 'Curiosity gaps, bold statements, questions, and more.' },
            { title: 'AI-Powered', description: 'Unique, non-template hooks for each topic.' },
            { title: 'Explanation Included', description: 'Each hook explains why it works psychologically.' },
        ],
        faqs: [
            { question: 'What is a LinkedIn post hook?', answer: 'A hook is the opening line before "see more" truncation. It must create enough curiosity to make readers expand the post.' },
            { question: 'How do I write a good hook?', answer: 'Start with a specific, unexpected statement that creates a knowledge gap. Try: "I was wrong about [belief]" or "Nobody talks about [truth]".' },
        ],
        relatedTools: ['linkedin-post-idea-generator', 'linkedin-story-to-post-converter', 'linkedin-content-planner'],
    },
    {
        id: 'pillars', slug: 'linkedin-content-planner', name: 'LinkedIn Content Planner',
        shortDesc: 'Build a high-consistency weekly calendar with balanced topics and daily writing prompts.',
        seoTitle: 'LinkedIn Content Planner | Weekly Calendar Template (2026)',
        metaDescription: 'Plan your LinkedIn content with a weekly posting calendar. AI-generated content pillars, post prompts, and scheduling for your industry.',
        h1: 'LinkedIn Content Planner', heroText: 'Stop posting randomly. Get a weekly content calendar with post prompts and content pillars tailored to your industry and role.',
        primaryKeyword: 'LinkedIn content planner', secondaryKeywords: ['LinkedIn content calendar', 'LinkedIn posting schedule', 'LinkedIn weekly planner'],
        category: 'content-creation', categoryLabel: 'Content Creation',
        features: [
            { title: 'Weekly Calendar', description: 'Structured weekly plan with specific post ideas per day.' },
            { title: 'Content Pillars', description: 'Balanced mix of growth, insights, and engagement content.' },
            { title: 'Industry-Tailored', description: 'Post prompts specific to your industry and role.' },
            { title: 'Flexible Frequency', description: 'Choose your posting frequency.' },
            { title: 'AI-Powered', description: 'Unique prompts based on your expertise.' },
            { title: 'PDF Auto-Fill', description: 'Upload PDF to auto-fill industry and role.' },
        ],
        faqs: [
            { question: 'What is a LinkedIn content calendar?', answer: 'A planned schedule of posts organized by date, topic, and content pillar for consistent, strategic posting.' },
            { question: 'How many times a week should I post?', answer: 'Aim for 3-5 posts per week. If starting, 2-3 high-quality posts is enough. Consistency is key.' },
        ],
        relatedTools: ['linkedin-post-idea-generator', 'linkedin-post-hook-generator', 'linkedin-story-to-post-converter'],
    },
    {
        id: 'comments', slug: 'linkedin-comment-generator', name: 'LinkedIn Comment Generator',
        shortDesc: 'Generate insightful, value-add replies to trending posts that attract profile visits.',
        seoTitle: 'LinkedIn Comment Generator | AI Comment Templates (2026)',
        metaDescription: 'Generate thoughtful LinkedIn comments that build connections. AI-powered comment writer creates engaging, authentic replies for any post.',
        h1: 'LinkedIn Comment Generator', heroText: 'Write comments that get noticed and build relationships. Generate thoughtful, engaging replies for LinkedIn posts that showcase your expertise.',
        primaryKeyword: 'LinkedIn comment generator', secondaryKeywords: ['LinkedIn comment writer', 'LinkedIn reply generator', 'LinkedIn engagement tool'],
        category: 'networking', categoryLabel: 'Networking & Engagement',
        features: [
            { title: 'Multiple Comment Styles', description: 'Supportive, insightful, or challenging comment tones.' },
            { title: 'Length Options', description: 'Short, medium, or detailed comment lengths.' },
            { title: 'Expertise Integration', description: 'Weaves your expertise into comments naturally.' },
            { title: 'Post Analysis', description: 'Analyzes the original post to generate relevant responses.' },
            { title: 'AI-Powered', description: 'Natural, non-generic comments tailored to each post.' },
            { title: 'PDF Support', description: 'Upload PDF to set your expertise context.' },
        ],
        faqs: [
            { question: 'How do I write good LinkedIn comments?', answer: 'Add value: share a relevant experience, ask a thoughtful question, or offer a new perspective. Avoid generic "Great post!" replies.' },
            { question: 'Do comments help LinkedIn visibility?', answer: 'Yes. Thoughtful comments expose your profile to the poster\'s network and signal expertise to the algorithm.' },
        ],
        relatedTools: ['linkedin-connection-message-generator', 'linkedin-post-idea-generator'],
    },
    {
        id: 'messages', slug: 'linkedin-connection-message-generator', name: 'LinkedIn Connection Message Generator',
        shortDesc: 'Draft customized outreach and connection notes that achieve 2-3x higher accept rates.',
        seoTitle: 'LinkedIn Connection Message Generator | Templates (2026)',
        metaDescription: 'Generate personalized LinkedIn connection request messages. AI-powered message writer creates authentic, effective notes for any networking scenario.',
        h1: 'LinkedIn Connection Message Generator', heroText: 'Stop sending blank connection requests. Generate personalized, authentic connection notes that get accepted for any professional scenario.',
        primaryKeyword: 'LinkedIn connection message generator', secondaryKeywords: ['LinkedIn connection request message', 'LinkedIn networking message', 'LinkedIn connection note'],
        category: 'networking', categoryLabel: 'Networking & Engagement',
        features: [
            { title: 'Multiple Message Types', description: 'Templates for cold outreach, mutual connections, event follow-ups, and more.' },
            { title: 'PDF Upload', description: 'Upload sender and recipient PDFs for personalized messages.' },
            { title: 'Character Limit Aware', description: 'All messages stay under LinkedIn\'s 300-character limit.' },
            { title: 'Smart Name Handling', description: 'Extracts first names properly, skipping prefixes like Dr. or Prof.' },
            { title: 'Intent-Driven', description: 'Specify your goal for messages aligned with your networking intent.' },
            { title: 'Three Approaches', description: 'Direct, warm/personal, and value-first message variants.' },
        ],
        faqs: [
            { question: 'Should I add a note to LinkedIn connection requests?', answer: 'Yes. Personalized connection requests are 2-3x more likely to be accepted than blank requests.' },
            { question: 'What should I write in a LinkedIn connection message?', answer: 'Mention why you want to connect specifically, reference something about their profile, and keep it under 300 characters.' },
        ],
        relatedTools: ['linkedin-comment-generator', 'linkedin-headline-generator'],
    },
    {
        id: 'qrcode', slug: 'linkedin-qr-code-generator', name: 'LinkedIn QR Code Generator',
        shortDesc: 'Create instant scannable QR codes for resumes, business cards, and presentation decks.',
        seoTitle: 'LinkedIn QR Code Generator | Free Profile QR Code (2026)',
        metaDescription: 'Generate a free QR code for your LinkedIn profile. Share your profile at events, on business cards, and in presentations with a custom QR code.',
        h1: 'LinkedIn QR Code Generator', heroText: 'Share your LinkedIn profile instantly at events and on business cards. Generate a custom QR code for your profile in seconds.',
        primaryKeyword: 'LinkedIn QR code generator', secondaryKeywords: ['LinkedIn profile QR code', 'LinkedIn QR code free', 'LinkedIn QR code for business card'],
        category: 'networking', categoryLabel: 'Networking & Engagement',
        features: [
            { title: 'Instant Generation', description: 'Enter your LinkedIn URL and get a QR code instantly.' },
            { title: 'Custom Colors', description: 'Customize QR code colors to match your brand.' },
            { title: 'High Resolution', description: 'Download in high resolution for print and digital use.' },
            { title: 'Free Download', description: 'No watermark, no signup required.' },
            { title: 'Multiple Formats', description: 'Download as PNG for various use cases.' },
            { title: 'Mobile Scannable', description: 'Optimized for reliable scanning on all devices.' },
        ],
        faqs: [
            { question: 'How do I create a QR code for my LinkedIn profile?', answer: 'Enter your LinkedIn profile URL in our generator, customize the color if desired, and download the QR code. It works instantly with no signup.' },
            { question: 'Where should I use my LinkedIn QR code?', answer: 'Business cards, conference badges, presentation slides, email signatures, resumes, and portfolio websites.' },
        ],
        relatedTools: ['linkedin-profile-photo-ring', 'linkedin-headline-generator'],
    },
]
