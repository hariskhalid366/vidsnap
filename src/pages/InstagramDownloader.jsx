import PageLayout from './PageLayout'
import { Link } from 'react-router-dom'

const features = [
  { icon: '📸', title: 'Reels', desc: 'Download Instagram Reels in full quality without watermarks.' },
  { icon: '🎬', title: 'IGTV & Feed Videos', desc: 'Save IGTV episodes and feed videos from public profiles.' },
  { icon: '✂️', title: 'No Watermark', desc: 'All downloads are clean — no visible logo or branding added.' },
  { icon: '📱', title: 'Mobile Compatible', desc: 'Works perfectly on mobile browsers for on-the-go saving.' },
]

export default function InstagramDownloader() {
  return (
    <PageLayout
      title="Instagram Video Downloader"
      subtitle="Download Instagram Reels, IGTV, and feed videos without watermarks for free."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 60 }}>
        {features.map(f => (
          <div key={f.title} className="glass-card" style={{ padding: 28 }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ padding: 40, marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 20 }}>How to Download Instagram Videos</h2>
        <ol style={{ paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Open the Instagram post / Reel on instagram.com and copy the URL.</li>
          <li>Paste the URL into VidSnap's input field.</li>
          <li>Click "Get Video" and choose your quality.</li>
          <li>The video downloads directly to your device.</li>
        </ol>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 36px', borderRadius: 999, fontWeight: 700 }}>
          ↓ Download Instagram Videos
        </Link>
      </div>
    </PageLayout>
  )
}
