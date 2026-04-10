export default function ConsequencesSection() {
  return (
    <section className="section text-center" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Die <span className="text-gradient">harte Realität</span></h2>
        <p style={{ fontSize: '1.5rem', marginBottom: '4rem' }}>Ohne überzeugende Website passieren jeden Tag drei Dinge in Ihrer Werkstatt:</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem', fontWeight: 800 }}>X</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Verlorene Anfragen</h3>
              <p style={{ margin: 0 }}>Autofahrer suchen online. Wenn Sie nicht da sind, klingelt das Telefon bei der Konkurrenz.</p>
            </div>
          </div>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem', fontWeight: 800 }}>X</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Schlechter erster Eindruck</h3>
              <p style={{ margin: 0 }}>Eine veraltete Seite wirkt unprofessionell. Kunden fragen sich: "Wird mein Auto hier genauso veraltet behandelt?"</p>
            </div>
          </div>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem', fontWeight: 800 }}>X</div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Verlorenes Vertrauen</h3>
              <p style={{ margin: 0 }}>Kunden vergleichen Mechaniker online. Ohne klare Preise oder Leistungen bleibt Unsicherheit.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
