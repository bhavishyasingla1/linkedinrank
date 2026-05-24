import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import BeforeAfterTable from '@/components/BeforeAfterTable'
import InlineToolCTA from '@/components/InlineToolCTA'
import DynamicRelatedProfessions from '@/components/DynamicRelatedProfessions'
import { PROFESSIONS, getProfessionBySlug, getAllProfessionSlugs } from '@/lib/professionsData'

export function generateStaticParams() {
    return getAllProfessionSlugs().map(profession => ({ profession }))
}

export async function generateMetadata({ params }: { params: Promise<{ profession: string }> }): Promise<Metadata> {
    const { profession } = await params;
    const profData = getProfessionBySlug(profession);
    if (!profData) return { title: 'Not Found' }

    const canonical = `https://linkedinrank.com/linkedin-headline-for-${profData.slug}`

    return {
        title: `Best LinkedIn Headline for ${profData.name} (2026 Examples & Templates)`,
        description: `Copy-paste LinkedIn headline templates for ${profData.name}. Get more recruiter messages and profile views with these proven headline examples for ${profData.industry}.`,
        keywords: [
            profData.primaryKeyword,
            `linkedin headline for ${profData.name.toLowerCase()}`,
            `best linkedin headline for ${profData.name.toLowerCase()}`,
            `${profData.name.toLowerCase()} linkedin profile`,
            ...profData.skills.map(s => `${s} linkedin headline`),
        ],
        alternates: { canonical },
        openGraph: {
            title: `Best LinkedIn Headline for ${profData.name} (2026 Examples)`,
            description: `Copy-paste LinkedIn headline templates for ${profData.name}. Get more recruiter messages and profile views.`,
            url: canonical,
        },
    }
}

export default async function ProfessionHeadlinePage({ params }: { params: Promise<{ profession: string }> }) {
    const { profession } = await params;
    const profData = getProfessionBySlug(profession);
    if (!profData) notFound();

    // Create custom FAQ schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: `What makes a good LinkedIn headline for a ${profData.name}?`, acceptedAnswer: { '@type': 'Answer', text: `A strong ${profData.name} headline goes beyond just your job title. It should include your primary skills (like ${profData.skills.slice(0, 2).join(', ')}), the specific value or outcome you deliver, and any industry specialization.` } },
            { '@type': 'Question', name: `Should a ${profData.name} put their salary or 'looking for work' in their headline?`, acceptedAnswer: { '@type': 'Answer', text: `No. Instead of saying 'Looking for work', a ${profData.name} should highlight what they can do. Focus on skills that justify your target salary range (which is typically ${profData.salaryKeywords}).` } }
        ]
    };

    const breadcrumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Headline Examples', item: 'https://linkedinrank.com/linkedin-headline-examples' },
            { '@type': 'ListItem', position: 3, name: `For ${profData.name}`, item: `https://linkedinrank.com/linkedin-headline-for-${profData.slug}` }
        ]
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                    <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/linkedin-headline-examples" className="hover:text-[#0A66C2] transition-colors no-underline">Headline Examples</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#0A0F1C] font-medium">For {profData.name}</span>
                </nav>
                
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for {profData.name}s</h1>
                <p className="text-[15px] text-[#4B5563] mb-6 leading-relaxed max-w-2xl">
                    For a <strong className="text-[#0A0F1C]">{profData.name}</strong>, your LinkedIn headline is the single most important factor for getting found by recruiters. If your headline just says "{profData.name} at [Company]", you are blending in with thousands of others. 
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed mt-10">
                    
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Top Keywords to Include</h2>
                        <p className="mb-4">Recruiters use specific keywords when searching for {profData.industry} professionals. Make sure your headline includes 1-2 of these hard skills:</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {profData.skills.map((skill, idx) => (
                                <span key={idx} className="bg-blue-50 text-[#0A66C2] px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-100">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <BeforeAfterTable
                            title={`${profData.name} Headline Makeovers`}
                            examples={profData.headlineExamples}
                        />
                    </section>

                    <InlineToolCTA
                        toolHref="/tools/linkedin-headline-generator"
                        toolName="Free AI Headline Generator"
                        description={`Want a custom headline for your exact role as a ${profData.name}? Our AI analyzes your skills and generates 6 recruiter-ready options instantly.`}
                        variant="gradient"
                        ctaText="Generate My Headline"
                    />

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Winning Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Role / {profData.name}] | [Top Skills e.g., {profData.skills[0]}] | [Value You Deliver]</p>
                            <p className="text-sm text-[#4B5563] text-center">This structure hits the SEO keywords recruiters search for, while proving your business value.</p>
                        </div>
                    </section>

                    <section>
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            <details className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                    What makes a good LinkedIn headline for a {profData.name}?
                                    <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                </summary>
                                <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">A strong {profData.name} headline goes beyond just your job title. It should include your primary skills (like {profData.skills.slice(0, 2).join(', ')}), the specific value or outcome you deliver, and any industry specialization.</p>
                            </details>
                            <details className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                    Should a {profData.name} put their salary or 'looking for work' in their headline?
                                    <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                </summary>
                                <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">No. Instead of saying 'Looking for work', a {profData.name} should highlight what they can do. Focus on skills that justify your target salary range (which is typically {profData.salaryKeywords}).</p>
                            </details>
                        </div>
                    </section>

                </div>
            </article>

            <DynamicRelatedProfessions currentSlug={profData.slug} />

            <FooterLayout />
        </main>
    )
}
