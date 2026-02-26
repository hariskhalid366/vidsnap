# VidSnap – Universal Video Downloader ⚡

VidSnap is a high-performance, free, and open-source video downloader built with React and Node.js. It leverages `yt-dlp` to support video and audio extraction from over 1,100 platforms including YouTube, TikTok, Facebook, Instagram, and more.

## 🚀 Features

- **4K & HDR Support**: Download videos in the highest quality available, up to 4K at 60fps.
- **Smart Merging**: Automatically merges high-res video streams with the best audio using FFmpeg.
- **MP3 Extraction**: High-quality audio conversion (up to 320kbps).
- **No Watermarks**: Clean downloads for TikTok, Instagram Reels, and more.
- **1,100+ Sites**: Universal support powered by `yt-dlp`.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Vanilla CSS.
- **Backend**: Node.js, Express.
- **Engine**: `yt-dlp` & `FFmpeg`.

## 📦 Local Installation

### Prerequisites

1.  **Node.js**: Install the latest LTS version.
2.  **yt-dlp**: Must be installed and available in your PATH or fixed location.
3.  **FFmpeg**: Required for merging high-quality video and audio.

### Commands

```bash
# Clone the repository
git clone <your-repo-url>
cd resonant-disk

# Install dependencies
npm install

# Start the backend server (Port 3001)
npm run server

# In a new terminal, start the frontend (Port 5173)
npm run dev
```

## 🌐 Deployment Instructions

### Backend (Essential)

Because this app runs `yt-dlp` and `ffmpeg` as system processes, it requires a **Node.js hosting provider with a filesystem**.

- **Recommended**: [Render.com](https://render.com/), [Railway.app](https://railway.app/), or any VPS (DigitalOcean, Linode).
- **Environment**: Ensure `yt-dlp` and `ffmpeg` are installed in the deployment environment's build step.

### Frontend

The frontend can be built and hosted on **Vercel**, **Netlify**, or **GitHub Pages**.

- Update the API proxy in `vite.config.js` or use environment variables to point to your live backend URL.

## ⚖️ Legal Disclaimer

This tool is intended for personal use and educational purposes only. Users are responsible for complying with the terms of service of the platforms they download from and respecting copyright laws.
