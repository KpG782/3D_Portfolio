import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cs = getCaseStudy((await params).slug);
  const name = cs?.name ?? "Case study";
  const lead = cs?.lead ?? "";
  const stages = cs?.stages ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a1424",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#92a7c5",
              fontSize: 26,
              letterSpacing: 6,
              display: "flex",
            }}
          >
            [ TRACE · {name.toUpperCase()} ]
          </div>
          <div
            style={{
              color: "#e9f0fa",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 28,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {lead}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {stages.map((s, i) => (
              <div
                key={s.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 56,
                      height: 4,
                      backgroundColor: "rgba(84,185,255,0.45)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: "4px solid #54b9ff",
                    backgroundColor: "#111f38",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#92a7c5",
              fontSize: 24,
            }}
          >
            <div style={{ display: "flex" }}>
              Ken Patrick Garcia — AI Full-Stack Engineer
            </div>
            <div style={{ display: "flex", color: "#d9a848" }}>
              kenbuilds.tech
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
