import { useState } from 'react'

const PLATFORMS_DATA = [
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'Download YouTube videos in up to 4K',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    shadow: 'rgba(255,0,0,0.35)',
    features: ['4K & 8K Ultra HD', '1080p / 720p / 480p', 'MP3 Audio extraction', 'Shorts & playlists', 'No sign-in required'],
    placeholder: 'https://youtube.com/watch?v=...',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'Save Facebook videos & reels instantly',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5db3)',
    shadow: 'rgba(24,119,242,0.35)',
    features: ['Public & private videos', 'HD & SD quality', 'Reels & stories', 'Watch videos', 'No account needed'],
    placeholder: 'https://facebook.com/watch?v=...',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Download Instagram reels, posts & stories',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    shadow: 'rgba(225,48,108,0.35)',
    features: ['Reels in full HD', 'Photos & carousels', 'Story downloads', 'IGTV videos', 'Profile picture saver'],
    placeholder: 'https://instagram.com/reel/...',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'Save TikTok videos without watermark',
    color: '#69c9d0',
    gradient: 'linear-gradient(135deg, #010101, #2e2e2e)',
    shadow: 'rgba(105,201,208,0.35)',
    features: ['NO watermark removal', 'Original HD quality', 'Music & sound save', 'Slideshows & photos', 'Anonymous download'],
    placeholder: 'https://tiktok.com/@user/video/...',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
]

export default function Platforms() {
  const [active, setActive] = useState(0)
  const p = PLATFORMS_DATA[active]

  return (
    <section id="platforms" className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-purple" style={{ marginBottom: 16 }}>Supported Platforms</span>
          <h2>One Tool for <span className="gradient-text">Every Platform</span></h2>
          <p>Supports all major social media and video sharing platforms — more being added regularly.</p>
        </div>

        {/* Platform selector tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {PLATFORMS_DATA.map((pl, i) => (
            <button
              key={pl.id}
              onClick={() => setActive(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 24px',
                borderRadius: 999,
                border: active === i ? 'none' : '1.5px solid var(--border)',
                background: active === i ? pl.gradient : 'transparent',
                color: active === i ? 'white' : 'var(--text-secondary)',
                boxShadow: active === i ? `0 6px 24px ${pl.shadow}` : 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                transform: active === i ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{ color: active === i ? 'white' : pl.color }}>{pl.icon}</span>
              {pl.name}
            </button>
          ))}
        </div>

        {/* Active platform detail card */}
        <div
          key={p.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px',
            border: `1px solid ${p.color}33`,
            boxShadow: `0 8px 48px ${p.shadow}`,
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          <div>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: p.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: 24,
                boxShadow: `0 8px 24px ${p.shadow}`,
              }}
            >
              {p.icon}
            </div>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 12 }}>
              {p.name} <span className="gradient-text">Downloader</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 28, lineHeight: 1.7 }}>
              {p.tagline}. Download in the highest available quality, completely free and without any watermarks or limits.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <span style={{
                    width: 22, height: 22,
                    borderRadius: 6,
                    background: p.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: 'white', flexShrink: 0,
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Mock download preview */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Try it now
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input
                readOnly
                value={p.placeholder}
                style={{
                  flex: 1, padding: '10px 14px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  cursor: 'default',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['4K Ultra HD · MP4', '1080p Full HD · MP4', '720p HD · MP4', 'MP3 Audio · 320kbps'].map((fmt, i) => (
                <div
                  key={fmt}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: i === 0 ? `${p.color}18` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 0 ? p.color + '44' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {fmt}
                  <span style={{ fontSize: '1rem' }}>⬇</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
