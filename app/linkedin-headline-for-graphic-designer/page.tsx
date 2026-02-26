import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CopyHeadlineButton from '@/components/CopyHeadlineButton'

export const metadata: Metadata = {
    title: 'LinkedIn Headline for Graphic Designer — 150+ Examples to Copy (2026) | LinkedInRank',
    description: 'Instantly use 150+ proven LinkedIn headlines for graphic designers. Entry-level, freelance, branding, UI/UX — pick, paste, and get noticed. Free headline generator included.',
    keywords: 'linkedin headline for graphic designer, graphic designer linkedin headline examples, headline for graphic designer, linkedin headline graphic designer, best linkedin headline for graphic designer, graphic designer linkedin headline, linkedin headline examples graphic designer',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-for-graphic-designer' },
    openGraph: {
        title: 'LinkedIn Headline for Graphic Designer — 150+ Examples to Copy',
        description: '150+ copy-paste LinkedIn headlines for graphic designers. Entry-level, freelance, branding, UI/UX. Pick and paste now.',
        url: 'https://linkedinrank.com/linkedin-headline-for-graphic-designer',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Headline for Graphic Designer: 150+ Examples',
            description: 'Comprehensive collection of LinkedIn headline examples for graphic designers across all specializations.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-headline-for-graphic-designer',
            datePublished: '2026-02-01',
            dateModified: '2026-02-23',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
                { '@type': 'ListItem', position: 2, name: 'Headline Guide', item: 'https://linkedinrank.com/linkedin-headline-guide' },
                { '@type': 'ListItem', position: 3, name: 'Graphic Designer Headlines', item: 'https://linkedinrank.com/linkedin-headline-for-graphic-designer' },
            ],
        },
        {
            '@type': 'HowTo',
            name: 'How to Write a LinkedIn Headline as a Graphic Designer',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Lead with your specialization', text: 'Start with your specific design discipline — "UI/UX Designer", "Brand Identity Designer", or "Motion Graphics Designer" instead of just "Graphic Designer".' },
                { '@type': 'HowToStep', position: 2, name: 'Add your value proposition', text: 'Include what you help clients or companies achieve — "Building Visual Systems That Scale" or "Turning Complex Ideas Into Clear Visuals".' },
                { '@type': 'HowToStep', position: 3, name: 'Include searchable keywords', text: 'Add 2-3 keywords recruiters search for: tools (Figma, Adobe), styles (Minimalist, Brand Identity), or industries (SaaS, E-commerce).' },
                { '@type': 'HowToStep', position: 4, name: 'Stay under 120 characters', text: 'Only the first 120 characters are visible in search results. Keep your headline concise and front-load the most important information.' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'What is a good LinkedIn headline for a graphic designer?', acceptedAnswer: { '@type': 'Answer', text: 'A good headline includes your specific design specialization, value proposition, and 2-3 searchable keywords. Example: "Brand Identity Designer | Helping Startups Build Visual Systems That Scale | Figma, Illustrator"' } },
                { '@type': 'Question', name: 'Should I use "Graphic Designer" in my LinkedIn headline?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but be more specific. Instead of just "Graphic Designer", use your specialization: "UI/UX Designer", "Brand Designer", "Motion Graphics Designer". Recruiters search for specific terms, and specificity helps you rank higher.' } },
                { '@type': 'Question', name: 'How long should my LinkedIn headline be?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn allows 220 characters, but only the first 120 are visible in search results. Keep your headline under 120 characters to ensure full visibility. Use | separators for readability.' } },
                { '@type': 'Question', name: 'Should I mention tools like Figma or Adobe in my headline?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if space allows. Recruiters often search by tool name. Including Figma, Adobe Creative Suite, or specific tools helps your profile appear in those searches. Place them at the end of your headline.' } },
                { '@type': 'Question', name: 'Can I use AI to write my graphic designer headline?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LinkedInRank\'s free headline generator creates keyword-optimized headlines for designers. Use AI as a starting point, then personalize with your specific achievements and style.' } },
                { '@type': 'Question', name: 'What headline should a freelance graphic designer use?', acceptedAnswer: { '@type': 'Answer', text: 'Freelance designers should lead with their niche and client type. Example: "Freelance Brand Designer for Tech Startups | Logo, Visual Identity & Packaging | Available for Projects"' } },
            ],
        },
    ],
}

const HEADLINE_CATEGORIES = [
    {
        title: 'Entry-Level & Junior Designers',
        icon: '🌱',
        headlines: [
            'Junior Graphic Designer | Brand Identity & Print Design | Adobe Creative Suite',
            'Graphic Design Graduate | Creating Visual Stories for Brands | Figma & Illustrator',
            'Entry-Level Graphic Designer | Social Media & Digital Design | Seeking Opportunities',
            'Aspiring Brand Designer | Visual Communication & Typography | BFA Graphic Design',
            'Junior Designer | Print & Digital Design | Adobe InDesign, Photoshop, Illustrator',
            'Graphic Design Student → Designer | Portfolio-Ready Projects in Branding & Web',
            'Creative Design Graduate | Editorial & Publication Design | Detail-Obsessed',
            'Junior Graphic Designer | Infographics & Data Visualization | Canva & Adobe Suite',
            'Entry-Level Visual Designer | Passionate About Clean, Minimalist Design Systems',
            'Graphic Designer | Fresh Graduate | Packaging & Print Design | Open to Work',
            'Junior Creative Designer | Social Media Graphics & Brand Collateral | Photoshop Pro',
            'Design Graduate | Logo Design & Brand Identity | Building My First 10 Clients',
            'Entry-Level Motion Graphics Designer | After Effects & Premiere Pro | Storytelling',
            'Junior Designer | Typography & Layout | Turning Briefs Into Polished Designs',
            'Graphic Design Intern → Full-Time Designer | Adobe Suite | Looking for My First Role',
            'Creative Design Major | Specializing in Sustainable Packaging Design | Illustrator',
            'Junior Graphic Designer | Event & Conference Design | Print-Ready Layouts',
            'Design School Grad | Book Cover & Editorial Design | Typography-First Approach',
            'Entry-Level Designer | E-commerce & Product Design Assets | Figma & Photoshop',
            'Visual Design Junior | Environmental & Signage Design | Detail-Oriented Creative',
            'Beginner Graphic Designer | Nonprofit & Social Impact Visual Communication',
            'Junior Graphic Designer | Illustration & Icon Design | Building Visual Libraries',
            'Fresh Design Graduate | Corporate Presentation & Document Design | PowerPoint + InDesign',
            'Entry-Level Designer | Apparel & Merchandise Graphics | From Screen to Fabric',
            'Junior Motion Designer | Animated Social Content & GIFs | After Effects',
        ],
    },
    {
        title: 'Freelance Graphic Designers',
        icon: '🚀',
        headlines: [
            'Freelance Graphic Designer | Brand Identity & Logo Design for Startups | Available Now',
            'Independent Brand Designer | Helping Small Businesses Look Big | Logo to Full Identity',
            'Freelance Visual Designer | Social Media, Packaging & Print | 50+ Clients Served',
            'Graphic Designer for Hire | E-commerce Brands | Product Photos to Full Brand Systems',
            'Self-Employed Creative Designer | Pitch Decks, Sales Collateral & Brand Guidelines',
            'Freelance Designer | Specializing in Restaurant & Food Brand Identity | Menu to Logo',
            'Independent Graphic Designer | Transforming Ideas Into Visual Brands | DM for Rates',
            'Freelance Motion + Graphic Designer | Animated Ads & Social Content | Remote Worldwide',
            'Creative Freelancer | Infographic & Data Visualization Design | Complex → Simple',
            'Freelance Packaging Designer | Shelf-Ready Designs for CPG Brands | 100+ SKUs Shipped',
            'Independent Graphic Designer | Nonprofit & Education Sector Specialist | Pro Bono Available',
            'Freelance Designer | Book Covers, Posters & Album Art | Art-Meets-Commerce',
            'Graphic Design Consultant | Brand Audits & Visual System Strategy for Growing Businesses',
            'Freelance UI/Graphic Designer | Landing Pages & Marketing Websites | Figma Expert',
            'Creative Partner for Founders | Logo, Deck, Website — Your Brand Starter Kit | Freelance',
            'Freelance Graphic Designer | Presentation & Report Design | Making Data Beautiful',
            'Independent Designer | Real Estate Marketing Materials | Flyers, Brochures, Signage',
            'Freelance Designer | Event Branding & Conference Collateral | End-to-End Visual Systems',
            'Graphic Design Freelancer | Fashion & Lifestyle Brands | Lookbooks, Catalogs, Social',
            'Self-Employed Designer | Tech Startup Brand Identity | Seed to Series A Visual Partner',
            'Freelance Graphic Designer | Healthcare & Wellness Brands | Calm, Clean, Professional',
            'Independent Visual Creator | YouTube Thumbnails & Channel Branding | 10M+ Views Generated',
            'Freelance Brand Designer | Personal Branding for Coaches & Consultants | Authentic Visuals',
            'Graphic Designer | Open for Freelance | Illustration, Branding & Print | Quick Turnaround',
            'Freelance Creative Director & Designer | Full Brand Builds From Strategy to Execution',
        ],
    },
    {
        title: 'Branding & Identity Designers',
        icon: '🎨',
        headlines: [
            'Brand Identity Designer | Building Visual Systems That Define Companies | Strategy → Execution',
            'Senior Brand Designer | Logo, Typography & Visual Language for Enterprise Brands',
            'Brand Identity Specialist | Transforming Vision Into Visual Systems | Fortune 500 Clients',
            'Creative Brand Designer | Naming, Logo, Guidelines & Digital Extensions | Full Spectrum',
            'Brand Designer | Crafting Memorable Identities for Consumer & Tech Brands | Figma & AI',
            'Visual Brand Strategist + Designer | Positioning Brands Through Design | D2C & SaaS',
            'Brand Identity Lead | 10+ Years Building Visual Systems | Nike, Spotify, Stripe-Level Craft',
            'Senior Branding Designer | Rebrand Specialist | Taking Brands From Dated to Distinctive',
            'Brand Design Manager | Leading Identity Programs Across 30+ Markets | Global Consistency',
            'Brand Identity Designer | Startup Branding | From Napkin Sketch to Brand Book',
            'Principal Brand Designer | Type-Led Identity Systems | Awards: IF, Red Dot, D&AD',
            'Brand Architect | Strategic Design Thinking + Visual Execution | $10M+ Brand Launches',
            'Senior Visual Identity Designer | Healthcare & Pharma Branding | Compliance-Aware',
            'Brand Designer | Luxury & Lifestyle | Crafting Aspirational Visual Experiences',
            'Brand Identity Designer | Fintech & Banking | Building Trust Through Design',
            'Creative Director — Brand | Leading Design Teams at the Intersection of Strategy & Craft',
            'Brand Designer | Mission-Driven Organizations | Making Good Brands Look Great',
            'Identity Designer | Typography, Color Theory & Brand Architecture | Detail-Obsessed',
            'Senior Brand Designer | Sports & Entertainment | Fan-Facing Brand Experiences',
            'Visual Identity Consultant | Helping Founders Define and Design Their Brand Story',
            'Brand Designer | E-commerce & Retail | Packaging-First Identity Systems',
            'Senior Identity Designer | B2B SaaS | Product Branding That Converts',
            'Brand Design Lead | Education & EdTech | Making Learning Look and Feel Better',
            'Senior Brand Designer | Cultural Institutions & Nonprofits | Purpose-Led Visual Identity',
            'Brand Identity Designer | Food & Beverage | From Farm to Shelf Visual Storytelling',
        ],
    },
    {
        title: 'UI/UX & Digital Designers',
        icon: '💻',
        headlines: [
            'UI/UX Designer | Web & Mobile Interfaces | Figma, Prototyping & Design Systems',
            'Digital Product Designer | Turning Complex Workflows Into Intuitive Experiences | SaaS',
            'UX/UI Designer | Mobile-First Design | 95%+ User Satisfaction Scores',
            'UI Designer & Graphic Designer | Landing Pages, Dashboards & Marketing Sites | Figma',
            'Product Designer | Design System Architecture | Scaling Design for 10M+ Users',
            'Digital Designer | Responsive Web Design & Interactive Prototypes | Framer & Figma',
            'Senior UI Designer | Enterprise SaaS | Simplifying Complexity Through Design',
            'UX Designer + Visual Design | User Research → Wireframes → Polished Interfaces',
            'UI/Graphic Designer | E-commerce Conversion Optimization | +40% Cart Completion',
            'Digital Brand & UI Designer | Marketing Websites That Convert | $20M+ Revenue Designed',
            'Product Designer | Healthcare UX | HIPAA-Compliant Design That Patients Love',
            'UI Designer | Fintech Dashboards & Analytics Interfaces | Making Data Approachable',
            'Senior Digital Designer | Design System Lead | Component Libraries & Tokens',
            'UX/UI Designer | Accessibility Champion | WCAG 2.1 AA Compliant Interfaces',
            'Mobile UI Designer | iOS & Android | Human Interface + Material Design Expert',
            'Digital Designer | Interactive Prototyping & Micro-Animations | Framer Motion',
            'UI Designer | EdTech Platforms | Designing for Engagement & Learning Outcomes',
            'Product Designer | Marketplace UX | Two-Sided Platform Design Specialist',
            'Digital Designer | Email Design & Marketing Templates | Litmus, Figma, HTML/CSS',
            'UI/Graphic Designer | Presentation Layer Expert | Design That Tells Business Stories',
            'Senior UX/UI Designer | B2B SaaS | Reducing Churn Through Better Design',
            'Digital Product Designer | AI/ML Interface Design | Conversational UX & Dashboards',
            'UI Designer | Web3 & DeFi | Designing Trust Into Decentralized Interfaces',
            'Digital Designer | Real-Time Collaboration Tools | Multi-User Interface Design',
            'Senior UI Designer | Developer Tools | Designing for Builders',
        ],
    },
    {
        title: 'AI-Era & Emerging Designers',
        icon: '🤖',
        headlines: [
            'AI-Enhanced Graphic Designer | Midjourney + Figma | Human Creativity × Machine Speed',
            'Design + AI Specialist | Prompt Engineering for Visual Content | 10x Production Speed',
            'Graphic Designer | AI-Augmented Workflow | Concept to Delivery in Half the Time',
            'AI-Powered Brand Designer | Using Generative AI as a Creative Partner, Not Replacement',
            'Creative Designer + AI Strategist | Building Workflows That Blend Human Taste With AI Speed',
            'Graphic Designer | AI-First Social Content Creation | Midjourney, DALL-E, Stable Diffusion',
            'Visual Designer | AI Tools Expert | Creating Brand-Consistent Assets at Scale',
            'Designer × AI Builder | Custom GPTs for Design Ops | Automating Repetitive Design Tasks',
            'AI-Native Graphic Designer | From Prompt to Polished | Maintaining Craft in the AI Era',
            'Creative Technologist + Designer | Exploring AI, AR, and the Future of Visual Communication',
            'Graphic Designer | AI Texture & Pattern Generation | Print-Ready AI-Assisted Assets',
            'Senior Designer | AI Integration Lead | Training Design Teams to Use AI Effectively',
            'Generative AI Designer | Creating Unique Visual Assets | Prompt Craft + Design Craft',
            'AI-Forward Designer | Concept Art, Mood Boards & Visual Direction With Generative Tools',
            'Motion + AI Designer | Automated Animation Pipelines | Runway, Pika, After Effects',
            'Graphic Designer | AI-Assisted Packaging Design | From Concept to Shelf-Ready in Days',
            'Design Systems + AI | Building Self-Documenting Component Libraries With AI Assistance',
            'AI-Enhanced Illustrator | Children\'s Books, Editorial & Custom Illustration | Half the Timeline',
            'Creative Designer | AI Ethics in Design | Using Generative Tools Responsibly & Transparently',
            'Visual Designer | AI-Powered A/B Testing | Data-Driven Design Decisions at Scale',
            'Graphic Designer + No-Code Builder | AI + Framer + Figma | Full Landing Page in 48hrs',
            'AI-Augmented Designer | Brand Guidelines to On-Brand Content Generation | Consistent at Scale',
            'Designer | AI Workflow Consultant | Helping Teams Integrate Midjourney & DALL-E Into Production',
            'Creative AI Designer | Generating 100+ Social Assets/Week With AI + Human Curation',
            'Next-Gen Graphic Designer | AR Filters, AI Visuals & Interactive Web Design',
        ],
    },
    {
        title: 'Specialized & Niche Designers',
        icon: '⭐',
        headlines: [
            'Packaging Designer | Shelf Impact Obsessed | CPG, Beauty & Food Brands | 200+ SKUs',
            'Publication Designer | Editorial Layout & Typography | Books, Magazines & Reports',
            'Environmental Graphic Designer | Wayfinding, Signage & Spatial Brand Experiences',
            'Infographic Designer | Making Complex Data Beautiful & Understandable | SaaS & Finance',
            'Presentation Designer | Investor Decks That Close | $500M+ Raised Across Client Decks',
            'Pattern & Textile Designer | Surface Design for Fashion, Home & Licensing | Hand-Drawn → Digital',
            'Lettering Artist + Graphic Designer | Custom Typography for Brands | Analog + Digital',
            'Poster & Campaign Designer | Large-Format Visual Impact | Music, Film & Events',
            'Game UI Designer | HUD, Menus & In-Game Interfaces | Unity & Unreal Engine',
            'Children\'s Book Illustrator & Designer | Whimsical Worlds & Character Design',
            'Resume & Career Document Designer | Professional Templates That Get Interviews',
            'Social Media Graphic Designer | Scroll-Stopping Content | Instagram, LinkedIn, TikTok',
            'Map & Data Visualization Designer | Cartography & Geographic Information Graphics',
            'Automotive Graphic Designer | Vehicle Wraps, Livery & Racing Team Branding',
            'Album Cover & Music Visual Designer | Building Artist Identities Through Design',
            'Newsletter & Email Designer | High-Open-Rate Templates | Substack, Beehiiv, ConvertKit',
            'Icon & Iconography Designer | Consistent Visual Languages at Pixel-Perfect Scale',
            'Exhibit & Museum Designer | Interactive Displays & Educational Visual Communication',
            'Sports Graphic Designer | Team Branding, Jerseys & Game Day Content',
            'Architecture Visualization Designer | 3D Rendering & Presentation Graphics | V-Ray, Blender',
            'Stationery & Wedding Invitation Designer | Luxury Print & Custom Illustration',
            'Corporate Communications Designer | Annual Reports, ESG Reports & Investor Decks',
            'Retail POP Designer | Point of Purchase Displays & Retail Environments',
            'Medical & Scientific Illustration | Anatomical, Pharmaceutical & Clinical Trial Visuals',
            'Accessibility-Focused Designer | Inclusive Design for Universal Communication',
        ],
    },
]

const HEADLINE_FORMULAS = [
    { formula: '[Specialization] | [Value Prop] | [Key Tools]', example: 'Brand Identity Designer | Building Visual Systems for Startups | Figma & Illustrator', score: 92 },
    { formula: '[Role] | [Industry] | [Outcome]', example: 'UI/UX Designer | SaaS & Fintech | Reducing Churn Through Better Design', score: 89 },
    { formula: '[Specialization] for [Client Type] | [Differentiator]', example: 'Freelance Brand Designer for Tech Startups | From Napkin Sketch to Brand Book', score: 87 },
    { formula: '[Result] + [Role] | [Niche]', example: 'Award-Winning Packaging Designer | CPG & Beauty Brands | 200+ SKUs Shipped', score: 91 },
    { formula: '[Action] + [Subject] | [Credibility Signal]', example: 'Crafting Memorable Brand Identities | 10+ Years | Nike, Stripe, Spotify', score: 94 },
]

const MISTAKES = [
    { mistake: 'Using just "Graphic Designer"', fix: 'Too generic. Add your specialization: "Brand Identity Designer", "UI/UX Designer", "Motion Graphics Designer".' },
    { mistake: '"Creative and Passionate Designer"', fix: 'Buzzwords that everyone uses. Replace with specific, searchable terms like your design discipline and tools.' },
    { mistake: '"Looking for Opportunities in Design"', fix: 'Leads with your need, not your value. Lead with what you do, not what you want.' },
    { mistake: 'No tools or keywords mentioned', fix: 'Recruiters search by tool name. Add Figma, Adobe, or your key tools — they are literal search terms.' },
    { mistake: 'Headline over 120 characters', fix: 'Only the first 120 characters show in search. Front-load the most important information.' },
    { mistake: '"Jack of All Trades Designer"', fix: 'Specificity wins. Pick your strongest niche and own it. You can always discuss range in your About section.' },
]

export default function GraphicDesignerHeadlinePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />
            <Script id="jsonld-gd-headline" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] no-underline transition-colors">Home</Link>
                    <span>›</span>
                    <Link href="/linkedin-headline-guide" className="hover:text-[#0A66C2] no-underline transition-colors">Headline Guide</Link>
                    <span>›</span>
                    <span className="text-[#0A0F1C] font-medium">Graphic Designer</span>
                </nav>

                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Headline Examples</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Headline for Graphic Designer: 150+ Examples</h1>

                {/* Intro */}
                <p className="text-[15px] text-[#4B5563] mb-12 leading-relaxed max-w-2xl">
                    Your LinkedIn headline is the single most important line on your profile as a graphic designer. It determines whether recruiters find you in search and whether they click through to your profile. The problem? Most designer headlines are generic — &quot;Graphic Designer | Creative Professional&quot; says nothing specific and gets lost among millions of profiles. This guide provides <strong className="text-[#0A0F1C]">150+ ready-to-use headline examples</strong> organized by specialization, plus proven formulas to craft your own headline that ranks higher and attracts the right opportunities.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    {/* All headline categories */}
                    {HEADLINE_CATEGORIES.map((cat, i) => (
                        <section key={i} aria-labelledby={`cat-${i}`}>
                            <h2 id={`cat-${i}`} className="text-2xl font-bold text-[#0A0F1C] mb-2">{cat.icon} {cat.title}</h2>
                            <p className="text-sm text-[#6B7280] mb-4">{cat.headlines.length} examples</p>
                            <div className="space-y-1.5">
                                {cat.headlines.map((h, j) => (
                                    <div key={j} className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-lg px-3.5 py-2.5 hover:border-[#DBEAFE] transition-colors">
                                        <span className="text-xs text-[#6B7280] font-mono tabular-nums shrink-0 w-5 text-right">{j + 1}.</span>
                                        <p className="flex-1 text-sm text-[#0A0F1C]">{h}</p>
                                        <CopyHeadlineButton text={h} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Headline Formulas */}
                    <section aria-labelledby="formulas">
                        <h2 id="formulas" className="text-2xl font-bold text-[#0A0F1C] mb-6">Headline Formulas for Designers</h2>
                        <div className="space-y-3">
                            {HEADLINE_FORMULAS.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <p className="text-xs font-mono text-[#0A66C2] mb-2">{item.formula}</p>
                                    <p className="text-sm text-[#0A0F1C] font-medium mb-1">{item.example}</p>
                                    <p className="text-xs text-emerald-600">Estimated score: {item.score}/100</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section aria-labelledby="mistakes">
                        <h2 id="mistakes" className="text-2xl font-bold text-[#0A0F1C] mb-6">Headline Mistakes Designers Must Avoid</h2>
                        <div className="space-y-3">
                            {MISTAKES.map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-red-400 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        <div>
                                            <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.mistake}</p>
                                            <p className="text-sm text-[#4B5563]"><span className="text-emerald-600 font-medium">Fix:</span> {item.fix}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tool CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">Generate your perfect designer headline</h2>
                        <p className="text-sm text-[#4B5563] mb-2 max-w-md mx-auto">Use our free AI headline generator to create keyword-optimized headlines tailored to your design specialization.</p>
                        <p className="text-xs text-[#6B7280] mb-5">Free · No login · 6 headline variations · Scored by keyword strength</p>
                        <Link href="/tools/linkedin-headline-generator" className="btn-primary inline-block no-underline text-sm">Generate Headlines Free</Link>
                    </div>

                    {/* FAQs */}
                    <section aria-labelledby="faq">
                        <h2 id="faq" className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'What is a good LinkedIn headline for a graphic designer?', a: 'Include your specialization, value proposition, and 2-3 keywords. Example: "Brand Identity Designer | Helping Startups Build Visual Systems That Scale | Figma, Illustrator"' },
                                { q: 'Should I use "Graphic Designer" in my headline?', a: 'Yes, but be more specific. Use your specialization like "UI/UX Designer" or "Brand Designer". Recruiters search for specific terms.' },
                                { q: 'How long should my headline be?', a: 'Keep it under 120 characters for full visibility in search results. Use | separators for readability.' },
                                { q: 'Should I mention tools in my headline?', a: 'Yes. Recruiters search by tool name. Add Figma, Adobe, or specific tools at the end of your headline.' },
                                { q: 'Can I use AI to write my headline?', a: 'Yes. LinkedInRank\'s free headline generator creates keyword-optimized headlines for designers. Start with AI, then personalize.' },
                                { q: 'What headline should a freelance designer use?', a: 'Lead with your niche and client type. Example: "Freelance Brand Designer for Tech Startups | Logo, Identity & Packaging"' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-white border border-gray-200 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-bold text-[#0A0F1C] list-none">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Internal Links */}
                    <div className="pt-8 border-t border-gray-100 mt-6">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/linkedin-ranking" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Improve Your LinkedIn Ranking</Link>
                            <Link href="/linkedin-profile-score" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Check Your Profile Score</Link>
                            <Link href="/linkedin-headline-designers" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Designer Headlines Guide</Link>
                            <Link href="/tools/linkedin-headline-generator" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Headline Generator Tool</Link>
                            <Link href="/linkedin-headline-guide" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">Complete Headline Guide</Link>
                            <Link href="/tools" className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">All Free Tools</Link>
                        </div>
                    </div>
                </div>
            </article>

            <SiteFooter />
        </main>
    )
}
