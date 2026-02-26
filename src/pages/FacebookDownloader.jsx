import PageLayout from './PageLayout'
import { Link } from 'react-router-dom'

const features = [
  { icon: '📹', title: 'Facebook Videos', desc: 'Download public Facebook Watch videos, shared clips, and group videos in HD.' },
  { icon: '🎞️', title: 'Facebook Reels', desc: 'Save Facebook Reels instantly without any watermark.' },
  { icon: '📰', title: 'Story & Feed Videos', desc: 'Download videos from public Facebook feeds and stories.' },
  { icon: '🔒', title: 'Private-Safe', desc: 'Works with public videos. No Facebook login required.' },
]

export default function FacebookDownloader() {
  return (
    <PageLayout
      title="Facebook Video Downloader"
      subtitle="Download Facebook videos, Reels, and Stories for free — no watermarks, no login required."
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 20 }}>How to Download Facebook Videos</h2>
        <ol style={{ paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Open the Facebook video and copy its URL from the address bar.</li>
          <li>Paste the URL into VidSnap's input field on the homepage.</li>
          <li>Select a quality option (HD or SD) and click Download.</li>
          <li>Your video will start downloading instantly.</li>
        </ol>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 36px', borderRadius: 999, fontWeight: 700 }}>
          ↓ Try Facebook Downloader
        </Link>
      </div>
    </PageLayout>
  )
}
