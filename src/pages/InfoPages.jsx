import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { audienceRoles, cities, countries } from '../data/audience.js';
import { SiteShell } from '../components/SiteUI.jsx';

export function AboutPage() {
  return <SiteShell><main className="route-main info-page">
    <div className="route-hero"><p className="eyebrow">ZEG / ABOUT</p><h1>Career support built around your next step.</h1><p className="route-lede">Zeal Employer Global helps job seekers prepare clear, role-focused career materials and practice how they present their experience.</p></div>
    <section className="info-copy"><h2>Who we are</h2><p>Zeal Employer Global is a remote career-services provider. We work with professionals who want help communicating their experience, exploring a career change, or preparing for a new opportunity.</p><h2>What we do</h2><p>Our services include resume and CV writing, LinkedIn profile optimization, career portfolio websites, cover letters, and interview coaching. Work is shaped with the client and grounded in the details they provide.</p><h2>Who we help</h2><p>We support job seekers across career stages and industries. Hiring decisions remain with employers; our work focuses on making a person's experience easier to understand.</p><Link className="text-link" to="/services-select">Explore career support <ArrowRight size={15} /></Link></section>
  </main></SiteShell>;
}

export function WhereWeWorkPage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All regions');
  const regions = useMemo(() => ['All regions', ...new Set([...countries, ...cities].map((place) => place.region))], []);
  const filterPlaces = (places) => places.filter((place) => (region === 'All regions' || place.region === region) && place.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const filteredCountries = filterPlaces(countries);
  const filteredCities = filterPlaces(cities);
  const groups = [...new Set([...filteredCountries, ...filteredCities].map((place) => place.region))];
  return <SiteShell><main className="route-main where-page">
    <div className="route-hero"><p className="eyebrow">ZEG / REMOTE CAREER SUPPORT</p><h1>Career support, wherever you are.</h1><p className="route-lede">Zeal Employer Global works remotely with job seekers around the world. Our service is delivered online; we do not claim local offices in the places listed.</p><p className="where-roles">We support {audienceRoles.join(', ')}.</p></div>
    <section className="where-controls" aria-label="Filter locations"><label>Search places<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country or city" /></label><label>Filter by region<select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label></section>
    <section className="where-results" aria-live="polite">{groups.map((group) => <article className="where-region" key={group}><h2>{group}</h2><div className="where-group"><div><h3>Countries</h3><ul>{filteredCountries.filter((place) => place.region === group).map(({ code, name }) => <li key={code}>{name}</li>)}</ul></div><div><h3>Cities</h3><ul>{filteredCities.filter((place) => place.region === group).map(({ name }) => <li key={name}>{name}</li>)}</ul></div></div></article>)}</section>
    <p className="where-note">We work remotely across time zones. Meetings and delivery are coordinated with each client, and services are provided online rather than from local offices.</p>
  </main></SiteShell>;
}
