import { Link } from 'react-router-dom'

const LINKS = {
  Product: [
    { label: 'YouTube Downloader', path: '/youtube-downloader' },
    { label: 'Facebook Downloader', path: '/facebook-downloader' },
    { label: 'Instagram Downloader', path: '/instagram-downloader' },
    { label: 'TikTok Downloader', path: '/tiktok-downloader' },
    { label: 'MP3 Converter', path: '/mp3-converter' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Press Kit', path: '/press' },
    { label: 'Contact', path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'DMCA', path: '/dmca' },
  ],
}

function SocialIcon({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 38, height: 38,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        transition: 'background 0.2s, color 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.2)'; e.currentTarget.style.color = 'var(--purple-light)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <div className="footer-logo">
              <span className="gradient-text">⚡ VidSnap</span>
            </div>
            <p className="footer-desc">
              The fastest and most reliable free video downloader for YouTube, Facebook, Instagram, and TikTok. No watermarks, no sign-ups, no limits.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <SocialIcon href="#">🐦</SocialIcon>
              <SocialIcon href="#">📘</SocialIcon>
              <SocialIcon href="#">📸</SocialIcon>
              <SocialIcon href="#">▶️</SocialIcon>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4>{title}</h4>
              <ul className="footer-links">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = ''}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} VidSnap. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            All systems operational
          </div>
          <div>Made with ❤️ for video lovers</div>
        </div>
      </div>
    </footer>
  )
}
