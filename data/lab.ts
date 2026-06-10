/** The real homelab — source of truth for the lab diagram. Facts only. */
export const lab = {
  intro:
    "Local inference on hardware I run myself. The models on the résumé run in this room first.",
  nodes: [
    {
      id: "asus",
      name: "ASUS laptop",
      spec: "40GB RAM · Ubuntu 24.04",
      runs: "Ollama — Gemma, Qwen Coder · Open WebUI",
      role: "local inference server",
    },
    {
      id: "m4",
      name: "MacBook Air M4",
      spec: "16GB",
      runs: "dev machine — builds, agents, this site",
      role: "development",
    },
    {
      id: "monitor",
      name: "ThinkVision T27h-30",
      spec: '27" QHD',
      runs: "n8n canvases & dashboards",
      role: "display",
    },
    {
      id: "a26",
      name: "Galaxy A26",
      spec: "Android",
      runs: "Kudlit builds on real hardware",
      role: "test device",
    },
  ],
  flows: [
    { from: "m4", to: "asus", label: "prompts → local models" },
    { from: "m4", to: "a26", label: "APK → device" },
  ],
} as const;
