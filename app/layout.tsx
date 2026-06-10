import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Atkinson_Hyperlegible,
  Martian_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
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
  icons: { icon: "/favicon.png" },
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
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      description: site.positioning,
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
        {/* Gates hidden-until-revealed styles behind JS availability so
            content is never invisible for no-JS visitors or crawlers. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a href="#work" className="skip-link">
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
