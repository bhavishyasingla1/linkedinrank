export interface ProfessionData {
    slug: string;
    name: string;
    industry: string;
    primaryKeyword: string;
    salaryKeywords: string;
    skills: string[];
    headlineExamples: { before: string; after: string; why: string }[];
}

export const PROFESSIONS: ProfessionData[] = [
    {
        slug: 'data-analyst',
        name: 'Data Analyst',
        industry: 'Tech & Data',
        primaryKeyword: 'linkedin headline for data analyst',
        salaryKeywords: '$70k - $120k',
        skills: ['SQL', 'Python', 'Tableau', 'Data Visualization', 'PowerBI'],
        headlineExamples: [
            { before: 'Data Analyst', after: 'Data Analyst | SQL & Tableau | Helping E-commerce Brands Increase Conversion by 15%', why: 'Adds specific tools and a measurable business outcome.' },
            { before: 'Looking for Data roles', after: 'Junior Data Analyst | Python, SQL, Excel | Turning Raw Data into Actionable Insights', why: 'Replaces desperate "looking for roles" with concrete technical skills.' }
        ]
    },
    {
        slug: 'product-manager',
        name: 'Product Manager',
        industry: 'Tech',
        primaryKeyword: 'linkedin headline for product manager',
        salaryKeywords: '$110k - $180k',
        skills: ['Agile', 'Product Strategy', 'Roadmapping', 'User Research', 'Scrum'],
        headlineExamples: [
            { before: 'Product Manager at Startup', after: 'Senior Product Manager | B2B SaaS | Driving 0→1 Product Development & Growth', why: 'Clarifies the specific stage (0 to 1) and industry type (B2B SaaS).' },
            { before: 'Aspiring PM', after: 'Product Manager | Ex-Software Engineer | Bridging the Gap Between Engineering & Business', why: 'Leverages past experience as a unique selling point instead of saying "aspiring".' }
        ]
    },
    {
        slug: 'graphic-designer',
        name: 'Graphic Designer',
        industry: 'Design & Creative',
        primaryKeyword: 'graphic designer linkedin headline examples',
        salaryKeywords: '$50k - $90k',
        skills: ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Brand Identity', 'Typography'],
        headlineExamples: [
            { before: 'Graphic Designer', after: 'Brand & Graphic Designer | Helping DTC Brands Stand Out with Conversion-Focused Creative', why: 'Focuses on the ROI of design (conversion) rather than just the title.' },
            { before: 'Freelance Designer', after: 'Freelance Graphic Designer | Logos, Branding & Web Design for Early-Stage Startups', why: 'Specifies the target audience (startups) and exact deliverables.' }
        ]
    },
    {
        slug: 'teacher',
        name: 'Teacher',
        industry: 'Education',
        primaryKeyword: 'linkedin headline for teachers',
        salaryKeywords: '$45k - $80k',
        skills: ['Curriculum Design', 'Instructional Design', 'Classroom Management', 'EdTech'],
        headlineExamples: [
            { before: 'High School Teacher', after: 'Educator & Instructional Designer | Creating Engaging Curriculum for 500+ Students', why: 'Translates teaching into corporate-friendly terms like "Instructional Design".' },
            { before: 'Math Teacher at District', after: 'Math Educator | Passionate About STEM Education & EdTech Integration', why: 'Highlights a specific niche (STEM/EdTech) which is highly searchable.' }
        ]
    },
    {
        slug: 'fresher',
        name: 'Fresher / Recent Graduate',
        industry: 'Entry Level',
        primaryKeyword: 'linkedin headline for fresher',
        salaryKeywords: 'Entry Level',
        skills: ['Fast Learner', 'Adaptable', 'Research', 'Analytical Thinking'],
        headlineExamples: [
            { before: 'Recent Graduate', after: 'Marketing Graduate | SEO & Content Intern | Eager to Drive Growth for Tech Startups', why: 'Pairs the degree with specific skills (SEO) and a clear target industry.' },
            { before: 'Seeking Opportunities', after: 'Computer Science Grad | Java & Python Developer | Building Scalable Web Applications', why: 'Replaces the desperate "seeking" with what they can actually build.' }
        ]
    },
    {
        slug: 'sales-manager',
        name: 'Sales Manager',
        industry: 'Sales',
        primaryKeyword: 'linkedin headline for sales manager',
        salaryKeywords: '$90k - $160k+',
        skills: ['B2B Sales', 'CRM', 'Pipeline Management', 'Sales Strategy', 'Negotiation'],
        headlineExamples: [
            { before: 'Sales Manager at Company', after: 'Sales Manager | Scaling B2B Revenue | Coaching High-Performing SDR Teams', why: 'Focuses on the two things that matter: revenue and team leadership.' },
            { before: 'Top Salesman', after: 'Enterprise Sales Manager | $5M+ Quota Attainment | SaaS & Cloud Infrastructure', why: 'Adds concrete numbers and specific industry expertise.' }
        ]
    },
    {
        slug: 'digital-marketer',
        name: 'Digital Marketer',
        industry: 'Marketing',
        primaryKeyword: 'linkedin headline for digital marketer',
        salaryKeywords: '$60k - $110k',
        skills: ['SEO', 'PPC', 'Content Marketing', 'Google Analytics', 'Social Media'],
        headlineExamples: [
            { before: 'Digital Marketer', after: 'Digital Marketing Manager | Scaling E-commerce Brands Past $1M ARR via Paid Social', why: 'Highlights a specific milestone ($1M ARR) and the channel used (Paid Social).' },
            { before: 'Marketing Specialist', after: 'Growth Marketer | SEO & Content Strategy | Increasing Organic Traffic by 200%', why: 'Uses data to prove effectiveness.' }
        ]
    },
    {
        slug: 'software-tester',
        name: 'Software Tester / QA',
        industry: 'Tech',
        primaryKeyword: 'linkedin headline for software tester',
        salaryKeywords: '$65k - $110k',
        skills: ['Manual Testing', 'Automation', 'Selenium', 'JIRA', 'API Testing'],
        headlineExamples: [
            { before: 'QA Engineer', after: 'QA Automation Engineer | Selenium & Cypress | Reducing Bug Leakage by 40%', why: 'Focuses on the business value of QA (reducing bugs).' },
            { before: 'Software Tester', after: 'Senior QA Analyst | Ensuring Flawless Releases for Fintech Mobile Apps', why: 'Specifies the platform (Mobile) and industry (Fintech).' }
        ]
    },
    {
        slug: 'project-manager',
        name: 'Project Manager',
        industry: 'Business Operations',
        primaryKeyword: 'linkedin headline for project manager',
        salaryKeywords: '$80k - $130k',
        skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Communication', 'PMP'],
        headlineExamples: [
            { before: 'Project Manager', after: 'PMP Certified Project Manager | Delivering Enterprise IT Projects On Time & Under Budget', why: 'Front-loads the certification and highlights the ultimate goal of PMs.' },
            { before: 'Managing Projects at XYZ', after: 'Technical Project Manager | Agile & Scrum | Bridging Engineering & Client Needs', why: 'Clarifies the methodology used.' }
        ]
    },
    {
        slug: 'content-writer',
        name: 'Content Writer',
        industry: 'Marketing & Media',
        primaryKeyword: 'linkedin headline for content writer',
        salaryKeywords: '$45k - $85k',
        skills: ['Copywriting', 'SEO Writing', 'B2B Content', 'Storytelling', 'Editing'],
        headlineExamples: [
            { before: 'Content Writer', after: 'B2B SaaS Content Writer | Creating SEO Articles That Rank Page 1 & Drive Leads', why: 'Focuses on the outcome of the writing (ranking and leads) not just the writing itself.' },
            { before: 'Freelance Writer', after: 'Freelance Copywriter | Email Sequences & Landing Pages That Convert at 15%+', why: 'Adds metrics and specific formats.' }
        ]
    }
];

export function getProfessionBySlug(slug: string): ProfessionData | undefined {
    return PROFESSIONS.find(p => p.slug === slug);
}

export function getAllProfessionSlugs(): string[] {
    return PROFESSIONS.map(p => p.slug);
}
