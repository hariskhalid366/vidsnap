import { useState } from 'react'

export default function DownloadResult({ result }) {
  const [downloading, setDownloading] = useState(null)
  const [activeTab, setActiveTab] = useState('video')

  const handleDownload = (format) => {
    setDownloading(format.label)
    
    const params = new URLSearchParams({
      url: result.url,
      formatId: format.formatId,
      type: format.type,
      title: result.title || 'video'
    })

    if (format.abr) params.append('abr', format.abr)

    // Redirect to the download API which will stream the file
    window.location.href = `/api/download?${params.toString()}`
    
    setTimeout(() => setDownloading(null), 2000)
  }

  const formats = result.formats || []
  const filtered = formats.filter(f => f.type === activeTab)

  return (
    <div className="result-card" style={{ marginTop: 32 }}>
      {/* Video info */}
      <div className="result-video-info">
        {result.thumbnail ? (
          <img src={result.thumbnail} alt={result.title} className="result-thumbnail" />
        ) : (
          <div
            className="result-thumbnail"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              fontSize: '2rem',
            }}
          >
            🎬
          </div>
        )}
        <div className="result-meta">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 10px',
              borderRadius: 999,
              background: (result.platformColor || '#8b5cf6') + '22',
              color: result.platformColor || '#8cc4fa',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: 8,
              border: `1px solid ${(result.platformColor || '#8b5cf6')}44`,
            }}
          >
            {result.platformIcon || '🎥'} {result.platform}
          </div>
          <div className="result-title">{result.title}</div>
          <div className="result-details">
            {result.duration && <span>⏱ {result.duration}</span>}
            {result.author && <span>👤 {result.author}</span>}
            {result.views && <span>👁 {result.views}</span>}
          </div>
        </div>
      </div>

      {/* Format tabs */}
      <div style={{ padding: '0 24px 12px', display: 'flex', gap: 8 }}>
        {['video', 'audio'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '7px 18px',
              borderRadius: 999,
              border: activeTab === tab ? 'none' : '1px solid var(--border)',
              background: activeTab === tab ? 'var(--gradient-brand)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 4px 16px rgba(139,92,246,0.35)' : 'none',
            }}
          >
            {tab === 'video' ? '🎥 Video' : '🎵 Audio Only'}
          </button>
        ))}
      </div>

      {/* Format buttons */}
      <div className="result-formats">
        {filtered.map((fmt) => (
          <button
            key={fmt.formatId + fmt.label}
            className="format-btn"
            onClick={() => handleDownload(fmt)}
            disabled={downloading === fmt.label}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {fmt.label} {fmt.quality && `(${fmt.quality})`}
                {fmt.note && (
                  <span style={{ fontSize: '0.65rem', background: 'var(--purple)', color: 'white', padding: '1px 5px', borderRadius: 4, fontWeight: 800 }}>
                    {fmt.note.split(' ')[0]}
                  </span>
                )}
              </div>
              <div className="format-quality">{fmt.size || 'Unknown size'} · {fmt.ext}</div>
            </div>
            {downloading === fmt.label ? (
              <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <p style={{ gridColumn: '1/-1', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
            No {activeTab} formats found for this video.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '12px 24px 20px', color: 'var(--text-muted)', fontSize: '0.78rem', borderTop: '1px solid var(--border)' }}>
        ⚖️ For personal use only. Respect copyright and platform Terms of Service.
      </div>
    </div>
  )
}
