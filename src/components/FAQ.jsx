import { useState } from 'react'

const FAQS = [
  {
    q: 'Is VidSnap really free to use?',
    a: 'Yes, 100% free. There are no hidden fees, no premium tiers, and no registration required. We keep the service free by displaying Google ads.',
  },
  {
    q: 'How do I download a TikTok video without watermark?',
    a: 'Simply copy the TikTok video URL, paste it into the input field on VidSnap, and click "Get Video". Our tool fetches the original video file directly from TikTok\'s servers — without the watermark overlay.',
  },
  {
    q: 'Can I download private Facebook or Instagram videos?',
    a: 'VidSnap can only download publicly accessible videos. For private videos you need to be logged into the platform. Attempting to download private content without permission may violate terms of service.',
  },
  {
    q: 'What video qualities are available?',
    a: 'We support up to 4K Ultra HD (2160p) for YouTube, and the maximum available resolution for Facebook, Instagram, and TikTok. You can also choose 1080p, 720p, 480p, 360p, or extract audio as MP3.',
  },
  {
    q: 'Is it legal to download videos?',
    a: 'Downloading is legal for personal use in most countries, but redistribution or commercial use of copyrighted content is not. Always respect content creators and platform Terms of Service.',
  },
  {
    q: 'Do you store my downloaded videos?',
    a: 'No. VidSnap processes the download link on-demand and never stores videos on our servers. Your downloads go directly to your device.',
  },
  {
    q: 'Why can\'t I download YouTube videos directly?',
    a: 'YouTube\'s Terms of Service restrict automated downloading for non-Premium users. We recommend using VidSnap only for content you own or have explicit permission to download.',
  },
  {
    q: 'Does VidSnap work on iPhone / Android?',
    a: 'Yes! VidSnap is fully responsive and works in any modern mobile browser on iOS and Android. No app install needed.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-purple" style={{ marginBottom: 16 }}>FAQ</span>
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p>Everything you need to know about VidSnap.</p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', padding: '8px 32px' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => toggle(i)}>
                {faq.q}
                <svg
                  className={`faq-chevron ${open === i ? 'open' : ''}`}
                  width="18" height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {open === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
