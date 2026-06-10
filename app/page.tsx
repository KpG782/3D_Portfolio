import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CaseStudyCards from "@/components/CaseStudyCards";
import ShipLog from "@/components/ShipLog";
import Achievements from "@/components/Achievements";
import Lab from "@/components/Lab";
import Talks from "@/components/Talks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FunnelEvents from "@/components/FunnelEvents";
import ChatLauncher from "@/components/chat/ChatLauncher";
import { lab } from "@/data/lab";
import { site } from "@/data/site";
import { caseStudyDates } from "@/data/case-studies";

/** Static page, revalidated hourly so the ship-log status line stays fresh. */
export const revalidate = 3600;

// Homepage-only: marks this URL as the profile page for the Person entity
// declared in the root layout's graph (Google ProfilePage rich result).
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: `${site.url}/`,
  name: `${site.name} — ${site.role}`,
  dateModified: caseStudyDates.modified,
  mainEntity: { "@id": `${site.url}/#person` },
  isPartOf: { "@id": `${site.url}/#website` },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />

        <Section
          id="work"
          station="01"
          label="THE WORK"
          title="The work"
          kicker="Three systems traced end to end, plus the champion build — then the full ship log."
        >
          <CaseStudyCards />
          <ShipLog />
        </Section>

        <Achievements />

        <Section
          id="lab"
          station="02"
          label="THE LAB"
          title="The lab"
          kicker={lab.intro}
        >
          <Lab />
        </Section>

        <Section
          id="talks"
          station="03"
          label="TALKS"
          title="Talks & community"
          kicker="First speakership: Qwen Meetup Manila #2 — hosted by Alibaba Cloud PH."
        >
          <Talks />
        </Section>

        <Section
          id="contact"
          station="04"
          label="CONTACT"
          title="Hiring for AI engineering? I reply fast."
        >
          <Contact />
        </Section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <FunnelEvents />
      <ChatLauncher />
    </>
  );
}
