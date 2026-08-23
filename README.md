# Void Atlas — Interactive Deep Space Observatory

Void Atlas is a scroll-driven, particle-heavy interactive space observatory built in an **Active Theory-style aesthetic**: cinematic, responsive, generously animated, and visually stunning.

## 🚀 Features

- **Particle Double-Helix**: Animated flowing DNA-style double helix in 3D space with glowing cyan/magenta color dynamics.
- **Orbit Ring of Content Nodes**: Key astronomical content pieces (images from NASA APOD, NASA Image Library, Hubble, and JWST) arranged on an orbiting 3D ring.
- **Scroll-Driven Camera**: Smooth lerped Three.js camera Z fly-through tied to normalized scroll progress.
- **Bloom & Vignette Post-Processing**: Glow on emissive particles and nodes via `UnrealBloomPass` and custom shader passes.
- **Interactive Node Modal**: Click any orbit node to launch a glassmorphism modal with high-res space imagery, telescope data, capture date, constellation telemetry, and direct NASA archive links.
- **Graceful WebGL Fallback**: Fully accessible archive layout for devices without WebGL acceleration.

## 🛠️ Stack

- **Framework**: React 18 + Vite
- **3D Engine**: Three.js (raw WebGL scene architecture)
- **Animation**: GSAP + Framer Motion
- **Styling**: Tailwind CSS + Custom CSS Design System

## 📦 Setup & Installation

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   (Optional) Replace `DEMO_KEY` with your official NASA API key from [api.nasa.gov](https://api.nasa.gov/).

3. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 🏭 Production Build & Preview

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

## 🌐 Deployment

This project is deploy-ready on Vercel or Netlify. A pre-configured `vercel.json` is included in the project root.
