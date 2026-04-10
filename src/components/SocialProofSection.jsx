import { motion } from 'framer-motion';

export default function SocialProofSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', background: 'linear-gradient(180deg, #020611 0%, #000 100%)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "0px" }}
           transition={{ duration: 0.8 }}
           className="text-center" style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem' }}>Aus der Praxis. <span className="text-gradient">Für die Praxis.</span></h2>
        </motion.div>

        <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
          
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px" }} className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', color: '#FBBF24', fontSize: '1.25rem', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "Endlich jemand, der Klartext redet. Keine versteckten Kosten, die Seite war in 2 Wochen live. Seitdem haben wir im Schnitt 4 telefonische Anfragen pro Woche mehr."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
               <div>
                 <strong style={{ display: 'block', color: '#fff' }}>Michael T.</strong>
                 <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>KFZ-Meisterbetrieb aus Hannover</span>
               </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px" }} className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', color: '#FBBF24', fontSize: '1.25rem', marginBottom: '1rem' }}>★★★★★</div>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "Unsere alte Seite sah furchtbar aus auf dem Handy. Das Team hat alles neu gemacht. Super Typen, einfache Kommunikation. Absolute Empfehlung!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>J</div>
               <div>
                 <strong style={{ display: 'block', color: '#fff' }}>Jürgen Schmidt</strong>
                 <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>AutoService Schmidt</span>
               </div>
            </div>
          </motion.div>

        </div>

        {/* Vorher/Nachher Teaser */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "0px" }}
           transition={{ duration: 0.8 }}
           className="glass-card" style={{ padding: '3rem', border: '1px solid var(--brand-cyan)', background: 'rgba(0, 240, 255, 0.03)' }}
        >
           <h3 style={{ fontSize: '1.5rem', color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>Kunden-Fallbeispiel: Autohaus Meier</h3>
           
           <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                 <strong style={{ display: 'block', color: '#ef4444', marginBottom: '0.5rem', fontSize: '1.25rem' }}>VORHER</strong>
                 <p style={{ color: 'var(--text-muted)', margin: 0 }}>15 Jahre alte Website, Kunden fanden die Telefonnummer auf dem Smartphone nicht.</p>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                 <strong style={{ display: 'block', color: '#10B981', marginBottom: '0.5rem', fontSize: '1.25rem' }}>NACHHER</strong>
                 <p style={{ color: '#fff', margin: 0 }}>Neues, klares Design für Handys. <br/>Ergebnis: <strong style={{ color: '#10B981' }}>+12% mehr Termine im ersten Monat</strong>, da Kunden direkt aus Google anrufen können.</p>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
