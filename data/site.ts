export const site = {
  name: "Ken Patrick Garcia",
  brand: "kenbuilds",
  url: "https://kenbuilds.tech",
  role: "AI Full-Stack Engineer",
  positioning:
    "I ship production AI systems — RAG, agents, and the full stack around them.",
  status: "open to AI engineering roles · Metro Manila / remote",
  location: "Mandaluyong City, PH",
  email: "kenpatrickgarcia123@gmail.com",
  resumePdf: "/Ken-Patrick-Garcia-Resume.pdf",
  resumePage: "/resume",
  // Honest count — the 9 duplicate entries that inflated "24" are gone.
  proofLine: "kenbuilds · production AI since 2025 · 15+ shipped projects",
  linkedInFollowers: "4.9K+", // static, manually updated per Ken
  introVideo: "https://www.youtube.com/watch?v=nze_7ezndes",
  socials: [
    { label: "GitHub", href: "https://github.com/KpG782" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/",
    },
    { label: "dev.to", href: "https://dev.to/kpg782" },
  ],
} as const;

/** The three locked hero proof chips. Do not edit without a certificate. */
export const heroChips = [
  "Champion — C(Old) St.art Hackathon 2025",
  "Top 13 of 500+ — DEVAKDA · shipped Android v1.0.0",
  "Legal RAG with a 100-question golden eval set",
] as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Case studies", href: "/#case-studies" },
  { label: "Lab", href: "/#lab" },
  { label: "Talks", href: "/#talks" },
  { label: "Contact", href: "/#contact" },
] as const;
