# VidSnap – Universal Video Downloader ⚡

VidSnap is a high-performance, free, and open-source video downloader built with React and Node.js. It features a **self-bootstrapping portable engine** that supports video and audio extraction from over 1,100 platforms including YouTube, TikTok, Facebook, Instagram, and more.

## 🚀 Features

- **Portable Engine**: Automatically downloads its own binaries. No manual setup of `yt-dlp` or `FFmpeg` is required on the server.
- **4K & HDR Support**: Download videos in the highest quality available, up to 4K at 60fps.
- **High-Fidelity Audio**: Professional MP3 extraction (up to 320kbps).
- **Clean Downloads**: No watermarks for TikTok and Instagram Reels.
- **1,100+ Sites**: Universal support powered by the industry-standard engine.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Vanilla CSS.
- **Backend**: Node.js, Express.
- **Engine**: Self-managed `yt-dlp` & `ffmpeg-static`.

## 📦 Professional Deployment-Ready Architecture

Unlike standard downloaders that require manual system configuration, **VidSnap is fully hostable**:

- **Auto-Bootstrapping**: On the first run, the server automatically downloads the correct `yt-dlp` binary for its environment.
- **Static FFmpeg**: Uses `ffmpeg-static` via NPM for seamless high-quality merging.
- **Zero Global Dependencies**: Host on Render, Railway, Vercel, or any VPS without installing a single system package.

## 🛠️ Local Installation

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd vidsnap
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development servers**:
   ```bash
   npm run dev    # Starts frontend on http://localhost:5173
   npm run server # Starts portable engine on http://localhost:3001
   ```

## ☁️ Deployment Instructions

### Backend (Engine)

Host the Node.js backend on a platform that supports persistent processes:

- **Render / Railway / Fly.io**: Connect your GitHub and use `node server.js` as the start command.
- **VPS (Ubuntu/Debian)**:
  ```bash
  pm2 start server.js --name vidsnap-api
  ```

### Frontend

Deploy the Vite build to any static host (Vercel, Netlify, GitHub Pages):

```bash
npm run build
```

Ensure the API proxy or environment variables point to your live backend URL.

## ⚖️ Legal Disclaimer

This tool is intended for personal use and educational purposes only. Users are responsible for complying with the terms of service of the platforms they download from and respecting copyright laws.
