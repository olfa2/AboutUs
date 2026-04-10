export default function Footer() {
  return (
    <footer className="section" style={{ padding: '2rem 0', borderTop: '1px solid var(--border-glass)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
           <div className="brand-logo" style={{ color: 'var(--text-muted)' }}>
             Werkstatt<span style={{ color: 'var(--brand-cyan)' }}>Web</span>
           </div>
           
           <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem' }}>
             <a href="#" style={{ color: 'var(--text-muted)' }}>Impressum</a>
             <a href="#" style={{ color: 'var(--text-muted)' }}>Datenschutz</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
