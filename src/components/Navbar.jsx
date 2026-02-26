import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="nav-logo">
          <span className="gradient-text">⚡ VidSnap</span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo('platforms')}>Platforms</button>
          <button className="nav-link" onClick={() => scrollTo('features')}>Features</button>
          <button className="nav-link" onClick={() => scrollTo('how-it-works')}>How it works</button>
          <button className="nav-link" onClick={() => scrollTo('faq')}>FAQ</button>
          <button className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.875rem' }}>
            ↓ Download Free
          </button>
        </div>
      </div>
    </nav>
  )
}
