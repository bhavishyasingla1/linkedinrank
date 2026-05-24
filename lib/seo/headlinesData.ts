export interface HeadlineSection {
    spec: string;
    examples: string[];
}

export interface HeadlineRole {
    slug: string;
    title: string;
    roleName: string;
    description: string;
    keywords: string[];
    sections: HeadlineSection[];
    badExamples: { bad: string; why: string }[];
    templates: string[];
}

export const headlineRoles: HeadlineRole[] = [
    {
        slug: 'finance',
        title: 'Finance & Accounting Professionals',
        roleName: 'Finance',
        description: 'Finance and accounting professionals need headlines that convey trust, precision, and domain expertise. Whether you\'re in corporate finance, investment banking, audit, or FP&A, your headline should signal your specialty clearly.',
        keywords: ['CPA', 'CFA', 'CA', 'FP&A', 'Financial Modeling', 'M&A', 'Audit', 'Tax', 'SOX', 'GAAP', 'IFRS', 'Revenue Recognition', 'Treasury', 'Valuation'],
        sections: [
            {
                spec: 'Corporate Finance & FP&A',
                examples: [
                    'FP&A Manager | Financial Planning & Budgeting | SaaS & Tech',
                    'Senior Financial Analyst | Revenue Forecasting & Business Intelligence | $500M+ Portfolio',
                    'Director of Finance | Strategic Planning & Cash Flow Optimization | Series C Startup',
                ]
            },
            {
                spec: 'Investment Banking & Private Equity',
                examples: [
                    'Investment Banking Analyst | M&A & Capital Markets | TMT Sector',
                    'Associate @ Goldman Sachs | Leveraged Finance & Debt Capital Markets',
                    'VP, Investment Banking | Cross-Border M&A | $10B+ Deal Experience',
                ]
            },
            {
                spec: 'Accounting & Audit',
                examples: [
                    'CPA | Audit Manager @ Deloitte | Financial Services & Insurance',
                    'Tax Manager | International Tax & Transfer Pricing | KPMG Alum',
                    'Controller | Financial Reporting & SOX Compliance | Public Company',
                ]
            }
        ],
        badExamples: [
            { bad: 'Accountant', why: 'Too generic. Specify your type (tax, audit, advisory) and any certifications.' },
            { bad: 'Finance Professional | Numbers Guy', why: '"Numbers guy" undermines credibility. Use professional terms.' },
            { bad: 'CPA, CFA, MBA, CA, ACCA', why: 'A credential dump without context.' },
        ],
        templates: [
            '[Certification] | [Role] | [Industry or Specialization]',
            '[Role] | [Area of Expertise] | [Deal Size or Scale]',
            '[Seniority + Role] | [Sector Coverage] | [Credential]',
        ]
    },
    {
        slug: 'software-engineers',
        title: 'Software Engineers & Developers',
        roleName: 'Software Engineering',
        description: 'Software engineers need headlines that balance technical skills with business impact. Recruiters search for specific languages, frameworks, and levels. Your headline needs to show what you build and the scale you operate at.',
        keywords: ['React', 'Node.js', 'Python', 'AWS', 'System Design', 'Microservices', 'GraphQL', 'TypeScript', 'Kubernetes', 'Backend', 'Frontend', 'Full Stack', 'DevOps'],
        sections: [
            {
                spec: 'Frontend & UI Engineers',
                examples: [
                    'Senior Frontend Engineer | React & TypeScript | Building scalable UIs for Fintech',
                    'UI Engineer @ Meta | Design Systems & Accessibility | Next.js',
                    'Frontend Developer | Vue.js & Tailwind | E-commerce Optimization',
                ]
            },
            {
                spec: 'Backend & Infrastructure',
                examples: [
                    'Backend Software Engineer | Python, Go, AWS | Distributed Systems',
                    'Staff Engineer | Microservices Architecture & High Availability | Node.js',
                    'Data Engineer | Spark, Kafka, Snowflake | Scaling Data Pipelines',
                ]
            },
            {
                spec: 'Full Stack & Generalists',
                examples: [
                    'Full Stack Engineer | MERN Stack | 0 to 1 Product Development',
                    'Software Engineer II | TypeScript & AWS | Reducing latency by 40%',
                    'Lead Engineer | Full Stack | Mentoring teams & driving technical vision',
                ]
            }
        ],
        badExamples: [
            { bad: 'Software Developer', why: 'Too vague. What do you develop? Frontend? Backend?' },
            { bad: 'Code Ninja / Tech Enthusiast', why: 'Recruiters don\'t search for ninjas. They search for specific languages.' },
            { bad: 'Java, Python, C++, JS, HTML, CSS, SQL', why: 'Keyword stuffing looks desperate. Highlight your top 2-3 primary skills.' },
        ],
        templates: [
            '[Role] | [Primary Stack/Language] | [Type of products you build]',
            '[Seniority] Engineer @ [Company] | [Key Frameworks] | [Area of Impact]',
            '[Specialty] Developer | Building [Outcome] using [Technologies]',
        ]
    },
    {
        slug: 'data-scientists',
        title: 'Data Scientists & Analysts',
        roleName: 'Data Science',
        description: 'Data professionals must highlight their ability to turn raw data into actionable business insights. Showcase your technical toolkit alongside the business value you drive.',
        keywords: ['Python', 'SQL', 'Machine Learning', 'AI', 'Tableau', 'Power BI', 'Predictive Modeling', 'A/B Testing', 'Data Visualization', 'NLP', 'Statistics'],
        sections: [
            {
                spec: 'Machine Learning & AI',
                examples: [
                    'Machine Learning Engineer | NLP & Deep Learning | PyTorch',
                    'Senior Data Scientist | Predictive Analytics & Churn Reduction | Python',
                    'AI Researcher | Computer Vision | Publishing top-tier ML papers',
                ]
            },
            {
                spec: 'Data Analytics & BI',
                examples: [
                    'Data Analyst | SQL & Tableau | Driving product decisions with data',
                    'Business Intelligence Lead | Power BI & Snowflake | E-commerce',
                    'Product Analyst | A/B Testing & User Behavior | SaaS',
                ]
            }
        ],
        badExamples: [
            { bad: 'Data Person', why: 'Unprofessional. Use exact titles like Data Analyst or Data Scientist.' },
            { bad: 'Love working with data', why: 'Focus on the tools you use and the outcomes you achieve instead.' },
        ],
        templates: [
            '[Role] | [Top Tools e.g. Python/SQL] | [Business Impact]',
            '[Specialty] | Translating data into [Outcome]',
        ]
    },
    {
        slug: 'hr',
        title: 'Human Resources & Talent Acquisition',
        roleName: 'HR',
        description: 'HR professionals need to project empathy, strategic thinking, and leadership. Showcase your ability to build culture, attract top talent, and optimize employee experience.',
        keywords: ['Talent Acquisition', 'Employee Relations', 'SHRM', 'Diversity & Inclusion', 'HRIS', 'Onboarding', 'Culture', 'Recruiting', 'Compensation & Benefits'],
        sections: [
            {
                spec: 'Talent Acquisition & Recruiting',
                examples: [
                    'Senior Technical Recruiter | Scaling Engineering Teams | Startups',
                    'Talent Acquisition Lead | Diversity Hiring & Employer Branding',
                    'Executive Recruiter | Retained Search for C-Suite | SaaS & Tech',
                ]
            },
            {
                spec: 'HR Business Partners & Generalists',
                examples: [
                    'HR Business Partner (HRBP) | Employee Experience & Culture',
                    'Director of Human Resources | SHRM-SCP | Organizational Development',
                    'People Operations Manager | HRIS & Total Rewards | Scaling Series B',
                ]
            }
        ],
        badExamples: [
            { bad: 'HR Person', why: 'Vague. Are you a recruiter? A generalist? A benefits manager?' },
            { bad: 'Looking for talent', why: 'Focus on the *kind* of talent you find and the companies you build.' },
        ],
        templates: [
            '[Role] | [Specialization] | [Company Stage/Industry]',
            '[Title] | Helping [Target] build [Outcome]',
        ]
    },
    {
        slug: 'marketers',
        title: 'Marketing Professionals',
        roleName: 'Marketing',
        description: 'Marketers must prove they can drive growth. Your headline should be a masterclass in copywriting, highlighting your core channels and the metrics you move.',
        keywords: ['SEO', 'Content Marketing', 'Demand Generation', 'Growth Marketing', 'PPC', 'B2B', 'B2C', 'Social Media', 'Email Marketing', 'Brand Strategy', 'Product Marketing'],
        sections: [
            {
                spec: 'Growth & Demand Generation',
                examples: [
                    'Growth Marketer | Paid Social & CRO | Scaling D2C Brands',
                    'Demand Generation Manager | B2B SaaS | Driving Pipeline & ARR',
                    'Performance Marketing Lead | Google Ads & Meta | $5M+ Ad Spend',
                ]
            },
            {
                spec: 'Content & Product Marketing',
                examples: [
                    'Product Marketing Manager (PMM) | GTM Strategy & Positioning',
                    'Content Marketing Lead | SEO & Organic Growth | B2B Tech',
                    'Brand Director | Brand Strategy & Experiential Marketing',
                ]
            }
        ],
        badExamples: [
            { bad: 'Marketing Guru / Storyteller', why: '"Guru" is a massive red flag for recruiters. "Storyteller" is too abstract without context.' },
            { bad: 'Passionate about marketing', why: 'Show, don\'t tell. Highlight the actual channels you master.' },
        ],
        templates: [
            '[Role] | [Core Channels] | Driving [Specific Metric]',
            '[Title] | B2B/B2C [Industry] | [Specialty]',
        ]
    },
    {
        slug: 'sales',
        title: 'Sales & Account Executives',
        roleName: 'Sales',
        description: 'Sales headlines need to project confidence without arrogance. Highlight your market segment, your track record of quota attainment, and your consultative approach.',
        keywords: ['Enterprise Sales', 'SaaS', 'Account Executive', 'SDR', 'BDR', 'Business Development', 'Quota Attainment', 'B2B', 'Strategic Partnerships', 'Salesforce'],
        sections: [
            {
                spec: 'Account Executives & Closing Roles',
                examples: [
                    'Enterprise Account Executive | B2B SaaS | Cybersecurity',
                    'Senior AE | Mid-Market Sales | Consistent Presidents Club',
                    'Strategic Account Manager | Client Retention & Upselling | Fortune 500',
                ]
            },
            {
                spec: 'Business Development & SDRs',
                examples: [
                    'Business Development Representative (BDR) | Outbound Prospecting',
                    'SDR | Helping Sales Teams Pipeline Generation | Tech',
                    'VP of Sales | Building & Scaling High-Performing Revenue Teams',
                ]
            }
        ],
        badExamples: [
            { bad: 'Sales Hustler / Closer', why: 'Sounds overly aggressive. Modern sales is consultative.' },
            { bad: 'Selling software', why: 'Too generic. Specify your market (Enterprise, Mid-market) and sector.' },
        ],
        templates: [
            '[Role] | [Market Segment e.g., Enterprise/Mid-Market] | [Industry]',
            '[Title] | Helping [Target Audience] achieve [Pain Point Relief]',
        ]
    },
    {
        slug: 'product-managers',
        title: 'Product Managers',
        roleName: 'Product Management',
        description: 'PMs sit at the intersection of business, tech, and UX. Your headline should highlight the types of products you build and the user problems you solve.',
        keywords: ['Product Management', 'Agile', 'Scrum', 'Roadmap', 'UX/UI', '0-to-1', 'B2B SaaS', 'Consumer Tech', 'Product Strategy', 'Growth PM'],
        sections: [
            {
                spec: 'General Product Management',
                examples: [
                    'Senior Product Manager | B2B SaaS | 0-to-1 Product Development',
                    'Director of Product | Platform & API Strategy | Fintech',
                    'Growth PM | A/B Testing & User Retention | Consumer Apps',
                ]
            }
        ],
        badExamples: [
            { bad: 'Idea Person', why: 'PMs are executors, not just idea people.' },
            { bad: 'Product Manager', why: 'Missing context. What industry? B2B or B2C?' },
        ],
        templates: [
            '[Role] | [B2B/B2C/Domain] | Building [Type of Products]',
        ]
    },
    // Adding highly-searched long-tail variants to fulfill programmatic expansion
    {
        slug: 'freshers',
        title: 'College Freshers & Recent Graduates',
        roleName: 'Recent Graduate',
        description: 'Freshers face the "no experience" catch-22. The secret is to highlight your education, technical projects, internships, and the specific role you are targeting.',
        keywords: ['Entry Level', 'Recent Graduate', 'B.Tech', 'MBA Candidate', 'Intern', 'Aspiring', 'Computer Science', 'Seeking Opportunities'],
        sections: [
            {
                spec: 'Tech & Engineering Freshers',
                examples: [
                    'Computer Science Graduate | Aspiring Software Engineer | Java & React',
                    'Data Science Enthusiast | Python & SQL | Recent B.Tech Graduate',
                    'Frontend Developer Intern @ [Company] | Final Year CS Student',
                ]
            },
            {
                spec: 'Business & MBA Freshers',
                examples: [
                    'MBA Candidate @ [University] | Specializing in Marketing & Strategy',
                    'Aspiring Financial Analyst | CFA Level 1 Candidate | Finance Graduate',
                    'Marketing Graduate | Interested in Digital Marketing & SEO',
                ]
            }
        ],
        badExamples: [
            { bad: 'Student at XYZ University', why: 'This defaults on LinkedIn. Change it to show what you DO or WANT to do.' },
            { bad: 'Actively Looking for Jobs', why: 'Desperation doesn\'t sell. Lead with your skills, then add your availability.' },
        ],
        templates: [
            '[Degree/Major] Graduate | Aspiring [Target Role] | [Top 2 Skills]',
            '[Target Role] | [University] Senior | [Recent Project or Internship]',
        ]
    },
    {
        slug: 'founders',
        title: 'Founders & Entrepreneurs',
        roleName: 'Founder',
        description: 'Founders need headlines that attract investors, talent, and customers. Don\'t just say "Founder"—say what your company does and who it helps.',
        keywords: ['Founder', 'CEO', 'Entrepreneur', 'Startup', 'SaaS', 'Venture Backed', 'Building', '0 to 1', 'Bootstrapped'],
        sections: [
            {
                spec: 'SaaS & Tech Founders',
                examples: [
                    'Founder & CEO @ [Company] | Building the future of [Industry]',
                    'Co-Founder | YC W23 | Helping [Audience] solve [Pain Point]',
                    'Building [Company] | B2B SaaS | We are hiring engineers!',
                ]
            }
        ],
        badExamples: [
            { bad: 'Visionary / Serial Entrepreneur', why: 'Sounds arrogant. Let your track record speak for itself.' },
            { bad: 'Founder', why: 'Founder of what? A tech startup or a lemonade stand? Provide context.' },
        ],
        templates: [
            'Founder @ [Company] | Building [Solution] for [Audience]',
            'CEO @ [Company] | [1-Sentence Value Prop]',
        ]
    },
    {
        slug: 'freelancers',
        title: 'Freelancers & Consultants',
        roleName: 'Freelancer',
        description: 'Freelancers must use their headline as a billboard. Treat it as a direct pitch to your ideal client. Focus on the outcome you deliver, not just your job title.',
        keywords: ['Freelance', 'Consultant', 'Contractor', 'Upwork', 'Fractional', 'Services', 'Copywriter', 'Designer', 'Developer'],
        sections: [
            {
                spec: 'Creative & Tech Freelancers',
                examples: [
                    'Freelance Copywriter | I write landing pages that convert at 20%+',
                    'Fractional CMO | Scaling B2B SaaS Brands to $10M ARR',
                    'Freelance Web Developer | Shopify & WordPress | E-commerce Focus',
                ]
            }
        ],
        badExamples: [
            { bad: 'Freelancer', why: 'Too generic. A freelance what?' },
            { bad: 'Jack of all trades', why: 'Clients pay a premium for specialists, not generalists.' },
        ],
        templates: [
            'Freelance [Role] | I help [Client Type] achieve [Specific Result]',
            'Fractional [Role] | [Specialty] | Available for new projects',
        ]
    }
];

export function getHeadlineData(slug: string): HeadlineRole | undefined {
    return headlineRoles.find(r => r.slug === slug);
}
