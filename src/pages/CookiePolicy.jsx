import PageLayout from './PageLayout'

const DATE = 'February 26, 2026'

export default function CookiePolicy() {
  return (
    <PageLayout title="Cookie Policy" subtitle={`Last updated: ${DATE}`}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: 48 }}>
          {[
            ['1. What Are Cookies', 'Cookies are small text files placed on your device by websites you visit. They help the site remember your preferences and improve your browsing experience.'],
            ['2. How We Use Cookies', 'VidSnap uses only essential functional cookies needed to keep the website running correctly. These include session cookies that expire when you close your browser and do not contain personal information.'],
            ['3. Third-Party Cookies (Google AdSense)', 'We display ads through Google AdSense. Google may set cookies on your device to serve personalized or contextual ads. These cookies are governed by Google\'s own privacy policy. You can manage ad personalization at https://adssettings.google.com.'],
            ['4. Managing Cookies', 'You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies; however, doing so may affect some functionality of the site.'],
            ['5. Cookie Consent', 'By continuing to use VidSnap, you consent to our use of essential cookies. For third-party (advertising) cookies, you may opt out via the Google settings link above.'],
            ['6. Contact', 'For questions about our cookie practices, contact us at: hariskhalid366@gmail.com'],
          ].map(([title, content]) => (
            <div key={title} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: 12 }}>{title}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
