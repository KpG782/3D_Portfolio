import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Atkinson_Hyperlegible,
  Martian_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/data/site";
import { awards } from "@/data/awards";
import "./globals.css";

// display:"optional" — the LCP gate (<1s) beats the brand font on cold slow
// connections: text paints once in a metrically-matched fallback and never
// re-fires LCP; preloaded fonts win on warm/normal connections.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "optional",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "optional",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ken Patrick Garcia — AI Full-Stack Engineer",
    template: "%s · Ken Patrick Garcia",
  },
  description:
    "I ship production AI systems — RAG, agents, and the full stack around them. Case studies traced end to end: architecture, trade-offs, and evals.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "kenbuilds",
    title: "Ken Patrick Garcia — AI Full-Stack Engineer",
    description:
      "Production AI systems, traced end to end — RAG, agents, and the full stack around them.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Patrick Garcia — AI Full-Stack Engineer",
    description:
      "Production AI systems, traced end to end — RAG, agents, and the full stack around them.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a1424",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/images/2x2.webp`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      description: site.positioning,
      // Certificate truth only — derived from the awards data layer.
      award: awards.map((a) => `${a.place} — ${a.event} (${a.project})`),
      worksFor: { "@type": "Organization", name: "Romega Solutions" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Makati",
      },
      sameAs: [
        "https://github.com/KpG782",
        "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/",
        "https://dev.to/kpg782",
        "https://medium.com/@kenpatrickgarcia/about",
      ],
      knowsAbout: [
        "Retrieval-Augmented Generation",
        "AI Agents",
        "LLM Evals",
        "n8n Automation",
        "Next.js",
        "TypeScript",
        "Supabase",
        "pgvector",
        "Kotlin",
        "WearOS",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: site.role,
        occupationLocation: { "@type": "Country", name: "Philippines" },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "kenbuilds",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${atkinson.variable} ${martian.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
