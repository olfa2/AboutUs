import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="section text-center" style={{ display: 'flex', alignItems: 'center', paddingTop: '150px', paddingBottom: '40px' }}>
      <div className="bg-mesh"></div>
      
      <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="badge" style={{ background: 'rgba(0, 240, 255, 0.1)', borderColor: 'rgba(0, 240, 255, 0.2)' }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00f0ff', marginRight: '8px', boxShadow: '0 0 10px #00f0ff' }}></span>
          Spezialisiert auf freie KFZ-Werkstätten
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          style={{ marginBottom: '1.5rem', lineHeight: 1.15 }}
        >
          Mehr Anrufe. Volle Hebebühnen. <br/>
          <span className="text-gradient">Ohne IT-Kopfschmerzen.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ fontSize: '1.35rem', marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}
        >
          Wenn Kunden Ihre Werkstatt auf dem Handy suchen, muss alles sofort sitzen: Leistungen, Bewertungen, Telefonnummer. Wir bauen Ihnen genau so eine Seite – unkompliziert und zum fairen Preis.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <a href="#kontakt" className="btn btn-primary" style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)', border: 'none', background: 'var(--brand-cyan)', color: '#000' }}>
            Kostenlos Website checken lassen
          </a>
          <a href="#angebot" className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
            Preise & Pakete ansehen
          </a>
        </motion.div>

        {/* USP Box directly after CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'inline-block', textAlign: 'left' }}
        >
          <p style={{ fontSize: '1rem', color: '#fff', fontWeight: 600, margin: '0 0 1rem 0' }}>Unser Versprechen an Ihre Werkstatt:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-cyan)', fontSize: '1.25rem' }}>✔️</span>
                <span style={{ color: 'var(--text-muted)' }}><strong>Kein Fach-Chinesisch.</strong> Wir reden Klartext.</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-cyan)', fontSize: '1.25rem' }}>✔️</span>
                <span style={{ color: 'var(--text-muted)' }}><strong>Fester Preis.</strong> Garantiert keine versteckten Kosten.</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-cyan)', fontSize: '1.25rem' }}>✔️</span>
                <span style={{ color: 'var(--text-muted)' }}><strong>Perfekt fürs Handy.</strong> Damit jeder Kunde Sie findet.</span>
             </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
