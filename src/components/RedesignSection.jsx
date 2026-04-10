import { motion } from 'framer-motion';

export default function RedesignSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="ueberarbeitung" className="section" style={{ backgroundColor: '#020611', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Bestehende Website Optimieren</div>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '3rem' }}>
            Ihre aktuelle Website kostet Sie <span style={{ color: '#ef4444' }}>täglich Kunden</span>
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '4rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 4rem' }}>
            Sie haben schon eine Website, aber niemand ruft deswegen an? Das Problem ist oft nicht das Design, sondern dass Kunden wichtige Infos nicht direkt am Handy finden.
          </p>
        </motion.div>

        <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '5rem' }}>
          
          {/* Das Problem */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="glass-card" style={{ padding: '3rem', borderTop: '2px solid #ef4444' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Das Problem & Die Konsequenz</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Die Seite sieht veraltet aus & funktioniert schlecht am Handy.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Kunden suchen ewig nach der Telefonnummer.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Die Konkurrenz wirkt moderner, obwohl Sie besser schrauben.</span>
              </li>
            </ul>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
              <p style={{ margin: 0, color: '#fff', fontSize: '1rem' }}><strong>Die Folge:</strong> Ein schlechter erster Eindruck. Kunden springen genervt ab und Sie verlieren bares Geld.</p>
            </div>
          </motion.div>

          {/* Die Lösung */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="glass-card" style={{ padding: '3rem', borderTop: '2px solid #10B981' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Die Lösung & Das Ergebnis</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Wir räumen auf: Klare Struktur, modernes Design.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Leistungen & Kontakt stechen sofort ins Auge.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span> 
                <span style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Voller Fokus darauf, dass Besucher anrufen.</span>
              </li>
            </ul>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
              <p style={{ margin: 0, color: '#fff', fontSize: '1rem' }}><strong>Das Ergebnis:</strong> Sofort mehr Vertrauen, ein starker Eindruck und messbar mehr Anfragen für die Werkstatt.</p>
            </div>
          </motion.div>

        </div>

        {/* Pricing Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-3" style={{ alignItems: 'stretch', marginBottom: '4rem', gap: '1.5rem' }}
        >
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
            <div>
               <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Kleine Optimierung</h4>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Schneller Feinschliff & reine Anpassung fürs Smartphone.</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>ab ca. 300 – 600 €</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--brand-cyan)', background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.08) 0%, rgba(10, 15, 30, 0.4) 100%)', boxShadow: '0 10px 30px rgba(0, 240, 255, 0.05)', transform: 'scale(1.05)', zIndex: 10 }}>
            <div>
               <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.5rem' }}>DER STANDARD</div>
               <h4 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Komplette Überarbeitung</h4>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Frischer, moderner Look mit glasklarem Fokus auf Neukunden-Gewinnung.</p>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-cyan)' }}>Meist 600 – 1.200 €</div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
            <div>
               <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Größere Projekte</h4>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Komplett neues Branding, viel Textüberarbeitung & viele Unterseiten.</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Bis ca. 2.000 €</div>
          </motion.div>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Website kostenlos prüfen lassen</a>
          <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem' }}>Ich zeige Ihnen unverbindlich am Telefon, was man verbessern kann.</p>
        </motion.div>

      </div>
    </section>
  );
}
