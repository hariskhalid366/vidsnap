import PageLayout from './PageLayout'
import { Link } from 'react-router-dom'

const features = [
  { icon: '🎯', title: '4K & HDR Downloads', desc: 'Download in the highest quality available — from SD up to 4K HDR at 60 fps.' },
  { icon: '🎵', title: 'Audio-Only (MP3)', desc: 'Extract just the audio from any YouTube video and save as MP3.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Our servers fetch metadata instantly, and your download starts in seconds.' },
  { icon: '🔒', title: 'Completely Free', desc: 'No accounts, no subscriptions, no limits on downloads.' },
]

const steps = [
  { n: '1', text: 'Copy the YouTube video link from your browser.' },
  { n: '2', text: 'Paste it into the VidSnap input box on the homepage.' },
  { n: '3', text: 'Select your preferred quality (4K, 1080p, MP3, etc.).' },
  { n: '4', text: 'Click Download and save the file instantly.' },
]

export default function YouTubeDownloader() {
  return (
    <PageLayout
      title="YouTube Video Downloader"
      subtitle="Download any YouTube video in 4K, 1080p, 720p or as MP3 audio — free, fast, and no watermarks."
    >
      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 60 }}>
        {features.map(f => (
          <div key={f.title} className="glass-card" style={{ padding: 28 }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How to use */}
      <div className="glass-card" style={{ padding: 40, marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', marginBottom: 32 }}>How to Download YouTube Videos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{s.n}</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: 6 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 36px', borderRadius: 999, fontWeight: 700 }}>
          ↓ Start Downloading Now
        </Link>
      </div>
    </PageLayout>
  )
}
