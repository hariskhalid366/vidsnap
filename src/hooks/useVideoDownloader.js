import { useState, useCallback } from 'react'

/**
 * Detects which platform a URL belongs to and fetches video metadata.
 *
 * In production:
 *   - Connect this to your backend (e.g., yt-dlp, RapidAPI Social Media Downloader API)
 *   - The backend returns: { title, thumbnail, duration, author, views, formats[] }
 *
 * For the demo, we return realistic mock data based on detected platform.
 */

const PLATFORMS = {
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    icon: '▶️',
    patterns: [/youtube\.com\/watch/, /youtu\.be\//],
  },
  facebook: {
    name: 'Facebook',
    color: '#1877f2',
    icon: '📘',
    patterns: [/facebook\.com\//, /fb\.watch\//],
  },
  instagram: {
    name: 'Instagram',
    color: '#e1306c',
    icon: '📸',
    patterns: [/instagram\.com\//],
  },
  tiktok: {
    name: 'TikTok',
    color: '#69c9d0',
    icon: '🎵',
    patterns: [/tiktok\.com\//],
  },
}

function detectPlatform(url) {
  for (const [key, platform] of Object.entries(PLATFORMS)) {
    if (platform.patterns.some(p => p.test(url))) {
      return { key, ...platform }
    }
  }
  return null
}

function isValidUrl(str) {
  try { new URL(str); return true } catch { return false }
}

/**
 * Mock API call—replace with real API:
 * e.g. POST https://yourbackend.com/api/video-info  { url }
 * or use RapidAPI's Social Media Video Downloader
 */
async function fetchVideoInfo(url) {
  const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch video info')
  }
  return data
}

export default function useVideoDownloader() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const download = useCallback(async (url) => {
    setError(null)
    setResult(null)

    if (!isValidUrl(url)) {
      setError('Please enter a valid video URL')
      return
    }

    setLoading(true)
    try {
      const data = await fetchVideoInfo(url)
      setResult({
        ...data,
        url,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { loading, result, error, download, reset }
}
