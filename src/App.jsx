import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import DeferredSection from "./components/DeferredSection.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

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
      <NavBar />
      <Hero />
      <DeferredSection id="work" minHeight="120vh" rootMargin="800px 0px">
        <Suspense fallback={<SectionFallback minHeight="120vh" />}>
          <ShowcaseSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="70vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="70vh" />}>
          <CertificationsSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="90vh" rootMargin="700px 0px">
        <Suspense fallback={<SectionFallback minHeight="90vh" />}>
          <ExperienceSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="75vh" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="75vh" />}>
          <TechStack />
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
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
};
export default App;
