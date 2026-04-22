import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Code, PenTool, Rocket, 
  ChevronRight, Star, Menu, X, Activity,
  Users, TrendingUp, ShieldCheck, Target, CheckCircle,
  Send, Loader2, Sun, Moon
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return true; // Default to dark mode
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, loading, success
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Verhindert Lag beim Initial Load durch verspätetes Aktivieren der Transitions
    const timer = setTimeout(() => {
      setIsMounted(true);
      document.documentElement.style.transition = 'background-color 0.5s ease-in-out, color 0.5s ease-in-out';
      document.body.style.transition = 'background-color 0.5s ease-in-out, color 0.5s ease-in-out';
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when modal is open & Handle UX
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      // Auto-Focus Name Field
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);

      // Close on Escape Key
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          setFormState('idle');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setEasterEgg(true);
          konamiIndex = 0;
          setTimeout(() => setEasterEgg(false), 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');
    
    const formData = new FormData(e.target);
    
    // WICHTIG: Füge hier deinen Web3Forms Access Key ein!
    // Gehe auf https://web3forms.com/, gib deine zukünftige E-Mail (z.B. maxmustermann@iwas) ein, 
    // um einen Schlüssel zu generieren. Diesen Schlüssel kopierst du dann hier unten rein:
    formData.append("access_key", "PLATZHALTER_FUER_SCHLUESSEL_VON_maxmustermann@iwas");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
        e.target.reset(); // Formular nach Erfolg leeren
      } else {
        console.error("Fehler beim Senden:", data);
        setFormState('error');
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      setFormState('error');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-teal-200 overflow-x-hidden w-full ${isMounted ? 'transition-colors duration-500' : ''}`}>
        
        {/* Konami Easter Egg Notification */}
        <AnimatePresence>
          {easterEgg && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 20 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
              <div className="bg-teal-500 text-gray-950 font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)] flex items-center gap-2">
                <Zap size={20} />
                <span>God Mode Activated: +1000% Leads!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PREMIUM LEAD MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => { setIsModalOpen(false); setFormState('idle'); }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              >
                <button 
                  onClick={() => { setIsModalOpen(false); setFormState('idle'); }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-6 md:p-12">
                  {formState === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-teal-500 dark:text-teal-400" size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Anfrage erhalten!</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                        Wir analysieren Ihre Daten und melden uns innerhalb von 24 Stunden mit einer ehrlichen Einschätzung.
                      </p>
                      <button 
                        onClick={() => { setIsModalOpen(false); setTimeout(() => setFormState('idle'), 500); }}
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-bold transition-colors"
                      >
                        Schließen
                      </button>
                    </div>
                  ) : formState === 'error' ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="text-red-500 dark:text-red-400" size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ein Fehler ist aufgetreten</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                        Leider konnte Ihre Anfrage nicht gesendet werden. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später noch einmal.
                      </p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-bold transition-colors"
                      >
                        Erneut versuchen
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lassen Sie uns skalieren.</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Hinterlassen Sie uns ein paar Eckdaten zu Ihrem Projekt. Kein Spam, nur Business.</p>
                      
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                            <input ref={nameInputRef} required name="name" type="text" placeholder="Max Mustermann" className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-700" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Firmen-E-Mail</label>
                            <input required name="email" type="email" placeholder="max@unternehmen.de" className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-700" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Geplantes Projekt-Budget</label>
                          <select required name="budget" defaultValue="" className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Bitte realistisch einschätzen...</option>
                            <option value="startup">1.500€ - 3.000€ (Startups & Landingpages)</option>
                            <option value="corporate">3.000€ - 7.500€ (Corporate & Relaunches)</option>
                            <option value="enterprise">Ab 7.500€ (Web-Apps & E-Commerce)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Worum geht es?</label>
                          <textarea required name="message" rows="3" placeholder="Kurze Beschreibung Ihrer aktuellen Herausforderung..." className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-700 resize-none"></textarea>
                        </div>

                        <button 
                          disabled={formState === 'loading'}
                          type="submit" 
                          className="w-full bg-teal-500 hover:bg-teal-400 text-gray-950 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {formState === 'loading' ? (
                            <><Loader2 size={20} className="animate-spin text-gray-950" /> Anfrage wird gesendet...</>
                          ) : (
                            <>Potenzialanalyse anfragen <Send size={20} /></>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Sticky Navigation Navbar */}
        <header 
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-4 shadow-lg' : 'bg-transparent py-6'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
            <a href="#" className="group flex items-center gap-2 focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-gray-950 font-bold text-xl shadow-[0_0_15px_rgba(45,212,191,0.4)] group-hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-shadow duration-300">
                <TrendingUp size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                NEXORA<span className="text-teal-500 dark:text-teal-400">STUDIOS</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#vorteile" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Ihre Vorteile</a>
              <a href="#prozess" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Unser Prozess</a>
              <a href="#reviews" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Erfolge</a>
              
              <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-4 lg:pl-6 ml-2">
                {/* Theme Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                  aria-label="Toggle Theme"
                >
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Moon size={20} />
                      </motion.div>
                    ) : (
                      <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Sun size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button onClick={() => setIsModalOpen(true)} className="relative group overflow-hidden rounded-full p-[1px]">
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-600 rounded-full opacity-70 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></span>
                  <div className="relative bg-white dark:bg-gray-950 px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 group-hover:bg-transparent">
                    <span className="text-sm font-bold text-teal-600 dark:text-teal-400 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">Kostenlose Erstberatung</span>
                  </div>
                </button>
              </div>
            </nav>

            {/* Mobile Menu Toggle & Theme */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-600 dark:text-gray-400"
              >
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="flex flex-col px-6 py-4 gap-4">
                  <a href="#vorteile" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">Ihre Vorteile</a>
                  <a href="#prozess" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">Unser Prozess</a>
                  <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">Erfolge</a>
                  <button onClick={() => { setIsModalOpen(true); setMobileMenuOpen(false); }} className="bg-teal-500 text-gray-950 font-bold py-3 rounded-lg mt-2 flex justify-center">
                    Kostenlose Erstberatung
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* 2. Hero Section: Fokus auf Umsatz & Wachstum */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none transform-gpu"></div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeIn}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <Activity size={14} />
                <span>Die Conversion-Agentur</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-900 dark:text-white">
                Mehr Traffic. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500">
                  Mehr Kunden.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl font-medium">
                Verlieren Sie keine Kunden mehr durch langsame, veraltete Websites. 
                Wir entwickeln Premium-Weblösungen, die Vertrauen aufbauen, 
                rasant laden und Besucher in zahlende Kunden verwandeln.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  Messbarer ROI
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  Premium Design
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  Top-Platzierungen bei Google
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-gray-950 px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center gap-2 text-lg">
                  Projekt anfragen <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>

            {/* Right: Lighthouse Score Card as Proof of Quality */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative perspective-1000 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 dark:from-teal-500/20 to-transparent blur-2xl rounded-3xl -z-10 transform-gpu"></div>
              <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden ${isMounted ? 'transition-colors duration-500' : ''}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 dark:bg-teal-500/10 rounded-bl-full transform-gpu"></div>
                
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg flex items-center gap-2">
                      <Zap className="text-teal-500 dark:text-teal-400" size={20} /> Performance Audit
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Garantierte Bestwerte für SEO & Conversion</p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-bold border border-teal-200 dark:border-teal-500/20">
                    REAL-TIME
                  </div>
                </div>

                <div className="flex justify-center mb-10">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" className="stroke-gray-100 dark:stroke-gray-800 fill-none stroke-[8]"></circle>
                      <motion.circle 
                        initial={{ strokeDasharray: "0 300" }}
                        animate={{ strokeDasharray: "283 300" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        cx="50" cy="50" r="45" 
                        className="stroke-teal-500 dark:stroke-teal-400 fill-none stroke-[8] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] dark:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                        strokeLinecap="round"
                      ></motion.circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-extrabold text-gray-900 dark:text-white">100</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-bold tracking-widest mt-1">SCORE</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Ladezeit (FCP)", value: "< 0.4s", color: "text-teal-600 dark:text-teal-400" },
                    { label: "Google Core Web Vitals", value: "Bestanden", color: "text-teal-600 dark:text-teal-400" },
                    { label: "Mobile Usability", value: "Exzellent", color: "text-teal-600 dark:text-teal-400" }
                  ].map((metric, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800/50">
                      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{metric.label}</span>
                      <span className={`font-mono font-bold ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Value Proposition / Warum wir? */}
        <section id="vorteile" className="py-24 bg-white dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Warum <span className="text-teal-500 dark:text-teal-400">NexoraStudios?</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Wir betrachten Webdesign nicht als Kunstprojekt, sondern als Ihr stärkstes Vertriebswerkzeug.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl relative overflow-hidden group transition-colors duration-500">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Maximale Conversion</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Jedes Element auf Ihrer neuen Seite wird psychologisch darauf optimiert, Besucher zu Aktionen zu bewegen. Mehr Anfragen bei gleichem Traffic.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl relative overflow-hidden group transition-colors duration-500">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <Rocket size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Blitzschnelle Ladezeiten</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Amazon fand heraus: 0,1s längere Ladezeit = 1% weniger Umsatz. Wir bauen High-Speed-Seiten, die Kunden und Google gleichermaßen lieben.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl relative overflow-hidden group transition-colors duration-500">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Zukunftssichere Technik</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Kein Wartungs-Albtraum. Wir nutzen modernste Frameworks, die sicher vor Hackern sind, reibungslos laufen und mit Ihrem Unternehmen mitwachsen.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Process Timeline */}
        <section id="prozess" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Ihr Weg zum <span className="text-teal-500 dark:text-teal-400">Marktführer</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Ein erprobter, transparenter Prozess, der Risiken minimiert und Ergebnisse maximiert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={28} />, title: "1. Potenzialanalyse", desc: "Wir decken auf, wo Sie aktuell Umsatz liegen lassen und definieren die exakte Strategie." },
              { icon: <PenTool size={28} />, title: "2. UX-Design", desc: "Entwicklung von Premium-Designs, die das Vertrauen Ihrer Zielgruppe sofort gewinnen." },
              { icon: <Code size={28} />, title: "3. Entwicklung", desc: "Programmierung nach höchsten Standards. Schnell, sicher und SEO-optimiert." },
              { icon: <TrendingUp size={28} />, title: "4. Skalierung", desc: "Erfolgreicher Launch. Ab Tag 1 generiert Ihre neue Präsenz mehr qualifizierte Leads." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-sm dark:shadow-none"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 dark:bg-teal-500/5 rounded-bl-full transition-transform group-hover:scale-150 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/10"></div>
                <div className="w-14 h-14 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:border-teal-300 dark:group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Social Proof & Vertrauen */}
        <section id="reviews" className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Ergebnisse, <span className="text-teal-500 dark:text-teal-400">die für sich sprechen.</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none transition-colors duration-500">
                <div className="flex gap-1 text-teal-500 dark:text-teal-400 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic">"Seit dem Relaunch mit NexoraStudios haben sich unsere qualifizierten Anfragen verdreifacht. Das Design strahlt genau die Professionalität aus, die wir für unsere B2B-Kunden brauchen. Eine Investition, die sich in Rekordzeit amortisiert hat."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    TL
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Thomas L.</p>
                    <p className="text-sm text-gray-500">Geschäftsführer, IndustrieTech GmbH</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none transition-colors duration-500">
                <div className="flex gap-1 text-teal-500 dark:text-teal-400 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic">"Wir hatten große Probleme mit unserer Sichtbarkeit. Die neue Architektur lädt so schnell, dass wir im Google-Ranking massiv gestiegen sind. Die Konkurrenzfähigkeit im E-Commerce ist endlich wieder gegeben."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    DK
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">David K.</p>
                    <p className="text-sm text-gray-500">Founder, ElevateEcom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Bar */}
            <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
              <p className="text-center text-sm text-gray-500 mb-8 font-medium">BEKANNT AUS & VERTRAUT VON</p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="h-8 text-xl font-extrabold text-gray-800 dark:text-gray-400">STARTUP<span className="text-teal-500">X</span></div>
                <div className="h-8 text-xl font-bold text-gray-800 dark:text-gray-400">TechCorp.</div>
                <div className="h-8 text-xl font-serif italic text-gray-800 dark:text-gray-400">ELEVATE</div>
                <div className="h-8 text-xl font-mono text-gray-800 dark:text-gray-400">&lt;Nova/&gt;</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Massive Conversion Footer (CTA) */}
        <footer className="relative bg-teal-500 overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-950 mb-6 tracking-tight">
              Bereit für skalierbares Wachstum?
            </h2>
            <p className="text-xl text-gray-900/80 mb-10 font-medium max-w-2xl mx-auto">
              Finden Sie heraus, wie viel ungenutztes Potenzial in Ihrer aktuellen digitalen Präsenz steckt. Buchen Sie jetzt Ihre unverbindliche Analyse.
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="group relative inline-flex items-center justify-center bg-gray-950 text-white px-8 py-5 rounded-xl font-bold text-lg overflow-hidden transition-transform hover:scale-105 shadow-2xl">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-gray-800"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <span className="relative flex items-center gap-2">
                Kostenlose Potenzialanalyse sichern <span className="text-sm font-normal text-gray-400">(Wert 500€)</span>
              </span>
            </button>
            
            <p className="mt-6 text-sm text-gray-900/70 font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={16} /> 100% kostenlos und unverbindlich.
            </p>
          </div>

          {/* Bottom Bar & Easter Egg Note */}
          <div className="bg-gray-100 dark:bg-gray-950 py-6 px-6 relative z-10 border-t border-gray-300 dark:border-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NexoraStudios. All rights reserved.</p>
              <p className="text-gray-400 dark:text-gray-700 text-[10px] font-mono hover:text-teal-500 transition-colors cursor-default">
                Tippe Konami-Code für einen kleinen Boost.
              </p>
            </div>
          </div>
        </footer>

    </div>
  );
}
