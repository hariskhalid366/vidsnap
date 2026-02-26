import PageLayout from './PageLayout'

const DATE = 'February 26, 2026'

export default function PrivacyPolicy() {
  const section = (title, content) => (
    <div key={title} style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: 12 }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{content}</p>
    </div>
  )

  return (
    <PageLayout title="Privacy Policy" subtitle={`Last updated: ${DATE}`}>
      <div style={{ maxWidth: 760, margin: '0 auto' }} className="glass-card" style2={{ padding: 48 }}>
        <div style={{ padding: 48 }}>
          {section('1. Information We Collect', 'VidSnap does not collect, store, or sell any personally identifiable information. When you use our service, we do not require registration, login, or any personal data. The video URLs you submit are used solely to process your download request and are not logged or stored on our servers.')}
          {section('2. How We Use Your Information', 'Since we collect no personal information, we do not use your data for any purpose. The only data processed is the publicly accessible video URL you provide, which is passed to our backend to fetch video metadata and stream the download.')}
          {section('3. Cookies', 'VidSnap uses only essential cookies required to serve the website (session cookies managed by the browser). We do not use tracking cookies, advertising cookies, or third-party analytics cookies. Google AdSense may place cookies on your device as part of the advertising service; please refer to Google\'s Privacy Policy for more information.')}
          {section('4. Third-Party Services', 'We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to this site and other sites. You can opt out of personalized advertising by visiting Google\'s Ads Settings.')}
          {section('5. Data Security', 'We implement industry-standard security measures to protect our service infrastructure. Since we do not store user data, there is no personal data at risk of breach.')}
          {section('6. Children\'s Privacy', 'VidSnap is not directed at children under the age of 13. We do not knowingly collect any information from children.')}
          {section('7. Changes to This Policy', 'We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated "Last updated" date.')}
          {section('8. Contact', 'For privacy-related concerns, email us at: hariskhalid366@gmail.com')}
        </div>
      </div>
    </PageLayout>
  )
}
