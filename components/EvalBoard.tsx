/**
 * PARKED (2026-06-10): not rendered anywhere. The golden-eval claim was
 * removed from the site because no eval artifact exists yet. When Ken builds
 * a real eval set, set `evalBoard: true` on the case study and light this up
 * with the real question count and pass-rates.
 */
export default function EvalBoard() {
  return (
    <figure className="panel-card p-5 md:p-7">
      <figcaption className="flex flex-wrap items-center justify-between gap-2">
        <p className="station-label">[ GOLDEN EVAL SET ]</p>
        <p className="font-mono text-[11px] text-telemetry">
          100 questions · graded before ship
        </p>
      </figcaption>
      <div
        aria-hidden="true"
        className="mt-5 grid gap-1 sm:gap-1.5"
        style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <span
            key={i}
            className="aspect-square rounded-[3px] border border-white/10 bg-white/[0.06]"
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-telemetry">
        <span className="text-warn">▸</span> pass-rates pending publication —
        this board lights up with real results only.
      </p>
    </figure>
  );
}
