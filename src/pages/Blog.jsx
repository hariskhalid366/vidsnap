import PageLayout from './PageLayout'

const posts = [
  { date: 'Feb 20, 2026', tag: 'Tutorial', title: 'How to Download 4K Videos for Free in 2026', desc: 'A step-by-step guide to saving ultra-high-definition content from YouTube and other platforms for offline viewing.', emoji: '🎬' },
  { date: 'Feb 15, 2026', tag: 'News', title: 'VidSnap Now Supports 1,100+ Platforms', desc: 'Thanks to our yt-dlp integration, VidSnap can now download from over one thousand websites worldwide.', emoji: '🌍' },
  { date: 'Feb 5, 2026', tag: 'Tips', title: 'Best MP3 Bitrate for Music Downloads', desc: 'We compare 128kbps, 192kbps, and 320kbps to help you decide which audio quality fits your needs.', emoji: '🎵' },
  { date: 'Jan 28, 2026', tag: 'Tutorial', title: 'Download TikTok Videos Without Watermark', desc: 'Everything you need to know about removing the TikTok logo while saving videos using VidSnap.', emoji: '📱' },
  { date: 'Jan 17, 2026', tag: 'News', title: 'VidSnap 2.0 Released — Faster, Better Quality', desc: 'Our biggest update ever includes HDR support, 60fps downloads, and a redesigned results interface.', emoji: '🚀' },
  { date: 'Jan 4, 2026', tag: 'Tips', title: '5 Things You Didn\'t Know VidSnap Can Do', desc: 'From SoundCloud rips to Twitch clip downloads, here are some lesser-known VidSnap superpowers.', emoji: '💡' },
]

const tagColors = { Tutorial: '#8b5cf6', News: '#ec4899', Tips: '#10b981' }

export default function Blog() {
  return (
    <PageLayout
      title="VidSnap Blog"
      subtitle="Tips, tutorials, and news from the VidSnap team."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
        {posts.map(p => (
          <div key={p.title} className="glass-card" style={{ padding: 28, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', gap: 12 }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2.5rem' }}>{p.emoji}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ background: tagColors[p.tag] + '22', color: tagColors[p.tag], fontSize: '0.72rem', fontWeight: 800, padding: '2px 10px', borderRadius: 999 }}>{p.tag}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.date}</span>
            </div>
            <h3 style={{ fontWeight: 700, lineHeight: 1.4 }}>{p.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
            <span style={{ color: 'var(--purple)', fontSize: '0.85rem', fontWeight: 600 }}>Read more →</span>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
