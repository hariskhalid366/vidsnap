/**
 * Vercel Serverless Function: GET /api/download?url=...&formatId=...
 *
 * On Vercel, we CANNOT buffer large video files (timeout + no ffmpeg).
 * Strategy:
 *   1. Re-fetch the direct stream URL from yt-dlp (fast, no download)
 *   2. Redirect the browser to that URL so it downloads directly from the CDN
 *
 * This sidesteps all serverless limits and works perfectly on all browsers
 * including Android Chrome and iOS Safari.
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

const hasCookies = () => {
  try { return fs.existsSync(COOKIES_PATH) } catch { return false }
}

const downloadBin = (url, dest) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadBin(res.headers.location, dest).then(resolve).catch(reject)
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
  await downloadBin(releaseUrl, YTDLP_PATH)
  fs.chmodSync(YTDLP_PATH, 0o755)
  return YTDLP_PATH
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { url, formatId, type } = req.query
  if (!url || !formatId) return res.status(400).json({ error: 'url and formatId are required' })

  try {
    const ytdlp = await ensureYtdlp()
    const isAudio = type === 'audio'

    // Use --get-url to fetch the direct CDN stream URL without downloading
    const args = isAudio
      ? [
          '-f', 'bestaudio',
          '--get-url',
          '--no-playlist', '--no-warnings',
          url,
        ]
      : [
          '-f', `bestvideo[format_id=${formatId}]/b[format_id=${formatId}]/b`,
          '--get-url',
          '--no-playlist', '--no-warnings',
          url,
        ]

    if (hasCookies()) args.push('--cookies', COOKIES_PATH)

    const { stdout } = await execFileAsync(ytdlp, args, { timeout: 25000 })
    const directUrl = stdout.trim().split('\n')[0]

    if (!directUrl || !directUrl.startsWith('http')) {
      return res.status(400).json({ error: 'Could not get direct download URL.' })
    }

    // 302 redirect — browser downloads directly from CDN (YouTube/Facebook/etc.)
    // This works on all browsers including Android Chrome and iOS Safari.
    res.redirect(302, directUrl)

  } catch (err) {
    console.error('[/api/download] Error:', err.message)
    res.status(500).json({ 
      error: 'Could not retrieve download URL.',
      details: err.message,
      suggestion: 'This might happen if the platform blocks serverless IP addresses.'
    })
  }
}
