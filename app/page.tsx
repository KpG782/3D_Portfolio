import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Bento from "@/components/Bento";
import CaseStudyTeasers from "@/components/CaseStudyTeasers";
import Achievements from "@/components/Achievements";
import Lab from "@/components/Lab";
import Talks from "@/components/Talks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FunnelEvents from "@/components/FunnelEvents";
import ChatLauncher from "@/components/chat/ChatLauncher";
import { lab } from "@/data/lab";

/** Static page, revalidated hourly so the live cards stay fresh. */
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Section
          id="work"
          station="01"
          label="THE WORK"
          title="The work"
          kicker="15+ shipped systems across AI, web, and mobile."
        >
          <Bento />
        </Section>

        <Section
          id="case-studies"
          station="02"
          label="CASE STUDIES"
          title="Three systems, traced end to end"
          kicker="Architecture, trade-offs, what broke, and the numbers."
        >
          <CaseStudyTeasers />
        </Section>

        <Achievements />

        <Section
          id="lab"
          station="03"
          label="THE LAB"
          title="The lab"
          kicker={lab.intro}
        >
          <Lab />
        </Section>

        <Section
          id="talks"
          station="04"
          label="TALKS"
          title="Talks & community"
          kicker="First speakership: Qwen Meetup Manila #2 — hosted by Alibaba Cloud PH."
        >
          <Talks />
        </Section>

        <Section
          id="contact"
          station="05"
          label="CONTACT"
          title="Hiring for AI engineering? I reply fast."
        >
          <Contact />
        </Section>
      </main>
      <Footer />
      <FunnelEvents />
      <ChatLauncher />
    </>
  );
}
