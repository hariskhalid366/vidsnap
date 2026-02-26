const STATS = [
  { value: '50M+', label: 'Videos Downloaded', icon: '🎬' },
  { value: '4.9★', label: 'User Rating', icon: '⭐' },
  { value: '4', label: 'Platforms Supported', icon: '📲' },
  { value: '0', label: 'Watermarks Added', icon: '🚫' },
  { value: '100%', label: 'Free Forever', icon: '💚' },
]

export default function Stats() {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="stats-bar">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{s.icon}</div>
              <div className="stat-value gradient-text">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
