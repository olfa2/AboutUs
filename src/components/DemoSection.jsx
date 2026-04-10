import { motion } from 'framer-motion';

export default function DemoSection() {
  return (
    <section className="section text-center" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="badge"
        >
          Das Resultat
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '1.5rem' }}
        >
          So könnte <span className="text-gradient">Ihre Webseite</span> aussehen
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ marginBottom: '4rem', fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 4rem' }}
        >
          Eine klare Struktur, direkt die Telefonnummer im Fokus und alle Leistungen auf einen Blick.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ perspective: '1000px' }}
        >
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), 0 0 50px rgba(0, 240, 255, 0.1)', maxWidth: '1000px', margin: '0 auto', background: 'var(--bg-glass)' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#333' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#555' }}></div>
            </div>
            <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden', backgroundImage: 'url("/mockup.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(2px)' }}>
                 <motion.h3 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.5 }}
                   style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}
                 >
                   Mausklick zum Erfolg
                 </motion.h3>
                 <motion.p 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.8 }}
                   style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '1.5rem' }}
                 >
                   Eine Seite, die sofort klarmacht: "Hier wird kompetent geschraubt."
                 </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-3" style={{ marginTop: '4rem', textAlign: 'left' }}>
          {[
            { title: '1. Leistungen direkt sichtbar', desc: 'Keine Romane. Wir zeigen Inspektion, TÜV auf einen Blick.' },
            { title: '2. Bewertungen als Beweis', desc: 'Ihre guten Google-Rezensionen direkt auf der Webseite eingebunden.' },
            { title: '3. Termin per Klick', desc: 'Klare "Termin vereinbaren" Buttons sorgen dafür, dass Kunden anrufen.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.15) }}
              className="glass-card"
            >
              <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
