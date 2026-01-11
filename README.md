# 🚀 3D Developer Portfolio — React + Vite

🎨 An award-winning interactive 3D web developer portfolio built with **React**, **Vite**, **Three.js**, and **GSAP**.  
This project showcases cutting-edge web development with interactive neural networks, chatbot constellation backgrounds, and real-time 3D rendering.

✨ **Features civic tech and public health projects with innovative AI/ML solutions.**

🔗 **Inspired by this tutorial:**  
[🎥 Build and Deploy a Unique 3D Web Developer Portfolio with React, Three JS & GSAP](https://www.youtube.com/watch?v=E-fdPfRxkzQ)

---

## 🛠️ Tech Stack

| 🧩 Tool/Library         | 📌 Purpose                                  |
|------------------------|---------------------------------------------|
| ⚛️ **React 19**        | Frontend UI library                         |
| ⚡ **Vite**            | Lightning-fast dev server and bundler       |
| 🧱 **Three.js**        | WebGL-based 3D graphics rendering            |
| 🌐 **React Three Fiber** | React renderer for Three.js scenes        |
| 🎭 **React Three Drei** | Useful helpers for Three.js               |
| 🎬 **GSAP**            | Smooth animations and timeline control      |
| 🎨 **Tailwind CSS**    | Utility-first CSS framework                 |
| 🌓 **Theme Context**   | Custom dark/light mode switching            |
| 📧 **EmailJS**         | Contact form email integration              |
| 📦 **ESLint**          | Linting and code style enforcement          |

---

## 📁 Project Structure

```
3D_Portfolio/
├── node_modules/            # 📦 Project dependencies
├── public/                  # 🌐 Static files
│   ├── images/              # 📸 Images (hero, projects, certifications, logos)
│   │   ├── certifications/  # 🏆 Certification badges
│   │   ├── hero/            # 🎭 Hero section images
│   │   ├── logos/           # 🔷 Tech stack logos
│   │   ├── projects/        # 🚀 Project screenshots
│   │   └── textures/        # 🎨 3D model textures
│   ├── models/              # 🧱 3D models (.glb files)
│   └── resume/              # 📄 Resume PDF
├── src/                     # 📂 Source code
│   ├── components/          # 🧩 Reusable components
│   │   ├── HeroModels/      # 💫 3D hero section models
│   │   │   ├── HeroExperience.jsx
│   │   │   ├── HeroLights.jsx
│   │   │   ├── Patricles.jsx
│   │   │   └── Room.jsx
│   │   ├── Models/          # 🎨 Other 3D models
│   │   │   ├── Computer-optimized.jsx
│   │   │   └── TechLogos/
│   │   ├── AnimatedCounter.jsx
│   │   ├── Button.jsx
│   │   ├── ContactExperience.jsx
│   │   ├── GlowCard.jsx
│   │   ├── NavBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── TitleHeader.jsx
│   ├── constants/           # 📌 Static data and configs
│   │   ├── certifications.js
│   │   ├── data.js
│   │   └── index.js
│   ├── contexts/            # 🌐 React contexts
│   │   └── ThemeContext.jsx
│   ├── sections/            # 📄 Page sections
│   │   ├── CertificationsSection.jsx
│   │   ├── Contact.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── FeatureCards.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LogoSection.jsx
│   │   ├── ShowcaseSection.jsx
│   │   ├── TechStack.jsx
│   │   └── Testimonials.jsx
│   ├── App.jsx              # 🎯 Main app component
│   ├── index.css            # 🎨 Global styles
│   └── main.jsx             # 🚪 Entry point
├── .gitignore               # 🚫 Git ignore rules
├── eslint.config.js         # ⚙️ ESLint configuration
├── vite.config.js           # ⚡ Vite configuration
├── package.json             # 📃 Project metadata and scripts
├── LICENSE                  # 📜 MIT License
├── 3D_MODEL_OPTIMIZATION_GUIDE.md  # 📘 3D optimization guide
├── THEME_IMPLEMENTATION_GUIDE.md   # 🎨 Theme implementation guide
└── README.md                # 📖 Project documentation
```


---

## 🧪 Features

### 🎨 Interactive Backgrounds
- ✅ **Neural Network Background** — 3D interactive particles with chain reaction physics in Hero section
- ✅ **Chatbot Constellation** — Animated AI chat bubbles with conversation threads in ShowcaseSection
- ✅ **Mouse Interactivity** — Elastic repulsion, energy propagation, and depth-based animations

### 🌓 Theme System
- ✅ **Dark/Light Mode** — Seamless theme switching with custom ThemeContext
- ✅ **Theme-Aware Colors** — All components adapt to current theme with proper contrast
- ✅ **Smooth Transitions** — Elegant color transitions across all elements

### 📱 Responsive Design
- ✅ **Mobile-First** — Fully responsive layouts for all screen sizes
- ✅ **Touch Support** — OptimKpG782/3d-developer-portfolio.git

# 2. Navigate into the project
cd 3D_Portfolio

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

# 5. Open in browser
# Visit http://localhost:5173
```

### 📋 Environment Setup

Before running the project, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

For contact form functionality, set up your EmailJS credentials in the Contact component. **Credential Links** — Direct links to verification pages

### 💼 Professional Sections
- ✅ **Experience Timeline** — Work history with animated counters
- ✅ **Tech Stack Visualization** — 3D logos with interactive hover effects
- ✅ **Contact Form** — EmailJS integration with 3D experience
- ✅ **Footer** — Social links and navigation

### 🎬 Advanced Animations
- ✅ **GSAP ScrollTrigger** — Scroll-based reveal animations
- ✅ **Canvas Physics** — Chain reactions, energy transfer, damping
- ✅ **3D Depth System** — Z-axis depth with parallax effects
- ✅ **Particle Systems** — Custom particle engines with velocity and forces

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/3d-developer-portfolio.git

# 2. Navigate into the project
cd 3d-developer-portfolio

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

```
## 🧹 ESLint Configuration

Thi📸 Screenshots

### 🌌 Interactive Neural Network Hero
Experience the 3D neural network with chain reaction physics and mouse-driven particle interactions.

### 🤖 Chatbot Constellation Background
AI-themed chat bubbles with conversation threads creating an immersive showcase environment.

### 🎨 Light & Dark Themes
Seamless theme switching with consistent design language across all sections.

### 🏆 Dynamic Certifications Carousel
Auto-scrolling infinite carousel with hover previews and full-screen modal views.
- [typescript-eslint](https://typescript-eslint.io) – Enables type-aware linting in TypeScript projects
- [Vite's React TS Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) – A great starting point for React + TypeScript development

---

## Screenshots

![image](https://github.com/user-attachments/assets/45fc30f8-2e70-49f9-99fd-337628204c16)
![image](https://github.com/user-attachments/assets/65addde2-d50c-420a-b329-3790adc6c8a6)
![image](https://github.com/user-attachments/assets/00314cb0-69b0-4671-bf72-c439fa9a3f77)



---

## 📚 Tutorial Reference

This 3D portfolio project was inspired by an excellent YouTube tutorial created by **JavaScript Mastery**.  
It walks you through building a beautiful, animated, and fully responsive web developer portfolio using React, Three.js, and GSAP.

👉 Watch it here: [https://www.youtube.com/watch?v=E-fdPfRxkzQ](https://www.youtube.com/watch?v=E-fdPfRxkzQ)

---
🎯 Project Highlights

This portfolio showcases:
- **Civic Tech Solutions** — Emergency automotive assistance (ARS)
- **Public Health Innovation** — Childhood obesity prevention (FlowFit)
- **AI/ML Applications** — Legal insight extraction, herbal medicine recognition
- **Full-Stack Development** — React, Three.js, GSAP, Node.js, MongoDB

## 📚 Additional Documentation

- [3D_MODEL_OPTIMIZATION_GUIDE.md](3D_MODEL_OPTIMIZATION_GUIDE.md) — Optimize 3D models for web performance
- [THEME_IMPLEMENTATION_GUIDE.md](THEME_IMPLEMENTATION_GUIDE.md) — Custom theme system documentation

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/KpG782/3d-developer-portfolio/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project inspired you or helped with your own portfolio!

---

## ✨ Author

**Ken Patrick Garcia**  
🔗 GitHub: [@KpG782](https://github.com/KpG782)  
💼 Portfolio: [Live Demo](https://your-portfolio-url.com)  
📧 Email: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">
  <sub>Built with ❤️ using React, Three.js, and GSAP</sub>
</div> the **MIT License**.  
You're free to use, modify, and distribute it for personal or commercial use. Just give proper credit where it's due.

---

## ✨ Author

Developed by **Ken Patrick Garcia,**  
🔗 GitHub: [@KpG782](https://github.com/KpG782)
