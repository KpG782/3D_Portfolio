import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import DeferredSection from "./components/DeferredSection.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const FeatureCards = lazy(() => import("./sections/FeatureCards.jsx"));
// FeaturedHighlights ("Featured Work") intentionally unmounted for now — the
// Selected Work grid already leads with Beacon + Kudlit. Re-add the block below
// to restore it.
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection.jsx"));
const CertificationsSection = lazy(() =>
  import("./sections/CertificationsSection.jsx")
);
const ExperienceSection = lazy(() =>
  import("./sections/ExperienceSection.jsx")
);
const TechStack = lazy(() => import("./sections/TechStack.jsx"));
const Testimonials = lazy(() => import("./sections/Testimonials.jsx"));
const FAQSection = lazy(() => import("./sections/FAQSection.jsx"));
const Contact = lazy(() => import("./sections/Contact.jsx"));
const Footer = lazy(() => import("./sections/Footer.jsx"));

// New résumé-driven sections
const EducationAwards = lazy(() => import("./sections/EducationAwards.jsx"));
const SpeakingCommunity = lazy(() => import("./sections/SpeakingCommunity.jsx"));
const DesignSystem = lazy(() => import("./sections/DesignSystem.jsx"));

const SectionFallback = ({ minHeight }) => (
  <div
    aria-hidden="true"
    style={{
      minHeight,
      width: "100%",
    }}
  />
);

const App = () => {
  return (
    <ThemeProvider>
      <a href="#work" className="skip-link">
        Skip to main content
      </a>
      <NavBar />
      <Hero />

      {/* Why work with me — the 60-second hireability pitch */}
      <DeferredSection id="why" minHeight="60vh" rootMargin="800px 0px">
        <Suspense fallback={<SectionFallback minHeight="60vh" />}>
          <FeatureCards />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="work" minHeight="120vh" rootMargin="800px 0px">
        <Suspense fallback={<SectionFallback minHeight="120vh" />}>
          <ShowcaseSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="experience" minHeight="90vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <ExperienceSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="education" minHeight="80vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="80vh" />}>
          <EducationAwards />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="75vh" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="75vh" />}>
          <TechStack />
        </Suspense>
      </DeferredSection>

      {/* Speaking & community — proof Ken is a visible builder, not just a coder */}
      <DeferredSection id="community" minHeight="100vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <SpeakingCommunity />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="70vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="70vh" />}>
          <CertificationsSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="65vh" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="65vh" />}>
          <Testimonials />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="70vh" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="70vh" />}>
          <FAQSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection id="contact" minHeight="100vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="100vh" />}>
          <Contact />
        </Suspense>
      </DeferredSection>

      {/* Colophon — the design system + accessibility behind the site */}
      <DeferredSection id="design-system" minHeight="60vh" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="60vh" />}>
          <DesignSystem />
        </Suspense>
      </DeferredSection>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Privacy-friendly product analytics + Core Web Vitals (Vercel) */}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
};
export default App;
