/**
 * VidSnap – Professional Portable Backend Server
 * Powered by self-managed yt-dlp and ffmpeg-static
 * Supports: YouTube, Facebook, Instagram, TikTok + 1000 more sites
 * Zero global dependencies.
 */
import express from 'express'
import cors from 'cors'
import { execFile, spawn } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import os from 'os'
import fs from 'fs'
import https from 'https'
import ffmpegPath from 'ffmpeg-static'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const execFileAsync = promisify(execFile)
const app = express()
const PORT = process.env.PORT || 3001

// Cloud-ready binary paths (uses /tmp if the root is read-only)
const getBinDir = () => {
  const localBin = path.join(process.cwd(), 'bin')
  try {
    if (!fs.existsSync(localBin)) fs.mkdirSync(localBin)
    fs.accessSync(localBin, fs.constants.W_OK)
    return localBin
  } catch {
    const tmpBin = path.join(os.tmpdir(), 'vidsnap-bin')
    if (!fs.existsSync(tmpBin)) fs.mkdirSync(tmpBin)
    return tmpBin
  }
}

const BIN_DIR = getBinDir()
const DIST_PATH = path.join(__dirname, 'dist')
const YTDLP_PATH = path.join(BIN_DIR, os.platform() === 'win32' ? 'yt-dlp.exe' : 'yt-dlp')

/* ── Bootstrap Engine ────────────────────────────────────── */
async function ensureYtdlp() {
  if (fs.existsSync(YTDLP_PATH) && fs.statSync(YTDLP_PATH).size > 1000) return YTDLP_PATH

  console.log('📥 Engine missing or corrupt. Downloading portable yt-dlp binary...')
  if (!fs.existsSync(BIN_DIR)) fs.mkdirSync(BIN_DIR)

  const platform = os.platform()
  const releaseUrl = platform === 'win32' 
    ? 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe'
    : platform === 'darwin'
    ? 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos'
    : 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp'

  const download = (url, dest) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, dest).then(resolve).catch(reject)
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download: ${res.statusCode}`))
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      }).on('error', reject)
    })
  }

  try {
    await download(releaseUrl, YTDLP_PATH)
    fs.chmodSync(YTDLP_PATH, 0o755)
    console.log('✅ yt-dlp engine installed successfully.')
    return YTDLP_PATH
  } catch (err) {
    console.error('❌ Failed to download yt-dlp:', err.message)
    if (fs.existsSync(YTDLP_PATH)) fs.unlinkSync(YTDLP_PATH)
    throw err
  }
}

const COOKIES_PATH = path.join(process.cwd(), 'cookies.txt')
const hasCookies = () => {
  try { return fs.existsSync(COOKIES_PATH) } catch { return false }
}

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
    const ytdlp = await ensureYtdlp()
    const args = [
      '--dump-json',
      '--no-playlist',
      '--no-warnings',
      '--extractor-args', 'youtube:player_client=android,web_creator',
      url,
    ]
    
    if (hasCookies()) {
      args.push('--cookies', COOKIES_PATH)
    }

    const { stdout } = await execFileAsync(ytdlp, args, { timeout: 30000 })
    const info = JSON.parse(stdout)

    const formats = []
    const seen = new Set()

    // Video formats (including video-only formats which will be merged)
    const videoFmts = (info.formats || [])
      .filter(f => f.vcodec && f.vcodec !== 'none' && f.height)
      .sort((a, b) => (b.height - a.height) || (b.tbr - a.tbr))

    for (const f of videoFmts) {
      const isHDR = f.dynamic_range && f.dynamic_range !== 'SDR'
      const is60fps = f.fps >= 50
      const heightLabel = `${f.height}p${is60fps ? '60' : ''}${isHDR ? ' HDR' : ''}`
      
      const uniqueKey = `${f.height}-${f.ext}`
      if (seen.has(uniqueKey)) continue
      seen.add(uniqueKey)

      const displayLabel = f.height >= 2160 ? '4K Ultra HD' : f.height >= 1440 ? '2K Quad HD' : f.height >= 1080 ? '1080p Full HD' : f.height >= 720 ? '720p HD' : `${f.height}p`
      
      formats.push({
        formatId: f.format_id,
        label: displayLabel,
        quality: heightLabel,
        ext: 'mp4',
        size: fmtSize(f.filesize || f.filesize_approx),
        type: 'video',
        note: isHDR ? 'HDR' : is60fps ? '60fps' : null
      })
      if (formats.filter(f => f.type === 'video').length >= 12) break
    }

    // Audio formats
    const audioFmts = (info.formats || [])
      .filter(f => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
      .sort((a, b) => (b.abr || 0) - (a.abr || 0))

    const audioSeen = new Set()
    for (const f of audioFmts) {
      const abr = Math.round(f.abr || 128)
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

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: fmtDuration(info.duration),
      author: info.uploader || info.channel || info.creator,
      views: fmtViews(info.view_count),
      platform: info.extractor_key,
      formats,
    })
  } catch (err) {
    console.error('[/api/info] Error:', err.message)
    res.status(400).json({ error: 'Could not fetch video info. Check the URL and try again.' })
  }
})

/* ── GET /api/download?url=...&formatId=... ──────────────── */
app.get('/api/download', async (req, res) => {
  const { url, formatId, type, abr, title = 'video' } = req.query
  if (!url || !formatId) return res.status(400).json({ error: 'url and formatId are required' })

  try {
    const ytdlp = await ensureYtdlp()
    const isAudio = type === 'audio'
    const safeTitle = title.replace(/[^a-z0-9_\-\s]/gi, '_').slice(0, 80)
    const ext = isAudio ? 'mp3' : 'mp4'

    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.${ext}"`)
    res.setHeader('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4')

    const args = isAudio
      ? [
          '-f', 'bestaudio',
          '--extract-audio', '--audio-format', 'mp3',
          '--audio-quality', abr ? `${abr}K` : '192K',
          '--no-playlist', '--no-warnings',
          '--ffmpeg-location', ffmpegPath,
          '-o', '-', url
        ]
      : [
          '-f', `(bv*)[format_id=${formatId}]+ba/b[format_id=${formatId}]/b`,
          '--merge-output-format', 'mp4',
          '--no-playlist', '--no-warnings',
          '--ffmpeg-location', ffmpegPath,
          '-o', '-', url
        ]

    if (hasCookies()) args.push('--cookies', COOKIES_PATH)

    const proc = spawn(ytdlp, args)
    proc.stdout.pipe(res)

    proc.on('error', (err) => {
      console.error('Download error:', err)
      if (!res.headersSent) res.status(500).json({ error: 'Download failed' })
    })

    req.on('close', () => proc.kill())

  } catch (err) {
    console.error('[/api/download] Fatal:', err)
    res.status(500).send('Engine error')
  }
})

/* ── Static Files (Frontend) ───────────────────────────── */
// If dist exists (after npm run build), serve it
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH))
  
  // React Router fallback (must be last)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(DIST_PATH, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`\n✅ VidSnap Portable backend ready → http://localhost:${PORT}`)
  console.log(`   Binaries: local yt-dlp + ${ffmpegPath ? 'static ffmpeg' : 'system ffmpeg'}\n`)
  ensureYtdlp().catch(e => console.error('Bootstrap failed:', e))
})
