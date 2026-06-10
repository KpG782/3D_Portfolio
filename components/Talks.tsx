import Image from "next/image";
import { communities, talk } from "@/data/talks";
import InView from "./InView";

export default function Talks() {
  return (
    <InView className="reveal">
      <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
        <article className="panel-card overflow-hidden md:flex">
          {/* The stage photo is portrait (750×1000) — render it at its
              natural ratio instead of cropping to 16:9. */}
          <div className="relative aspect-[3/4] md:aspect-auto md:w-2/5 md:shrink-0">
            <Image
              src={talk.photo}
              alt={`Ken speaking at ${talk.event}`}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-5 md:p-6">
            <p className="font-mono text-xs tracking-wide text-brass">
              FIRST CONFERENCE TALK · {talk.year}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{talk.title}</h3>
            <p className="mt-1 font-mono text-xs text-telemetry">
              {talk.event} · {talk.host} · {talk.venue}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-signal/90">
              {talk.blurb}
            </p>
            <p className="mt-4 border-l-2 border-pulse/60 pl-3 text-sm text-telemetry italic">
              “{talk.takeaway}”
            </p>
          </div>
        </article>

        <div>
          <p className="font-mono text-xs tracking-wide text-telemetry">
            SHOWS UP IN
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {communities.map((c) => (
              <li key={c.name} className="chip">
                {c.name}
                {"note" in c && c.note ? (
                  <span className="font-semibold text-brass">{c.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}
