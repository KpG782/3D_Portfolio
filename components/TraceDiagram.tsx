import type { TraceStage } from "@/data/case-studies";
import InView from "./InView";

/**
 * The signature element (DESIGN.md §3): stages light up in sequence when the
 * diagram scrolls into view. Server-rendered markup; the only client code is
 * the InView class toggle. Transform/opacity transitions only.
 */
export default function TraceDiagram({
  spanLabel,
  stages,
  annotations,
}: {
  spanLabel: string;
  stages: TraceStage[];
  annotations: string[];
}) {
  return (
    <InView className="trace panel-card p-5 md:p-7" threshold={0.4}>
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <p className="station-label">[ {spanLabel} ]</p>
        <span aria-hidden="true" className="font-mono text-xs text-pulse">
          ▰▰▰▱
        </span>
      </div>

      <div
        role="list"
        className="mt-6 flex flex-col gap-0 md:flex-row md:items-stretch"
      >
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex flex-col md:flex-1 md:flex-row">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="stage-link my-1 ml-[7px] h-6 w-0.5 shrink-0 bg-pulse/40 md:my-0 md:mt-[7px] md:ml-0 md:h-0.5 md:w-full md:min-w-4 md:flex-1"
                style={{ ["--stage-delay" as string]: `${i * 140}ms` }}
              />
            )}
            <div role="listitem" className="flex items-start gap-3 md:block md:shrink-0">
              <span
                className="stage-node mt-0.5 block size-4 shrink-0 rounded-full border-2 border-white/25 bg-panel"
                style={{ ["--stage-delay" as string]: `${i * 140 + 60}ms` }}
                aria-hidden="true"
              />
              <p className="md:mt-3">
                <span className="block text-sm font-semibold text-signal">
                  {stage.label}
                </span>
                {stage.sub ? (
                  <span className="block font-mono text-[11px] text-telemetry">
                    {stage.sub}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-7 space-y-2 border-t border-white/8 pt-4">
        {annotations.map((note) => (
          <li
            key={note}
            className="flex gap-2 font-mono text-[13px] leading-relaxed text-telemetry"
          >
            <span aria-hidden="true" className="text-pulse">
              ▸
            </span>
            <span className="max-w-prose">{note}</span>
          </li>
        ))}
      </ul>
    </InView>
  );
}
