import { useState } from 'react'
import PageLayout from './PageLayout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Opens the user's email client with the form info pre-filled
    const subject = encodeURIComponent(`[VidSnap] ${form.subject}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:hariskhalid366@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <PageLayout
      title="Contact Us"
      subtitle="Have a question, bug report, or DMCA request? We're here to help."
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🐛', title: 'Bug Report', desc: 'Found a broken download?' },
            { icon: '💡', title: 'Feature Request', desc: 'Suggest an improvement.' },
            { icon: '⚖️', title: 'DMCA / Legal', desc: 'Content takedown requests.' },
          ].map(c => (
            <div key={c.title} className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {sent ? (
          <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 12 }}>Message Sent!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. We'll reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 4 }}>Send a Message</h2>

            {[['Name', 'text', 'name', 'Your name'], ['Email', 'email', 'email', 'your@email.com']].map(([label, type, field, placeholder]) => (
              <div key={field}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>{label}</label>
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
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Subject</label>
              <select
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                style={{ width: '100%', background: '#0d0d24', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: '0.95rem', outline: 'none' }}
              >
                {['General', 'Bug Report', 'Feature Request', 'DMCA', 'Partnership', 'Press'].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Message</label>
              <textarea
                required
                placeholder="Describe your issue or question in detail..."
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '14px', borderRadius: 999, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
              Send Message →
            </button>
          </form>
        )}
      </div>
    </PageLayout>
  )
}
