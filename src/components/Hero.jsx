import { useState, useRef } from 'react'
import useVideoDownloader from '../hooks/useVideoDownloader'
import DownloadResult from './DownloadResult'

const PLACEHOLDER_EXAMPLES = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.facebook.com/watch/?v=123456789',
  'https://www.instagram.com/reel/ABC123/',
  'https://www.tiktok.com/@user/video/123456789',
]

export default function Hero() {
  const [url, setUrl] = useState('')
  const [placeholderIdx] = useState(() => Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length))
  const inputRef = useRef(null)

  const { loading, result, error, download, reset } = useVideoDownloader()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url.trim()) { inputRef.current?.focus(); return }
    download(url.trim())
  }

  const handlePaste = async () => {
    // Clipboard API requires HTTPS and a user gesture.
    // On iOS Safari it may be blocked — fall back gracefully.
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText()
        if (text) {
          setUrl(text)
          download(text)
          return
        }
      }
    } catch {
      // Permission denied or API unavailable (common on iOS)
    }
    // Fallback: just focus the input so the user can paste manually
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '130px',
        paddingBottom: '80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: '#8b5cf6', top: '-100px', left: '-150px', animationDelay: '0s' }} />
      <div className="orb" style={{ width: 400, height: 400, background: '#ec4899', top: '100px', right: '-120px', animationDelay: '-3s' }} />
      <div className="orb" style={{ width: 300, height: 300, background: '#3b82f6', bottom: '0', left: '30%', animationDelay: '-5s' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Badge */}
        <div className="fade-in" style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <div className="badge badge-purple">
            <span>✨</span>
            Free · No Watermark · No Registration
          </div>
        </div>

        {/* Headline */}
        <h1
          className="fade-in-2"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          Download Videos from{' '}
          <span className="gradient-text">Any Platform</span>
          <br />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.65em' }}>
            YouTube · Facebook · Instagram · TikTok
          </span>
        </h1>

        <p
          className="fade-in-3"
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: 560,
            margin: '0 auto 44px',
          }}
        >
          Paste any video link and download it instantly in HD — without watermarks, ads, or sign-ups.
        </p>

        {/* Input box */}
        <form
          onSubmit={handleSubmit}
          className="fade-in-4 hero-form"
        >
          <div className="hero-input-row">
            <input
              ref={inputRef}
              type="url"
              inputMode="url"
              className="input-field hero-input"
              placeholder={PLACEHOLDER_EXAMPLES[placeholderIdx]}
              value={url}
              onChange={(e) => { setUrl(e.target.value); if (result) reset() }}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="hero-btn-group">
              <button
                type="button"
                className="btn btn-ghost hero-paste-btn"
                onClick={handlePaste}
              >
                📋 Paste
              </button>
              <button
                type="submit"
                className="btn btn-primary hero-submit-btn"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : '↓ Get Video'}
              </button>
            </div>
          </div>
          {error && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <p style={{ color: '#f87171', fontSize: '0.88rem' }}>
                ⚠️ {error}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>
                💡 Tip: Age-restricted or private videos may require adding session cookies to the server.
              </p>
            </div>
          )}
        </form>

        {/* Supported platform icons */}
        {!result && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {[
              { name: 'YouTube', color: '#ff0000', icon: <YouTubeIcon /> },
              { name: 'Facebook', color: '#1877f2', icon: <FacebookIcon /> },
              { name: 'Instagram', color: '#e1306c', icon: <InstagramIcon /> },
              { name: 'TikTok', color: '#69c9d0', icon: <TikTokIcon /> },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ color: p.color }}>{p.icon}</span>
                {p.name}
              </div>
            ))}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <DownloadResult result={result} />
          </div>
        )}
      </div>
    </section>
  )
}

// ── Platform icons (inline SVG) ────────────────────────────────────
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
}
