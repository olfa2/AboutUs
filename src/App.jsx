import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Code, PenTool, Rocket, 
  ChevronRight, ChevronDown, Star, Menu, X, Activity,
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
  const [ziel, setZiel] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          setZiel("");
          setIsDropdownOpen(false);
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
              onClick={() => { setIsModalOpen(false); setFormState('idle'); setZiel(""); setIsDropdownOpen(false); }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              >
                <button 
                  onClick={() => { setIsModalOpen(false); setFormState('idle'); setZiel(""); setIsDropdownOpen(false); }}
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
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bereit für Ihren professionellen Online-Auftritt?</h3>
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

                        <div className="space-y-2 relative z-20">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Was ist Ihr aktuelles Ziel?</label>
                          
                          <div 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full flex items-center justify-between bg-gray-50 dark:bg-gray-950 border ${isDropdownOpen ? 'border-teal-500 ring-1 ring-teal-500' : 'border-gray-200 dark:border-gray-800'} rounded-xl px-4 py-3 cursor-pointer transition-all group hover:border-teal-400`}
                          >
                            <div className="flex flex-col">
                              <span className={ziel ? "text-gray-900 dark:text-white font-medium text-sm" : "text-gray-400 dark:text-gray-700 text-sm"}>
                                {ziel === "neue_website" ? "Komplett neue Website" : 
                                 ziel === "modernisierung" ? "Bestehende Website modernisieren" : 
                                 ziel === "beratung" ? "Wir sind uns unsicher" : "Bitte auswählen..."}
                              </span>
                              {ziel && (
                                <span className="text-xs text-teal-600 dark:text-teal-500 mt-0.5">
                                  {ziel === "neue_website" ? "Startpaket für 599 €" : 
                                   ziel === "modernisierung" ? "Individuelles Angebot" : "Kostenlose Erstberatung"}
                                </span>
                              )}
                            </div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDropdownOpen ? 'bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400' : 'bg-gray-100 dark:bg-gray-900 text-gray-400 group-hover:text-teal-500'}`}>
                              <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                <motion.div 
                                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl z-30 overflow-hidden"
                                >
                                  {[
                                    { id: "neue_website", title: "Komplett neue Website", desc: "Startpaket für 599 €" },
                                    { id: "modernisierung", title: "Bestehende Website modernisieren", desc: "Individuelles Angebot" },
                                    { id: "beratung", title: "Wir sind uns unsicher", desc: "Kostenlose Erstberatung" }
                                  ].map((option) => (
                                    <div 
                                      key={option.id}
                                      onClick={() => {
                                        setZiel(option.id);
                                        setIsDropdownOpen(false);
                                      }}
                                      className={`px-4 py-3 cursor-pointer transition-colors border-l-2 relative overflow-hidden group ${ziel === option.id ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-500/10' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                    >
                                      <div className={`font-semibold text-sm transition-colors ${ziel === option.id ? 'text-teal-600 dark:text-teal-400' : 'text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400'}`}>{option.title}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.desc}</div>
                                    </div>
                                  ))}
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                          
                          {/* Hidden input for HTML5 required validation */}
                          <input type="text" name="ziel" value={ziel} onChange={() => {}} required className="absolute opacity-0 w-0 h-0" tabIndex={-1} />
                        </div>

                        <AnimatePresence>
                          {ziel === "modernisierung" && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              className="space-y-2 overflow-hidden"
                            >
                              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Link zur aktuellen Website (Optional)</label>
                              <input name="website_link" type="text" placeholder="www.ihre-website.de" className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-700" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button 
                          disabled={formState === 'loading'}
                          type="submit" 
                          className="w-full bg-teal-500 hover:bg-teal-400 text-gray-950 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                        >
                          {formState === 'loading' ? (
                            <><Loader2 size={20} className="animate-spin text-gray-950" /> Anfrage wird gesendet...</>
                          ) : (
                            <>Jetzt unverbindlich anfragen <Send size={20} /></>
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Activity size={14} />
                <span>Nicht für Design-Awards</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] text-gray-900 dark:text-white uppercase">
                Ihr Webauftritt verbrennt Budget. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500">
                  Wir ändern das.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl font-medium">
                Kein Bullshit, kein "Vibe-Design". Wir programmieren rasante Web-Lösungen, die exakt eine Aufgabe haben: Ihre Conversion-Rate messbar nach oben zu skalieren.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  Daten statt Bauchgefühl
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  Sub-0.5s Ladezeiten
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-400">
                  <CheckCircle size={16} className="text-teal-500 dark:text-teal-400" />
                  A/B-getestete Layouts
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-gray-950 px-8 py-4 rounded-none border border-teal-400 font-bold transition-all shadow-[4px_4px_0px_rgba(20,184,166,0.3)] hover:shadow-[6px_6px_0px_rgba(20,184,166,0.5)] flex items-center gap-2 text-lg hover:-translate-y-0.5 hover:-translate-x-0.5">
                  Engpässe identifizieren <ChevronRight size={20} />
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
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 dark:from-teal-500/20 to-transparent blur-2xl -z-10 transform-gpu"></div>
              <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] relative overflow-hidden ${isMounted ? 'transition-colors duration-500' : ''}`}>
                
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg flex items-center gap-2 font-mono">
                      <Zap className="text-teal-500 dark:text-teal-400" size={20} /> Performance Audit
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Harte Fakten statt "schönes Design"</p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 px-3 py-1 text-xs font-bold border border-teal-200 dark:border-teal-500/20 uppercase tracking-widest font-mono">
                    Real-Time
                  </div>
                </div>

                <div className="flex justify-center mb-10">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" className="stroke-gray-100 dark:stroke-gray-800 fill-none stroke-[4]"></circle>
                      <motion.circle 
                        initial={{ strokeDasharray: "0 300" }}
                        animate={{ strokeDasharray: "283 300" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        cx="50" cy="50" r="45" 
                        className="stroke-teal-500 dark:stroke-teal-400 fill-none stroke-[4] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] dark:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                        strokeLinecap="round"
                      ></motion.circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-extrabold text-gray-900 dark:text-white font-mono">99</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-bold tracking-widest mt-1">SCORE</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Ladezeit (FCP)", value: "0.4s", color: "text-teal-600 dark:text-teal-400" },
                    { label: "DOM Size", value: "< 400", color: "text-teal-600 dark:text-teal-400" },
                    { label: "Layout Shift", value: "0.00", color: "text-teal-600 dark:text-teal-400" }
                  ].map((metric, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium font-mono">{metric.label}</span>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-tight">Warum <span className="text-teal-500 dark:text-teal-400">Nexora?</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Weil schöne Bilder allein nichts verkaufen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-none relative group transition-colors duration-500 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(20,184,166,0.2)]">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-none flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <Activity size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-mono tracking-tight">Daten statt Bauchgefühl</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir raten nicht, welche Layouts konvertieren. Wir stützen Design-Entscheidungen auf A/B-Tests, Heatmaps und Verhaltenspsychologie.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-none relative group transition-colors duration-500 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(20,184,166,0.2)]">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-none flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <Code size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-mono tracking-tight">Millisekunden-Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Keine Baukästen wie WordPress. Durch Maßanfertigungen in React drücken wir Ihre Ladezeiten unter 0.5s und sichern Top-Rankings.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-none relative group transition-colors duration-500 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(20,184,166,0.2)]">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-500/10 rounded-none flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 border border-teal-200 dark:border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white dark:group-hover:text-gray-950 transition-colors">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-mono tracking-tight">Psychologisches Interface</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Unsere Layouts folgen strengen Verhaltensmustern (F-Pattern). Wir reduzieren kognitive Last und führen das Auge direkt zur Conversion.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Process Timeline */}
        <section id="prozess" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-tight">Der <span className="text-teal-500 dark:text-teal-400">Conversion-First</span>-Prozess</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Kein Standard 1-2-3-Ablauf. Eine ingenieurmäßige Herangehensweise an Ihr Webdesign.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target size={28} />, title: "01. Das Audit", desc: "Wir sezieren Ihr Setup. Wir identifizieren den stärksten Drop-off-Point und liefern eine schonungslose Einschätzung." },
              { icon: <PenTool size={28} />, title: "02. Der Prototyp", desc: "Ein reines Struktur-Wireframe. Keine Farben, nur die nackte Architektur und Logik, wie Ihr Besucher zum Käufer wird." },
              { icon: <Code size={28} />, title: "03. High-Performance", desc: "Programmierung der Maßanfertigung. Headless-CMS, Mobile-First und Code, der auf 99+ Lighthouse Scores trimmt." },
              { icon: <TrendingUp size={28} />, title: "04. Data & Iteration", desc: "Nach dem Launch messen wir harte KPIs (CPL, Bounce Rate) und iterieren das Design basierend auf echten Nutzerdaten." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-none relative overflow-hidden group transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(20,184,166,0.2)]"
              >
                <div className="w-14 h-14 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 transition-all group-hover:bg-teal-500 group-hover:text-gray-950 group-hover:border-teal-500">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-mono tracking-tight">{step.title}</h3>
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
              <div className="bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transition-colors duration-500">
                <div className="mb-6 border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">"Unsere Cost-per-Lead hat sich halbiert."</h4>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium">"Als IT-Dienstleister hatten wir Traffic, aber extrem wenig Anfragen. Nexora hat die Informationsarchitektur unserer Angebotsseiten komplett verändert. Die Ladezeit fiel von 3.4s auf 0.6s. Innerhalb von 3 Monaten stiegen unsere qualifizierten Leads um 140%, während unsere Google-Ads-Kosten pro Lead um 50% gesunken sind."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 font-mono">
                    MS
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Michael S.</p>
                    <p className="text-sm text-gray-500 font-mono">CEO, DataTech Solutions</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transition-colors duration-500">
                <div className="mb-6 border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">"Endlich verstehen die Kunden in 3 Sekunden, was wir tun."</h4>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium">"Unsere alte Seite war ein klassisches Agentur-Template voller Fachbegriffe. Das Nexora-Team hat unsere komplexe Dienstleistung so übersetzt, dass die Absprungrate sofort um 35% gesunken ist. Das Interface führt die Besucher jetzt logisch zum Beratungsgespräch. Eine Investition, die sich sofort rentiert hat."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 font-mono">
                    SK
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Sarah K.</p>
                    <p className="text-sm text-gray-500 font-mono">Head of Marketing, Industrieanlagen Müller</p>
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

        {/* 5.5 Brand / Haltung */}
        <section className="py-24 bg-gray-950 text-white border-t border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tight text-white">Keine typische Agentur.<br /><span className="text-teal-400">Und darauf sind wir stolz.</span></h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-6 text-left md:text-center font-medium">
              Wir haben NexoraStudios gegründet, weil wir es satt hatten, wie Webdesign heute oft funktioniert: Agenturen verkaufen hübsche Templates, werfen sie über den Zaun und lassen den Kunden mit der ausbleibenden Conversion allein.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed text-left md:text-center font-medium">
              Wir sind eine Taskforce aus Daten-Nerds, Verkaufspsychologen und Code-Puristen. Wir sprechen in Meetings weniger über "Vibes" und deutlich mehr über Cost-per-Acquisition, Render-Zeiten und Nutzerfluss. Wenn Sie jemanden suchen, der Ihnen einfach nur ein nettes Bild auf eine Standard-Seite klatscht, sind wir die Falschen. Wenn Sie Ihren digitalen Auftritt als kompromisslose, messbare Vertriebsmaschine aufbauen wollen – lassen Sie uns reden.
            </p>
          </div>
        </section>

        {/* 6. Massive Conversion Footer (CTA) */}
        <footer className="relative bg-teal-500 overflow-hidden border-t border-teal-600">
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-950 mb-6 tracking-tight uppercase">
              Zeit für messbare Ergebnisse.
            </h2>
            <p className="text-xl text-gray-900/80 mb-10 font-medium max-w-2xl mx-auto">
              Lassen Sie uns herausfinden, warum Ihre aktuelle Seite nicht konvertiert – und wie wir das ändern.
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="group relative inline-flex items-center justify-center bg-gray-950 text-white px-8 py-5 rounded-none font-bold text-lg overflow-hidden transition-transform hover:-translate-y-1 hover:-translate-x-1 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
              <span className="relative flex items-center gap-3 font-mono tracking-tight">
                Engpass-Analyse starten <ChevronRight size={20} className="text-teal-400" />
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
