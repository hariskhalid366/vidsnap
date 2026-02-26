import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PageLayout({ title, subtitle, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
      {/* Navbar-style back button */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ⚡ VidSnap
          </span>
        </Link>
        <Link to="/" style={{
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'color 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))',
        borderBottom: '1px solid var(--border)',
        padding: '60px 24px 48px',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text">{title}</span>
          </h1>
          {subtitle && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 620, margin: '0 auto' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '60px 24px 100px' }}>
        {children}
      </div>

      {/* Footer strip */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 32px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        © {new Date().getFullYear()} VidSnap. All rights reserved. · <Link to="/" style={{ color: 'var(--purple)', textDecoration: 'none' }}>← Return Home</Link>
      </div>
    </div>
  )
}
