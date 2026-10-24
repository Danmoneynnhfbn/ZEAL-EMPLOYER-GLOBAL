import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronDown, MoveRight, Sparkles } from 'lucide-react';
import { articles, brand, careerMaterials, faqs, portfolioShowcase, processSteps, serviceHighlights, services, team, trustPoints, trustStories } from '../data/content.js';
import { ArticleCard, BeforeAfterSlider, Button, Marquee, Reveal, SectionHeading, ServiceIcon, SiteShell, WindowFrame } from '../components/SiteUI.jsx';
import { sendForm } from '../utils/sendForm.js';
import Answers from '../components/Answers.jsx';

function Hero() {
  return <section className="hero-section" id="top">
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span>ZEAL / 2026</span> CAREER SERVICES, WORLDWIDE</p>
        <h1>Get seen.<br /><span>Get interviewed.</span><br />Get hired.</h1>
        <p className="hero-summary">Career materials with a clear point of view, built for the opportunity you’re working toward.</p>
        <div className="hero-actions"><Button to="/book">Get my free resume review <ArrowRight size={16} /></Button><Button to="/services-select" variant="text">Choose your support <ArrowDown size={15} /></Button></div>
        <div className="hero-proof"><span className="proof-mark"><BadgeCheck size={17} /></span><span>Made with you, not just for an algorithm.</span><span className="proof-code">ZEG / 001</span></div>
      </div>
      <Reveal className="hero-art">
        <div className="hero-crosshair" aria-hidden="true">+</div><span className="hero-shape hero-shape--octagon" aria-hidden="true" /><span className="hero-shape hero-shape--diamond" aria-hidden="true" />
        <motion.div className="resume-paper" initial={{ rotate: 3, y: 12 }} whileInView={{ rotate: -2, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, damping: 16 }}>
          <div className="paper-toolbar"><span>CAREER FILE / 2026</span><span>01—02</span></div>
          <div className="paper-heading"><span className="paper-avatar">CV</span><div><b>CAREER PROFILE</b><small>TARGET ROLE · EXPERIENCE</small></div><img className="foil-mark" src="/icons/zeal-logo.jpg" alt="Embossed Zeal monogram" width="33" height="33" /></div>
          <div className="paper-contact">ROLE FOCUS <i /> CORE SKILLS <i /> CAREER HISTORY</div>
          <div className="paper-rule" /><div className="paper-label">PROFILE</div><p className="paper-copy">A concise introduction connecting your experience to the role you want.</p>
          <div className="paper-label">CAREER HIGHLIGHTS</div><ul className="paper-bullets"><li><Check size={13} />Connect your work to a clear customer or business need.</li><li><Check size={13} />Describe your role in planning, collaboration, and delivery.</li><li><Check size={13} />Bring relevant skills and experience into view.</li></ul>
          <div className="paper-footer"><span>SELECTED EXPERIENCE</span><span>SKILLS / FIGMA / RESEARCH / SYSTEMS</span></div>
          <motion.div className="ats-stamp" initial={{ scale: 0.55, rotate: -22, opacity: 0 }} whileInView={{ scale: 1, rotate: -12, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: 'spring', stiffness: 170 }}>ATS<br /><b>FRIENDLY</b></motion.div>
        </motion.div>
        <span className="hero-sticker">YOUR NEXT<br />CHAPTER <Sparkles size={16} /></span>
      </Reveal>
    </div>
    <a className="scroll-note" href="#trust"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
  </section>;
}

function TrustBar() {
  return <section className="trust-section" id="trust"><div className="trust-principles">{trustPoints.map((point) => <Reveal className="trust-principle" key={point}><Check size={15} /><span>{point}</span></Reveal>)}</div><div className="trust-logos"><Marquee items={serviceHighlights} label="Career services" /></div></section>;
}

function ServicesSection() {
  return <section className="section services-section" id="services"><div className="section-inner"><SectionHeading index="01" eyebrow="CAREER TOOLKIT" title="Build the story. Then put it to work." >Choose focused support for the next move, whether you’re starting out, changing direction, or stepping into leadership.</SectionHeading><div className="service-grid">{services.map((service, index) => <Reveal key={service.slug} delay={index * 0.05}><motion.article className="service-card" whileHover={{ y: -5, rotate: index % 2 ? 0.4 : -0.4 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}><div className="service-card-top"><span className="service-icon"><ServiceIcon name={service.icon} /></span><span>{service.eyebrow}</span></div><h3>{service.title}</h3><p>{service.copy}</p><Link className="service-card-link" to={`/services/${service.slug}`}>Explore service <ArrowRight size={16} /></Link><span className="service-card-index">0{index + 1}</span></motion.article></Reveal>)}</div><p className="service-footnote"><span className="paperclip">⌁</span>Every project starts with your goals, market, and voice. No recycled career stories.</p></div></section>;
}

function ProcessSection() {
  return <section className="section process-section" id="process"><div className="section-inner"><div className="process-header"><SectionHeading index="02" eyebrow="THE METHOD" title="A thoughtful process. A stronger next step." >Small, clear decisions. One useful career toolkit at the end.</SectionHeading><div className="process-arrow" aria-hidden="true">A <MoveRight /> B</div></div><div className="process-grid">{processSteps.map((step, index) => <Reveal key={step.number} delay={index * 0.08}><article className="process-step"><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article></Reveal>)}</div></div></section>;
}

function ComparisonSection() {
  return <section className="section comparison-section"><div className="section-inner comparison-layout"><div><SectionHeading index="03" eyebrow="THE DIFFERENCE" title="Same experience. Clearer signal." >See how a little structure can make your strengths easier to spot.</SectionHeading><p className="comparison-note">Your career story should stay true to your experience and voice.</p></div><Reveal><BeforeAfterSlider /></Reveal></div></section>;
}

function ResultsSection() {
  return <section className="section results-section" id="results"><div className="section-inner"><SectionHeading index="04" eyebrow="CAREER MATERIALS" title="A story that feels like yours." >Clear, considered materials help hiring teams understand how you think and what you bring.</SectionHeading><div className="case-grid">{careerMaterials.map((item, index) => <Reveal key={item.title} delay={index * 0.07}><article className="case-card"><div className="case-image"><img src={item.image} alt={item.alt} loading="lazy" width="1000" height="750" /><span className="case-image-code">{item.category}</span></div><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><p className="case-role">{item.detail}</p></article></Reveal>)}</div></div></section>;
}

function PortfolioSection() {
  return <section className="section portfolio-section"><div className="section-inner"><div className="section-row"><SectionHeading index="05" eyebrow="PORTFOLIO / SHOWCASE" title="Work worth clicking into." >A portfolio should help people understand what you did, how you think, and why it mattered.</SectionHeading><span className="horizontal-hint"><ArrowRight size={15} /> SCROLL TO EXPLORE</span></div><div className="portfolio-rail">{portfolioShowcase.map((sample) => <Reveal key={sample.title}><article className={`portfolio-card portfolio-card--${sample.color}`}><div className="portfolio-mock"><div className="portfolio-browser"><i /><i /><i /><span>yourname.work</span></div><div className="portfolio-mock-content"><span className="portfolio-monogram">{sample.initials}</span><span className="portfolio-type">{sample.type}</span><b>{sample.title}<br />in a few good stories.</b><div className="portfolio-mini-block"><i /><i /><i /></div></div><span className="portfolio-tab">CAREER WORK</span></div><h3>{sample.title}</h3><p>{sample.description}</p></article></Reveal>)}</div></div></section>;
}

function AtsTeaser() {
  return <section className="section ats-teaser"><div className="section-inner ats-teaser-inner"><div><p className="eyebrow"><span>06</span> FREE TOOL / RESUME REVIEW</p><h2>Make your resume easier to scan.</h2><p>Use a private checklist to review structure, contact details, skills, and role alignment before you apply.</p><Button to="/tools/ats-checker">Open resume checklist <ArrowRight size={16} /></Button></div><WindowFrame title="CAREER FILE / READABILITY" file="resume-check"><div className="ats-preview-body"><div className="ats-checklist-mark"><CheckCircle2 size={45} /></div><div><span className="stamp-label">ATS-FRIENDLY</span><p>Readable structure<br />Clear contact details<br />Relevant skills and experience</p></div></div></WindowFrame></div></section>;
}

function SupportSection() {
  return <section className="section support-section" id="support"><div className="section-inner support-home-layout"><div><SectionHeading index="07" eyebrow="YOUR NEXT STEP" title="Choose Your Support" >Select what you need now. We’ll shape the recommendation around your goals in a free consultation.</SectionHeading><Button to="/services-select">Explore support options <ArrowRight size={16} /></Button></div><div className="support-home-list">{services.map((service) => <Link key={service.slug} to="/services-select"><ServiceIcon name={service.icon} size={18} /><span>{service.title}</span><ArrowRight size={15} /></Link>)}</div></div></section>;
}

function TeamSection() {
  return <section className="section team-section"><div className="section-inner"><SectionHeading index="08" eyebrow="CAREER SERVICES" title="Good work starts with a real conversation." >We listen first, then connect you with the right kind of support for your next step.</SectionHeading><div className="team-grid">{team.map((item, index) => <Reveal key={item.role} delay={index * 0.08}><article className="team-folder"><div className="folder-tab"><span>CAREER SUPPORT</span><ArrowRight size={14} /></div><div className="team-role-art"><ServiceIcon name={index === 0 ? 'FileText' : index === 1 ? 'ContactRound' : 'MessagesSquare'} size={34} /></div><h3>{item.role}</h3><p>{item.description}</p></article></Reveal>)}</div></div></section>;
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const item = trustStories[active];
  return <section className="section testimonials-section"><div className="section-inner testimonial-layout"><div><SectionHeading index="09" eyebrow="HOW WE WORK" title="A little less noise. A lot more you." >A career story should reflect your experience, your voice, and the direction you want to take.</SectionHeading><div className="testimonial-tabs" role="tablist" aria-label="Select a work principle">{trustStories.map((story, index) => <button key={story.name} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{story.name}<ArrowRight size={15} /></button>)}</div></div><motion.article className="testimonial-card" key={item.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><span className="quote-mark">“</span><p>{item.quote}</p><div className="testimonial-person"><span className="testimonial-initial"><Check size={15} /></span><div><b>{item.name}</b><span>{item.title}</span></div></div></motion.article></div></section>;
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return <section className="section faq-section"><div className="section-inner faq-layout"><div><SectionHeading index="10" eyebrow="FAQ.MD" title="Good questions deserve clear answers." >A few things people often ask before we start.</SectionHeading><Link className="text-link" to="/book">Ask us something else <ArrowRight size={15} /></Link></div><WindowFrame title="FAQ.MD — ZEG / CAREER SERVICES" file="main"><div className="faq-editor">{faqs.map((faq, index) => <div className={`faq-line${open === index ? ' faq-line--open' : ''}`} key={faq.question}><span className="line-number">{String(index + 1).padStart(2, '0')}</span><div><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span><b>{open === index ? 'const' : '//'} </b>{faq.question}</span><ChevronDown size={16} /></button>{open === index && <p>{faq.answer}</p>}</div></div>)}</div></WindowFrame></div></section>;
}

function BlogSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '', consent: false, botcheck: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event?.preventDefault();
    setError('');
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim()) || !form.message.trim() || !form.consent) {
      setError('Add your name, a valid email, a message, and consent before signing up.');
      return;
    }
    setSending(true);
    try {
      await sendForm({ subject: 'Career notes signup', fromName: brand.name, fields: { name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), consent: form.consent, botcheck: form.botcheck } });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your request. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return <section className="section blog-section" id="blog"><div className="section-inner"><div className="section-row"><SectionHeading index="11" eyebrow="CAREER FIELD NOTES" title="A few useful things to take with you." >Practical reads for your next application, interview, and career decision.</SectionHeading><Button to="/blog" variant="outline">All articles <ArrowRight size={15} /></Button></div><div className="article-grid">{articles.map((article) => <Reveal key={article.slug}><ArticleCard article={article} /></Reveal>)}</div><form className="newsletter" onSubmit={submit} noValidate><div><span className="eyebrow">OCCASIONAL NOTES / NO SPAM</span><h3>{submitted ? 'You’re on the list.' : 'A useful note for your next move.'}</h3>{submitted && <p className="form-success" role="status">Thanks, we'll reply to your email soon</p>}</div>{!submitted && <div className="newsletter-fields"><label>Full name<input autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} required /></label><label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label><label>Your message<textarea value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="What would you like career notes about?" required /></label><label className="booking-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} required />I agree to be contacted about my request.</label><label className="form-honeypot" aria-hidden="true">Leave this field empty<input tabIndex="-1" autoComplete="off" name="botcheck" value={form.botcheck} onChange={(event) => update('botcheck', event.target.value)} /></label>{error && <div className="form-error" role="alert"><span>{error}</span><button type="button" disabled={sending} onClick={() => submit()}>{sending ? 'Sending…' : 'Try again'}</button></div>}<button className="button button--primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Sign up'} <ArrowRight size={15} /></button></div>}</form></div></section>;
}

export default function Home() {
  return <SiteShell><main><Hero /><TrustBar /><ServicesSection /><ProcessSection /><ComparisonSection /><ResultsSection /><PortfolioSection /><AtsTeaser /><SupportSection /><TeamSection /><TestimonialsSection /><FaqSection /><BlogSection /><Answers /></main></SiteShell>;
}
