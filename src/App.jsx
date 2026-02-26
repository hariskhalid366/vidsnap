import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import AdBanner from './components/AdBanner'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Platforms from './components/Platforms'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

// Product pages
import YouTubeDownloader from './pages/YouTubeDownloader'
import FacebookDownloader from './pages/FacebookDownloader'
import InstagramDownloader from './pages/InstagramDownloader'
import TikTokDownloader from './pages/TikTokDownloader'
import Mp3Converter from './pages/Mp3Converter'

// Company pages
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import PressKit from './pages/PressKit'
import Contact from './pages/Contact'

// Legal pages
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import DMCA from './pages/DMCA'

function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Ticker />
      <div className="container" style={{ paddingTop: '32px', paddingBottom: '8px' }}>
        <AdBanner slot="hero-bottom" format="horizontal" />
      </div>
      <Stats />
      <Platforms />
      <div className="container" style={{ paddingBottom: '64px' }}>
        <AdBanner slot="mid-page" format="horizontal" />
      </div>
      <Features />
      <HowItWorks />
      <div className="container" style={{ paddingBottom: '64px' }}>
        <AdBanner slot="before-faq" format="horizontal" />
      </div>
      <FAQ />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Product */}
        <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
        <Route path="/facebook-downloader" element={<FacebookDownloader />} />
        <Route path="/instagram-downloader" element={<InstagramDownloader />} />
        <Route path="/tiktok-downloader" element={<TikTokDownloader />} />
        <Route path="/mp3-converter" element={<Mp3Converter />} />

        {/* Company */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/press" element={<PressKit />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/dmca" element={<DMCA />} />
      </Routes>
    </BrowserRouter>
  )
}
