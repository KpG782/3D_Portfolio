import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/8">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-3 px-5 py-10 md:px-8">
        <p className="font-mono text-xs leading-relaxed text-telemetry">
          Built as a documented system — architecture in the{" "}
          <a
            href="https://github.com/KpG782/3D_Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pulse underline underline-offset-4"
          >
            README
          </a>
          . Body face: Atkinson Hyperlegible, designed by the Braille
          Institute.
        </p>
        <p className="font-mono text-xs text-telemetry">
          © 2026 {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
