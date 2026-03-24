import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import RelatedPages from '@/components/RelatedPages'
import { guidePageJsonLd } from '@/lib/jsonLd'

export const metadata: Metadata = {
    title: '25+ LinkedIn Headlines for Healthcare Workers (2026)',
    description: 'Doctors, nurses, and health tech? Copy 25+ LinkedIn headlines that signal clinical expertise.',
    keywords: 'linkedin headline healthcare 2026, linkedin headline doctor, best linkedin headline for nurse, healthcare administrator linkedin profile, medical professional linkedin headline, best healthcare linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-healthcare' },
    openGraph: {
        title: '25+ LinkedIn Headlines for Healthcare Workers (2026)',
        description: 'Doctors, nurses, and health tech? Copy 25+ LinkedIn headlines that signal clinical expertise.',
        url: 'https://linkedinrank.com/linkedin-headline-healthcare',
    },
}

const jsonLd = guidePageJsonLd({
    title: '25+ LinkedIn Headlines for Healthcare Professionals',
    description: 'LinkedIn headline examples for doctors, nurses, healthcare administrators, and medical researchers.',
    url: 'https://linkedinrank.com/linkedin-headline-healthcare',
    dateModified: '2026-03-24',
    breadcrumbs: [
        { name: 'Home', url: 'https://linkedinrank.com' },
        { name: 'Headline Guide', url: 'https://linkedinrank.com/linkedin-headline-guide' },
        { name: 'For Healthcare', url: 'https://linkedinrank.com/linkedin-headline-healthcare' },
    ],
    faqs: [
        { question: 'Should healthcare professionals include credentials in their headline?', answer: 'Absolutely. MD, RN, BSN, MPH, DNP and other credentials are critical trust signals in healthcare. Always include your most relevant certification.' },
        { question: 'Is LinkedIn useful for doctors?', answer: 'Yes. LinkedIn is increasingly used for speaking opportunities, research collaboration, health tech advisory roles, and thought leadership in medicine.' },
        { question: 'How should nurses write their LinkedIn headline?', answer: 'Specify your specialty (ICU, OR, oncology), certifications (CCRN, BSN), and focus area. "ICU Nurse | BSN, CCRN | Critical Care Education" is far better than just "Nurse."' },
        { question: 'Can LinkedInRank analyse healthcare profiles?', answer: 'Yes. Upload your LinkedIn PDF for a free headline analysis and profile score. You will get recommendations tailored to healthcare professional profiles.' },
    ],
})

export default function HeadlineHealthcarePage() {
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
                    <span className="text-[#0A0F1C] font-medium">For Healthcare</span>
                </nav>
                <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Role-Specific Headlines</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-6">Best LinkedIn Headlines for Healthcare Professionals</h1>
                <p className="text-[15px] text-[#4B5563] mb-14 leading-relaxed max-w-2xl">
                    Healthcare professionals increasingly use LinkedIn for career advancement, speaking opportunities, research collaboration, and thought leadership. Your headline should convey your clinical specialty, credentials, and unique focus. Here are <strong className="text-[#0A0F1C]">25+ proven examples</strong>.
                </p>

                <div className="space-y-16 text-[15px] text-[#4B5563] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">The Healthcare Headline Formula</h2>
                        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-6 mb-4">
                            <p className="text-lg font-bold text-[#0A0F1C] mb-4 text-center">[Specialty/Role] | [Credentials] | [Focus Area or Mission]</p>
                            <p className="text-sm text-[#4B5563] text-center">Credentials are critical in healthcare | always include relevant certifications.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">25+ Headlines by Role</h2>
                        {[
                            { spec: 'Physicians & Surgeons', examples: [
                                'Cardiologist | MD, FACC | Preventive Cardiology & Heart Failure Research',
                                'Orthopedic Surgeon | Sports Medicine & Joint Reconstruction | Published Researcher',
                                'Internal Medicine Physician | MD | Digital Health Advocate & Medical Educator',
                                'Pediatrician | Developmental & Behavioral Health | Championing Early Intervention',
                                'Emergency Medicine Physician | MD, MPH | Healthcare Policy & Patient Safety',
                            ]},
                            { spec: 'Nurses & Advanced Practice', examples: [
                                'Nurse Practitioner | Family Medicine | DNP | Improving Access to Primary Care',
                                'ICU Nurse | BSN, CCRN | Critical Care Education & Evidence-Based Practice',
                                'Clinical Nurse Specialist | Oncology | MSN | Patient Advocacy & Research',
                                'Travel Nurse | OR & Perioperative | BSN | Sharing Insights on Nursing Careers',
                            ]},
                            { spec: 'Healthcare Administration', examples: [
                                'Hospital Administrator | MHA | Operations, Quality & Patient Experience',
                                'VP of Clinical Operations | Scaling Healthcare Delivery | Multi-Site Management',
                                'Healthcare COO | Revenue Cycle & Operational Excellence | $200M+ System',
                                'Practice Manager | Growing Multi-Physician Practices | Patient Satisfaction Focus',
                                'Director of Nursing | Workforce Development & Retention | Magnet Journey',
                            ]},
                            { spec: 'Public Health & Research', examples: [
                                'Epidemiologist | MPH, Ph.D. | Infectious Disease Surveillance & Global Health',
                                'Public Health Researcher | Social Determinants of Health | WHO Consultant',
                                'Clinical Research Coordinator | Oncology Trials | GCP Certified',
                                'Biostatistician | Clinical Trial Design & Analysis | Ph.D. | Pharma & Biotech',
                            ]},
                            { spec: 'HealthTech & Digital Health', examples: [
                                'Digital Health Product Manager | EHR & Telehealth | Clinician-Turned-Technologist',
                                'HealthTech Founder | AI-Powered Diagnostics | MD & Computer Science',
                                'Clinical Informaticist | Health Data & Interoperability | HL7 & FHIR',
                                'Medical Affairs Director | Pharma & Biotech | Bridging Science & Strategy',
                            ]},
                        ].map((section, i) => (
                            <div key={i} className="mb-10">
                                <h3 className="text-lg font-bold text-[#0A0F1C] mb-4">{section.spec}</h3>
                                <div className="space-y-2">
                                    {section.examples.map((ex, j) => (
                                        <div key={j} className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 text-sm text-[#0A0F1C] font-medium">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#0A0F1C] mb-6">Headlines to Avoid</h2>
                        <div className="space-y-2">
                            {[
                                { bad: 'Doctor', why: 'Far too generic. Specify your specialty, credentials, and what makes you unique.' },
                                { bad: 'Nurse | Compassionate Caregiver', why: 'Compassion is expected. Highlight your specialty, certifications, and clinical focus.' },
                                { bad: 'Healthcare Professional', why: 'This could mean anything. Are you a surgeon, nurse, administrator, or researcher?' },
                                { bad: 'MD | MBA | MPH | FACP | Board Certified', why: 'Credential overload without context. What do you actually do and focus on?' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                                    <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#0A0F1C]">&ldquo;{item.bad}&rdquo;</p>
                                        <p className="text-xs text-[#4B5563]">{item.why}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Get your headline scored</h2>
                        <p className="text-sm text-[#4B5563] mb-4 max-w-md mx-auto">Upload your LinkedIn PDF for a free headline analysis plus 3 AI-generated alternatives.</p>
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Headline | It's Free</Link>
                    </div>

                    <RelatedPages currentSlug="linkedin-headline-healthcare" />
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
