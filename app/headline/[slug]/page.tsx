import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'
import { getHeadlineData, headlineRoles } from '@/lib/seo/headlinesData'

// Force static generation for all roles
export function generateStaticParams() {
    return headlineRoles.map((role) => ({
        slug: role.slug,
    }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const data = getHeadlineData(params.slug)
    if (!data) return {}

    const year = new Date().getFullYear()
    const totalExamples = data.sections.reduce((acc, curr) => acc + curr.examples.length, 0)
    
    // e.g. "120+ LinkedIn Headlines for Finance Professionals (2026 Examples)"
    const title = `${totalExamples}+ LinkedIn Headlines for ${data.title} (${year} Examples)`
    
    // e.g. "Copy high-performing LinkedIn headlines for Finance. Includes fresher, recruiter-focused, and ATS-friendly examples."
    const description = `Copy high-performing LinkedIn headlines for ${data.roleName}. Includes copy-paste templates, recruiter-focused keywords, and ATS-friendly examples.`

    const url = `https://linkedinrank.com/linkedin-headline-${params.slug}`

    return {
        title,
        description,
        keywords: `linkedin headline ${data.roleName}, ${data.keywords.slice(0, 5).join(', ')}`,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
        },
    }
}

export default function HeadlineProgrammaticPage({ params }: { params: { slug: string } }) {
    const data = getHeadlineData(params.slug)
    
    if (!data) {
        notFound()
    }

    const year = new Date().getFullYear()
    const totalExamples = data.sections.reduce((acc, curr) => acc + curr.examples.length, 0)

    const faqs = [
        { 
            question: `What makes a good LinkedIn headline for ${data.roleName}?`, 
            answer: `A great headline for ${data.roleName} goes beyond just your job title. It should include your primary role, specific skills or niches (like ${data.keywords.slice(0, 3).join(', ')}), and the value or impact you deliver.` 
        },
        { 
            question: 'Should I include keywords in my headline?', 
            answer: `Yes, recruiters search for specific keywords. For ${data.roleName}, you should naturally integrate terms like ${data.keywords.slice(0, 5).join(', ')} into your headline to rank higher in LinkedIn search results.` 
        },
        { 
            question: 'How long should my LinkedIn headline be?', 
            answer: 'LinkedIn allows up to 220 characters. It is best to use most of this space to include your role, specialties, and a strong value proposition, separated by vertical bars (|).' 
        },
        { 
            question: 'How can LinkedInRank help me?', 
            answer: `You can upload your LinkedIn PDF to LinkedInRank for a free headline analysis. It will score your keyword presence and generate AI-tailored headline alternatives specifically for ${data.roleName}.` 
        },
    ]

    const jsonLd = guidePageJsonLd({
        title: `${totalExamples}+ LinkedIn Headlines for ${data.title}`,
        description: `LinkedIn headline examples and templates for ${data.title}.`,
        url: `https://linkedinrank.com/linkedin-headline-${params.slug}`,
        dateModified: new Date().toISOString().split('T')[0],
        breadcrumbs: [
            { name: 'Home', url: 'https://linkedinrank.com' },
            { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
            { name: `For ${data.title}`, url: `https://linkedinrank.com/linkedin-headline-${params.slug}` },
        ],
        faqs,
    })

    // Other roles to link to in the related section
    const otherRoles = headlineRoles.filter(r => r.slug !== params.slug).slice(0, 6)

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/linkedin-headline-guide" className="hover:text-[#0A66C2] transition-colors no-underline">Headline Guide</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#0A0F1C] font-medium">For {data.title}</span>
                </nav>
                
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">
                    {totalExamples}+ LinkedIn Headline Examples for {data.title} ({year})
                </h1>
                <p className="text-[15px] text-[#4B5563] mb-6 leading-relaxed max-w-2xl">
                    {data.description} Here are <strong className="text-[#0A0F1C]">{totalExamples}+ proven examples</strong> and templates you can copy and paste today.
                </p>

                {/* Table of Contents */}
                <div className="bg-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-14">
                    <h2 className="text-sm font-bold text-[#0A0F1C] uppercase tracking-widest mb-4">Table of Contents</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#examples" className="text-[#0A66C2] hover:underline font-medium">1. Copy-Paste Examples by Specialization</a></li>
                        <li><a href="#mistakes" className="text-[#0A66C2] hover:underline font-medium">2. Common Headline Mistakes to Avoid</a></li>
                        <li><a href="#keywords" className="text-[#0A66C2] hover:underline font-medium">3. Top Keywords Recruiters Search For</a></li>
                        <li><a href="#templates" className="text-[#0A66C2] hover:underline font-medium">4. Fill-in-the-Blank Templates</a></li>
                        <li><a href="#faq" className="text-[#0A66C2] hover:underline font-medium">5. Frequently Asked Questions (FAQ)</a></li>
                    </ul>
                </div>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    
                    {/* Examples Section */}
                    <section id="examples" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">{totalExamples}+ Headlines by Specialization</h2>
                        {data.sections.map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.spec}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium leading-relaxed">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Mistakes Section */}
                    <section id="mistakes" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid</h2>
                        <div className="space-y-3">
                            {data.badExamples.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm font-bold">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C] mb-1">&ldquo;{item.bad}&rdquo;</p>
                                        <p className="text-sm text-[#4B5563]">{item.why}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Keywords Section */}
                    <section id="keywords" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Keywords Recruiters Search For</h2>
                        <p className="mb-4 text-sm">To rank higher in LinkedIn search, make sure you include your top skills naturally in your headline:</p>
                        <div className="flex flex-wrap gap-2">
                            {data.keywords.map((tech, i) => (
                                <span key={i} className="text-xs bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-md text-[#0A0F1C] font-medium">{tech}</span>
                            ))}
                        </div>
                    </section>

                    {/* Templates Section */}
                    <section id="templates" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Quick-Copy {data.roleName} Templates</h2>
                        <div className="space-y-3">
                            {data.templates.map((t, i) => (
                                <div key={i} className="bg-gradient-to-r from-[#EFF6FF] to-white border border-[#DBEAFE] rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{t}</div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="scroll-mt-24">
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {faqs.map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                        {item.question}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-6 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives tailored to {data.roleName}.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm font-medium px-6 py-3">Analyze Your Headline | It&apos;s Free</Link>
                    </div>

                    {/* Related Internal Links */}
                    <section>
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4 border-t border-gray-100 pt-8">Explore More Headline Guides</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {otherRoles.map(role => (
                                <Link key={role.slug} href={`/linkedin-headline-${role.slug}`} className="text-sm text-[#0A66C2] hover:underline flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-lg border border-gray-100 hover:border-[#DBEAFE] transition-colors">
                                    → {role.title}
                                </Link>
                            ))}
                        </div>
                    </section>

                    <RelatedPages currentSlug={`linkedin-headline-${params.slug}`} />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
