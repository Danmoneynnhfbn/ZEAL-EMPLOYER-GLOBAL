import { homeFaqs, serviceFaqs } from '../seo/Seo.jsx';

export default function Answers({ service = false }) {
  const questions = service ? serviceFaqs : homeFaqs;
  return <section className="section answers-section">
    <div className="section-inner">
      <p className="eyebrow">CLEAR ANSWERS / ZEG</p>
      <h2>Answers to common questions.</h2>
      <div className="answers-grid">{questions.map(([question, answer]) => <article key={question}>
        <h3>{question}</h3>
        <p>{answer}</p>
      </article>)}</div>
    </div>
  </section>;
}
