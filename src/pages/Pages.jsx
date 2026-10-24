import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Upload } from 'lucide-react';
import { articles, articlesBySlug, brand, services, supportOptions } from '../data/content.js';
import { ArticleCard, Button, ServiceIcon, SiteShell, SupportOptionCard, WindowFrame } from '../components/SiteUI.jsx';
import { sendForm } from '../utils/sendForm.js';
import Answers from '../components/Answers.jsx';

export function ServicePage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  return <SiteShell><main className="route-main service-detail-page"><div className="route-hero"><Link className="back-link" to="/home#services"><ArrowLeft size={15} /> ALL SERVICES</Link><p className="eyebrow">CAREER SERVICE / {service.eyebrow}</p><div className="service-detail-heading"><span className="service-icon service-icon--large"><ServiceIcon name={service.icon} size={28} /></span><h1>{service.title}</h1></div><p className="route-lede">{service.detail}</p><Button to="/services-select">Choose your support <ArrowRight size={16} /></Button></div><div className="service-detail-content"><WindowFrame title="YOUR CAREER FILE" file={`${service.slug}.pdf`}><div className="service-deliverables"><div><p className="eyebrow">WHAT YOU RECEIVE</p><ul>{service.deliverables.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul></div><div className="service-audience"><span>BUILT FOR</span><b>{service.audience}</b><p>We begin by understanding your experience and the roles you want to pursue. Your work is reviewed with you, never sent off without your input.</p></div></div></WindowFrame><aside className="service-next"><span>PERSONALISED TO YOUR GOALS</span><Button to="/services-select" variant="outline">Choose your support <ArrowRight size={15} /></Button></aside></div></main><Answers service /></SiteShell>;
}

export function SupportSelectorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prior = location.state?.quote || {};
  const [selectedIds, setSelectedIds] = useState(prior.selectedIds || []);
  const [careerLevel, setCareerLevel] = useState(prior.careerLevel || '');
  const [role, setRole] = useState(prior.role || '');
  const [industry, setIndustry] = useState(prior.industry || '');
  const [timeline, setTimeline] = useState(prior.timeline || '');
  const [error, setError] = useState('');
  const selectedNames = selectedIds.includes('full-career-makeover')
    ? ['Resume / CV Writing', 'LinkedIn Optimization', 'Career Portfolio Website', 'Cover Letters', 'Interview Coaching']
    : supportOptions.filter((option) => selectedIds.includes(option.id)).map((option) => option.title);
  const toggle = (id) => {
    setError('');
    setSelectedIds((current) => {
      if (id === 'full-career-makeover') return current.includes(id) ? [] : [id];
      const withoutAll = current.filter((selectedId) => selectedId !== 'full-career-makeover');
      return withoutAll.includes(id) ? withoutAll.filter((selectedId) => selectedId !== id) : [...withoutAll, id];
    });
  };
  const requestQuote = () => {
    if (!selectedIds.length) {
      setError('Select an area of support to continue.');
      return;
    }
    navigate('/book', { state: { quote: { selectedIds, selectedNames, careerLevel, role, industry, timeline } } });
  };
  return <SiteShell><main className="route-main support-select-page"><div className="route-hero route-hero--center"><p className="eyebrow">ZEG / CAREER SUPPORT</p><h1>Choose Your Support</h1><p className="route-lede">Choose one or more areas. Receive a personalised quote after a free consultation.</p></div><div className="support-selector-layout"><section className="support-options" aria-label="Select career support"><div className="support-option-grid">{supportOptions.map((option) => <SupportOptionCard key={option.id} option={option} selected={selectedIds.includes(option.id)} onToggle={() => toggle(option.id)} />)}</div><div className="support-questions"><p className="eyebrow">A LITTLE MORE CONTEXT / OPTIONAL</p><label>Target role<input value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Senior Product Designer" /></label><label>Career level<select value={careerLevel} onChange={(event) => setCareerLevel(event.target.value)}><option value="">Choose a level</option><option>Student</option><option>Early career</option><option>Mid-career</option><option>Senior</option></select></label><label>Target industry<input value={industry} onChange={(event) => setIndustry(event.target.value)} placeholder="e.g. Technology, healthcare" /></label><label>Preferred timeline<select value={timeline} onChange={(event) => setTimeline(event.target.value)}><option value="">Choose a timeline</option><option value="urgent">Urgent</option><option value="1-2 weeks">1-2 weeks</option><option value="flexible">Flexible</option></select></label></div></section><aside className="support-summary"><p className="eyebrow">YOUR CAREER FILE</p><h2>Your selected support</h2>{selectedNames.length ? <ul>{selectedNames.map((name) => <li key={name}><CheckCircle2 size={16} />{name}</li>)}</ul> : <p className="support-summary-empty">Select the areas where you would like support.</p>}<div className="support-summary-details">{role && <span>TARGET ROLE <b>{role}</b></span>}{careerLevel && <span>CAREER LEVEL <b>{careerLevel}</b></span>}{industry && <span>TARGET INDUSTRY <b>{industry}</b></span>}{timeline && <span>TIMELINE <b>{timeline}</b></span>}</div><p className="support-quote-note">You’ll receive a personalised quote after a free consultation.</p>{error && <p className="form-error" role="alert">{error}</p>}<Button onClick={requestQuote}>Request my quote <ArrowRight size={16} /></Button></aside></div></main></SiteShell>;
}

export function AtsCheckerPage() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const checks = [
    { label: 'Resume text is present', pass: text.trim().length > 0 },
    { label: 'Experience section is clearly titled', pass: /experience|employment|work history/i.test(text) },
    { label: 'Education or credentials are included', pass: /education|degree|university|certification/i.test(text) },
    { label: 'Relevant skills are easy to find', pass: /skills|technologies|tools/i.test(text) },
    { label: 'Achievements describe actions and outcomes', pass: /\b(led|built|improved|increased|reduced|launched|delivered)\b/i.test(text) },
  ];
  const acceptFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || '').slice(0, 20000));
    reader.readAsText(file);
  };
  return <SiteShell><main className="route-main ats-page"><div className="route-hero"><p className="eyebrow">FREE TOOL / RESUME REVIEW</p><h1>Give your resume a readability check.</h1><p className="route-lede">Paste resume text or upload a plain text file to review structure and clarity.</p></div><div className="ats-workspace"><WindowFrame title="ZEG / RESUME READABILITY" file="career-file"><div className="ats-input-panel"><div className="ats-editor-header"><span><i /> PRIVATE REVIEW</span><span>TEXT STAYS IN THIS BROWSER</span></div><textarea aria-label="Paste your resume text" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste resume text here. Include experience, skills, and education for a more useful review." /><div className="ats-input-footer"><label className="upload-control"><Upload size={15} /> {fileName || 'Upload .txt file'}<input type="file" accept=".txt,text/plain" onChange={(event) => acceptFile(event.target.files?.[0])} /></label><span>Resume text</span></div></div></WindowFrame><section className="ats-results" aria-live="polite"><div className="score-result"><div className="ats-checklist-mark"><CheckCircle2 size={36} /></div><div><span className="eyebrow">READABILITY REVIEW</span><h2>{text.trim() ? 'Review your career file.' : 'Ready when you are.'}</h2><p>This checklist helps you review structure. It does not predict employer decisions.</p></div></div><div className="tips-list"><h3>Resume structure</h3>{checks.map((check) => <p key={check.label}><span className={check.pass ? 'tip-check is-pass' : 'tip-check'}>{check.pass ? <Check size={13} /> : '·'}</span>{check.label}</p>)}</div><div className="ats-next-step"><p>Want a person to review your career story?</p><Button to="/book">Request a free consultation <ArrowRight size={15} /></Button></div></section></div><p className="tool-disclaimer">Your text stays in this browser. Avoid pasting confidential employer or client information.</p></main></SiteShell>;
}

const initialForm = { name: '', email: '', message: '', role: '', industry: '', profileUrl: '', selectedIds: [], careerLevel: '', timeline: '', callTime: '', consent: false, botcheck: '' };

export function BookPage() {
  const location = useLocation();
  const quote = location.state?.quote || {};
  const [form, setForm] = useState(() => ({ ...initialForm, selectedIds: quote.selectedIds || [], careerLevel: quote.careerLevel || '', role: quote.role || '', industry: quote.industry || '', timeline: quote.timeline || '' }));
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const next = () => {
    setError('');
    if (step === 0 && (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email))) return setError('Add your name and a valid email to continue.');
    if (step === 1 && !form.role.trim()) return setError('Tell us the role you’re targeting.');
    if (step === 3 && !form.selectedIds.length) return setError('Choose at least one area of support to continue.');
    if (step === 4 && (!form.callTime || !form.message.trim() || !form.consent)) return setError('Add a message, choose a call window, and agree to be contacted.');
    if (step < 4) setStep((current) => current + 1);
    else submitRequest();
  };
  const steps = ['Your details', 'Target role', 'Career file link', 'Your selected support', 'Your message'];
  const chosenSupport = form.selectedIds.includes('full-career-makeover')
    ? ['Resume / CV Writing', 'LinkedIn Optimization', 'Career Portfolio Website', 'Cover Letters', 'Interview Coaching']
    : supportOptions.filter((option) => form.selectedIds.includes(option.id)).map((option) => option.title);
  const submitRequest = async () => {
    setError('');
    setSending(true);
    try {
      await sendForm({
        subject: 'Career consultation request',
        fromName: brand.name,
        fields: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          selected_support: chosenSupport.join(', '),
          career_level: form.careerLevel || 'Not specified',
          target_role: form.role.trim(),
          industry: form.industry || 'Not specified',
          timeline: form.timeline || 'Not specified',
          cv_or_linkedin: form.profileUrl.trim() || 'Not provided',
          preferred_call_window: form.callTime,
          consent: form.consent,
          botcheck: form.botcheck,
        },
      });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your request. Please try again.');
    } finally {
      setSending(false);
    }
  };
  if (submitted) return <SiteShell><main className="route-main book-page"><div className="booking-success"><span className="success-icon"><Check size={30} /></span><p className="eyebrow">CONSULTATION REQUEST</p><h1>Request received.</h1><p>Thanks, we'll reply to your email soon.</p></div></main></SiteShell>;
  const toggleSupport = (id) => {
    setForm((current) => {
      if (id === 'full-career-makeover') return { ...current, selectedIds: current.selectedIds.includes(id) ? [] : [id] };
      const currentIds = current.selectedIds.filter((selectedId) => selectedId !== 'full-career-makeover');
      const selectedIds = currentIds.includes(id) ? currentIds.filter((selectedId) => selectedId !== id) : [...currentIds, id];
      return { ...current, selectedIds };
    });
  };
  return <SiteShell><main className="route-main book-page"><div className="booking-intro"><p className="eyebrow">ZEG / FREE CAREER AUDIT</p><h1>Start with what’s next.</h1><p>Share a few details. We’ll use them to make the first conversation useful.</p></div><WindowFrame title="NEW CAREER FILE" file="intake.form" className="booking-window"><div className="booking-progress"><div><span>STEP {String(step + 1).padStart(2, '0')} / 05</span><span>{steps[step]}</span></div><div className="progress-track"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><div className="progress-labels">{steps.map((item, index) => <span key={item} className={index <= step ? 'is-current' : ''}>{String(index + 1).padStart(2, '0')}</span>)}</div></div><div className="booking-fields" key={step}>
    {step === 0 && <><p className="eyebrow">01 / YOUR DETAILS</p><label>Full name<input autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" /></label><label>Email address<input autoComplete="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="name@example.com" /></label></>}
    {step === 1 && <><p className="eyebrow">02 / TARGET ROLE + INDUSTRY</p><label>What role are you aiming for?<input value={form.role} onChange={(event) => update('role', event.target.value)} placeholder="e.g. Senior Product Designer" /></label><label>Career level<select value={form.careerLevel} onChange={(event) => update('careerLevel', event.target.value)}><option value="">Choose a level</option><option>Student</option><option>Early career</option><option>Mid-career</option><option>Senior</option></select></label><label>Industry or field<input value={form.industry} onChange={(event) => update('industry', event.target.value)} placeholder="e.g. Climate technology" /></label><label>Preferred timeline<select value={form.timeline} onChange={(event) => update('timeline', event.target.value)}><option value="">Choose a timeline</option><option value="urgent">Urgent</option><option value="1-2 weeks">1-2 weeks</option><option value="flexible">Flexible</option></select></label></>}
    {step === 2 && <><p className="eyebrow">03 / YOUR CAREER FILE LINK</p><p className="upload-explainer">Share a secure link if you would like us to review your current material.</p><label>Link to your CV or LinkedIn (optional)<input type="url" value={form.profileUrl} onChange={(event) => update('profileUrl', event.target.value)} placeholder="https://" /></label></>}
    {step === 3 && <><p className="eyebrow">04 / YOUR SELECTED SUPPORT</p><p className="upload-explainer">Edit your choices here, or go back to add more context.</p><div className="support-edit-list">{supportOptions.map((option) => <label key={option.id} className={form.selectedIds.includes(option.id) ? 'support-edit-option is-selected' : 'support-edit-option'}><input type="checkbox" checked={form.selectedIds.includes(option.id)} onChange={() => toggleSupport(option.id)} /><span><b>{option.title}</b><small>{option.copy}</small></span></label>)}</div>{chosenSupport.length > 0 && <p className="support-edit-summary">Selected: {chosenSupport.join(', ')}</p>}</>}
    {step === 4 && <><p className="eyebrow">05 / YOUR MESSAGE</p><label>Tell us a little about your request<textarea value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="What would you like help with?" required /></label><div className="time-choice-list">{['Weekday morning', 'Weekday afternoon', 'Evening / flexible'].map((slot) => <label key={slot} className={form.callTime === slot ? 'time-choice is-selected' : 'time-choice'}><input type="radio" name="call-time" checked={form.callTime === slot} onChange={() => update('callTime', slot)} />{slot}</label>)}</div><label className="booking-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} />I agree to be contacted about my request.</label><label className="form-honeypot" aria-hidden="true">Leave this field empty<input tabIndex="-1" autoComplete="off" name="botcheck" value={form.botcheck} onChange={(event) => update('botcheck', event.target.value)} /></label></>}
    {error && <div className="form-error" role="alert"><span>{error}</span>{step === 4 && <button type="button" onClick={submitRequest}>Try again</button>}</div>}
    <div className="booking-nav">{step > 0 ? <button type="button" className="button button--outline" disabled={sending} onClick={() => { setError(''); setStep((current) => current - 1); }}><ArrowLeft size={15} /> Back</button> : <span>YOUR DETAILS STAY PRIVATE</span>}<button type="button" className="button button--primary" onClick={next} disabled={sending}>{sending ? 'Sending…' : step === 4 ? 'Send request' : 'Continue'} {!sending && <ArrowRight size={15} />}</button></div>
  </div></WindowFrame></main></SiteShell>;
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', consent: false, botcheck: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event?.preventDefault();
    setError('');
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim()) || !form.message.trim() || !form.consent) {
      setError('Add your name, a valid email, a message, and consent before sending.');
      return;
    }
    setSending(true);
    try {
      await sendForm({ subject: 'Website contact request', fromName: brand.name, fields: { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() } });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || 'We could not send your request. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return <SiteShell><main className="route-main contact-page"><div className="booking-intro"><p className="eyebrow">ZEG / CONTACT</p><h1>Let’s talk about what’s next.</h1><p>Tell us what you need, and we’ll follow up by email.</p><a href="mailto:hello@zealemployerglobal.com">Email us directly</a></div>{submitted ? <p className="form-success contact-success" role="status">Thanks, we'll reply to your email soon</p> : <form className="contact-form" onSubmit={submit} noValidate><label>Full name<input autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} required /></label><label>Email address<input autoComplete="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label><label>Your message<textarea value={form.message} onChange={(event) => update('message', event.target.value)} required /></label><label className="booking-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} required />I agree to be contacted about my request.</label><label className="form-honeypot" aria-hidden="true">Leave this field empty<input tabIndex="-1" autoComplete="off" name="botcheck" value={form.botcheck} onChange={(event) => update('botcheck', event.target.value)} /></label>{error && <div className="form-error" role="alert"><span>{error}</span><button type="button" disabled={sending} onClick={() => submit()}>{sending ? 'Sending…' : 'Try again'}</button></div>}<button className="button button--primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <ArrowRight size={15} /></button></form>}</main></SiteShell>;
}

export function PrivacyPage() {
  return <SiteShell><main className="route-main privacy-page"><div className="route-hero"><p className="eyebrow">ZEG / PRIVACY</p><h1>Your details stay yours.</h1><p className="route-lede">Information submitted through our forms is used only to respond to your request.</p></div><article className="privacy-copy"><h2>Information you share</h2><p>When you submit a booking, contact, or newsletter form, we receive the details you provide, including your name, email address, message, and any career information or links you choose to include.</p><h2>How we use it</h2><p>Submitted details are used only to respond to your request and coordinate the support you asked about. We do not publish or use your career details as marketing material.</p><h2>Form delivery</h2><p>Forms are delivered through Web3Forms. Avoid including sensitive information you do not need to share. Contact us through the site if you have a question about your submission.</p><Button to="/contact">Contact us <ArrowRight size={15} /></Button></article></main></SiteShell>;
}

function BlogList() {
  return <SiteShell><main className="route-main blog-page"><div className="route-hero"><p className="eyebrow">ZEG / FIELD NOTES</p><h1>Useful ideas for the work ahead.</h1><p className="route-lede">Notes on telling your story, finding your market, and showing up with intention.</p></div><div className="blog-list-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div><div className="blog-callout"><p className="eyebrow">MORE PERSONAL / LESS GUESSWORK</p><h2>Want a second set of eyes on your next step?</h2><Button to="/book">Book a career audit <ArrowRight size={15} /></Button></div></main></SiteShell>;
}

function BlogPost() {
  const { slug } = useParams();
  const article = articlesBySlug[slug];
  if (!article) return <NotFound />;
  return <SiteShell><main className="route-main post-page"><Link className="back-link" to="/blog"><ArrowLeft size={15} /> ALL FIELD NOTES</Link><article className="post-article"><p className="eyebrow">{article.category} / {article.read}</p><h1>{article.title}</h1><p className="post-lede">{article.excerpt}</p><p className="post-date">Last updated October 24, 2026 · By Zeal Employer Global</p><p>Career writing means describing professional experience clearly and accurately for the roles a person wants to pursue.</p><div className="post-rule" /><h2>Start with the evidence</h2><p>Hiring teams need a quick, accurate picture of what you can do. Begin with the work itself: the problem, your decisions, and the result. A clear example is more useful than a list of broad claims.</p><h2>Make the next step easy to see</h2><p>Use language that belongs to the role you want, while keeping every detail true to your experience. Add useful context, remove repeated phrases, and make your contribution easy to scan.</p><ul><li>Choose one target role before tailoring.</li><li>Lead with the action and the result.</li><li>Use specific tools and outcomes where they matter.</li><li>Ask someone outside your team to read it once.</li></ul><Button to="/book">Get help with your story <ArrowRight size={15} /></Button></article></main></SiteShell>;
}

export function BlogPage() {
  const { slug } = useParams();
  return slug ? <BlogPost /> : <BlogList />;
}

export function NotFound() {
  return <SiteShell><main className="route-main not-found"><p className="eyebrow">ZEG / 404</p><h1>This page took a different route.</h1><p>Let’s get you back to the career files.</p><Button to="/home"><ArrowLeft size={15} /> Return home</Button></main></SiteShell>;
}
