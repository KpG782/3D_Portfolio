import { awards, certifications } from "@/data/awards";
import InView from "./InView";

/** One quiet row of stamps — no game mechanics (brief §Phase 3.6). */
export default function Achievements() {
  return (
    <section
      aria-label="Awards and certifications"
      className="mx-auto max-w-[1152px] px-5 md:px-8"
    >
      <InView className="reveal border-y border-white/8 py-8">
        <ul className="flex snap-x gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-6 lg:grid-cols-6">
          {awards.map((a) => (
            <li key={a.event} className="min-w-44 snap-start md:min-w-0">
              <p className="font-mono text-sm font-semibold text-brass">
                {a.place}
              </p>
              <p className="mt-1 text-xs leading-snug text-telemetry">
                {a.event}
                <span className="block text-signal/80">{a.project}</span>
              </p>
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2">
          {certifications.map((c) => (
            <li key={c.name}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="chip-mini inline-block transition-colors duration-200 hover:border-pulse/50 hover:text-signal"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
