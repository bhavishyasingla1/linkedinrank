import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Photo Guide | What Works & What Doesn\'t (2026)',
    description: 'Complete guide to LinkedIn profile photos in 2026. What to wear, background tips, framing, lighting, and common mistakes. Professional photos increase profile views by 21x. Free profile scoring with LinkedInRank.',
    keywords: 'linkedin profile photo, linkedin headshot, linkedin photo tips 2026, linkedin profile picture, best linkedin photo, linkedin photo size, professional linkedin photo, linkedin photo guidelines, linkedin profile photo tips',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-profile-photo-guide' },
    openGraph: {
        title: 'LinkedIn Profile Photo Guide | What Works & What Doesn\'t',
        description: 'Professional photos increase profile views by 21x. Learn what to wear, framing, lighting, and common mistakes.',
        url: 'https://linkedinrank.com/linkedin-profile-photo-guide',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile Photo Guide | What Works and What Does Not',
            description: 'Choose the right LinkedIn profile photo. What recruiters notice, technical specs, common mistakes, and industry-specific advice.',
            author: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            publisher: { '@type': 'Organization', name: 'LinkedInRank', url: 'https://linkedinrank.com' },
            mainEntityOfPage: 'https://linkedinrank.com/linkedin-profile-photo-guide',
            datePublished: '2025-01-01',
            dateModified: '2026-02-01',
        },
        { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://linkedinrank.com' },
            { '@type': 'ListItem', position: 2, name: 'Profile Photo Guide', item: 'https://linkedinrank.com/linkedin-profile-photo-guide' },
        ] },
        { '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: 'What size should my LinkedIn profile photo be?', acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn recommends 400x400 pixels minimum, up to 7680x4320. The image displays as a circle, so center your face and leave padding around the edges.' } },
            { '@type': 'Question', name: 'Does my LinkedIn photo really matter?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Profiles with photos get 21x more views and 9x more connection requests. A missing photo is the single biggest trust red flag on LinkedIn.' } },
            { '@type': 'Question', name: 'Should I use a professional headshot?', acceptedAnswer: { '@type': 'Answer', text: 'A professional headshot is ideal but not required. A well-lit, clear photo with a simple background works well. What matters most is that you look approachable and professional.' } },
        ] },
    ],
}

export default function LinkedInProfilePhotoGuidePage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <SiteHeader />

            {/* Hero header */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 pt-6 pb-10">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#6B7280] flex items-center gap-1.5 flex-wrap mb-8">
                        <Link href="/" className="hover:text-[#0A66C2] transition-colors no-underline">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#0A0F1C] font-medium">Profile Photo Guide</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#0A66C2] border border-[#DBEAFE]">Guide</span>
                        <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            8 min read
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight tracking-tight mb-5">LinkedIn Profile Photo Guide: What Works and What Does Not</h1>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed max-w-2xl">
                        LinkedIn profiles with professional photos receive <strong className="text-[#0A0F1C]">up to 21x more profile views</strong> and 36x more messages. Your photo is the first visual impression recruiters, clients, and connections see. This guide covers exactly what makes an effective LinkedIn photo | no professional photographer required.
                    </p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 py-10 sm:py-14">

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The 6 Rules of a Strong LinkedIn Photo</h2>
                        <div className="space-y-3">
                            {[
                                { rule: 'Clear face, taking up 60–70% of the frame', desc: 'Head and shoulders only. Your face should be immediately recognizable even at thumbnail size (the 56x56px size shown in feeds and search results).' },
                                { rule: 'Neutral or simple background', desc: 'A plain wall, office environment, or outdoor setting with a blurred background works best. Avoid cluttered, distracting, or overly casual backgrounds.' },
                                { rule: 'Natural, approachable expression', desc: 'A slight smile conveys warmth and approachability. Avoid overly serious, posed, or forced expressions. You want to look like someone people would enjoy working with.' },
                                { rule: 'Good lighting', desc: 'Natural light is best. Face a window for soft, even lighting. Avoid harsh overhead lights, backlit situations, or dark environments. Your face should be well-lit and visible.' },
                                { rule: 'Professional or smart-casual clothing', desc: 'Dress as you would for a typical day at work in your industry. Tech professionals can wear smart-casual. Finance and law professionals should lean more formal.' },
                                { rule: 'Recent photo', desc: 'Your photo should look like you do now. If you have significantly changed your appearance, update it. Recruiters expect to recognize you in a video call or interview.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-4">
                                    <p className="text-sm font-bold text-[#0A0F1C] mb-1">{item.rule}</p>
                                    <p className="text-sm text-[#4B5563]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Common Photo Mistakes</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                'Group photos (even cropped ones look unprofessional)',
                                'Selfies with visible arm or phone',
                                'Sunglasses or hats hiding your face',
                                'Wedding or party photos',
                                'Heavy filters or excessive editing',
                                'Low-resolution or blurry images',
                                'Photos from 5+ years ago',
                                'Full-body shots (your face is too small)',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-xs">✗</span>
                                    <p className="text-xs text-[#4B5563]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">How to Take a Good Photo Without a Photographer</h2>
                        <div className="space-y-2">
                            {[
                                'Stand near a window for natural, even lighting on your face',
                                'Use your phone camera on portrait mode for a blurred background',
                                'Ask a friend to take the photo | avoid selfies',
                                'Use a clean wall or outdoor area as background',
                                'Take 20–30 shots and pick the most natural one',
                                'Edit minimally: brightness, contrast, and crop only',
                                'LinkedIn recommends 400x400 pixels minimum (800x800 is better)',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-md bg-[#0A66C2] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Banner Image Tips</h2>
                        <p className="mb-4">Your banner (background image) is additional real estate to reinforce your professional brand. LinkedIn recommends 1584x396 pixels. Options include:</p>
                        <ul className="space-y-1.5">
                            {[
                                'A clean gradient or abstract design with your tagline or expertise',
                                'Your company or personal website URL',
                                'A relevant industry image (city skyline, workspace, conference)',
                                'A simple text overlay with your value proposition',
                                'Your portfolio showcase or key achievement',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-sm">Free tools like Canva have LinkedIn banner templates. Even a simple branded banner is better than the default blue.</p>
                    </section>

                    {/* FAQ */}
                    <section>
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1">FAQ</p>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {[
                                { q: 'Does not having a photo hurt my profile?', a: 'Yes, significantly. Profiles without photos receive dramatically fewer views and messages. Recruiters often skip faceless profiles entirely. It is one of the easiest fixes with the biggest impact.' },
                                { q: 'Can I use the same photo as my resume?', a: 'If your resume has a professional headshot, yes. LinkedIn photos should be consistent with how you present yourself professionally across all platforms.' },
                                { q: 'Should I use a logo instead of my face?', a: 'No. LinkedIn is a personal professional network. People connect with faces, not logos. Even founders and business owners should use a personal photo on their individual profile.' },
                                { q: 'How often should I update my photo?', a: 'Every 1–2 years, or whenever your appearance changes significantly. Recruiters and networking contacts should be able to recognize you from your photo.' },
                                { q: 'Does LinkedInRank check for a profile photo?', a: 'LinkedInRank evaluates profile completeness signals including whether key sections are present. A missing photo impacts your completeness score.' },
                            ].map((item, i) => (
                                <details key={i} className="group bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="cursor-pointer text-sm font-semibold text-[#0A0F1C] list-none flex items-center justify-between gap-3 p-4 hover:bg-white transition-colors">
                                        {item.q}
                                        <svg className="w-4 h-4 text-[#6B7280] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </summary>
                                    <p className="px-4 pb-4 text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#0A66C2] to-[#084E96] rounded-2xl p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /></svg>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">Check your full profile strength</h2>
                        <p className="text-sm text-blue-100/80 mb-5 max-w-md mx-auto">Your photo is just one signal. LinkedInRank evaluates 30+ signals across your entire profile.</p>
                        <Link href="/" className="inline-block bg-white text-[#0A66C2] px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors no-underline shadow-sm">Get Your Free Score</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[11px] font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'About Section Guide', href: '/linkedin-about-guide' },
                                { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                                { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                                { label: 'Top 1% Profiles', href: '/top-1-percent-profiles' },
                                { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs font-medium text-[#4B5563] bg-[#F8FAFC] border border-gray-200 px-3 py-1.5 rounded-lg no-underline hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
