import TitleHeader from "../components/TitleHeader.jsx";

const faqItems = [
  {
    question: "Who is Ken Patrick Garcia?",
    answer:
      "Ken Patrick Garcia is an AI Full Stack Engineer from the Philippines who builds award-winning web, mobile, and AI-powered products using React, Flutter, and modern backend systems.",
  },
  {
    question: "What technologies does Ken Garcia specialize in?",
    answer:
      "He specializes in React, Flutter, TypeScript, Three.js, AI systems, automation workflows, and full-stack product development for web and mobile applications.",
  },
  {
    question: "What kind of projects has Ken Garcia built?",
    answer:
      "His portfolio includes AI-powered compliance tools, health and wellness apps, civic technology products, mobile applications, interactive web experiences, and performance-focused frontend builds.",
  },
  {
    question: "Is Ken Garcia available for freelance or full-time work?",
    answer:
      "Yes. He is open to developer roles, freelance opportunities, and product-focused engineering work involving AI systems, frontend performance, and cross-platform development.",
  },
  {
    question: "Why hire Ken Garcia as an AI Full Stack Engineer?",
    answer:
      "He combines strong frontend execution, mobile development experience, AI integration, and real project delivery across award-winning academic, hackathon, and production-grade builds.",
  },
];

const FAQSection = () => {
  return (
    <section
      id="faq"
      className="section-padding flex-center"
      aria-labelledby="faq-heading"
    >
      <div className="w-full md:px-10 px-5">
        <TitleHeader
          title="Frequently Asked Questions"
          sub="Answers & Hiring Context"
        />

        <div className="mt-14 max-w-5xl mx-auto grid gap-4">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="gradient-frame p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <h3
                className="text-lg md:text-xl font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {item.question}
              </h3>
              <p
                className="mt-3 text-sm md:text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
