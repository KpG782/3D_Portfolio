import { lab } from "@/data/lab";
import InView from "./InView";

/**
 * Station 03 — the real homelab as an annotated diagram (Direction 2 keeps
 * 3D usage "B": diagrams over decoration; this can upgrade to a modeled
 * scene in v2 without re-architecting).
 */
export default function Lab() {
  return (
    <InView className="reveal">
      <div className="grid gap-4 sm:grid-cols-2">
        {lab.nodes.map((node) => (
          <div key={node.id} className="panel-card p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{node.name}</h3>
              <span className="chip-mini shrink-0">{node.role}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-telemetry">{node.spec}</p>
            <p className="mt-3 text-sm leading-relaxed text-signal/90">
              {node.runs}
            </p>
          </div>
        ))}
      </div>
      <ul className="mt-6 space-y-1.5">
        {lab.flows.map((flow) => (
          <li
            key={flow.label}
            className="font-mono text-[13px] text-telemetry"
          >
            <span aria-hidden="true" className="text-pulse">
              ▸{" "}
            </span>
            {flow.from} ──▶ {flow.to} · {flow.label}
          </li>
        ))}
      </ul>
    </InView>
  );
}
