import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { articlesBySlug, brand, services } from '../data/content.js';
import { audienceRoles, cities, countries } from '../data/audience.js';

export const SITE_URL = import.meta.env.VITE_SITE_URL.replace(/\/+$/, '');
export const PREVIEW_IMAGE = `${SITE_URL}/og/zeal-banner-og.jpg`;
const logoUrl = `${SITE_URL}/icons/zeal-logo.jpg`;
const serviceFaqs = [
  ['How does the service start?', 'We begin with your goals, target roles, and the experience you want to communicate.'],
  ['Can I request revisions?', 'Your work includes a review stage so you can share feedback and refine the materials.'],
  ['Will this guarantee an interview?', 'No. We improve the clarity of your career materials, but hiring decisions are made by employers.'],
];
const homeFaqs = [
  ['What does Zeal Employer Global do?', 'Zeal Employer Global provides resume, LinkedIn, portfolio, cover letter, and interview support for job seekers.'],
  ['Who can use these services?', 'Professionals at different career stages can request support tailored to their target role and goals.'],
  ['How do I get started?', 'Choose a service or send a request through the booking form to discuss your goals.'],
];
const staticPages = {
  '/': { title: 'Zeal Employer Global | Career Support', description: 'Career materials and coaching for your next move. Explore resume, LinkedIn, portfolio, and interview support.' },
  '/home': { title: 'Career Support for Your Next Move | ZEG', description: 'Remote career support worldwide for job seekers in Nigeria, Ghana, and the UK. Explore resume, LinkedIn, and interview services.' },
  '/about': { title: 'About Zeal Employer Global', description: 'Learn how Zeal Employer Global supports job seekers with clear career materials and role-focused guidance.' },
  '/where-we-work': { title: 'Where We Work | Zeal Employer Global', description: 'Remote career support worldwide across Nigeria, Ghana, and the UK. Search countries and cities served by Zeal Employer Global.' },
  '/services-select': { title: 'Choose Career Support | Zeal Employer Global', description: 'Compare career support options and choose what fits your next professional step.' },
  '/blog': { title: 'Career Field Notes | Zeal Employer Global', description: 'Practical guidance on resumes, LinkedIn profiles, portfolios, and interview preparation.' },
  '/book': { title: 'Request Career Support | Zeal Employer Global', description: 'Share your goals and request a conversation about career support.' },
  '/contact': { title: 'Contact Zeal Employer Global', description: 'Contact Zeal Employer Global about career services, a quote, or a question.' },
  '/privacy': { title: 'Privacy | Zeal Employer Global', description: 'Read how Zeal Employer Global uses information submitted through its request forms.' },
  '/tools/ats-checker': { title: 'Resume Readability Check | Zeal Employer Global', description: 'Use a private, in-browser checklist to review resume structure and clarity.' },
};

function resolvePage(pathname, slug) {
  const service = pathname.startsWith('/services/') ? services.find((item) => item.slug === slug) : null;
  if (service) return { title: `${service.title} | Zeal Employer Global`, description: service.detail.slice(0, 155), type: 'service', service };
  if (pathname.startsWith('/blog/') && slug) {
    const article = articlesBySlug[slug];
    if (article) return { title: `${article.title} | ZEG Career Notes`, description: article.excerpt.slice(0, 155), type: 'article', article };
  }
  if (pathname === '/blog' && slug) return { title: 'Page Not Found | Zeal Employer Global', description: 'The requested page could not be found.', noindex: true };
  return staticPages[pathname] || { title: 'Page Not Found | Zeal Employer Global', description: 'The requested page could not be found.', noindex: true };
}

export default function Seo() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const slug = pathname.split('/').pop();
  const page = resolvePage(pathname, slug);
  const canonical = `${SITE_URL}${pathname}`;
  const crumbs = pathname.split('/').filter(Boolean);
  const indexable = !page.noindex && pathname !== '/book';
  const audienceTypes = audienceRoles.join(', ');
  const countryCodes = countries.map(({ code }) => code).join(',');
  const countryNames = countries.map(({ name }) => name).join(', ');
  const cityNames = cities.map(({ name }) => name).join(', ');
  const keywords = [
    'resume writing',
    'LinkedIn optimization',
    'career portfolio',
    'cover letter',
    'interview coaching',
    'ATS resume',
    ...audienceRoles,
    ...countries.slice(0, 20).map(({ name }) => name),
    ...cities.slice(0, 20).map(({ name }) => name),
  ].join(', ');
  const areaServed = [
    ...countries.map(({ name, code }) => ({ '@type': 'Country', name, identifier: code })),
    ...cities.map(({ name }) => ({ '@type': 'City', name })),
  ];
  const questions = page.type === 'service' ? serviceFaqs : pathname === '/home' || pathname === '/' ? homeFaqs : [];
  const graph = [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: brand.name,
      url: SITE_URL,
      logo: logoUrl,
      image: logoUrl,
      description: 'Remote career services including resume writing, LinkedIn profile optimization, portfolio websites, cover letters, and interview coaching.',
      contactPoint: { '@type': 'ContactPoint', email: 'hello@zealemployerglobal.com', contactType: 'customer support', availableLanguage: 'English' },
      areaServed,
      serviceType: services.map((item) => item.title),
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: brand.name, url: SITE_URL, inLanguage: 'en' },
      ...services.map((item) => ({
        '@type': 'Service',
        name: item.title,
        serviceType: item.title,
        description: item.detail,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'Worldwide',
        ...(indexable ? { audience: { '@type': 'Audience', audienceType: audienceTypes } } : {}),
      })),
    ];
    if (page.type === 'article') graph.push({ '@type': 'Article', headline: page.article.title, description: page.article.excerpt, author: { '@type': 'Organization', name: brand.name }, publisher: { '@id': `${SITE_URL}/#organization` }, mainEntityOfPage: canonical });
  if (crumbs.length) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/home` }, ...crumbs.map((name, index) => ({ '@type': 'ListItem', position: index + 2, name: name.replaceAll('-', ' '), item: `${SITE_URL}/${crumbs.slice(0, index + 1).join('/')}` }))] });
  if (questions.length) graph.push({ '@type': 'FAQPage', mainEntity: questions.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) });
  return <Helmet>
    <html lang="en" />
    <title>{page.title}</title>
    <meta name="description" content={page.description} />
    <meta name="robots" content={page.noindex || pathname === '/book' ? 'noindex,follow' : 'index,follow'} />
    <meta name="theme-color" content="#f4f4f2" />
    {!indexable && <meta name="geo.region" content="NG" />}
    {!indexable && <meta httpEquiv="content-language" content="en" />}
    {indexable && <>
      <meta name="audience" content={audienceTypes} />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="global" />
      <meta name="target" content={audienceTypes} />
      <meta name="geo.placename" content="Worldwide" />
      <meta name="geo.region" content={countryCodes} />
      <meta name="countries-served" content={countryNames} />
      <meta name="cities-served" content={cityNames} />
      <meta name="keywords" content={keywords} />
      <meta name="content-language" content="en" />
      <meta name="language" content="English" />
    </>}
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hrefLang="en" href={canonical} />
    <link rel="alternate" hrefLang="x-default" href={canonical} />
    <meta property="og:title" content={page.title} />
    <meta property="og:description" content={page.description} />
    <meta property="og:type" content={page.type === 'article' ? 'article' : 'website'} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content={brand.name} />
    <meta property="og:image" content={PREVIEW_IMAGE} />
    <meta property="og:image:secure_url" content={PREVIEW_IMAGE} />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Zeal Employer Global: career services for CVs, LinkedIn and portfolios" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={PREVIEW_IMAGE} />
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
  </Helmet>;
}

export { homeFaqs, serviceFaqs };
