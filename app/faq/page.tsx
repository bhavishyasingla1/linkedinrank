'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'

const FAQ_SECTIONS = [
    {
        title: 'About LinkedInRank',
        faqs: [
            { q: 'What is LinkedInRank?', a: 'LinkedInRank shows you how your LinkedIn profile actually reads to recruiters — with a score out of 100 and specific fixes for each section. It\'s free, private, and takes under a minute. Learn more on our <a href="/about" class="text-[#0A66C2] hover:underline">About page</a>.' },
            { q: 'Is LinkedInRank really free?', a: 'Yes. LinkedInRank is completely free to use. There are no hidden fees, no premium tiers, and no paywalls. You get the full analysis including AI-powered recommendations at zero cost.' },
            { q: 'What does LinkedInRank analyze?', a: 'We evaluate your Headline, About section, Experience descriptions, Skills, Education, and overall profile completeness using 30+ signals. We only score what is visible in your LinkedIn PDF | not engagement, followers, or posting activity. See the full breakdown in our <a href="/methodology" class="text-[#0A66C2] hover:underline">Methodology</a>.' },
            { q: 'Is LinkedInRank affiliated with LinkedIn?', a: 'No. LinkedInRank is an independent tool and is not affiliated with, endorsed by, or connected to LinkedIn Corporation in any way. We analyze publicly available PDF exports. See our <a href="/disclaimer" class="text-[#0A66C2] hover:underline">Disclaimer</a> for details.' },
            { q: 'Who created LinkedInRank?', a: 'LinkedInRank was created by Bhavishya Singla after years of helping friends, family, and colleagues optimize their LinkedIn profiles. Read the full <a href="/story" class="text-[#0A66C2] hover:underline">founding story</a>.' },
            { q: 'How is LinkedInRank different from hiring a career coach?', a: 'LinkedInRank provides instant, structured, repeatable analysis at zero cost. A career coach offers personalized narrative strategy and emotional context. For most people, the best approach is to start with LinkedInRank and then supplement with coaching if needed. See our detailed <a href="/linkedinrank-vs-manual-audits" class="text-[#0A66C2] hover:underline">LinkedInRank vs Manual Audits</a> comparison.' },
            { q: 'How does LinkedInRank compare to other LinkedIn tools?', a: 'Unlike tools that require LinkedIn login or focus on automation, LinkedInRank analyzes your PDF with documented criteria and provides specific, actionable feedback. We have a full <a href="/compare-linkedin-review-tools" class="text-[#0A66C2] hover:underline">comparison of LinkedIn review tools</a>.' },
        ]
    },
    {
        title: 'How It Works',
        faqs: [
            { q: 'How do I use LinkedInRank?', a: 'Export your LinkedIn profile as a PDF (go to your profile → click "More" → "Save to PDF"), then upload that PDF on our homepage. You will receive your full analysis in under one minute. See the <a href="/how-linkedin-rank-works" class="text-[#0A66C2] hover:underline">step-by-step guide</a>.' },
            { q: 'How do I export my LinkedIn PDF?', a: 'Go to your LinkedIn profile page, click the "More" button (three dots) below your profile photo, then select "Save to PDF." The PDF downloads to your computer and can be uploaded to LinkedInRank.' },
            { q: 'How long does the analysis take?', a: 'The full analysis, including AI-powered recommendations, typically completes in under 60 seconds.' },
            { q: 'What is the scoring scale?', a: 'Profiles are scored out of 100 across six categories: Headline (20 pts), About (20 pts), Experience (25 pts), Skills (15 pts), Education & Certifications (10 pts), and Completeness (10 pts). Tiers: Bronze (0-54), Silver (55-69), Gold (70-84), Platinum (85+). Full details in our <a href="/methodology" class="text-[#0A66C2] hover:underline">Methodology</a>.' },
            { q: 'What are the scoring tiers?', a: 'Bronze (0-54) means your profile needs work. Silver (55-69) indicates a solid foundation. Gold (70-84) reflects strong professional presence. Platinum (85-100) is exceptionally well-crafted | very few profiles reach this tier.' },
            { q: 'How does the AI analysis work?', a: 'After rule-based scoring evaluates structure and completeness, Google Gemini AI analyzes content quality, relevance, and positioning. It generates personalized recommendations with before/after examples tailored to your role and career stage.' },
            { q: 'What does the report include?', a: 'Your report includes: a score out of 100 with tier placement, category-by-category breakdown with signal-level feedback, personalized recommendations with before/after examples, an improvement roadmap showing point gains, and <a href="/linkedin-best-practices" class="text-[#0A66C2] hover:underline">LinkedIn best practices</a>.' },
            { q: 'Can I download the report?', a: 'Yes. Click the "Download Report" button on your results page to save your analysis as a PDF using your browser\'s print function.' },
        ]
    },
    {
        title: 'Scoring & Accuracy',
        faqs: [
            { q: 'How accurate is the scoring?', a: 'Scoring is based on transparent, documented criteria. Rule-based analysis handles structure deterministically. AI evaluates content quality and relevance. The system is calibrated so average profiles score 55-70, strong profiles 70-85, and 85+ is rare.' },
            { q: 'What is a good LinkedInRank score?', a: 'A score of 55-69 (Silver) means you have a solid foundation. 70-84 (Gold) indicates strong professional presence. 85+ (Platinum) is exceptional. Most professionals score between 55-75 on their first analysis.' },
            { q: 'Why is my score lower than expected?', a: 'LinkedInRank only scores what appears in your LinkedIn PDF export. Some profile elements like featured posts, recommendations from others, and engagement metrics are not included in PDFs and therefore cannot be scored.' },
            { q: 'Does the score adapt to my career stage?', a: 'Yes. LinkedInRank detects your career stage (student, early-career, mid-career, senior/founder) and adapts expectations accordingly. A student is not judged by the same standards as a senior executive.' },
            { q: 'Are metrics and numbers required for a high score?', a: 'No. Quantified achievements (like "grew revenue by 40%") are a bonus but never a requirement. You can score well with clear descriptions of responsibilities and impact, even without specific numbers.' },
            { q: 'Does LinkedInRank penalize for missing profile photos?', a: 'No. LinkedIn PDFs do not include profile photos, banners, or visual elements. We never score anything that is not present in the PDF export.' },
            { q: 'What signals does LinkedInRank NOT evaluate?', a: 'We do not score: profile photo, banner image, featured section, recommendations from others, endorsement counts, follower count, posting frequency, engagement metrics, or creator mode status. Only PDF-visible data is evaluated.' },
            { q: 'Can my score change if I re-upload?', a: 'Yes. If you update your LinkedIn profile and export a new PDF, your score will reflect the changes. This is a great way to measure improvement.' },
        ]
    },
    {
        title: 'Privacy & Data Security',
        faqs: [
            { q: 'Is my data stored?', a: 'No. Your PDF is processed entirely in server memory and deleted immediately after analysis. We do not store, log, or share any profile data. See our <a href="/data-security" class="text-[#0A66C2] hover:underline">Data Security</a> page for the full technical breakdown.' },
            { q: 'Do you store my LinkedIn PDF?', a: 'No. The PDF is processed in server memory during analysis and is automatically discarded as soon as your results are generated. We have no file storage system. Read our <a href="/privacy" class="text-[#0A66C2] hover:underline">Privacy Policy</a> for details.' },
            { q: 'Do I need to create an account?', a: 'No. LinkedInRank requires no account, no signup, no login, and no email address. Just upload your PDF and get your results.' },
            { q: 'Does LinkedInRank use cookies or tracking?', a: 'No. We do not use cookies, analytics trackers, or any form of user tracking. Your visit is completely private. See our <a href="/cookie-policy" class="text-[#0A66C2] hover:underline">Cookie Policy</a> for full details.' },
            { q: 'How does LinkedInRank protect my data during analysis?', a: 'Your file is uploaded over encrypted HTTPS, processed in server RAM (never written to disk), and automatically garbage-collected after results are generated. Our <a href="/data-security" class="text-[#0A66C2] hover:underline">Data Security</a> page details all five stages of the security pipeline.' },
            { q: 'Do recruiters see my score?', a: 'No. Your score is private and only visible to you in your browser. LinkedInRank has no connection to LinkedIn or any recruiter platform. Your score is never shared with anyone.' },
            { q: 'Can LinkedInRank access my LinkedIn account?', a: 'No. LinkedInRank never accesses your LinkedIn account. We only analyze the PDF file you upload, which is a static document you export yourself.' },
            { q: 'Is it safe to upload my LinkedIn PDF?', a: 'Yes. Your PDF contains only publicly visible profile information (the same data anyone can see on your profile). It is processed in memory and never stored. See our <a href="/terms" class="text-[#0A66C2] hover:underline">Terms of Service</a> and <a href="/disclaimer" class="text-[#0A66C2] hover:underline">Disclaimer</a> for full legal details.' },
        ]
    },
    {
        title: 'Profile Optimization',
        faqs: [
            { q: 'Does LinkedInRank improve my profile automatically?', a: 'No. LinkedInRank provides analysis and recommendations. You implement the changes on your own LinkedIn profile. We provide copy-paste-ready suggestions. Use our <a href="/linkedin-optimization-guide" class="text-[#0A66C2] hover:underline">full optimization guide</a> for a step-by-step process.' },
            { q: 'How do I write a good LinkedIn headline?', a: 'Your headline should include your role, domain, and searchable keywords in under 120 characters. Avoid vague phrases like "Seeking opportunities." Read our dedicated <a href="/linkedin-headline-guide" class="text-[#0A66C2] hover:underline">LinkedIn headline guide</a> for formulas and examples.' },
            { q: 'How do I write a compelling LinkedIn About section?', a: 'Write in first person, lead with your expertise, mention specific skills and tools, and include a call-to-action. Our <a href="/linkedin-about-guide" class="text-[#0A66C2] hover:underline">About section guide</a> has templates and before/after examples.' },
            { q: 'What are the biggest mistakes people make on LinkedIn?', a: 'Common mistakes include vague headlines, missing About sections, job titles without descriptions, and generic skills. We have documented the <a href="/linkedin-mistakes" class="text-[#0A66C2] hover:underline">top 10 LinkedIn mistakes</a> with fixes for each.' },
            { q: 'How do I use the report with AI tools?', a: 'Download your LinkedInRank report and upload it along with your LinkedIn PDF to ChatGPT, Claude, or Gemini. Ask the AI to rewrite your headline, About section, and experience descriptions based on the scoring feedback.' },
            { q: 'What are LinkedIn best practices for 2026?', a: 'Best practices include: keyword-rich headlines, first-person About sections, action-verb experience bullets, and pinned relevant skills. See our full <a href="/linkedin-best-practices" class="text-[#0A66C2] hover:underline">LinkedIn best practices</a> guide and <a href="/linkedin-profile-checklist" class="text-[#0A66C2] hover:underline">profile checklist</a>.' },
            { q: 'How often should I analyze my profile?', a: 'We recommend re-analyzing after making significant profile updates. This helps you track improvement and identify remaining opportunities. Many users analyze quarterly or before a job search.' },
            { q: 'What is the most impactful section to improve?', a: 'Experience (25 points) has the highest weight, followed by Headline and About (20 each). However, the highest-impact fix depends on your current weakest area | which LinkedInRank identifies for you.' },
            { q: 'How do I optimize my LinkedIn profile for recruiters?', a: 'Focus on searchable keywords in your headline, quantified achievements in experience, and a clear About section that signals your expertise. Our <a href="/get-noticed-recruiters" class="text-[#0A66C2] hover:underline">recruiter visibility guide</a> and <a href="/recruiter-psychology" class="text-[#0A66C2] hover:underline">recruiter psychology</a> guide explain exactly what hiring managers look for.' },
            { q: 'What keywords should I use on my LinkedIn profile?', a: 'Use role-specific keywords, tool/technology names, and industry terms that recruiters search for. Our <a href="/linkedin-keywords-guide" class="text-[#0A66C2] hover:underline">LinkedIn keywords guide</a> explains how to research and place keywords effectively.' },
            { q: 'What is a LinkedIn profile score?', a: 'A LinkedIn profile score is a numerical rating (out of 100) that evaluates how well your profile is optimized for recruiter visibility and professional positioning. LinkedInRank scores across 30+ signals including headline clarity, keyword usage, experience descriptions, and skills alignment. Check your score with our <a href="/linkedin-profile-score" class="text-[#0A66C2] hover:underline">free LinkedIn profile score checker</a>.' },
            { q: 'How do I improve my LinkedIn ranking?', a: 'Improving your LinkedIn ranking starts with optimizing your headline with searchable keywords, writing a compelling About section, adding quantified achievements to your experience, and ensuring your skills match your target role. Our <a href="/linkedin-ranking" class="text-[#0A66C2] hover:underline">complete LinkedIn ranking guide</a> breaks down every ranking factor with actionable steps.' },
            { q: 'What LinkedIn headline should a graphic designer use?', a: 'Graphic designers should include their specialty (UI/UX, brand design, freelance), key tools (Figma, Adobe Creative Suite), and a positioning statement. We have <a href="/linkedin-headline-for-graphic-designer" class="text-[#0A66C2] hover:underline">150+ LinkedIn headline examples for graphic designers</a> organized by specialization and career stage.' },
            { q: 'How should students set up their LinkedIn profile?', a: 'Students should focus on a clear headline with their field of study and career interest, a forward-looking About section, and well-described projects, internships, or coursework. Our <a href="/linkedin-profile-for-students" class="text-[#0A66C2] hover:underline">complete LinkedIn profile guide for students</a> walks through every section step by step.' },
        ]
    },
    {
        title: 'For Specific Users',
        faqs: [
            { q: 'Is LinkedInRank good for students?', a: 'Yes. The scoring adapts to student profiles. A student with a clear headline, relevant skills, and well-described internships or projects can score in the Gold tier. Read our <a href="/linkedin-profile-for-students" class="text-[#0A66C2] hover:underline">guide for students</a>.' },
            { q: 'Can job seekers use LinkedInRank?', a: 'Absolutely. Job seekers benefit the most from optimized profiles. LinkedInRank helps ensure your headline contains searchable keywords, your experience shows impact, and your skills align with target roles. See our <a href="/for-jobseekers" class="text-[#0A66C2] hover:underline">job seeker guide</a>.' },
            { q: 'Is it useful for founders and entrepreneurs?', a: 'Yes. Founders need profiles that position them as credible leaders. LinkedInRank evaluates how well your headline, About section, and experience convey your entrepreneurial journey. Read our <a href="/for-founders" class="text-[#0A66C2] hover:underline">founder guide</a>.' },
            { q: 'Can career changers use LinkedInRank?', a: 'Yes. Career changers often have misaligned headlines and skills. LinkedInRank identifies these gaps and provides specific recommendations to position your profile for your target direction.' },
            { q: 'What LinkedIn headline should a software engineer use?', a: 'Software engineers should include their specialty (frontend, backend, full-stack), key technologies, and domain. See our <a href="/linkedin-headline-software-engineers" class="text-[#0A66C2] hover:underline">headline guide for software engineers</a>.' },
            { q: 'How should MBA graduates optimize their LinkedIn?', a: 'MBA grads should lead with their target role, highlight the program, and show relevant experience. Our <a href="/linkedin-headline-mba" class="text-[#0A66C2] hover:underline">MBA headline guide</a> has specific formulas.' },
            { q: 'Does it work for non-English profiles?', a: 'LinkedInRank works best with English-language profiles. The rule-based engine can evaluate structure in any language, but AI-powered content analysis and recommendations are optimized for English.' },
            { q: 'Can I analyze someone else\'s profile?', a: 'You can analyze any LinkedIn PDF that is shared with you. However, the recommendations will be most useful when the profile owner implements them. We recommend individuals analyze their own profiles.' },
        ]
    },
    {
        title: 'Technical & General',
        faqs: [
            { q: 'What file format does LinkedInRank accept?', a: 'Only PDF files exported directly from LinkedIn. Other formats (Word, images, screenshots) are not supported. The file must be under 10MB.' },
            { q: 'Why does my PDF look different from my profile?', a: 'LinkedIn PDF exports only include text content from your profile. They do not include your profile photo, banner, featured section, post activity, or recommendations from others.' },
            { q: 'What browsers are supported?', a: 'LinkedInRank works on all modern browsers including Chrome, Firefox, Safari, and Edge on both desktop and mobile devices.' },
            { q: 'Is there a mobile app?', a: 'LinkedInRank is a web application optimized for all screen sizes. There is no separate mobile app | you can use it directly in your mobile browser at linkedinrank.com.' },
            { q: 'How is LinkedInRank different from other LinkedIn tools?', a: 'LinkedInRank focuses on transparent, signal-based scoring of your actual profile content. See our <a href="/compare-linkedin-review-tools" class="text-[#0A66C2] hover:underline">tool comparison</a> and <a href="/linkedinrank-vs-manual-audits" class="text-[#0A66C2] hover:underline">vs manual audits</a> pages for detailed breakdowns.' },
            { q: 'Will improving my LinkedInRank score help me get more recruiter views?', a: 'Implementing the recommendations | better keywords, clearer descriptions, stronger headlines | will improve how your profile performs in LinkedIn search. Learn what recruiters look for in our <a href="/recruiter-psychology" class="text-[#0A66C2] hover:underline">recruiter psychology</a> guide.' },
            { q: 'How do I build a personal brand on LinkedIn?', a: 'Personal branding starts with a clear headline, authentic About section, and consistent content. Our <a href="/linkedin-personal-branding" class="text-[#0A66C2] hover:underline">personal branding guide</a> and <a href="/linkedin-content-strategy" class="text-[#0A66C2] hover:underline">content strategy guide</a> cover this in depth.' },
            { q: 'What makes the top 1% of LinkedIn profiles different?', a: 'Top profiles have clear positioning, quantified achievements, and complete sections. We analyzed the patterns in our <a href="/top-1-percent-profiles" class="text-[#0A66C2] hover:underline">top 1% profiles</a> guide.' },
            { q: 'Should my LinkedIn profile be different from my resume?', a: 'Yes. LinkedIn profiles should be more conversational, keyword-rich, and narrative-driven than resumes. See our <a href="/linkedin-resume-vs-profile" class="text-[#0A66C2] hover:underline">LinkedIn vs Resume comparison</a>.' },
            { q: 'How can I provide feedback?', a: 'We welcome feedback. Reach out via the <a href="/contact" class="text-[#0A66C2] hover:underline">contact page</a> or connect with the founder on LinkedIn. User feedback directly influences scoring improvements and new features.' },
        ]
    },
]

const FAQS = FAQ_SECTIONS.flatMap(s => s.faqs)

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}

export default function FaqPage() {
    const [openFaq, setOpenFaq] = useState<string | null>(null)

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <SiteHeader />

            {/* Hero */}
            <section className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-14 pb-10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23E5E7EB%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-5">
                        <svg className="w-3.5 h-3.5 text-[#0A66C2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                        <span className="text-xs font-semibold text-[#0A66C2]">Help Centre</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0F1C] leading-tight mb-3">Frequently Asked Questions</h1>
                    <p className="text-[16px] text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                        Everything you need to know about LinkedInRank | how it works, what it scores, and how to use your report.
                    </p>
                </div>
            </section>

            {/* Quick nav */}
            <section className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-[57px] z-40">
                <div className="max-w-3xl mx-auto px-6 py-2.5">
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {FAQ_SECTIONS.map((section, si) => (
                            <button
                                key={si}
                                onClick={() => {
                                    const el = document.getElementById(`faq-section-${si}`)
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}
                                className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-[#4B5563] hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#EFF6FF] transition-all"
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
                {/* Section icons */}
                {(() => {
                    const sectionIcons = [
                        <svg key="i0" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
                        <svg key="i1" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" /></svg>,
                        <svg key="i2" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
                        <svg key="i3" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
                        <svg key="i4" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                        <svg key="i5" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
                        <svg key="i6" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.065A1.008 1.008 0 014.59 17.12l1.29-5.997a1.008 1.008 0 01.318-.556l4.605-3.954a1.008 1.008 0 011.574.282l.044.09 2.065 4.788a1.008 1.008 0 01-.14.948l-2.926 3.399z" /></svg>,
                    ]
                    const sectionColors = ['#0A66C2', '#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#A855F7', '#6366F1']

                    return (
                        <div className="space-y-10">
                            {FAQ_SECTIONS.map((section, si) => {
                                const color = sectionColors[si] || '#0A66C2'
                                return (
                                    <section key={si} id={`faq-section-${si}`} className="scroll-mt-32">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '12', color }}>
                                                {sectionIcons[si]}
                                            </div>
                                            <h2 className="text-base font-bold text-[#0A0F1C]">{section.title}</h2>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '15', color }}>{section.faqs.length} Q&apos;s</span>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                                            {section.faqs.map((item, fi) => {
                                                const key = `${si}-${fi}`
                                                const isOpen = openFaq === key
                                                return (
                                                    <div key={key} className={`${fi > 0 ? 'border-t border-gray-100' : ''}`}>
                                                        <button
                                                            onClick={() => setOpenFaq(isOpen ? null : key)}
                                                            className="w-full flex items-center justify-between px-5 py-4 text-left group"
                                                            aria-expanded={isOpen}
                                                        >
                                                            <div className="flex items-center gap-3 pr-4">
                                                                <span className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: isOpen ? color : '#F3F4F6', color: isOpen ? 'white' : '#6B7280' }}>
                                                                    {fi + 1}
                                                                </span>
                                                                <span className={`text-[15px] font-semibold transition-colors ${isOpen ? 'text-[#0A66C2]' : 'text-[#0A0F1C] group-hover:text-[#0A66C2]'}`}>{item.q}</span>
                                                            </div>
                                                            <svg className={`w-4 h-4 shrink-0 transition-all duration-200 ${isOpen ? 'rotate-180 text-[#0A66C2]' : 'text-[#6B7280]'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                        </button>
                                                        {isOpen && (
                                                            <div className="px-5 pb-5 pl-14">
                                                                <p className="text-sm text-[#4B5563] leading-relaxed animate-fade-in" dangerouslySetInnerHTML={{ __html: item.a }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )
                            })}
                        </div>
                    )
                })()}

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC] border border-[#DBEAFE] rounded-xl p-8 sm:p-10 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A66C2] to-[#4F46E5] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(10,102,194,0.3)]">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                    </div>
                    <h2 className="text-lg font-bold text-[#0A0F1C] mb-4">Still have questions?</h2>
                    <p className="text-sm text-[#4B5563] mb-5 max-w-md mx-auto">Reach out to the founder or try analyzing your profile | it only takes a minute.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/" className="btn-primary inline-block no-underline text-sm">Analyze Your Profile | It&apos;s Free</Link>
                        <Link href="/contact" className="text-sm font-medium text-[#0A66C2] hover:text-[#084E96] no-underline transition-colors">Contact Us →</Link>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Related Guides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'LinkedIn Ranking Guide', href: '/linkedin-ranking' },
                            { label: 'Profile Score Checker', href: '/linkedin-profile-score' },
                            { label: 'Full Optimization Guide', href: '/linkedin-optimization-guide' },
                            { label: 'Headline Guide', href: '/linkedin-headline-guide' },
                            { label: 'About Section Guide', href: '/linkedin-about-guide' },
                            { label: 'Keywords Guide', href: '/linkedin-keywords-guide' },
                            { label: 'Recruiter Psychology', href: '/recruiter-psychology' },
                            { label: 'Top 10 Mistakes', href: '/linkedin-mistakes' },
                            { label: 'Headlines for Designers', href: '/linkedin-headline-for-graphic-designer' },
                            { label: 'Student Profile Guide', href: '/linkedin-profile-for-students' },
                            { label: 'For Job Seekers', href: '/for-jobseekers' },
                            { label: 'For Founders', href: '/for-founders' },
                            { label: 'Profile Checklist', href: '/linkedin-profile-checklist' },
                            { label: 'Personal Branding', href: '/linkedin-personal-branding' },
                            { label: 'Content Strategy', href: '/linkedin-content-strategy' },
                            { label: 'Top 1% Profiles', href: '/top-1-percent-profiles' },
                            { label: 'AI Prompts for LinkedIn', href: '/ai-prompts-linkedin' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="text-xs text-[#0A66C2] bg-[#EFF6FF] px-3 py-1.5 rounded-full no-underline hover:bg-[#DBEAFE] transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <FooterLayout />
        </main>
    )
}
