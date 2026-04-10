export default function Header() {
  return (
    <header style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="brand-logo">
            Werkstatt<span style={{ color: 'var(--brand-cyan)' }}>Web</span>
          </div>
          <div style={{ display: 'none', borderLeft: '1px solid var(--border-glass)', paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }} className="hide-on-mobile">
            Webdesign speziell für freie KFZ-Betriebe
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="tel:01621234567" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--brand-cyan)' }}>📞</span> <span className="hide-on-mobile">0162 123 4567</span>
          </a>
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Rückruf anfordern</a>
        </nav>
        
      </div>
      <style>{`
        @media (max-width: 600px) {
          .hide-on-mobile { display: none !important; }
        }
        @media (min-width: 601px) {
          .hide-on-mobile { display: flex; }
        }
      `}</style>
    </header>
  );
}
