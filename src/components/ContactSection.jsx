import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Wir brauchen eine neue Website',
    budget: 'Der Kunden-Magnet (ab 900 €)',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success
  
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  
  const serviceRef = useRef(null);
  const budgetRef = useRef(null);

  const services = [
    'Wir brauchen eine neue Website',
    'Bestehende Website überarbeiten',
    'Wir werden auf Google nicht gefunden',
    'Sonstiges (Beratung gewünscht)'
  ];

  const budgets = [
    'Der schnelle Start (ab 600 €)',
    'Der Kunden-Magnet (ab 900 €)',
    'Das Komplettpaket (ab 1.500 €)',
    'Nur Überarbeitung (ab 300 €)',
    'Noch unsicher / Beratung'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) setIsServiceOpen(false);
      if (budgetRef.current && !budgetRef.current.contains(event.target)) setIsBudgetOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Bitte geben Sie Ihren Namen oder Werkstatt ein.';
    if (!formData.phone.trim()) tempErrors.phone = 'Bitte geben Sie eine Telefonnummer an.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Bitte geben Sie Ihre E-Mail Adresse ein.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Bitte geben Sie eine gültige E-Mail Adresse ein.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/oliver.reim@hotmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `Neue Anfrage: ${formData.service}`,
            Name: formData.name,
            Telefon: formData.phone,
            Email: formData.email,
            Hilfe_bei: formData.service,
            Interesse_an: formData.budget,
            Nachricht: formData.message || 'Keine weitere Nachricht'
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: 'Wir brauchen eine neue Website', budget: 'Der Kunden-Magnet (ab 900 €)', message: '' });
        setErrors({});
      } else {
        throw new Error('Senden fehlgeschlagen');
      }
    } catch (error) {
      console.error(error);
      alert('Entschuldigung, es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut.');
      setStatus('idle');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null }); 
    }
  };

  return (
    <section id="kontakt" className="section" style={{ position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse, rgba(0, 240, 255, 0.05), transparent 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

      <div className="container">
        
        <div className="grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge" style={{ marginBottom: '1.5rem' }}>Projekt Starten</div>
            <h2 style={{ marginBottom: '1.5rem' }}>Lassen Sie uns <br/><span className="text-gradient-brand">loslegen.</span></h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '500px' }}>
              Keine endlosen Meetings. Hinterlassen Sie einfach kurz Ihre Daten. Wir rufen Sie an, schauen ob es passt und machen Ihnen ein klares Angebot.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: '#00f0ff', background: 'rgba(0,240,255,0.1)', padding: '1rem', borderRadius: '50%' }}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>Rückruf-Garantie</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>Innerhalb von 24 Stunden</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: '#00f0ff', background: 'rgba(0,240,255,0.1)', padding: '1rem', borderRadius: '50%' }}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>E-Mail</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>hallo@werkstatt-web.de</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card" style={{ padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 30px rgba(0, 240, 255, 0.05)', overflow: 'visible' }}
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{ color: '#10B981', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="64" height="64"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 style={{ marginBottom: '1rem' }}>Anfrage gesendet!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Wir haben Ihre Nachricht erhalten und melden uns in Kürze telefonisch bei Ihnen.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-secondary" style={{ marginTop: '2rem' }}>Weitere Nachricht senden</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Name / Werkstatt</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.name ? '#ef4444' : 'var(--border-glass)'}`, padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                           <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Telefonnummer</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.phone ? '#ef4444' : 'var(--border-glass)'}`, padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                           <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.phone}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>E-Mail Adresse</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${errors.email ? '#ef4444' : 'var(--border-glass)'}`, padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} />
                  <AnimatePresence>
                      {errors.email && (
                        <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                           <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Service Dropdown (Full width now because budget is moved below) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }} ref={serviceRef}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Was benötigen Sie?</label>
                    <div onClick={() => setIsServiceOpen(!isServiceOpen)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formData.service}</span>
                      <motion.svg animate={{ rotate: isServiceOpen ? 180 : 0 }} transition={{ duration: 0.2 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16" style={{ flexShrink: 0, marginLeft: '8px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                      </motion.svg>
                    </div>
                    <AnimatePresence>
                      {isServiceOpen && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: '#0a0f1d', border: '1px solid var(--border-glass)', borderRadius: '8px', zIndex: 20, marginTop: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                          {services.map((item, index) => (
                            <div key={index} onClick={() => { setFormData({...formData, service: item}); setIsServiceOpen(false); }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'} style={{ padding: '1rem', cursor: 'pointer', fontSize: '0.875rem', color: '#fff', borderBottom: index < services.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                              {item}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Visual Budget Selection Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Preislicher Rahmen / Gewünschtes Paket</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '0.25rem' }}>
                      {budgets.map((item, index) => {
                        const isSelected = formData.budget === item;
                        return (
                          <div 
                            key={index}
                            onClick={() => setFormData({...formData, budget: item})}
                            style={{ 
                              background: isSelected ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.03)', 
                              border: `1px solid ${isSelected ? 'var(--brand-cyan)' : 'var(--border-glass)'}`, 
                              padding: '0.75rem 0.5rem', 
                              borderRadius: '8px', 
                              color: isSelected ? '#fff' : 'var(--text-muted)', 
                              textAlign: 'center',
                              fontSize: '0.875rem', 
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '60px'
                            }}
                          >
                            <span style={{ lineHeight: 1.2 }}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Nachricht (optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'none' }}></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'Wird gesendet...' : 'Kostenlose Analyse anfragen'}
                </button>
              </form>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
