import { featuredProjects } from "../constants/projects.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import TagList from "../components/ui/Chip.jsx";
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
        eyebrow="// featured work"
        title="Featured Work"
        description="A few builds I'd lead with — what they do, how they're built, and where to see them live."
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/projects/_placeholder.svg";
                  }}
                />
              </div>

              {/* copy */}
              <div className={reversed ? "md:order-1" : ""}>
                {p.role && <p className="mono-meta mb-2">{p.role}</p>}
                <h3 className="text-2xl md:text-4xl font-semibold text-theme-primary">
                  {shortName(p.title)}
                </h3>
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
