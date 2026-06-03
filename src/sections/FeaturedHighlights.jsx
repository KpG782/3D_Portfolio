import { featuredProjects } from "../constants/projects.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import TagList from "../components/ui/Chip.jsx";
import Badge from "../components/ui/Badge.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";

/** "FlowFit – AI-Powered Kids Fitness Companion" -> "FlowFit" */
const shortName = (title) => title.split(/\s[–—-]\s/)[0].trim();

const FeaturedHighlights = () => (
  <section
    id="highlights"
    className="w-full section-padding xl:px-0"
    style={{ backgroundColor: "var(--bg-primary)" }}
  >
    <div className="w-full md:px-20 px-5">
      <SectionHeader
        eyebrow="// award-winning work"
        title="Featured Highlights"
        description="Hackathon wins, research awards, and competition finalists — the projects I'm proudest of."
      />

      <div className="mt-16 md:mt-24 flex flex-col gap-16 md:gap-28 max-w-6xl mx-auto">
        {featuredProjects.map((p, i) => {
          const reversed = i % 2 === 1;
          return (
            <RevealOnScroll
              as="article"
              key={p.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* media */}
              <div className={`gradient-frame overflow-hidden ${reversed ? "md:order-2" : ""}`}>
                <img
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[16/10]"
                />
              </div>

              {/* copy */}
              <div className={reversed ? "md:order-1" : ""}>
                {p.award && <Badge icon={p.award.icon}>{p.award.place}</Badge>}
                <h3 className="mt-4 text-2xl md:text-4xl font-semibold text-theme-primary">
                  {shortName(p.title)}
                </h3>
                {p.award && <p className="mono-meta mt-2">{p.award.event}</p>}
                <p className="mt-3 text-theme-secondary text-base md:text-lg leading-relaxed">
                  {p.tagline}
                </p>

                {p.metrics?.length > 0 && (
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="mono-meta">{m.label}</dt>
                        <dd className="font-mono text-lg md:text-xl font-semibold text-theme-primary">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <TagList tags={p.stack} tone="muted" max={6} className="mt-5" />

                <div className="mt-6 flex flex-wrap gap-3">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary focus-ring-brand"
                    >
                      View project
                    </a>
                  )}
                  {p.links.repo && (
                    <a
                      href={p.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost focus-ring-brand"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturedHighlights;
