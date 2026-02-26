/**
 * VidSnap – Free Backend Server
 * Powered by yt-dlp (https://github.com/yt-dlp/yt-dlp)
 * Supports: YouTube, Facebook, Instagram, TikTok + 1000 more sites
 * Zero API keys required.
 */
import express from 'express'
import cors from 'cors'
import { execFile, spawn } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import os from 'os'

const execFileAsync = promisify(execFile)
const app = express()
const PORT = 3001

// Find yt-dlp binary (checks system PATH and ~/.local/bin)
const YTDLP = (() => {
  const candidates = [
    'yt-dlp',
    path.join(os.homedir(), '.local', 'bin', 'yt-dlp'),
    '/usr/local/bin/yt-dlp',
    '/usr/bin/yt-dlp',
  ]
  return candidates[1] // ~/.local/bin/yt-dlp
})()

const COOKIES_PATH = path.join(process.cwd(), 'cookies.txt')
const hasCookies = () => {
  try { return fs.existsSync(COOKIES_PATH) } catch { return false }
}
import fs from 'fs'

app.use(cors())
app.use(express.json())

/* ── Helpers ────────────────────────────────────────────── */
function fmtSize(bytes) {
  if (!bytes) return null
  if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes > 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${(bytes / 1e3).toFixed(0)} KB`
}

function fmtDuration(secs) {
  if (!secs) return null
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = Math.floor(secs % 60)
  if (h) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function fmtViews(n) {
  if (!n) return null
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B views`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M views`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K views`
  return `${n} views`
}

/* ── GET /api/info?url=... ──────────────────────────────── */
app.get('/api/info', async (req, res) => {
  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'URL is required' })

  try {
    const args = [
      '--dump-json',
      '--no-playlist',
      '--no-warnings',
      '--extractor-args', 'youtube:player_client=android,web_creator',
      url,
    ]
    
    if (hasCookies()) {
      args.push('--cookies', COOKIES_PATH)
      console.log('🍪 Using cookies.txt for extraction')
    }

    const { stdout } = await execFileAsync(YTDLP, args, { timeout: 30000 })

    const info = JSON.parse(stdout)

    // Build clean format list from available formats
    const formats = []
    const seen = new Set()

    // Video formats (including video-only formats which will be merged)
    const videoFmts = (info.formats || [])
      .filter(f => f.vcodec && f.vcodec !== 'none' && f.height)
      // Sort by height DESC, then by bitrate/tbr DESC to get best of each height
      .sort((a, b) => (b.height - a.height) || (b.tbr - a.tbr) || (b.vbr - a.vbr))

    for (const f of videoFmts) {
      const isHDR = f.dynamic_range && f.dynamic_range !== 'SDR'
      const is60fps = f.fps >= 50
      const heightLabel = `${f.height}p${is60fps ? '60' : ''}${isHDR ? ' HDR' : ''}`
      
      const uniqueKey = `${f.height}-${f.ext}-${f.vcodec}`
      if (seen.has(uniqueKey)) continue
      seen.add(uniqueKey)

      const displayLabel = f.height >= 2160 ? '4K Ultra HD' : f.height >= 1440 ? '2K Quad HD' : f.height >= 1080 ? '1080p Full HD' : f.height >= 720 ? '720p HD' : `${f.height}p`
      
      formats.push({
        formatId: f.format_id,
        label: displayLabel,
        quality: heightLabel,
        ext: 'mp4', // We force mp4 merge in download
        size: fmtSize(f.filesize || f.filesize_approx),
        type: 'video',
        note: isHDR ? 'HDR High Dynamic Range' : is60fps ? 'Smooth 60fps' : null
      })
      if (formats.filter(f => f.type === 'video').length >= 10) break
    }

    // Audio formats
    const audioFmts = (info.formats || [])
      .filter(f => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none') && f.abr)
      .sort((a, b) => (b.abr || 0) - (a.abr || 0))

    const audioSeen = new Set()
    for (const f of audioFmts) {
      const abr = Math.round(f.abr || 0)
      const kbps = abr >= 256 ? 320 : abr >= 160 ? 192 : 128
      const label = `${kbps}kbps`
      if (audioSeen.has(label)) continue
      audioSeen.add(label)
      formats.push({
        formatId: f.format_id,
        label: `MP3 ${label}`,
        quality: label,
        ext: 'mp3',
        size: fmtSize(f.filesize || f.filesize_approx),
        type: 'audio',
        abr: kbps,
      })
      if (formats.filter(f => f.type === 'audio').length >= 3) break
    }

    // If no explicit audio-only formats found, add generic mp3 options
    if (formats.filter(f => f.type === 'audio').length === 0) {
      formats.push(
        { formatId: 'bestaudio', label: 'MP3 320kbps', quality: '320kbps', ext: 'mp3', type: 'audio', abr: 320 },
        { formatId: 'bestaudio', label: 'MP3 192kbps', quality: '192kbps', ext: 'mp3', type: 'audio', abr: 192 },
        { formatId: 'bestaudio', label: 'MP3 128kbps', quality: '128kbps', ext: 'mp3', type: 'audio', abr: 128 },
      )
    }

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: fmtDuration(info.duration),
      author: info.uploader || info.channel || info.creator,
      views: fmtViews(info.view_count),
      platform: info.extractor_key || info.extractor,
      formats,
    })
  } catch (err) {
    console.error('[/api/info] Error:', err.message)
    const msg = err.message?.includes('Sign in') || err.message?.includes('login')
      ? 'This video requires login. Only public videos can be downloaded.'
      : err.message?.includes('not available') || err.message?.includes('removed')
      ? 'Video not available or has been removed.'
      : 'Could not fetch video info. Check the URL and try again.'
    res.status(400).json({ error: msg })
  }
})

/* ── GET /api/download?url=...&formatId=...&type=...&abr=... ── */
app.get('/api/download', (req, res) => {
  const { url, formatId, type, abr, title = 'video' } = req.query
  if (!url || !formatId) return res.status(400).json({ error: 'url and formatId are required' })

  const isAudio = type === 'audio'
  const safeTitle = title.replace(/[^a-z0-9_\-\s]/gi, '_').slice(0, 80)
  const ext = isAudio ? 'mp3' : 'mp4'

  res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.${ext}"`)
  res.setHeader('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4')

  const args = isAudio
    ? [
        '-f', 'bestaudio',
        '--extract-audio',
        '--audio-format', 'mp3',
        '--audio-quality', abr ? `${abr}K` : '192K',
        '--no-playlist',
        '--no-warnings',
        '--extractor-args', 'youtube:player_client=android,web_creator',
        '-o', '-',           // output to stdout
        url,
      ]
    : [
        '-f', `(bv*)[format_id=${formatId}]+ba/b[format_id=${formatId}]/b`,
        '--merge-output-format', 'mp4',
        '--no-playlist',
        '--no-warnings',
        '--extractor-args', 'youtube:player_client=android,web_creator',
        '-o', '-',
        url,
      ]

  if (hasCookies()) {
    args.push('--cookies', COOKIES_PATH)
  }

  const proc = spawn(YTDLP, args)
  proc.stdout.pipe(res)

  proc.stderr.on('data', (d) => {
    const line = d.toString()
    if (!line.includes('WARNING') && !line.includes('Extracting')) {
      // Suppressed verbose output; uncomment to debug:
      // console.error('[yt-dlp]', line.trim())
    }
  })

  proc.on('error', (err) => {
    console.error('[/api/download] spawn error:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Download failed' })
  })

  req.on('close', () => {
    proc.kill()
  })
})

/* ── Health check ── */
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ytdlp: YTDLP }))

app.listen(PORT, () => {
  console.log(`\n✅ VidSnap backend ready → http://localhost:${PORT}`)
  console.log(`   Using yt-dlp: ${YTDLP}\n`)
})
