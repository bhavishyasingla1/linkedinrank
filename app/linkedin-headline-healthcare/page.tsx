import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

export const metadata: Metadata = {
    title: 'Best LinkedIn Headlines for Healthcare Professionals | 25+ Examples (2026)',
    description: 'LinkedIn headline examples for doctors, nurses, healthcare administrators, and medical researchers in 2026. Headlines that build credibility. Free scoring with LinkedInRank.',
    keywords: 'linkedin headline healthcare 2026, linkedin headline doctor, best linkedin headline for nurse, healthcare administrator linkedin profile, medical professional linkedin headline, best healthcare linkedin headline',
    alternates: { canonical: 'https://linkedinrank.com/linkedin-headline-healthcare' },
    openGraph: {
        title: 'Best LinkedIn Headlines for Healthcare Professionals | 25+ Examples',
        description: 'Doctor, nurse, and healthcare administrator headline formulas that build credibility.',
        url: 'https://linkedinrank.com/linkedin-headline-healthcare',
    },
}

export default function HeadlineHealthcarePage() {
    return (
        <main className="min-h-screen bg-white">
            <SiteHeader />

            <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#0A66C2] no-underline transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back
                </Link>
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

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                                { label: 'For Educators', href: '/linkedin-headline-teachers' },
                                { label: 'For Consultants', href: '/linkedin-headline-consultants' },
                                { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <FooterLayout />
        </main>
    )
}
