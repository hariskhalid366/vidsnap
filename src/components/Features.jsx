const FEATURES = [
  {
    icon: '⚡',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Lightning Fast',
    desc: 'Our optimized servers process and deliver your video in seconds. No waiting, no queues.',
  },
  {
    icon: '🚫',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.12)',
    title: 'Zero Watermarks',
    desc: 'Download TikTok and all platform videos completely clean without any watermarks or logos.',
  },
  {
    icon: '🎯',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    title: 'Multi-Quality',
    desc: 'Choose from 4K, 1080p, 720p, 480p video or MP3/AAC audio formats based on your needs.',
  },
  {
    icon: '🔒',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    title: '100% Safe',
    desc: 'No malware, no trackers, no sign-up required. We never store your downloaded files.',
  },
  {
    icon: '📱',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    title: 'All Devices',
    desc: 'Works perfectly on desktop, tablet, and mobile. Optimized for any screen size.',
  },
  {
    icon: '🆓',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    title: 'Always Free',
    desc: 'No hidden fees, no premium tiers. VidSnap is and will always be completely free.',
  },
  {
    icon: '🎵',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    title: 'Audio Extraction',
    desc: 'Extract MP3 audio from any video in 320kbps, 192kbps or 128kbps quality.',
  },
  {
    icon: '🌍',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
    title: 'No Country Blocks',
    desc: 'Access and download videos from anywhere in the world, no geo-restrictions.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.03), transparent)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge badge-purple" style={{ marginBottom: 16 }}>Why VidSnap?</span>
          <h2>Everything You Need to <span className="gradient-text">Download Videos</span></h2>
          <p>Powerful features packed into a simple, beautiful interface that just works.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: 28 }}>
              <div
                className="feature-icon"
                style={{ background: f.bg, fontSize: '1.6rem' }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
