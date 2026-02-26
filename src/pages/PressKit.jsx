import PageLayout from './PageLayout'

const assets = [
  { label: 'Primary Logo (SVG)', desc: 'Dark and light variants, vector format.', size: '12KB' },
  { label: 'App Screenshots', desc: 'High-resolution UI shots of VidSnap in use.', size: '2.4MB' },
  { label: 'Brand Guidelines PDF', desc: 'Typography, colors, and usage rules.', size: '380KB' },
  { label: 'Press Release', desc: 'Latest announcement for journalists.', size: '24KB' },
]

export default function PressKit() {
  return (
    <PageLayout
      title="Press Kit"
      subtitle="Everything journalists, bloggers, and content creators need to feature VidSnap."
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* About Blurb */}
        <div className="glass-card" style={{ padding: 36, marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 16 }}>About VidSnap</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            VidSnap is a free, open-source-powered video downloader serving millions of users globally. Supporting 1,100+ platforms including YouTube, TikTok, Facebook, and Instagram, VidSnap delivers high-quality downloads without watermarks, paywalls, or registrations. Founded in 2024, VidSnap is trusted by content creators, educators, and everyday users worldwide.
          </p>
        </div>

        {/* Key Facts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
          {[['50M+', 'Monthly Downloads'], ['1,100+', 'Supported Sites'], ['4.9★', 'User Rating']].map(([stat, label]) => (
            <div key={label} className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Downloads */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 20 }}>Media Assets</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {assets.map(a => (
            <div key={a.label} className="glass-card" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{a.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginTop: 3 }}>{a.desc} · {a.size}</div>
              </div>
              <button style={{ background: 'var(--gradient-brand)', border: 'none', color: 'white', padding: '8px 20px', borderRadius: 999, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 }}>
                ↓ Download
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>For interviews, media inquiries, or custom requests:</p>
          <a href="mailto:hariskhalid366@gmail.com" style={{ color: 'var(--purple)', fontWeight: 700, textDecoration: 'none' }}>hariskhalid366@gmail.com</a>
        </div>
      </div>
    </PageLayout>
  )
}
