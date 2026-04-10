import { motion } from 'framer-motion';

export default function ProblemSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="section">
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}
        >
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>
              Hand aufs Herz: <br/>
              <span className="text-gradient">Entgeht Ihnen bares Geld?</span>
            </h2>
            <p style={{ fontSize: '1.25rem', maxWidth: '600px' }}>Ohne überzeugende Website passieren jeden Tag drei Dinge in Ihrer Werkstatt.</p>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}
        >
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ color: '#00f0ff', marginBottom: '1rem' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="32" height="32"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>1. Sie sind unsichtbar</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>Jemand sucht nach "Bremsen wechseln". Sie tauchen nicht auf? Die Konkurrenz freut sich über den Neukunden.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ color: '#00f0ff', marginBottom: '1rem' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="32" height="32"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>2. Veralteter Eindruck</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>80% suchen am Smartphone. Wenn Ihre Seite kaputt aussieht, denken Kunden, Sie arbeiten genauso.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="32" height="32"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>3. Verlorenes Vertrauen</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>Andere Werkstätten wirken moderner, obwohl SIE besser sind. Ohne klare Leistungen bucht niemand online.</p>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
