import PageLayout from './PageLayout'

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', emoji: '👨‍💻' },
  { name: 'Maria Chen', role: 'Lead Engineer', emoji: '👩‍💻' },
  { name: 'James Okafor', role: 'Design Lead', emoji: '🎨' },
  { name: 'Sofia Patel', role: 'Backend Developer', emoji: '⚙️' },
]

const values = [
  { icon: '🆓', title: 'Always Free', desc: 'We believe everyone deserves access to their videos. VidSnap will always offer a free tier.' },
  { icon: '🔒', title: 'Privacy First', desc: 'We never store your downloaded videos or any personally identifiable data on our servers.' },
  { icon: '⚡', title: 'Speed & Reliability', desc: "Powered by yt-dlp, we support 1,100+ platforms and are updated weekly to stay ahead of changes." },
  { icon: '🌍', title: 'Global Access', desc: 'VidSnap is accessible worldwide with no geo-restrictions on our service.' },
]

export default function AboutUs() {
  return (
    <PageLayout
      title="About VidSnap"
      subtitle="We're on a mission to make video downloading simple, fast, and free for everyone."
    >
      {/* Mission */}
      <div className="glass-card" style={{ padding: 40, marginBottom: 48, textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚡</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 16 }}>Our Mission</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          VidSnap was built in 2024 by a small team of developers frustrated with paywalled and feature-limited video downloaders. 
          We created an open, fast, and completely free tool powered by <strong>yt-dlp</strong> — the most trusted video extraction 
          engine on the planet. Today we serve <strong>millions of downloads</strong> monthly with zero compromises.
        </p>
      </div>

      {/* Values */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 24, textAlign: 'center' }}>Our Values</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 60 }}>
        {values.map(v => (
          <div key={v.title} className="glass-card" style={{ padding: 28 }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{v.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 24, textAlign: 'center' }}>Meet the Team</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
        {team.map(t => (
          <div key={t.name} className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>{t.emoji}</div>
            <div style={{ fontWeight: 700 }}>{t.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{t.role}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
