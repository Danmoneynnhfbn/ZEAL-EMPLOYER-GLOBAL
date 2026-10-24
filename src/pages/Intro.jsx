import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { brand } from '../data/content.js';

const LOAD_DURATION = 2600;

export default function Intro({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - start) / LOAD_DURATION) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const leaveIntro = () => {
    if (exiting) return;
    setExiting(true);
  };

  return (
    <motion.main
      className={`intro-screen${exiting ? ' intro-screen--leaving' : ''}`}
      initial={reduceMotion ? false : { y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exiting) onEnter();
      }}
    >
      <div className="intro-topline">
        <span className="intro-brand">ZEG / 001</span>
        <span className="intro-status"><i /> CAREER SERVICES, WORLDWIDE</span>
      </div>

      <div className="intro-shapes" aria-hidden="true">
        <motion.span className="shape shape-diamond" animate={reduceMotion ? {} : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
        <motion.span className="shape shape-octagon" animate={reduceMotion ? {} : { rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
        <motion.span className="shape shape-circle" animate={reduceMotion ? {} : { y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <span className="shape-crosshair">+</span>
      </div>

      <section className="intro-center" aria-label="Welcome">
        <div className="intro-counter" aria-live="off">
          <span className="counter-value">{String(progress).padStart(3, '0')}</span>
          <span className="counter-unit">%</span>
        </div>
        <div className="counter-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        <p className="intro-kicker">CAREER FILE / {new Date().getFullYear()}</p>
        <h1>{brand.intro}</h1>
        <p className="intro-tagline">Your Zeal. Their Next Hire.</p>
      </section>

      <div className="tear-instruction" aria-hidden="true">
        <Scissors size={17} strokeWidth={1.7} />
        <span>CUT ALONG LINE</span>
      </div>
      <div className="tear-line" aria-hidden="true"><span /></div>

      <div className="intro-bottomline">
        <span className="intro-edition">ZEAL EMPLOYER GLOBAL</span>
        <button className="skip-link" onClick={leaveIntro} type="button">SKIP INTRO <span aria-hidden="true">↗</span></button>
      </div>

      <motion.button
        className="enter-button"
        type="button"
        onClick={leaveIntro}
        disabled={progress < 100}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: progress === 100 ? 1 : 0, y: progress === 100 ? 0 : 8 }}
        transition={{ duration: 0.3 }}
        aria-label="Enter Zeal Employer Global"
      >
        <span>[ ENTER ]</span><span aria-hidden="true">↗</span>
      </motion.button>
    </motion.main>
  );
}
