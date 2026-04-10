import { motion } from 'framer-motion';

export default function SolutionSection() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className="container">
        
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="text-center" style={{ marginBottom: '5rem' }}
        >
          Die Lösung: <br/>
          <span className="text-gradient-brand">Wir regeln das für Sie.</span>
        </motion.h2>
        
        <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Eine Website, die als Ihr bester Verkäufer arbeitet</h3>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem' }}>Wir quatschen nicht über komplizierte Technik. Was Sie brauchen ist eine Webseite, die genau eins macht: Vertrauen aufbauen, damit das Telefon öfter klingelt.</p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {['Mehr Sichtbarkeit auf Google', 'Mehr Vertrauen durch einen professionellen Auftritt', 'Klare Struktur für mehr Anrufe'].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 500 }}
                >
                  <div style={{ color: '#000', background: '#fff', padding: '0.25rem', borderRadius: '50%' }}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="#kontakt" className="btn btn-primary" style={{ marginTop: '3rem' }}>Jetzt kostenlose Analyse anfragen</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="glass-card" style={{ padding: '4rem 3rem', borderLeft: '4px solid var(--text-main)', backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 60%)' }}
          >
             <p style={{ fontSize: '1.75rem', fontStyle: 'italic', margin: 0, color: '#fff', fontWeight: 300, lineHeight: 1.4 }}>
               "Unsere Webseite muss nicht schön sein, sie muss Kunden bringen."
             </p>
             <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--brand-cyan)' }}></div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Unser Versprechen</p>
             </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
