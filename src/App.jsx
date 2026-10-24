import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Home from './pages/Home.jsx';
import { AtsCheckerPage, BlogPage, BookPage, ContactPage, NotFound, PrivacyPage, ServicePage, SupportSelectorPage } from './pages/Pages.jsx';
import Seo from './seo/Seo.jsx';
import { AboutPage, WhereWeWorkPage } from './pages/InfoPages.jsx';

const INTRO_SEEN_KEY = 'zeg-intro-seen';

function IntroRoute() {
  const navigate = useNavigate();
  const [alreadySeen, setAlreadySeen] = useState(false);

  useEffect(() => {
    setAlreadySeen(sessionStorage.getItem(INTRO_SEEN_KEY) === 'true');
  }, []);

  if (alreadySeen) return <Navigate to="/home" replace />;

  return (
    <Intro
      onEnter={() => {
        sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
        navigate('/home');
      }}
    />
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const isIntro = location.pathname === '/';
    let lenis;
    if (!isIntro && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({ autoRaf: true, smoothWheel: true });
    }
    window.scrollTo(0, 0);
    return () => lenis?.destroy();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="route-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Seo />
        <Routes location={location}>
          <Route path="/" element={<IntroRoute />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/services-select" element={<SupportSelectorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/where-we-work" element={<WhereWeWorkPage />} />
          <Route path="/pricing" element={<Navigate to="/services-select" replace />} />
          <Route path="/blog/:slug?" element={<BlogPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/tools/ats-checker" element={<AtsCheckerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
