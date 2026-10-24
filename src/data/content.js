export const brand = {
  name: 'Zeal Employer Global',
  shortName: 'ZEG',
  tagline: 'Your Zeal. Their Next Hire.',
  intro: 'Your next role starts here',
  location: 'Serving ambitious professionals worldwide',
};

export const services = [
  { slug: 'resume-writing', icon: 'FileText', title: 'Resume / CV Writing', eyebrow: 'ATS-FRIENDLY FORMATTING', copy: 'A clear, role-focused career story written around your real experience.', detail: 'Turn your experience into a focused resume or CV that is readable, tailored to your target roles, and easy to update.', deliverables: ['Role-focused resume or CV', 'ATS-friendly formatting', 'Achievement-led writing', 'Editable delivery files'], audience: 'Job seekers at every career stage' },
  { slug: 'linkedin-optimization', icon: 'ContactRound', title: 'LinkedIn Optimization', eyebrow: 'PROFILE CLARITY', copy: 'A professional profile that makes your expertise easier to understand.', detail: 'Refine your headline, About section, experience, keywords, and profile presentation for the roles you want.', deliverables: ['Headline and About writing', 'Experience and skills editing', 'Keyword alignment', 'Profile presentation guidance'], audience: 'Professionals building a clearer profile' },
  { slug: 'career-portfolio', icon: 'PanelsTopLeft', title: 'Career Portfolio Website', eyebrow: 'SHOW YOUR WORK', copy: 'A focused online home for selected projects and career highlights.', detail: 'Bring your strongest work together in a polished portfolio that helps hiring teams understand your contribution and approach.', deliverables: ['Responsive portfolio website', 'Project story structure', 'Clear contact details', 'Launch and handoff support'], audience: 'Designers, developers, writers, and makers' },
  { slug: 'cover-letters', icon: 'Mail', title: 'Cover Letters', eyebrow: 'ROLE-FOCUSED WRITING', copy: 'A concise introduction connecting your experience to an opportunity.', detail: 'Create a clear, flexible cover letter that links your strengths to the role and organization you are pursuing.', deliverables: ['Targeted cover letter', 'Editable letter structure', 'Role alignment', 'Revision support'], audience: 'Candidates applying with intention' },
  { slug: 'interview-coaching', icon: 'MessagesSquare', title: 'Interview Coaching', eyebrow: 'PRACTICE WITH PURPOSE', copy: 'Structured practice to help you express your experience with confidence.', detail: 'Practice role-focused conversations, strengthen your career stories, and prepare thoughtful questions for an interview.', deliverables: ['One-to-one coaching session', 'Career story framework', 'Role-focused practice prompts', 'Personal action notes'], audience: 'Interviewing at any career level' },
];

export const trustPoints = [
  'Personalised to your target role',
  'ATS-friendly formatting',
  'Human-written, never templated',
  'Clear process from audit to delivery',
  'Confidential by default',
];

export const serviceHighlights = ['RESUME / CV WRITING', 'LINKEDIN OPTIMIZATION', 'CAREER PORTFOLIO', 'COVER LETTERS', 'INTERVIEW COACHING'];

export const processSteps = [
  { number: '01', title: 'Free career audit', copy: 'We learn where you are, what you want next, and what is getting in the way.' },
  { number: '02', title: 'Strategy + keyword research', copy: 'We map your target roles and the evidence, language, and signals they call for.' },
  { number: '03', title: 'Writing + design', copy: 'Your story becomes a focused set of polished, practical career materials.' },
  { number: '04', title: 'Revisions + launch support', copy: 'You review, refine, and leave with files ready for your next application.' },
];

export const careerMaterials = [
  { title: 'A clear career story', category: 'RESUME / CV', detail: 'Experience and strengths organised around a target role.', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85', alt: 'Colorful design work pinned across a studio wall' },
  { title: 'A considered profile', category: 'LINKEDIN', detail: 'A professional profile shaped for clarity and discoverability.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85', alt: 'Data visualization on a computer display' },
  { title: 'Work presented with care', category: 'PORTFOLIO', detail: 'Selected projects with context about your approach and contribution.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85', alt: 'Colleagues collaborating around a table' },
];

export const portfolioShowcase = [
  { title: 'Product design', type: 'DESIGN / SELECTED WORK', color: 'coral', initials: 'PD', description: 'Projects framed around the problem, approach, and contribution.' },
  { title: 'Software development', type: 'ENGINEERING / PROJECTS', color: 'mint', initials: 'SD', description: 'A considered home for selected builds and technical work.' },
  { title: 'Editorial writing', type: 'WRITING / EDITORIAL', color: 'blue', initials: 'EW', description: 'Selected writing presented with context and a clear point of view.' },
  { title: 'Growth marketing', type: 'MARKETING / STRATEGY', color: 'yellow', initials: 'GM', description: 'A focused view of campaigns, decisions, and areas of expertise.' },
];

export const supportOptions = [
  ...services.map(({ slug, title, copy, icon }) => ({ id: slug, title, copy, icon })),
  { id: 'full-career-makeover', title: 'Full Career Makeover', copy: 'All career services together for a connected professional story.', icon: 'Sparkles' },
  { id: 'advice', title: 'Not sure yet, advise me', copy: 'Tell us what you are aiming for and we can recommend a starting point.', icon: 'MessagesSquare' },
];

export const team = [
  { role: 'Career writing', description: 'Clear, human-written application materials.' },
  { role: 'Profile strategy', description: 'A professional presence aligned to your direction.' },
  { role: 'Interview preparation', description: 'Thoughtful practice for conversations that matter.' },
];

export const trustStories = [
  { name: 'Thoughtful writing', title: 'HUMAN-WRITTEN', quote: 'Your materials are shaped around your experience, voice, and the work you want to do.' },
  { name: 'Clear collaboration', title: 'BUILT WITH YOU', quote: 'We begin with your goals, agree on a direction, and refine the work together.' },
  { name: 'Private by default', title: 'YOUR STORY, YOURS', quote: 'Your career details are handled with care and are not shared as marketing material.' },
];

export const faqs = [
  { question: 'What is an ATS?', answer: 'An applicant tracking system (ATS) helps employers organize applications. We use readable layouts and relevant language to make your experience clear to both hiring teams and software.' },
  { question: 'How do we get started?', answer: 'Start with the support selector or book a free consultation. We will discuss your goals and follow up with a personalised quote.' },
  { question: 'Can I request changes?', answer: 'Your project includes a review and refinement stage. We will agree on the feedback process and scope before work begins.' },
  { question: 'Do you write for career changers?', answer: 'Absolutely. We identify transferable strengths, connect them to the target role, and make the transition feel credible without overstating experience.' },
  { question: 'What should I expect from career support?', answer: 'We focus on clear, role-focused materials and a thoughtful process. Hiring decisions remain with employers.' },
  { question: 'How do I receive a quote?', answer: 'Tell us what support you are considering and share your target role, industry, and preferred timeline. We will discuss your needs during a free consultation and send a personalised quote.' },
];

export const articles = [
  { slug: 'resume-impact', category: 'RESUME NOTES', read: 'CAREER GUIDE', title: 'Make every resume bullet earn its place', excerpt: 'A practical way to turn task lists into evidence of the impact you can bring next.', date: 'Career notes' },
  { slug: 'linkedin-search', category: 'PROFILE FIELD GUIDE', read: 'CAREER GUIDE', title: 'Use role language without losing your voice', excerpt: 'Find the balance between discoverability and a profile that sounds human.', date: 'Career notes' },
  { slug: 'interview-stories', category: 'INTERVIEW PRACTICE', read: 'CAREER GUIDE', title: 'Build a story bank before the interview invite', excerpt: 'Prepare flexible examples that make your judgment and approach easy to understand.', date: 'Career notes' },
];

export const articlesBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
