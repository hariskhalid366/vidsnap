import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, menuOpen ? 300 : 0)
  }

  const refreshPage = () => {
    window.location.href = '/'
  }

  const navItems = [
    { label: 'Platforms', id: 'platforms' },
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="nav-logo" onClick={refreshPage} style={{ cursor: 'pointer' }}>
            <span className="gradient-text">⚡ VidSnap</span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links nav-links-desktop">
            {navItems.map(item => (
              <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
            <button className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.875rem' }} onClick={() => scrollTo('hero')}>
              ↓ Download Free
            </button>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`nav-mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-header">
          <span className="gradient-text nav-logo" onClick={refreshPage} style={{ cursor: 'pointer' }}>⚡ VidSnap</span>
          <button className="nav-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="nav-mobile-links">
          {navItems.map(item => (
            <button key={item.id} className="nav-mobile-link" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
          <button className="btn btn-primary nav-mobile-cta" onClick={() => scrollTo('hero')}>
            ↓ Download Free
          </button>
        </div>
      </div>
    </>
  )
}
