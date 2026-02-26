const STEPS = [
  {
    num: '1',
    icon: '📋',
    title: 'Copy the Video Link',
    desc: 'Open YouTube, Facebook, Instagram or TikTok. Find the video you want and copy its URL from the browser or share menu.',
  },
  {
    num: '2',
    icon: '🔗',
    title: 'Paste the URL',
    desc: 'Come back to VidSnap and paste the link into the search box at the top of the page. Click "Get Video".',
  },
  {
    num: '3',
    icon: '🎯',
    title: 'Choose Quality & Format',
    desc: 'Select your preferred video quality (4K, 1080p, 720p…) or switch to Audio tab to download MP3.',
  },
  {
    num: '4',
    icon: '⬇️',
    title: 'Download Instantly',
    desc: 'Hit the download button. Your video saves directly to your device, watermark-free and in full quality.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-purple" style={{ marginBottom: 16 }}>Simple Process</span>
          <h2>Download in <span className="gradient-text">4 Easy Steps</span></h2>
          <p>No technical knowledge required. Download any video in under 30 seconds.</p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                position: 'relative',
                padding: '28px 24px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-glow)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{
                  display: 'none', // hidden on mobile; shown via optional CSS
                }}/>
              )}
              <div className="step-number">{step.num}</div>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{step.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '14px 36px' }}
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ⚡ Try it Now — It's Free
          </button>
        </div>
      </div>
    </section>
  )
}
