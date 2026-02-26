const ITEMS = [
  '✅ 100% Free', '🚀 Lightning Fast', '🔥 No Watermark', '📱 Mobile Friendly',
  '🎯 High Quality', '🔒 Safe & Secure', '🎬 YouTube', '📘 Facebook',
  '📸 Instagram', '🎵 TikTok', '🎵 MP3 Audio', '4K Ultra HD',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span style={{ color: 'var(--purple)', fontSize: '0.6rem' }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
