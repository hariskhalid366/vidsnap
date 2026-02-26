import PageLayout from './PageLayout'
import { Link } from 'react-router-dom'

const qualities = [
  { label: 'MP3 320kbps', note: 'Best quality — ideal for audiophiles and music production.', badge: '🔥 BEST' },
  { label: 'MP3 192kbps', note: 'Great quality — perfect for music listening on the go.', badge: '⭐ POPULAR' },
  { label: 'MP3 128kbps', note: 'Smaller file size — great for podcasts or speech content.', badge: '' },
]

export default function Mp3Converter() {
  return (
    <PageLayout
      title="MP3 Converter"
      subtitle="Convert any online video to MP3 audio in seconds — free, high-quality, no registration."
    >
      {/* Quality options */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 24, textAlign: 'center' }}>Available Audio Qualities</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600, margin: '0 auto 60px' }}>
        {qualities.map(q => (
          <div key={q.label} className="glass-card" style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{q.label}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{q.note}</div>
            </div>
            {q.badge && (
              <span style={{ background: 'var(--gradient-brand)', padding: '4px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>
                {q.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="glass-card" style={{ padding: 40, marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 16 }}>Supported Platforms</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Our MP3 converter supports audio extraction from <strong>YouTube</strong>, <strong>SoundCloud</strong>,{' '}
          <strong>Facebook</strong>, <strong>Instagram</strong>, <strong>TikTok</strong>, <strong>Vimeo</strong>,{' '}
          <strong>Twitch</strong>, and 1,000+ other platforms.
        </p>
        <h3 style={{ marginTop: 28, marginBottom: 12 }}>How to Convert Video to MP3</h3>
        <ol style={{ paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Copy the URL of any video you want to convert.</li>
          <li>Paste it into VidSnap's input on the homepage.</li>
          <li>Switch to the "🎵 Audio Only" tab in the results.</li>
          <li>Select 320kbps, 192kbps, or 128kbps and click Download.</li>
        </ol>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 36px', borderRadius: 999, fontWeight: 700 }}>
          ↓ Convert to MP3 Now
        </Link>
      </div>
    </PageLayout>
  )
}
