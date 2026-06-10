import type { MetadataRoute } from "next";
import { caseStudies, caseStudyDates } from "@/data/case-studies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      // Homepage regenerates every deploy — build time is its honest mtime.
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudies.map((cs) => ({
      url: `${site.url}/work/${cs.slug}`,
      lastModified: new Date(caseStudyDates.modified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/resume`,
      // Git date of public/resume.html — bump when the résumé changes.
      lastModified: new Date("2026-06-11"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
