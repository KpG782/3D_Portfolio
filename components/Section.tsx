/** A numbered station on the request line (DESIGN.md §3). */
export default function Section({
  id,
  station,
  label,
  title,
  kicker,
  children,
}: {
  id: string;
  station?: string;
  label: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-[1152px] px-5 md:px-8">
      <div className="request-rail py-16 pl-6 md:py-24 md:pl-10">
        <p className="station-label">
          [ {station ? `${station} · ` : ""}
          {label} ]
        </p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
        {kicker ? (
          <p className="mt-3 text-base text-telemetry md:text-lg">{kicker}</p>
        ) : null}
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
