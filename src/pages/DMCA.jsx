import { useState } from 'react'
import PageLayout from './PageLayout'

export default function DMCA() {
  const [form, setForm] = useState({ name: '', email: '', url: '', description: '', agree: false })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageLayout
      title="DMCA Takedown Request"
      subtitle="VidSnap respects copyright. Submit a request below to remove content you own the rights to."
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* What is DMCA */}
        <div className="glass-card" style={{ padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 16 }}>About DMCA</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            The Digital Millennium Copyright Act (DMCA) provides a process for copyright owners to request removal of infringing content. If you believe VidSnap is facilitating access to your copyrighted content without authorization, please complete the form below. We respond to valid DMCA requests within <strong>3–5 business days</strong>.
          </p>
        </div>

        {sent ? (
          <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 12 }}>Request Submitted</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Your DMCA request has been received. We will review it and contact you within 3–5 business days at the email you provided.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>Takedown Request Form</h2>

            {[
              ['Full Legal Name', 'text', 'name', 'Your full legal name'],
              ['Email Address', 'email', 'email', 'your@email.com'],
              ['URL of Infringing Content', 'url', 'url', 'https://vidsnap.com/...'],
            ].map(([label, type, field, placeholder]) => (
              <div key={field}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>{label} *</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Description of Infringement *</label>
              <textarea
                required
                placeholder="Describe which content infringes your copyright and your ownership of that content..."
                rows={5}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={e => setForm({ ...form, agree: e.target.checked })}
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                I declare under penalty of perjury that I am the copyright owner or authorized to act on behalf of the owner, and that the information in this request is accurate.
              </span>
            </label>

            <button type="submit" className="btn btn-primary" style={{ padding: '14px', borderRadius: 999, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
              Submit DMCA Request →
            </button>
          </form>
        )}
      </div>
    </PageLayout>
  )
}
