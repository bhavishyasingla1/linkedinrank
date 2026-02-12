import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
    title: 'LinkedIn Profile Photo Guide — What Works & What Does Not | LinkedInRank',
    description: 'Complete guide to LinkedIn profile photos. What to wear, background tips, framing, lighting, and common mistakes. Professional photos increase profile views by 21x.',
    keywords: 'linkedin profile photo, linkedin headshot, linkedin photo tips, linkedin profile picture, best linkedin photo, linkedin photo size, professional linkedin photo',
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'LinkedIn Profile Photo Guide — What Works and What Does Not',
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
            <SiteHeader navLinks={[{ href: '/linkedin-optimization-guide', label: 'Full Guide' }]} />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Profile Photo Guide</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">LinkedIn Profile Photo Guide: What Works and What Does Not</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    LinkedIn profiles with professional photos receive <strong className="text-[#0A0F1C]">up to 21x more profile views</strong> and 36x more messages. Your photo is the first visual impression recruiters, clients, and connections see. This guide covers exactly what makes an effective LinkedIn photo — no professional photographer required.
                </p>

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
                                'Ask a friend to take the photo — avoid selfies',
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
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {[
                                { q: 'Does not having a photo hurt my profile?', a: 'Yes, significantly. Profiles without photos receive dramatically fewer views and messages. Recruiters often skip faceless profiles entirely. It is one of the easiest fixes with the biggest impact.' },
                                { q: 'Can I use the same photo as my resume?', a: 'If your resume has a professional headshot, yes. LinkedIn photos should be consistent with how you present yourself professionally across all platforms.' },
                                { q: 'Should I use a logo instead of my face?', a: 'No. LinkedIn is a personal professional network. People connect with faces, not logos. Even founders and business owners should use a personal photo on their individual profile.' },
                                { q: 'How often should I update my photo?', a: 'Every 1–2 years, or whenever your appearance changes significantly. Recruiters and networking contacts should be able to recognize you from your photo.' },
                                { q: 'Does LinkedInRank check for a profile photo?', a: 'LinkedInRank evaluates profile completeness signals including whether key sections are present. A missing photo impacts your completeness score.' },
                            ].map((item, i) => (
                                <div key={i} className="border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1C] mb-1">{item.q}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Check your full profile strength</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Your photo is just one signal. LinkedInRank evaluates 30+ signals across your entire profile.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Get Your Free Score</Link>
                    </div>

                    {/* Related Guides */}
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Related Guides</p>
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
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <footer className="border-t border-gray-100 bg-[#F8FAFC] py-8">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4"><Link href="/" className="font-bold text-sm text-[#0A0F1C] no-underline">LinkedIn<span className="text-gradient-brand">Rank</span></Link><a href="https://www.instagram.com/linkedinrank/" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#0A0F1C] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a></div>
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Home</Link>
                        <Link href="/linkedin-optimization-guide" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Optimization Guide</Link>
                        <Link href="/linkedin-personal-branding" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">Personal Branding</Link>
                        <Link href="/faq" className="text-xs text-[#6B7280] hover:text-[#0A0F1C] no-underline transition-colors">FAQ</Link>
                    </nav>
                </div>
            </footer>
        </main>
    )
}
