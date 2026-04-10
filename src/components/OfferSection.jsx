import { motion } from 'framer-motion';

export default function OfferSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="angebot" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '500px', background: 'radial-gradient(ellipse, rgba(0, 240, 255, 0.05), transparent 60%)', zIndex: -1, pointerEvents: 'none' }}></div>

      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Ehrliche Preise</div>
          <h2 style={{ marginBottom: '1.5rem' }}>
            Ihre neue Website – Eine <span className="text-gradient">Investition</span>, die sich refinanziert
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center" style={{ fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', color: 'var(--text-muted)' }}
        >
          Eine gute Website ist keine reine Ausgabe. Unser Ziel ist nicht einfach nur ein hübsches Design, sondern dass Ihr Telefon öfter klingelt.
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-3" style={{ alignItems: 'center', marginBottom: '3rem' }}
        >
          
          {/* Option 1 */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '3rem 2rem', borderTop: '2px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Der schnelle Start</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', minHeight: '48px' }}>Einfach, solide und direkt online sichtbar.</p>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>600 – 800 € <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>einmalig</span></div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Einfache Website</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Visitenkarte im Netz</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Schnell online</span>
              </li>
            </ul>
          </motion.div>

          {/* Option 2 (Empfehlung) */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '4rem 2.5rem', border: '1px solid var(--brand-cyan)', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,240,255,0.05)', backgroundColor: 'rgba(10, 15, 30, 0.7)', position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--brand-cyan)', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em' }}>
              UNSERE EMPFEHLUNG
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#fff' }}>Der Kunden-Magnet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', minHeight: '60px' }}>Haben Sie durch die neue Seite auch nur 2-3 neue Reparaturen im Jahr, hat sich das Ganze schon bezahlt gemacht.</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--brand-cyan)', marginBottom: '2rem', textShadow: '0 0 20px rgba(0,240,255,0.4)' }}>900 – 1.500 € <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)', textShadow: 'none' }}>einmalig</span></div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--brand-cyan)' }}>✔</span> <span style={{ color: '#fff', fontWeight: 500 }}>Optimiert für mehr Anfragen</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--brand-cyan)' }}>✔</span> <span style={{ color: '#fff', fontWeight: 500 }}>Bessere Struktur für Kunden</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--brand-cyan)' }}>✔</span> <span style={{ color: '#fff', fontWeight: 500 }}>Google-Basisoptimierung inkl.</span>
              </li>
            </ul>
            <a href="#kontakt" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>Das passt für mich</a>
          </motion.div>
          
          {/* Option 3 */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '3rem 2rem', borderTop: '2px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Das Komplettpaket</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', minHeight: '48px' }}>Wenn Sie in Ihrer Region die absolute Nummer 1 sein wollen.</p>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>1.500 – 2.500 € <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>einmalig</span></div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Umfangreichere Website</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Viel mehr Inhalte & Platz</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#00f0ff' }}>✔</span> <span style={{ color: '#fff' }}>Stärkere lokale Optimierung</span>
              </li>
            </ul>
          </motion.div>

        </motion.div>
        
        {/* Zusatz & Garantie */}
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "0px" }}
           transition={{ duration: 0.6, delay: 0.2 }}
           style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}
        >
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ color: 'var(--text-main)', fontSize: '1.125rem' }}>
              <strong style={{ color: 'var(--brand-cyan)' }}>Dauerhafte Pflege (Optional): +49 € / Monat.</strong><br/>
              <span style={{ color: 'var(--text-muted)' }}>Sie schrauben an Autos, wir an der Website. Wir kümmern uns um Server und alle Updates, Sie haben null Arbeit. Kein Stress.</span>
            </div>
          </div>
          
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: '#10B981', fontSize: '2rem' }}>🛡️</div>
            <div>
              <strong style={{ color: '#10B981', fontSize: '1.125rem', display: 'block' }}>Unser Risiko-Schutz (Zufriedenheitsgarantie):</strong>
              <span style={{ color: 'var(--text-muted)' }}>Sie zahlen den vollen Preis erst, wenn Ihnen der finale Entwurf zu 100% gefällt.</span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
