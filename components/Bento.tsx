import Link from "next/link";
import { bento, nowBuilding, type BentoItem } from "@/data/projects";
import GitHubCard from "./GitHubCard";
import InView from "./InView";

function CardBody({ item }: { item: BentoItem }) {
  return (
    <>
      <div>
        <p className="font-mono text-xs tracking-wide text-telemetry">
          {item.title.toUpperCase()}
        </p>
        <p className="mt-2 text-[15px] leading-snug font-semibold text-signal">
          {item.lead}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {item.stack.map((s) => (
          <span key={s} className="chip-mini">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

function Card({ item }: { item: BentoItem }) {
  const span = item.wide ? "md:col-span-2" : "";

  if (item.stamp) {
    return (
      <div
        className={`panel-card flex flex-col justify-between border-l-2 !border-l-brass/70 p-5 ${span}`}
      >
        <p className="font-mono text-xs tracking-wide text-brass">
          ACHIEVEMENT · {item.title.toUpperCase()}
        </p>
        <p className="mt-2 text-[15px] font-semibold text-signal">
          {item.lead}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <span key={s} className="chip-mini">
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const href = item.href ?? item.live ?? item.repo;
  const external = !item.href;

  if (!href) {
    return (
      <div className={`glass flex flex-col justify-between p-5 ${span}`}>
        <CardBody item={item} />
      </div>
    );
  }

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track="project_card_click"
      data-track-id={item.id}
      className={`glass flex flex-col justify-between p-5 transition-colors duration-200 hover:border-pulse/40 ${span}`}
    >
      <CardBody item={item} />
      <span className="mt-3 font-mono text-xs text-pulse">view →</span>
    </a>
  ) : (
    <Link
      href={href}
      data-track="project_card_click"
      data-track-id={item.id}
      className={`glass flex flex-col justify-between p-5 transition-colors duration-200 hover:border-pulse/40 ${span}`}
    >
      <CardBody item={item} />
      <span className="mt-3 font-mono text-xs text-pulse">trace it →</span>
    </Link>
  );
}

export default function Bento() {
  return (
    <InView className="reveal">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {bento.map((item) => (
          <Card key={item.id} item={item} />
        ))}

        {/* Live cards (ship gate): currently building + GitHub activity. */}
        <div className="panel-card flex flex-col justify-between gap-4 p-5">
          <p className="font-mono text-xs tracking-wide text-telemetry">
            <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-pass align-middle" />
            NOW BUILDING
          </p>
          <p className="text-[15px] leading-snug font-semibold text-signal">
            {nowBuilding.body}
          </p>
        </div>
        <GitHubCard />
      </div>
    </InView>
  );
}
