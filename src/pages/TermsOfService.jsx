import PageLayout from './PageLayout'

const DATE = 'February 26, 2026'

export default function TermsOfService() {
  const section = (title, content) => (
    <div key={title} style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: 12 }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{content}</p>
    </div>
  )

  return (
    <PageLayout title="Terms of Service" subtitle={`Last updated: ${DATE}`}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: 48 }}>
          {section('1. Acceptance of Terms', 'By using VidSnap, you agree to these Terms of Service. If you do not agree, please discontinue use immediately.')}
          {section('2. Use of Service', 'VidSnap provides a tool to download publicly accessible online videos for personal, non-commercial use. You agree not to use VidSnap to infringe copyright, violate platform terms of service, distribute downloaded content commercially, or download content you do not have rights to.')}
          {section('3. Intellectual Property', 'All downloaded content remains the intellectual property of its original creators and platforms. VidSnap does not claim any ownership over downloaded content. Users are solely responsible for how they use downloaded material.')}
          {section('4. Disclaimer of Warranties', 'VidSnap is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that all URLs will be supported. We reserve the right to modify or discontinue the service at any time.')}
          {section('5. Limitation of Liability', 'VidSnap and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of this service or downloaded content.')}
          {section('6. DMCA Compliance', 'VidSnap respects intellectual property rights. If you believe content accessible through our service infringes your copyright, please submit a DMCA takedown request to hariskhalid366@gmail.com.')}
          {section('7. Changes to Terms', 'We reserve the right to update these terms at any time. Continued use of VidSnap after changes constitutes acceptance of the new terms.')}
          {section('8. Governing Law', 'These terms are governed by applicable law. Disputes shall be resolved in the appropriate jurisdiction.')}
        </div>
      </div>
    </PageLayout>
  )
}
