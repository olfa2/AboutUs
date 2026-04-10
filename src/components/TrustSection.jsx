import { motion } from 'framer-motion';

export default function TrustSection() {
  return (
    <section id="ueber-uns" className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}
         >
           
           <div>
              <div className="badge" style={{ marginBottom: '1rem' }}>Über Uns</div>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Warum <span className="text-gradient">wir?</span></h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 400, marginBottom: '1rem' }}>
                Werkstätten werden von Agenturen oft über den Tisch gezogen mit teuren, komplizierten Systemen.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Ihr Alltag ist stressig. Sie brauchen jemanden, der das Problem schnell, zuverlässig und ohne Bullshit aus der Welt schafft. Genau dafür sind wir da.
              </p>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
               <h3 style={{ fontSize: '3.5rem', color: 'var(--brand-cyan)', marginBottom: '0.5rem', lineHeight: 1 }}>100%</h3>
               <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 400 }}>Fokus auf KFZ & Handwerk</h4>
             </div>
             
             <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
               <h3 style={{ fontSize: '3.5rem', color: 'var(--brand-cyan)', marginBottom: '0.5rem', lineHeight: 1 }}>0</h3>
               <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 400 }}>Versteckte Kosten oder IT-Jargon</h4>
             </div>
           </div>
           
         </motion.div>
      </div>
    </section>
  );
}
