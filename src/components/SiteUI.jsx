import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, CheckCircle2, ChevronDown, ContactRound, FileText, Mail, Menu, PanelsTopLeft, MessagesSquare, Sparkles, X } from 'lucide-react';
import { brand, services } from '../data/content.js';

export function Logo({ inverted = false }) {
  return (
    <Link className={`zeg-logo${inverted ? ' zeg-logo--light' : ''}`} to="/home" aria-label={`${brand.name} home`}>
      <svg className="zeg-spark" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 0 11.1 6.9 18 9l-6.9 2.1L9 18l-2.1-6.9L0 9l6.9-2.1L9 0Z" /></svg>
      <span className="zeg-word">ZEAL</span>
      <span className="zeg-subword">EMPLOYER GLOBAL</span>
    </Link>
  );
}

export function Button({ to, href, children, variant = 'primary', className = '', ...props }) {
  const classes = `button button--${variant} ${className}`.trim();
  if (to) return <Link className={classes} to={to} {...props}>{children}</Link>;
  if (href) return <a className={classes} href={href} {...props}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}

export function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>
      {children}
    </motion.div>
  );
}

export function WindowFrame({ title, file, children, className = '' }) {
  return (
    <div className={`window-frame ${className}`}>
      <div className="window-titlebar">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="window-title">{title}</span>
        {file && <span className="window-file">{file}</span>}
      </div>
      {children}
    </div>
  );
}

export function SectionHeading({ index, eyebrow, title, children, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <p className="eyebrow"><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

export function ServiceIcon({ name, size = 22 }) {
  const icons = { FileText, ContactRound, PanelsTopLeft, Mail, MessagesSquare, Sparkles };
  const Icon = icons[name] || FileText;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}

export function SupportOptionCard({ option, selected, onToggle }) {
  return (
    <label className={`ticket-card support-ticket${selected ? ' support-ticket--selected' : ''}`}>
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <span className="ticket-code"><span>ZEAL / CAREER FILE</span><span>{selected ? 'SELECTED' : 'SELECT SUPPORT'}</span></span>
      <span className="support-ticket-title"><ServiceIcon name={option.icon} size={21} /><strong>{option.title}</strong></span>
      <span className="ticket-description">{option.copy}</span>
      <span className="ticket-tear"><span aria-hidden="true">✂</span><i /></span>
      <span className="ticket-foot"><span>PERSONALISED TO YOUR GOALS</span><span className="support-check" aria-hidden="true">{selected && <Check size={14} />}</span></span>
    </label>
  );
}

export function Marquee({ items, label = 'Selected teams' }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-label={label}>
      <div className="marquee-track">{loop.map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div>
    </div>
  );
}

export function BeforeAfterSlider() {
  const [tab, setTab] = useState('Resume');
  const [position, setPosition] = useState(53);
  const content = {
    Resume: { before: ['Responsible for managing projects', 'Helped the team improve reporting'], after: ['Project planning, coordination, and delivery', 'Reporting workflows, documentation, and stakeholder updates'] },
    LinkedIn: { before: ['Open to new opportunities', 'Experienced professional with a passion for technology'], after: ['Product designer building accessible tools for complex workflows', 'Turning research, systems thinking, and craft into measurable product outcomes'] },
    Portfolio: { before: ['A list of links with no context', 'Projects shown without a clear role'], after: ['Selected work, clearly framed around the problem and result', 'A concise case study that explains your decisions and contribution'] },
  }[tab];
  return (
    <WindowFrame title="PROFILE COMPARISON" file={`${tab.toLowerCase()}.view`} className="comparison-window">
      <div className="file-tabs" role="tablist" aria-label="Choose profile type">{['Resume', 'LinkedIn', 'Portfolio'].map((item) => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)}>{item}{item === 'Resume' ? '.pdf' : item === 'LinkedIn' ? '.html' : '.fig'}</button>)}</div>
      <div className="comparison-labels"><span>BEFORE</span><span>AFTER</span></div>
      <div className="comparison-stage">
        <div className="comparison-before"><span className="comparison-status">NEEDS A CLEARER STORY</span>{content.before.map((line) => <p key={line}>{line}</p>)}<div className="fake-lines"><i /><i /><i /></div></div>
        <div className="comparison-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><span className="comparison-status">SPECIFIC. SEARCHABLE. YOURS.</span>{content.after.map((line) => <p key={line}>{line}</p>)}<div className="fake-lines"><i /><i /><i /></div><span className="comparison-stamp">READY</span></div>
        <input aria-label="Drag to compare before and after" className="comparison-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
        <div className="comparison-handle" style={{ left: `${position}%` }} aria-hidden="true"><span>↔</span></div>
      </div>
      <div className="comparison-caption"><span>DRAG TO COMPARE</span><span>CAREER PROFILE / BEFORE + AFTER</span></div>
    </WindowFrame>
  );
}

export function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const clock = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time);
  const links = [['Services', '#services'], ['Process', '#process'], ['Career Files', '#results'], ['Choose Your Support', '/services-select'], ['Blog', '/blog']];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <div className="header-center"><nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Main navigation">{links.map(([label, href]) => href.startsWith('/') ? <NavLink key={label} to={href} onClick={() => setMenuOpen(false)}>{label}</NavLink> : <a key={label} href={location.pathname === '/home' ? href : `/home${href}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><span className="header-time">LOCAL TIME <b>{clock}</b></span></div>
        <div className="header-actions"><span className="availability"><i /> TAKING NEW CLIENTS</span><Button to="/book" className="header-book">Book a call <ArrowRight size={15} /></Button><button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const [footerTime, setFooterTime] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setFooterTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const footerClock = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(footerTime);
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div><p className="eyebrow"><span>16</span> NEXT STEP / CONTACT</p><h2>Ready to land your next role?</h2><p className="footer-copy">Bring your ambition. We’ll help shape the story that takes it further.</p><Button to="/book">Start your career audit <ArrowRight size={16} /></Button></div>
        <motion.div className="drag-sticker" drag dragMomentum={false} aria-label="Draggable sticker"><span>&lt; DRAG ME &gt;</span><b>↗</b></motion.div>
      </div>
      <div className="footer-contact"><span>{brand.location}</span><Link to="/where-we-work">Where we work</Link><Link to="/about">About</Link><Link to="/contact">Contact <ArrowRight size={14} /></Link><Link to="/privacy">Privacy</Link><Link to="/book">Book a call <ArrowRight size={14} /></Link><a href="mailto:hello@zealemployerglobal.com">Email us directly</a><span className="footer-audience">Serving professionals in Nigeria, Ghana, Senegal, Côte d’Ivoire, Kenya, South Africa, the United Kingdom, the United States, and more.</span></div>
      <div className="footer-menubar"><span>© {new Date().getFullYear()} Zeal Employer Global</span><span>LOCAL TIME {footerClock}</span><span>CAREER SERVICES / WORLDWIDE</span><a href="#top" aria-label="Back to top"><ArrowUp size={15} /></a></div>
    </footer>
  );
}

export function CookieConsent() {
  const [choice, setChoice] = useState(() => localStorage.getItem('zeg-cookie-choice'));
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const save = (value) => { localStorage.setItem('zeg-cookie-choice', value); setChoice(value); setCustomize(false); };
  return (
    <>
      <AnimatePresence>{!choice && <motion.aside className="cookie-banner" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} aria-label="Cookie preferences"><div><p className="eyebrow">A QUICK NOTE</p><p>We use essential storage to keep the site working. Optional analytics help us understand what’s useful.</p></div><div className="cookie-actions"><button onClick={() => save('allowed')}>Allow</button><button onClick={() => save('rejected')}>Reject</button><button onClick={() => setCustomize(true)}>Customize</button></div></motion.aside>}</AnimatePresence>
      <AnimatePresence>{customize && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setCustomize(false); }}><motion.section className="preference-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title" initial={{ y: 20 }} animate={{ y: 0 }}><button className="modal-close" onClick={() => setCustomize(false)} aria-label="Close preferences"><X size={18} /></button><p className="eyebrow">SITE PREFERENCES</p><h2 id="cookie-title">Choose what you share.</h2><p>Essential storage is always active. Optional analytics are off unless you enable them.</p><label className="toggle-line"><span>Essential storage <small>Needed for the site to work</small></span><input type="checkbox" checked disabled /></label><label className="toggle-line"><span>Analytics <small>Helps us improve this site</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label><Button onClick={() => save(analytics ? 'custom-analytics' : 'custom-essential')}>Save preferences</Button></motion.section></motion.div>}</AnimatePresence>
    </>
  );
}

export function FloatingTools() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="floating-tools">{visible && <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={17} /></button>}</div>;
}

export function SiteShell({ children, footer = true }) {
  return <><SiteHeader />{children}{footer && <SiteFooter />}<CookieConsent /><FloatingTools /></>;
}

export function ArticleCard({ article }) {
  return <Link className="article-card" to={`/blog/${article.slug}`}><div className="article-topline"><span>{article.category}</span><span>{article.read}</span></div><div className="article-illustration"><span className="article-file">ZEG / FIELD NOTES</span><i>{article.slug === 'resume-impact' ? '01' : article.slug === 'linkedin-search' ? '02' : '03'}</i></div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-date">{article.date} <ArrowRight size={15} /></span></Link>;
}

export function ServiceLinkList() {
  return <div className="service-link-list">{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}><ServiceIcon name={service.icon} size={17} />{service.title}<ArrowRight size={15} /></Link>)}</div>;
}
