import Image from "next/image";
import { site } from "@/data/site";
import InView from "./InView";
import OpenChatButton from "./OpenChatButton";

export default function Contact() {
  return (
    <InView className="reveal">
      <div className="grid items-start gap-8 md:grid-cols-[1fr_2fr]">
        <Image
          src="/images/2x2.webp"
          alt="Ken Patrick Garcia"
          width={440}
          height={440}
          className="w-full max-w-60 rounded-2xl border border-white/10 md:max-w-none"
        />
        <div>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-base break-all text-pulse underline-offset-4 hover:underline md:text-lg"
          >
            {site.email}
          </a>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              Email Ken
            </a>
            <a
              href={site.resumePdf}
              data-track="resume_download"
              className="btn btn-ghost"
            >
              Résumé PDF
            </a>
            <OpenChatButton />
          </div>
          <ul className="mt-6 flex flex-wrap gap-4">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-telemetry transition-colors duration-200 hover:text-signal"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-telemetry">
            {site.linkedInFollowers} followers on LinkedIn · building in
            public ·{" "}
            <a
              href={site.introVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pulse hover:underline"
            >
              2-minute intro video ↗
            </a>
          </p>
        </div>
      </div>
    </InView>
  );
}
