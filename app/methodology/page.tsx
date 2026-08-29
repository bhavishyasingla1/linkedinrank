import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Scoring Methodology & Algorithm (2026)',
    description: 'Deep dive into the LinkedInRank scoring methodology: 6 categories, 30+ signals, AI + rule-based evaluation, career stage adaptation, and transparent fairness.',
    keywords: 'linkedinrank methodology, linkedin profile scoring algorithm, linkedin score calculation, linkedin profile evaluation criteria, linkedin scoring system',
    alternates: { canonical: 'https://linkedinrank.com/methodology' },
    openGraph: {
        title: 'LinkedIn Profile Scoring Methodology & Algorithm (2026)',
        description: 'Transparent scoring: 6 categories, 30+ signals, AI + rule-based evaluation. See exactly how your LinkedIn profile score is calculated.',
        url: 'https://linkedinrank.com/methodology',
    },
}

const CATEGORIES = [
    {
        name: 'Headline',
        weight: 20,
        criteria: [
            'Role clarity — does it immediately state your function and domain?',
            'Keyword density — are industry-standard searchable terms present?',
            'Specificity — does it distinguish you from generic job titles?',
            'Character efficiency — front-loads keywords within the first 120 chars.',
        ],
        high: 'Specific title + domain + top skills (e.g. Senior Backend Engineer | Distributed Systems & Go | FinTech)',
        low: 'Generic title only, "Seeking new opportunities", or vague buzzwords like "Passionate Leader"',
    },
    {
        name: 'About Section',
        weight: 20,
        criteria: [
            'Hook & clarity — does the first sentence engage the reader?',
            'First-person narrative — written authentically ("I lead...") rather than third-person bio.',
            'Competency proof — references specific tools, frameworks, and achievements.',
            'Call to action — includes clear contact direction or networking invitation.',
        ],
        high: '2-4 structured paragraphs detailing background, core strengths, quantifiable outcomes, and focus.',
        low: 'Missing entirely, 1-2 sentence placeholder, or generic third-person corporate copy.',
    },
    {
        name: 'Experience Depth',
        weight: 25,
        criteria: [
            'Role descriptions — every relevant position includes 2-4 structured bullet points.',
            'Action verb initiation — bullets start with strong verbs (Built, Led, Engineered, Scaled).',
            'Quantified impact — outcomes, percentages, or team scopes described where appropriate.',
            'Trajectory — shows logical career progression and expanded responsibility.',
        ],
        high: 'Quantified deliverables and technology stacks clearly detailed for all recent positions.',
        low: 'Job titles listed without descriptions, or brief vague statements without context.',
    },
    {
        name: 'Skills & Keyword Alignment',
        weight: 15,
        criteria: [
            'Search relevance — skills directly match target job description filters.',
            'Technical & functional specificity — specific tools (e.g. Kubernetes, Figma) vs vague terms.',
            'Adequate quantity — enough visible skills for algorithmic recruiter matching.',
        ],
        high: 'Strong combination of domain skills, industry tools, and core methodologies.',
        low: 'Fewer than 3 skills listed or only generic non-searchable soft skills.',
    },
    {
        name: 'Education & Credentials',
        weight: 10,
        criteria: [
            'Complete details — institution, degree, field of study, and graduation period.',
            'Certifications — industry-recognized credentials (AWS, Google, PMP, CFA) noted.',
        ],
        high: 'Complete degree details and relevant ongoing professional certifications.',
        low: 'Incomplete or unverified academic listings.',
    },
    {
        name: 'Completeness & Structure',
        weight: 10,
        criteria: [
            'Comprehensive coverage — all major profile sections filled with substantive content.',
            'Structural flow — logical arrangement of experiences and credentials.',
        ],
        high: 'Zero major blank sections; profile reads as a complete professional dossier.',
        low: 'Multiple major sections omitted or empty.',
    },
]

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <SiteHeader />

            <main id="main-content" className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
                {/* ── Header ───────────────────────────────────── */}
                <div className="space-y-3">
                    <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B] flex items-center gap-1.5">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span>/</span>
                        <span className="text-[#0F172A] font-medium">Methodology</span>
                    </nav>

                    <div className="max-w-2xl pt-2 space-y-2">
                        <Badge variant="brand" size="sm">
                            Open Scoring Rubric &amp; Standards
                        </Badge>
                        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight">
                            Scoring Methodology &amp; Rubric
                        </h1>
                        <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                            How LinkedInRank calculates profile scores: 100 total points, 6 weighted categories, 30+ signals, deterministic rules, and AI qualitative evaluation.
                        </p>
                    </div>
                </div>

                {/* ── Weight Distribution Bar ───────────────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] font-bold text-[#0F172A]">
                            100-Point Category Distribution
                        </h2>
                        <span className="text-[12px] font-semibold text-[#64748B]">
                            6 Weighted Categories
                        </span>
                    </div>

                    <div className="h-4 bg-[#F1F5F9] rounded-lg overflow-hidden flex">
                        <div className="bg-[#0A66C2] h-full" style={{ width: '20%' }} title="Headline (20 pts)" />
                        <div className="bg-[#2563EB] h-full" style={{ width: '20%' }} title="About (20 pts)" />
                        <div className="bg-[#4F46E5] h-full" style={{ width: '25%' }} title="Experience (25 pts)" />
                        <div className="bg-[#7C3AED] h-full" style={{ width: '15%' }} title="Skills (15 pts)" />
                        <div className="bg-[#9333EA] h-full" style={{ width: '10%' }} title="Education (10 pts)" />
                        <div className="bg-[#A855F7] h-full" style={{ width: '10%' }} title="Completeness (10 pts)" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[12px] text-[#475569]">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#0A66C2]" />
                            <span>Headline (20 pts)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]" />
                            <span>About / Summary (20 pts)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#4F46E5]" />
                            <span>Experience Depth (25 pts)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]" />
                            <span>Skills &amp; Keywords (15 pts)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#9333EA]" />
                            <span>Education &amp; Certs (10 pts)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-[#A855F7]" />
                            <span>Completeness (10 pts)</span>
                        </div>
                    </div>
                </div>

                {/* ── Detailed Category Rubrics ─────────────────── */}
                <div className="space-y-6">
                    <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                        Detailed Category Evaluation Rubric
                    </h2>

                    <div className="space-y-4">
                        {CATEGORIES.map((cat, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-4"
                            >
                                <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#F1F5F9]">
                                    <h3 className="text-[16px] font-bold text-[#0F172A]">
                                        {cat.name}
                                    </h3>
                                    <span className="text-[12px] font-bold text-[#0A66C2] bg-[#F0F7FF] border border-[#BAE0FD] px-2.5 py-0.5 rounded">
                                        {cat.weight} Maximum Points
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                                        Evaluated Criteria
                                    </p>
                                    <ul className="space-y-1.5 text-[13px] text-[#334155]">
                                        {cat.criteria.map((c, j) => (
                                            <li key={j} className="flex items-start gap-2">
                                                <span className="text-[#0A66C2] font-bold">•</span>
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[12px]">
                                    <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                                        <span className="font-bold text-[#16A34A] uppercase tracking-wider text-[10px]">
                                            High Score Benchmark
                                        </span>
                                        <p className="text-[#166534] leading-relaxed">
                                            {cat.high}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] space-y-1">
                                        <span className="font-bold text-[#DC2626] uppercase tracking-wider text-[10px]">
                                            Low Score Friction
                                        </span>
                                        <p className="text-[#991B1B] leading-relaxed">
                                            {cat.low}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Career Stage Adaptation Matrix ────────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                            Career Stage Calibration Matrix
                        </h2>
                        <p className="text-[13px] text-[#64748B] mt-0.5">
                            Our engine automatically detects candidate seniority to ensure fair, contextual scoring.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { stage: 'Student & Fresh Graduate', desc: 'Not penalized for shorter work histories. Heavy weighting on coursework, academic projects, leadership, and internships.' },
                            { stage: 'Early-Career Professional (1–5 yrs)', desc: 'Evaluated on role description depth, specific tool proficiencies, and concrete deliverables.' },
                            { stage: 'Mid-Career Operator (5–12 yrs)', desc: 'Evaluated on demonstrated career progression, project ownership, and quantified business impact.' },
                            { stage: 'Senior Executive & Founder', desc: 'Evaluated on executive positioning, leadership scope, organizational scaling, and industry authority.' },
                        ].map((s, i) => (
                            <div key={i} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#E2E8F0] space-y-1">
                                <h3 className="text-[13px] font-bold text-[#0F172A]">{s.stage}</h3>
                                <p className="text-[12px] text-[#475569] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tier Definitions Table ────────────────────── */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                            Scoring Tier Classifications
                        </h2>
                        <p className="text-[13px] text-[#64748B] mt-0.5">
                            Overall score brackets and their corresponding real-world discoverability impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        {[
                            { tier: 'Platinum', range: '85–100 pts', badge: 'Top 5%', desc: 'Exceptionally crafted profile that maximizes search indexation.' },
                            { tier: 'Gold', range: '70–84 pts', badge: 'Top 25%', desc: 'Strong professional presence with solid keyword discoverability.' },
                            { tier: 'Silver', range: '55–69 pts', badge: 'Average', desc: 'Good foundation with noticeable gaps in keywords or bullet depth.' },
                            { tier: 'Bronze', range: '0–54 pts', badge: 'Needs Work', desc: 'Critical sections missing or under-optimized for search.' },
                        ].map((t, i) => (
                            <div key={i} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-1">
                                <span className="text-[11px] font-bold text-[#0A66C2] uppercase">{t.badge}</span>
                                <h3 className="text-[16px] font-bold text-[#0F172A]">{t.tier}</h3>
                                <p className="text-[12px] font-mono text-[#64748B]">{t.range}</p>
                                <p className="text-[11px] text-[#475569] pt-1 leading-snug">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Analyze Profile CTA ───────────────────────── */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-1 max-w-xl">
                        <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                            Ready to test your profile?
                        </span>
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight">
                            Run your profile through our 30-signal rubric
                        </h3>
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                            Upload your LinkedIn export to see exactly how your profile scores across each category.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button
                            href="/#upload"
                            variant="primary"
                            size="md"
                            rightIcon={<ArrowRightIcon size={14} />}
                        >
                            Score Profile Free
                        </Button>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
