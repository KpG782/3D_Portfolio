# 🚀 Ken Patrick Garcia — AI Full Stack Engineer Portfolio

An award-winning, interactive 3D developer portfolio built with **React 19**,
**Vite**, **Three.js (React Three Fiber)**, **GSAP**, and **Tailwind CSS**.
It showcases AI/full-stack, mobile, and interactive 3D work — with an
interactive neural-network hero, a draggable 3D contact scene, a
certifications carousel, and a polished light/dark design system.

🔗 **Live:** https://kenbuilds.tech/

---

## 🛠️ Tech Stack

| Tool / Library            | Purpose                                   |
| ------------------------- | ----------------------------------------- |
| ⚛️ React 19               | UI library                                |
| ⚡ Vite 6                 | Dev server & bundler                      |
| 🧱 Three.js               | WebGL 3D rendering                        |
| 🌐 React Three Fiber/Drei | React renderer & helpers for Three.js     |
| 🎬 GSAP                   | Scroll & timeline animation               |
| 🎞️ Framer Motion         | Component motion & transitions            |
| 🎨 Tailwind CSS v4        | Utility-first styling + design tokens     |
| 🌓 Theme Context          | Custom dark/light mode                    |
| 📧 EmailJS                | Contact form delivery                     |
| 📊 Vercel Analytics       | Privacy-friendly product analytics        |
| ⚡ Vercel Speed Insights  | Core Web Vitals monitoring                |

---

## ✨ Features

- **Interactive neural-network hero** — canvas particles with mouse-driven
  chain-reaction physics, depth, and reduced-motion support.
- **Cohesive design system** — indigo → violet → cyan gradient tokens,
  glass surfaces, gradient hairline frames, and consistent buttons/chips
  driven by CSS variables (no hardcoded per-component colors).
- **Light / dark theme** — system-aware, persisted, smooth transitions.
- **3D contact scene** — draggable room rendered with React Three Fiber,
  lazy-loaded so it never blocks first paint.
- **Award-winning project showcase** — accessible cards + detail modals.
- **Certifications carousel** — auto-scrolling, drag-to-control, hover preview.
- **Performance-minded** — route/section code-splitting, deferred sections,
  a dedicated lazy `three-vendor` chunk, lazy images & iframes.
- **SEO / AEO / GEO ready** — valid JSON-LD (Person, WebSite, FAQ, ItemList),
  Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, and `llms.txt`
  for AI search engines.

---

## 📦 Getting Started

```bash
# 1. Clone
git clone https://github.com/KpG782/3d-developer-portfolio.git
cd 3D_Portfolio

# 2. Install
npm install

# 3. Configure environment (contact form)
cp .env.example .env
#   then fill in your EmailJS values

# 4. Run
npm run dev          # http://localhost:5173

# 5. Build / preview
npm run build
npm run preview
```

### Environment

Requires **Node.js 18+**. The contact form uses EmailJS — set these in `.env`
(never commit real keys; `.env` is gitignored):

```
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI + 3D model components
│   ├── HeroModels/    # 3D room, lights, particles (R3F)
│   └── Models/        # Tech-logo 3D models
├── constants/         # Static data (projects, experience, certs, nav)
├── contexts/          # ThemeContext (dark/light)
├── sections/          # Page sections (Hero, Showcase, Experience, …)
├── App.jsx            # Composition + analytics
├── index.css          # Design tokens, utilities, components
└── main.jsx           # Entry point
public/                # Static assets (images, models, SEO files)
```

---

## 🎯 Highlights

- **ARS** — Auto Repair Response Network Service · _Best Paper, 8th Research Congress_
- **FlowFit** — AI-powered kids' fitness companion · _Hackathon Champions 2025_
- **Pacebeats** — Smart music recommender · _1st Runner-Up, InfoTech Olympics 2025_

---

## 👤 Author

**Ken Patrick Garcia** — AI Full Stack Engineer
🔗 GitHub: [@KpG782](https://github.com/KpG782) ·
💼 [LinkedIn](https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/) ·
📧 kenpatrickgarcia123@gmail.com

## 📜 License

Released under the **MIT License** — free to use, modify, and distribute with
attribution.

<div align="center"><sub>Built with ❤️ using React, Three.js, GSAP & Tailwind.</sub></div>
