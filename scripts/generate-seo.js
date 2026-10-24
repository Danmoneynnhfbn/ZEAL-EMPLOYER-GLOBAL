import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, brand, services } from '../src/data/content.js';
import { audienceRoles, cities, countries } from '../src/data/audience.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envText = fs.existsSync(path.join(root, '.env')) ? fs.readFileSync(path.join(root, '.env'), 'utf8') : '';
const envLine = envText.match(/^VITE_SITE_URL\s*=\s*(.*)\s*$/m)?.[1]?.trim();
const siteUrl = (process.env.VITE_SITE_URL || envLine || '').replace(/^['"]|['"]$/g, '').replace(/\/+$/, '');
if (!siteUrl) throw new Error('VITE_SITE_URL is required to generate canonical and social metadata.');
const parsedSiteUrl = new URL(siteUrl);
if (parsedSiteUrl.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(parsedSiteUrl.hostname)) {
  throw new Error('VITE_SITE_URL must be a public HTTPS URL, never localhost.');
}

const faqHome = [
  ['What does Zeal Employer Global do?', 'Zeal Employer Global provides resume, LinkedIn, portfolio, cover letter, and interview support for job seekers.'],
  ['Who can use these services?', 'Professionals at different career stages can request support tailored to their target role and goals.'],
  ['How do I get started?', 'Choose a service or send a request through the booking form to discuss your goals.'],
];
const faqService = [
  ['How does the service start?', 'We begin with your goals, target roles, and the experience you want to communicate.'],
  ['Can I request revisions?', 'Your work includes a review stage so you can share feedback and refine the materials.'],
  ['Will this guarantee an interview?', 'No. We improve the clarity of your career materials, but hiring decisions are made by employers.'],
];
const staticRoutes = [
  { path: '/', title: `${brand.name} | Career support`, description: 'Career materials and coaching for your next move. Explore resume, LinkedIn, portfolio, and interview support.', h1: 'Your next role starts here.' },
  { path: '/home', title: 'Career support for your next move | ZEG', description: 'Remote career support worldwide for job seekers in Nigeria, Ghana, and the UK. Explore resume, LinkedIn, and interview services.', h1: 'Get seen. Get interviewed. Get hired.', faq: faqHome },
  { path: '/about', title: 'About Zeal Employer Global', description: 'Learn how Zeal Employer Global supports job seekers with clear career materials and role-focused guidance.', h1: 'Career support built around your next step.' },
  { path: '/where-we-work', title: 'Where we work | Zeal Employer Global', description: 'Remote career support worldwide across Nigeria, Ghana, and the UK. Search countries and cities served by Zeal Employer Global.', h1: 'Career support, wherever you are.' },
  { path: '/services-select', title: 'Choose career support | Zeal Employer Global', description: 'Compare career support options and choose what fits your next professional step.', h1: 'Choose Your Support' },
  { path: '/blog', title: 'Career field notes | Zeal Employer Global', description: 'Practical guidance on resumes, LinkedIn profiles, portfolios, and interview preparation.', h1: 'Useful ideas for the work ahead.' },
  { path: '/book', title: 'Request career support | Zeal Employer Global', description: 'Share your goals and request a conversation about career support.', h1: 'Start with what’s next.', noindex: true },
  { path: '/contact', title: 'Contact Zeal Employer Global', description: 'Contact Zeal Employer Global about career services, a quote, or a question.', h1: 'Let’s talk about what’s next.' },
  { path: '/privacy', title: 'Privacy | Zeal Employer Global', description: 'Read how Zeal Employer Global uses information submitted through its request forms.', h1: 'Your details stay yours.' },
  { path: '/tools/ats-checker', title: 'Resume readability check | Zeal Employer Global', description: 'Use a private, in-browser checklist to review resume structure and clarity.', h1: 'Give your resume a readability check.' },
];
const routeData = [
  ...staticRoutes,
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    title: `${service.title} | Zeal Employer Global`,
    description: service.detail,
    h1: service.title,
    service,
    faq: faqService,
  })),
  ...articles.map((article) => ({
    path: `/blog/${article.slug}`,
    title: `${article.title} | ZEG Career Notes`,
    description: article.excerpt,
    h1: article.title,
    article,
  })),
];
const truncate = (value, limit) => value.length <= limit ? value : `${value.slice(0, limit - 1).trimEnd()}…`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const absolute = (route) => `${siteUrl}${route}`;
const imageUrl = `${siteUrl}/og/zeal-banner-og.jpg`;
const logoUrl = `${siteUrl}/icons/zeal-logo.jpg`;
const areaServed = [
  ...countries.map(({ name, code }) => ({ '@type': 'Country', name, identifier: code })),
  ...cities.map(({ name }) => ({ '@type': 'City', name })),
];
const audienceTypes = audienceRoles.join(', ');
const audienceKeywords = [
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
const audienceMeta = [
  ['audience', audienceTypes],
  ['coverage', 'Worldwide'],
  ['distribution', 'global'],
  ['target', audienceTypes],
  ['geo.placename', 'Worldwide'],
  ['geo.region', countries.map(({ code }) => code).join(',')],
  ['countries-served', countries.map(({ name }) => name).join(', ')],
  ['cities-served', cities.map(({ name }) => name).join(', ')],
  ['keywords', audienceKeywords],
  ['content-language', 'en'],
  ['language', 'English'],
];
const origin = { '@type': ['Organization', 'ProfessionalService'], '@id': `${siteUrl}/#organization`, name: brand.name, url: siteUrl, logo: logoUrl, image: logoUrl, description: 'Remote career services including resume writing, LinkedIn profile optimization, portfolio websites, cover letters, and interview coaching.', contactPoint: { '@type': 'ContactPoint', email: 'hello@zealemployerglobal.com', contactType: 'customer support', availableLanguage: 'English' }, areaServed, serviceType: services.map(({ title }) => title) };
const serviceSchemas = (includeAudience) => services.map((service) => ({ '@type': 'Service', name: service.title, serviceType: service.title, description: service.detail, provider: { '@id': `${siteUrl}/#organization` }, areaServed: 'Worldwide', ...(includeAudience ? { audience: { '@type': 'Audience', audienceType: audienceTypes } } : {}) }));
const webSite = { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: brand.name, url: siteUrl, inLanguage: 'en' };

const makeStructuredData = (route) => {
  const graph = [origin, webSite, ...serviceSchemas(!route.noindex)];
  const parts = route.path.split('/').filter(Boolean);
  if (parts.length) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/home` }, ...parts.map((part, index) => ({ '@type': 'ListItem', position: index + 2, name: part.replaceAll('-', ' '), item: `${siteUrl}/${parts.slice(0, index + 1).join('/')}` }))] });
  if (route.article) graph.push({ '@type': 'Article', headline: route.article.title, description: route.article.excerpt, author: { '@type': 'Organization', name: brand.name }, publisher: { '@id': `${siteUrl}/#organization` }, mainEntityOfPage: absolute(route.path) });
  if (route.faq) graph.push({ '@type': 'FAQPage', mainEntity: route.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
};

const baseHtml = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8');
const makePage = (route) => {
  const title = truncate(route.title, 59);
  const description = truncate(route.description, 159);
  const canonical = absolute(route.path);
  const robots = route.noindex ? 'noindex,follow' : 'index,follow';
  const roleSummary = route.path === '/where-we-work' ? `<p>We support ${escapeHtml(audienceTypes)}.</p>` : '';
  const content = `<div class="seo-fallback"><header class="seo-fallback__header"><a href="/home">ZEAL EMPLOYER GLOBAL / ZEG</a><nav class="seo-fallback__nav" aria-label="Main navigation"><a href="/services-select">Services</a><a href="/about">About</a><a href="/where-we-work">Where we work</a><a href="/blog">Career notes</a><a href="/contact">Contact</a></nav><span class="seo-fallback__status"><i></i> Loading your experience</span></header><main class="seo-fallback__main"><p class="seo-fallback__eyebrow">CAREER SUPPORT / WORLDWIDE</p><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(description)}</p>${roleSummary}${route.path === '/contact' ? '<p><a href="mailto:hello@zealemployerglobal.com">Email us directly</a></p>' : ''}${route.service ? `<section><h2>How this service works</h2><p>${escapeHtml(route.service.detail)}</p><h2>What you receive</h2><ul>${route.service.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>` : ''}${route.article ? `<article><p>${escapeHtml(route.article.excerpt)}</p><p>Last updated October 24, 2026 · By ${escapeHtml(brand.name)}</p><h2>Start with clear, accurate details</h2><p>Describe your experience in language that is useful for the role while keeping each detail grounded in your own work.</p></article>` : ''}${route.faq ? `<section><h2>Answers to common questions</h2>${route.faq.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join('')}</section>` : ''}<p><a href="/services-select">Explore career support</a> · <a href="/contact">Contact ZEG</a></p></main><footer class="seo-fallback__footer"><a href="/privacy">Privacy</a><span>Career services / Worldwide</span></footer></div>`;
  const headTags = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="${robots}">`,
    '<meta name="theme-color" content="#f4f4f2">',
    ...(route.noindex
      ? ['<meta name="geo.region" content="NG">', '<meta http-equiv="content-language" content="en">']
      : audienceMeta.map(([name, content]) => `<meta name="${name}" content="${escapeHtml(content)}">`)),
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="alternate" hreflang="en" href="${canonical}">`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="${route.article ? 'article' : 'website'}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:site_name" content="${escapeHtml(brand.name)}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    `<meta property="og:image:secure_url" content="${imageUrl}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Zeal Employer Global: career services for CVs, LinkedIn and portfolios">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${imageUrl}">`,
    `<script type="application/ld+json">${makeStructuredData(route)}</script>`,
  ].join('\n    ');
  return baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${content}</div>`)
    .replace('</head>', `    ${headTags}\n  </head>`);
};

const distDir = path.join(root, 'dist');
for (const route of routeData) {
  const folder = route.path === '/' ? distDir : path.join(distDir, ...route.path.slice(1).split('/'));
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), makePage(route));
}
const notFoundHtml = makePage({ path: '/not-found', title: 'Page not found | Zeal Employer Global', description: 'The requested page could not be found. Return to Zeal Employer Global to explore career support.', h1: 'This page took a different route.', noindex: true });
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeData.filter(({ noindex }) => !noindex).map((route) => `  <url><loc>${absolute(route.path)}</loc><lastmod>${today}</lastmod><changefreq>${route.article ? 'monthly' : 'weekly'}</changefreq><priority>${route.path === '/home' ? '1.0' : route.path.startsWith('/services/') ? '0.8' : '0.6'}</priority></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);
const robots = `# The owner may change AI crawler access below.\nUser-agent: *\nAllow: /\nDisallow: /book\nDisallow: /private\nDisallow: /PRIVATE_NOTES.md\nDisallow: /.env\nDisallow: /.env.example\n\nUser-agent: Googlebot\nUser-agent: Bingbot\nUser-agent: GPTBot\nUser-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\nUser-agent: ClaudeBot\nUser-agent: Claude-SearchBot\nUser-agent: PerplexityBot\nUser-agent: Google-Extended\nUser-agent: Applebot-Extended\nAllow: /\nDisallow: /book\nDisallow: /private\nDisallow: /PRIVATE_NOTES.md\nDisallow: /.env\nDisallow: /.env.example\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
console.log(`Generated prerendered HTML and sitemap for ${routeData.filter(({ noindex }) => !noindex).length} indexable routes at ${siteUrl}`);
