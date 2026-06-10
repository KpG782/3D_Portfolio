import Image from "next/image";
import { nowBuilding, shipLog } from "@/data/projects";

type GhEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
};

async function fetchActivity() {
  try {
    const res = await fetch(
      "https://api.github.com/users/KpG782/events/public?per_page=100",
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) return null;
    const events = (await res.json()) as GhEvent[];
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recent = events.filter(
      (e) => new Date(e.created_at).getTime() > cutoff,
    );
    if (recent.length === 0) return null;
    const pushes = recent.filter((e) => e.type === "PushEvent").length;
    const repos = new Set(recent.map((e) => e.repo.name)).size;
    return { pushes, repos };
  } catch {
    return null;
  }
}

/**
 * Everything shipped that isn't a flagship trace: one live status line plus
 * dense native-<details> rows. Zero JS — disclosure, focus, and keyboard
 * handling are the browser's.
 */
export default async function ShipLog() {
  const gh = await fetchActivity();

  return (
    <div className="mt-14">
      <p className="station-label">[ SHIP LOG ]</p>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 font-mono text-xs leading-relaxed text-telemetry">
        <span>
          <span aria-hidden="true" className="text-pass">
            ●
          </span>{" "}
          {nowBuilding.label}: {nowBuilding.body}
        </span>
        <span aria-hidden="true" className="text-white/20">
          |
        </span>
        <a
          href="https://github.com/KpG782"
          target="_blank"
          rel="noopener noreferrer"
          data-track="project_card_click"
          data-track-id="github-activity"
          className="transition-colors duration-200 hover:text-signal"
        >
          github:{" "}
          {gh ? `${gh.pushes} pushes · ${gh.repos} repos / 30d` : "KpG782"} ↗
        </a>
      </p>

      <ul className="mt-5 border-t border-white/8">
        {shipLog.map((item) => (
          <li key={item.id}>
            <details className="group border-b border-white/8">
              <summary
                data-track="project_card_click"
                data-track-id={item.id}
                className="flex cursor-pointer list-none flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-3 [&::-webkit-details-marker]:hidden"
              >
                <span className="flex items-baseline gap-3 sm:w-36 sm:shrink-0">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-pulse transition-transform duration-200 group-open:rotate-90"
                  >
                    ▸
                  </span>
                  <span className="font-mono text-sm font-semibold tracking-wide text-signal uppercase">
                    {item.title}
                  </span>
                </span>
                <span className="pl-6 text-sm leading-snug text-telemetry sm:min-w-0 sm:flex-1 sm:pl-0">
                  {item.lead}
                </span>
              </summary>

              <div className="grid gap-5 pb-6 pl-6 sm:pl-9 md:grid-cols-[minmax(0,20rem)_1fr]">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 768px) 20rem, 100vw"
                    className="w-full rounded-xl border border-white/10"
                  />
                ) : null}
                <div className="flex flex-col gap-4">
                  {item.body ? (
                    <p className="max-w-prose text-sm leading-relaxed text-telemetry">
                      {item.body}
                    </p>
                  ) : null}
                  <ul className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <li key={s} className="chip-mini">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="flex gap-4 font-mono text-xs">
                    {item.repo ? (
                      <a
                        href={item.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pulse hover:underline"
                      >
                        repo ↗
                      </a>
                    ) : null}
                    {item.live ? (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pulse hover:underline"
                      >
                        live ↗
                      </a>
                    ) : null}
                    {!item.repo && !item.live ? (
                      <span className="text-telemetry">
                        internal / details on request
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
