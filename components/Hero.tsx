import Link from "next/link";
import { heroChips, site } from "@/data/site";

/**
 * The 7-second test lives here: status → name → positioning → proof chips →
 * CTAs, all server-rendered text. No entrance animation, no images, no
 * client JS required for first paint (DESIGN.md §3–4).
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-[1152px] px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24"
    >
      <div className="grid items-start gap-12 md:grid-cols-[3fr_2fr]">
        <div>
          <p className="font-mono text-xs tracking-wide text-telemetry">
            <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-pass align-middle" />
            {site.status}
          </p>

          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-bold sm:text-6xl">
            Ken Patrick <span className="text-brass">Garcia</span>
          </h1>

          {/* Role next to the name in crawlable text — the ornament that
              carried it is hidden on mobile (7-second test + entity SEO). */}
          <p className="station-label mt-4">{site.role}</p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-signal sm:text-xl">
            {site.positioning}
          </p>

          <ul className="mt-7 flex max-w-xl flex-col gap-2 sm:flex-row sm:flex-wrap">
            {heroChips.map((chip) => (
              <li key={chip} className="chip">
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="btn btn-primary">
              See the work
            </a>
            <Link href={site.resumePage} className="btn btn-ghost">
              Résumé
            </Link>
          </div>

          <p className="mt-10 font-mono text-xs text-telemetry">
            {site.proofLine}
          </p>
        </div>

        {/* Static ornament — styled box, zero JS, hidden on mobile so the
            pitch owns the fold (the audit's photo lesson). */}
        <div className="panel-card hidden p-5 font-mono text-[13px] leading-relaxed text-telemetry md:block">
          <p className="border-b border-white/8 pb-3 text-xs">
            ken@kenbuilds ~ %
          </p>
          <p className="pt-3">
            <span className="text-pulse">$</span> whoami
          </p>
          <p>AI full-stack engineer — Metro Manila, PH</p>
          <p className="pt-2">
            <span className="text-pulse">$</span> uname -a
          </p>
          <p>RAG · agents · n8n · Next.js · Kotlin</p>
          <p className="pt-2">
            <span className="text-pulse">$</span> uptime
          </p>
          <p>
            shipping since 2021 · production AI since 2025{" "}
            <span className="text-pass">●</span>
          </p>
        </div>
      </div>
    </section>
  );
}
