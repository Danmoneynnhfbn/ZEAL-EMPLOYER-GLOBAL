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

      <motion.div
        className="intro-bike"
        aria-hidden="true"
        initial={false}
        animate={reduceMotion ? { x: '42vw' } : { x: ['-150px', 'calc(100vw + 150px)'] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 140 112" fill="none">
          <g className="bike-wheel">
            <circle cx="34" cy="83" r="21" />
            <path d="M34 62v42M13 83h42M19 68l30 30m0-30L19 98" />
          </g>
          <g className="bike-wheel">
            <circle cx="106" cy="83" r="21" />
            <path d="M106 62v42M85 83h42M91 68l30 30m0-30L91 98" />
          </g>
          <path className="bike-frame" d="m34 83 31-35 17 35H34l18-18m13-17 18 17h13m-13 0 8-18h9" />
          <circle className="bike-pedal" cx="65" cy="65" r="4" />
          <g className="bike-rider">
            <path className="rider-limbs" d="m63 47 15-5 9 10m-24-5 7 18 15 8m-15-8-14 13m14-13 17 4m-23-34 13 9" />
            <path className="rider-shirt" d="m61 34 12-5 10 15-19 7-7-9z" />
            <circle className="rider-head" cx="68" cy="23" r="7" />
            <path className="rider-hair" d="M61 22c1-8 13-10 16-2l-4 1-3-3-5 4z" />
          </g>
        </svg>
      </motion.div>

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
