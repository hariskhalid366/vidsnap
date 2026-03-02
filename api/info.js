/**
 * Vercel Serverless Function: GET /api/info?url=...
 * Fetches video metadata using yt-dlp.
 * yt-dlp binary is downloaded on first cold start and cached in /tmp.
 */
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import os from 'os'
import fs from 'fs'
import https from 'https'

const execFileAsync = promisify(execFile)

const YTDLP_PATH = path.join(os.tmpdir(), 'yt-dlp')
const COOKIES_PATH = path.join(process.cwd(), 'cookies.txt')

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

const hasCookies = () => {
  try { return fs.existsSync(COOKIES_PATH) } catch { return false }
}

const download = (url, dest) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return download(res.headers.location, dest).then(resolve).catch(reject)
    }
    if (res.statusCode !== 200) return reject(new Error(`Download failed: ${res.statusCode}`))
    const file = fs.createWriteStream(dest)
    res.pipe(file)
    file.on('finish', () => { file.close(); resolve() })
  }).on('error', reject)
})

async function ensureYtdlp() {
  if (fs.existsSync(YTDLP_PATH) && fs.statSync(YTDLP_PATH).size > 1000) return YTDLP_PATH
  const releaseUrl = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp'
  await download(releaseUrl, YTDLP_PATH)
  fs.chmodSync(YTDLP_PATH, 0o755)
  return YTDLP_PATH
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

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
    if (hasCookies()) args.push('--cookies', COOKIES_PATH)

    const { stdout } = await execFileAsync(ytdlp, args, { timeout: 30000 })
    const info = JSON.parse(stdout)

    const formats = []
    const seen = new Set()

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

      const displayLabel = f.height >= 2160 ? '4K Ultra HD'
        : f.height >= 1440 ? '2K Quad HD'
        : f.height >= 1080 ? '1080p Full HD'
        : f.height >= 720 ? '720p HD'
        : `${f.height}p`

      formats.push({
        formatId: f.format_id,
        label: displayLabel,
        quality: heightLabel,
        ext: 'mp4',
        size: fmtSize(f.filesize || f.filesize_approx),
        type: 'video',
        note: isHDR ? 'HDR' : is60fps ? '60fps' : null,
        // Include direct URL if available (used by /api/download redirect)
        directUrl: f.url || null,
      })
      if (formats.filter(f => f.type === 'video').length >= 12) break
    }

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
        directUrl: f.url || null,
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
    // Return the actual error message for debugging purposes on Vercel
    res.status(400).json({ 
      error: 'Could not fetch video info.',
      details: err.message,
      suggestion: 'If this is a "Sign in" error, the platform may be blocking Vercel server IPs.'
    })
  }
}
