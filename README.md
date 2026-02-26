# VidSnap – Universal Video Downloader ⚡

VidSnap is a high-performance, free, and open-source video downloader built with React and Node.js. It features a **self-bootstrapping portable engine** and a **monolithic architecture** for easy deployment.

## 🚀 Features

- **One-Click Deployment**: The backend now serves the frontend automatically.
- **Portable Engine**: Automatically downloads its own `yt-dlp` binaries.
- **4K & HDR Support**: High-quality downloads up to 4K at 60fps.
- **High-Fidelity Audio**: Professional MP3 extraction (up to 320kbps).
- **1,100+ Sites**: Universal support powered by `yt-dlp` and `ffmpeg-static`.

## 🛠️ Technology Stack

- **Frontend**: React, Vite (compiled into `/dist`).
- **Backend**: Node.js, Express.
- **Engine**: Self-managed `yt-dlp` & `ffmpeg-static`.

## 📦 Deployment Structure (Monolithic)

I have optimized the project so that **you only need to deploy one thing**:

1.  **Build the Frontend**: Run `npm run build`. This creates a `dist/` folder.
2.  **Deploy the Folder**: Push your code to GitHub and connect it to a Node.js host.
3.  **Automatic Serving**: The `server.js` will detect the `dist/` folder and serve the website and the API from the same URL.

## ☁️ How to Deploy (Step-by-Step)

### Option 1: Render.com (Recommended)

1.  **Build Command**: `npm run build`
2.  **Start Command**: `npm start`
3.  **Service Type**: Web Service

### Option 2: VPS (DigitalOcean/Linode)

1.  Connect to your VPS and clone the repo.
2.  Run `npm install` and `npm run build`.
3.  Start with PM2: `pm2 start server.js --name vidsnap`.

## 🛠️ Local Development

1.  **Install**: `npm install`
2.  **Frontend**: `npm run dev` (http://localhost:5173)
3.  **Backend**: `npm run server` (http://localhost:3001)

## ⚖️ Legal Disclaimer

This tool is intended for personal use and educational purposes only. Users are responsible for complying with the terms of service of the platforms they download from and respecting copyright laws.
