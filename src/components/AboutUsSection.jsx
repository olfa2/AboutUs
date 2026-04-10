export default function AboutUsSection() {
  return (
    <section className="section" id="ueber-uns">
      <div className="container">
         <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div className="badge" style={{ marginBottom: '2rem' }}>Über Uns</div>
            <h2 style={{ marginBottom: '2rem' }}>Warum <span className="text-gradient-brand">wir?</span></h2>
            
            <p style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 500, marginBottom: '2rem', lineHeight: 1.4 }}>
              Wir haben gemerkt, dass Werkstätten oft von Webagenturen über den Tisch gezogen werden.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', maxWidth: '600px' }}>
              Ihnen werden überteuerte Systeme verkauft, die niemand bedienen kann und die am Ende doch keine Kunden bringen. Wir haben uns darauf spezialisiert, genau das Gegenteil zu machen: Ehrliche, direkte Arbeit.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px' }}>
              Ihr Arbeitsalltag ist stressig genug. Sie brauchen jemanden, der das Problem schnell, zuverlässig und ohne Sie täglich zu nerven aus der Welt schafft.
            </p>
         </div>
      </div>
    </section>
  );
}
