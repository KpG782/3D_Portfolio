/** Award stamps — certificate truth only. Brass styling, one row. */
export const awards = [
  { place: "Champion", event: "C(Old) St.art Hackathon 2025", project: "FlowFit" },
  {
    place: "1st Runner-Up",
    event: "InfoTech Olympics 2025 · Android App Development: Productivity",
    project: "Pacebeats",
  },
  // DAMAY's "Top 5 of 105 — Stellar PH Hackathon 2026" stamp is parked until
  // Ken finalizes its content (2026-06-10).
  { place: "Top 13 of 500+", event: "DEVAKDA Hackathon 2026", project: "Kudlit" },
  { place: "Top 10 of 53", event: "DOST-TAPI ClustRICE 2025", project: "HerbaLens" },
  {
    place: "Best Paper · 97%",
    event: "8th Research Congress, University of Makati",
    project: "ARS",
  },
] as const;

/**
 * Cert chips (linked). AWS Cloud Practitioner intentionally absent until Ken
 * supplies a working credential URL — the old one was a broken blob: link.
 */
export const certifications = [
  {
    name: "Scrimba — AI Engineer Path",
    url: "https://scrimba.com/certificate-cert2JbLs3qgBCXNPMJMyUCMeiG1Ft81LygPuCWDut",
  },
  {
    name: "Scrimba — Full-Stack Path",
    url: "https://scrimba.com/certificate-cert23wfboWopPzYzuFmUUR7kB1jDSDa25GMh8Ex46bTFWreYVC4",
  },
  {
    name: "Scrimba — Frontend Path",
    url: "https://scrimba.com/certificate-cert24zAwPPowRMvnPizmWidNYfzcSAtUH6QyAC7A",
  },
  {
    name: "IBM — AI Essentials",
    url: "https://www.credly.com/badges/eac8e9b1-6405-4b6a-97e9-60c198d4a3d5/linked_in_profile",
  },
  {
    name: "Cisco — Intro to Modern AI",
    url: "https://www.credly.com/badges/01b1a9ae-89bf-4e9a-997c-c162ff683893/linked_in_profile",
  },
  {
    name: "Cisco — AI Fundamentals with IBM",
    url: "https://www.credly.com/earner/earned/share/04de403f-0b7d-4023-b862-b182e52d898d",
  },
  {
    name: "Cisco — Intro to Cybersecurity",
    url: "https://www.credly.com/badges/3b043db7-830f-42ce-9e00-3fe380fa77a9/linked_in_profile",
  },
] as const;
