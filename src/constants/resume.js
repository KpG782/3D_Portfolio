// =============================================================================
// RÉSUMÉ DATA — single source of truth for the résumé-driven sections.
// Edit values here; the UI sections render straight from this file.
// (Experience, Education, Awards, Leadership, Skills, Profile/Stats.)
// =============================================================================

/** Identity + contact used by Hero, Navbar CTA, Contact, Footer. */
export const profile = {
  name: "Ken Patrick Garcia",
  role: "AI Full-Stack Engineer",
  tagline: "I ship production AI systems — RAG pipelines, AI agents, and automation.",
  location: "Mandaluyong City, PH",
  workMode: "Remote · PH or International",
  email: "kenpatrickgarcia123@gmail.com",
  // phone/address intentionally NOT stored here — keep private details out of the bundle
  availability: "Open to Full-Stack / AI Engineer roles",
  github: "https://github.com/KpG782",
  linkedin: "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/",
  portfolio: "https://kenbuilds.tech/",
  // Public recruiter résumé: PDF is generated from /public/resume.html (PII-free —
  // no phone/street address). Regenerate after editing resume.html:
  //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  //     --no-pdf-header-footer --print-to-pdf=public/Ken-Patrick-Garcia-Resume.pdf \
  //     "file://$PWD/public/resume.html"
  resume: "/Ken-Patrick-Garcia-Resume.pdf",
  resumePage: "/resume.html",
};

/** Headline counters for About/Stats. */
export const stats = [
  { value: 4, suffix: "+", label: "Years building software", icon: "code" },
  { value: 24, suffix: "", label: "Projects shipped", icon: "laptop" },
  { value: 5, suffix: "", label: "Awards & finalist runs", icon: "trophy" },
  { value: 6, suffix: "", label: "Professional roles", icon: "users" },
];

// -----------------------------------------------------------------------------
// EXPERIENCE — real résumé roles (reverse-chronological as on the résumé).
// `start`/`end` are sortable "YYYY-MM" strings; `current: true` for ongoing.
// -----------------------------------------------------------------------------
export const experiences = [
  {
    id: "romega",
    company: "Romega Solutions",
    role: "AI Full-Stack Engineer",
    type: "Part-Time",
    location: "El Segundo, CA · Remote",
    period: "Jul 2025 – Present",
    start: "2025-07",
    end: null,
    current: true,
    icon: "robot",
    stack: ["LLM APIs", "RAG", "ChromaDB", "Google Gemini", "n8n", "Node.js"],
    highlights: [
      "Architected production-ready AI chatbots and automation systems, integrating LLM APIs, RAG pipelines with vector embeddings (ChromaDB), and Google Gemini AI for intelligent customer interactions and business workflow automation.",
    ],
  },
  {
    id: "codevf",
    company: "CodeVF",
    role: "Software Engineer",
    type: "Contract",
    location: "United States · Remote",
    period: "Feb 2026 – Mar 2026",
    start: "2026-02",
    end: "2026-03",
    current: false,
    icon: "socket",
    stack: ["WebSockets", "Real-time", "TypeScript", "Node.js"],
    highlights: [
      "Engineered a real-time collaboration platform with WebSocket architecture, enabling live debugging sessions between customers and engineers with bidirectional communication for code review and remote assistance.",
    ],
  },
  {
    id: "umak-automation",
    company: "University of Makati",
    role: "AI Workflow Automation Engineer",
    type: "Part-Time",
    location: "Makati City, PH · Remote",
    period: "Jan 2026 – Mar 2026",
    start: "2026-01",
    end: "2026-03",
    current: false,
    icon: "n8n",
    stack: ["n8n", "Automation", "Data Pipelines"],
    highlights: [
      "Built intelligent automation workflows using n8n to streamline university administrative processes and data management.",
    ],
  },
  {
    id: "pacebeats",
    company: "Pacebeats",
    role: "Lead Software Engineer",
    type: "Full-Time",
    location: "Makati City, PH · Remote",
    period: "Aug 2025 – Mar 2026",
    start: "2025-08",
    end: "2026-03",
    current: false,
    icon: "kotlin",
    stack: ["Kotlin", "WearOS", "React", "TypeScript", "Supabase", "ML"],
    highlights: [
      "Architected a biometric music platform (1st Runner-Up, InfoTech Olympics 2025) with a WearOS app (Kotlin, Health Services API), Kotlin Android app, React/TypeScript dashboard, and Supabase backend.",
      "Built a hybrid recommendation engine combining rule-based pace-to-BPM mapping with content-based ML scoring on user listening patterns, achieving real-time playlist adaptation.",
      "Engineered the WearOS companion with GPS tracking, heart-rate monitoring, Data Layer API sync, Spotify SDK integration, and 8+ hour battery optimization.",
    ],
  },
  {
    id: "freelance-fullstack",
    company: "Freelance / Client Projects",
    role: "Full-Stack Web Developer",
    type: "Freelance",
    location: "Remote · PH",
    period: "2023 – Present",
    start: "2023-01",
    end: null,
    current: true,
    icon: "react",
    stack: ["React", "Next.js", "Astro", "TailwindCSS", "Firebase", "Vercel"],
    highlights: [
      "Designed and shipped 8+ client websites and web apps for local businesses — cafés, printing services, restaurants, and wedding sites — with React, Astro, and TailwindCSS.",
      "Owned the full delivery cycle (design → responsive build → performance → deploy on Vercel/Firebase), working directly with clients since my academic years.",
    ],
  },
  {
    id: "comelec",
    company: "Commission on Elections (COMELEC)",
    role: "Technical DESO Support Staff",
    type: "Contract",
    location: "Makati City, PH",
    period: "Jul 2025 – Oct 2025",
    start: "2025-07",
    end: "2025-10",
    current: false,
    icon: "microchip",
    stack: ["Hardware", "Systems Config", "Field Ops"],
    highlights: [
      "Installed and configured Vote Counting Machine (VCM) hardware systems — CF/SD cards, thermal printers, modems, and batteries — for Final Testing & Sealing and Election Day operations.",
    ],
  },
  {
    id: "mobile-crossplatform",
    company: "Freelance / Academic Projects",
    role: "Cross-Platform & Flutter Developer",
    type: "Freelance / Academic",
    location: "Remote · PH",
    period: "2024 – 2025",
    start: "2024-01",
    end: "2025-06",
    current: false,
    icon: "flutter",
    stack: ["Flutter", "Dart", "Firebase", "React Native", "Kotlin"],
    highlights: [
      "Built 5+ cross-platform mobile apps with Flutter and Firebase (real-time auth, Cloud Firestore sync); led UI/UX and architecture for the CampusCare wellness app.",
      "Applied MVVM and clean architecture, then extended into React Native (Expo) for cross-platform web and mobile delivery.",
    ],
  },
  {
    id: "concentrix",
    company: "Concentrix",
    role: "Technical Support Representative",
    type: "Full-Time",
    location: "Mandaluyong City, PH",
    period: "Feb 2024 – Sep 2024",
    start: "2024-02",
    end: "2024-09",
    current: false,
    icon: "headset",
    stack: ["Enterprise SaaS", "Identity", "Cloud Support"],
    highlights: [
      "Provided technical support for a major enterprise SaaS productivity platform (client under NDA), troubleshooting complex user issues across identity management, cloud services, and software configuration.",
    ],
  },
  {
    id: "foundations",
    company: "Academic & Self-Directed Projects",
    role: "Junior Web Developer",
    type: "Self-Taught",
    location: "Philippines",
    period: "2021 – 2023",
    start: "2021-01",
    end: "2023-12",
    current: false,
    icon: "code",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
    highlights: [
      "Built 10+ static and dynamic web apps with HTML, CSS/Bootstrap, JavaScript, and PHP — applying responsive design and clean structure from day one.",
      "Designed normalized MySQL schemas and CRUD systems with authentication and role-based access for academic and school-level projects.",
    ],
  },
];

// -----------------------------------------------------------------------------
// EDUCATION
// -----------------------------------------------------------------------------
export const education = [
  {
    id: "umak",
    school: "University of Makati",
    degree: "BS Computer Science",
    major: "Major in Application Development",
    location: "Makati City, PH",
    period: "Expected 2026",
    current: true,
    coursework: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Mobile Development",
      "IoT Systems",
    ],
  },
  {
    id: "tip",
    school: "Technological Institute of the Philippines",
    degree: "BS Computer Science",
    major: "Major in Application Development",
    location: "Manila, PH",
    period: "2020 – 2021",
    current: false,
    coursework: [],
  },
];

// -----------------------------------------------------------------------------
// AWARDS — `icon` is an SVG key (no emoji), `projectId` links to a project.
// -----------------------------------------------------------------------------
export const awards = [
  {
    id: "devakda",
    place: "Top 13",
    event: "DEVAKDA Hackathon",
    detail: "Top 13 of 500+ participants",
    year: "2026",
    project: "Kudlit",
    projectId: "kudlit",
    icon: "medal",
  },
  {
    id: "infotech-olympics",
    place: "1st Runner-Up",
    event: "InfoTech Olympics 2025",
    detail: "Android App Development: Productivity · University of Makati",
    year: "2025",
    project: "Pacebeats",
    projectId: "pacebeats",
    icon: "medal",
  },
  {
    id: "dost-tapi",
    place: "Top 10 Finalist",
    event: "DOST-TAPI Regional Invention Contest & Exhibits 2025",
    detail: "Selected from 53 entries (ClustRICE, NCR Cluster)",
    year: "2025",
    project: "HerbaLens",
    projectId: "herbalens",
    icon: "medal",
  },
  {
    id: "best-paper",
    place: "Best Paper Presentation",
    event: "8th Research Congress, University of Makati",
    detail: "97% average score",
    year: "2025",
    project: "ARS",
    projectId: "ars",
    icon: "trophy",
  },
  {
    id: "coldstart-champion",
    place: "Champion",
    event: "C(Old)(St)art Hackathon 2025",
    detail: "Organized by Old St. Labs",
    year: "2025",
    project: "FlowFit",
    projectId: "flowfit",
    icon: "trophy",
  },
];

// -----------------------------------------------------------------------------
// LEADERSHIP & COMMUNITY
// -----------------------------------------------------------------------------
export const leadership = [
  {
    id: "umak-compsoc",
    org: "UMak Computer Society",
    role: "Technical Committee Member",
    location: "Makati City, PH",
    period: "Aug 2023 – May 2025",
    detail:
      "Managed end-to-end audio-visual infrastructure for 15+ flagship campus events including Herons Welcome, ICT Congress, and ICT Olympics.",
  },
  {
    id: "data-eng-ph",
    org: "Data Engineering Pilipinas",
    role: "DataCamp Scholar",
    location: "Philippines",
    period: "Nov 2025 – Present",
    detail:
      "Selected for a 12-month DataCamp scholarship in data engineering, analytics, and machine learning.",
  },
  {
    id: "aws-ug-ph",
    org: "AWS User Group Philippines",
    role: "AWS Community Officer",
    location: "Philippines",
    period: "2026",
    detail:
      "Selected as a volunteer Registration Officer for AWS Community Day 2026.",
  },
];

// -----------------------------------------------------------------------------
// SKILL MATRIX — mirrors résumé categories. Add a skill = add a string.
// NOTE: "iOS (SwiftUI)" added per Ken — confirm native vs cross-platform label.
// -----------------------------------------------------------------------------
export const skillMatrix = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Kotlin", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      "LLM APIs (OpenAI · Claude · Gemini)",
      "RAG",
      "Vector Embeddings (ChromaDB)",
      "n8n Automation",
      "TensorFlow",
      "Scikit-learn",
      "Computer Vision",
      "NLP",
      "Recommendation Systems",
      "Pandas",
      "NumPy",
      "Predictive Analytics",
    ],
  },
  {
    id: "frontend-mobile",
    label: "Frontend & Mobile",
    skills: [
      "React.js",
      "Next.js",
      "React Native (Expo)",
      "Flutter",
      "iOS (SwiftUI)",
      "Astro",
      "Three.js",
      "TailwindCSS",
      "Responsive Design",
    ],
  },
  {
    id: "backend-db",
    label: "Backend & Database",
    skills: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "Prisma ORM",
      "RESTful APIs",
      "Socket.io",
      "Cloud Firestore",
    ],
  },
  {
    id: "devops-cloud",
    label: "DevOps & Cloud",
    skills: [
      "AWS (EC2 · S3 · VPC · EBS)",
      "Docker",
      "Kubernetes (Learning)",
      "GitHub Actions",
      "CI/CD Pipelines",
    ],
  },
  {
    id: "specialized",
    label: "Specialized",
    skills: [
      "IoT Integration",
      "Real-time Data Processing",
      "WebSockets",
      "Performance Optimization",
      "GDPR Compliance",
    ],
  },
];

/** Spoken languages. */
export const spokenLanguages = ["Filipino (Native)", "English (Professional)"];

// -----------------------------------------------------------------------------
// JOURNEY — the story arc for the scroll-drawn SVG timeline (JourneySection).
// Each chapter: year label, title, one-sentence story beat, tech keys (rendered
// as icon chips), and an optional proof line (award / role that anchors it).
// -----------------------------------------------------------------------------
export const journey = [
  {
    id: "foundations",
    year: "2021",
    title: "First lines of code",
    story:
      "Started CS at TIP, transferred to UMak, and built 10+ web apps the old-school way — hand-rolled HTML, CSS, PHP, and normalized MySQL schemas.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    proof: "10+ academic & self-directed web builds",
  },
  {
    id: "mobile",
    year: "2024",
    title: "Going mobile",
    story:
      "Shipped 5+ cross-platform apps with Flutter and Firebase while doing enterprise SaaS support at Concentrix — learning how real users break real software.",
    tech: ["Flutter", "Dart", "Firebase", "Kotlin"],
    proof: "CampusCare wellness app · Concentrix enterprise support",
  },
  {
    id: "ai-turn",
    year: "2025",
    title: "The AI turn",
    story:
      "Joined Romega Solutions as an AI Full-Stack Engineer — production RAG pipelines, ChromaDB embeddings, and Gemini-powered chatbots — while leading Pacebeats to a podium finish.",
    tech: ["Python", "RAG", "ChromaDB", "Gemini", "n8n", "WearOS"],
    proof: "1st Runner-Up InfoTech Olympics · Top 10 DOST-TAPI · Best Paper",
  },
  {
    id: "visible",
    year: "2026",
    title: "Speaking & shipping",
    story:
      "First conference talk at Qwen Meetup Manila (Alibaba Cloud), real-time collaboration engineering at CodeVF, n8n automation for UMak — and a BS CS degree on the way.",
    tech: ["WebSockets", "n8n", "Qwen", "TypeScript"],
    proof: "Speaker · Alibaba Cloud Qwen Meetup Manila #2",
  },
  {
    id: "next",
    year: "Next",
    title: "Where I'm headed",
    story:
      "Going deeper on AI agents, MCP, and data engineering — backed by a 12-month DataCamp scholarship and the AWS community I help organize.",
    tech: ["AI Agents", "MCP", "Kubernetes", "Data Engineering"],
    proof: "DataCamp Scholar · AWS Community Officer",
  },
];

// -----------------------------------------------------------------------------
// SPEAKING — talks given. `first: true` flags a milestone; `photo` is optional
// (section degrades gracefully to a text card if the image is missing).
// Add a stage photo at the `photo` path to make a talk photo-led.
// -----------------------------------------------------------------------------
export const talks = [
  {
    id: "qwen-meetup",
    title: "From Creative Brief to Campaign",
    event: "Qwen Meetup Manila #2",
    host: "Alibaba Cloud Philippines",
    venue: "Common Ground, Rockwell",
    date: "2026",
    first: true,
    photo: "/images/speaking/qwen-1.webp",
    blurb:
      "Showed Qwen as a creative director that delegates to specialist models — live, with no written brief. From a single photo of a Filipino café it pitched a full rival brand, then wrote the video prompt and wired the whole campaign end-to-end through n8n + Wan Video.",
    takeaway: "AI amplifies the creative — it doesn't replace them.",
  },
];

// -----------------------------------------------------------------------------
// COMMUNITY — ecosystems Ken builds and shows up in. Rendered as a text wall
// (no logo assets required). Optional `note` highlights a standout role.
// -----------------------------------------------------------------------------
export const communities = [
  { name: "Alibaba Cloud · Qwen", note: "Speaker" },
  { name: "OpenAI · Codex" },
  { name: "AWS Community", note: "Community Officer" },
  { name: "Google · Gen AI Academy APAC" },
  { name: "Vercel" },
  { name: "n8n" },
  { name: "Cursor" },
  { name: "Microsoft Azure" },
  { name: "GDG Manila" },
  { name: "Python PH" },
];
