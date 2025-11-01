import { FaCode, FaLaptopCode, FaLayerGroup, FaUsers } from "react-icons/fa";

const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Learning & Coding", icon: "code" },
  {
    value: 20,
    suffix: "+",
    label: "Personal & Academic Projects",
    icon: "laptop",
  },
  { value: 8, suffix: "+", label: "Tech Stacks Explored", icon: "layers" },
  { value: 4, suffix: "", label: "Team Projects Collaborated", icon: "users" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Agile Leadership",
    desc: "Coordinating cross-functional tasks efficiently with adaptability and clear project goals.",
  },
  {
    imgPath: "/images/chat.png",
    title: "UI/UX Precision",
    desc: "Crafting clean and user-friendly interfaces that align with user needs and system goals.",
  },
  {
    imgPath: "/images/time.png",
    title: "Robust Backend Development",
    desc: "Building secure, scalable systems with smooth data handling and reliable performance under pressure.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Full-stack Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cross-Platform Developer",
    modelPath: "/models/Flutter.glb",
    scale: 26,
    rotation: [0, 0, 0],
  },
  {
    name: "AI/ML Practitioner",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloud Practitioner",
    modelPath: "/models/docker.glb",
    scale: 1.2,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

//use strong action words, optimized, achieved, developed, then bring tangible metrics and achievable result(eg improved front pacing app perfoamce, load spped)
// Use strong action words, optimized, achieved, developed, then bring tangible metrics and achievable result (e.g. improved front pacing app performance, load speed)
const expCards = [
  {
    review:
      "I began my development journey building solid fundamentals in HTML, Bootstrap, JavaScript, and PHP. My curiosity and persistence during this phase laid the foundation for my growth as a modern web developer.",
    imgPath: "/images/exp11.png",
    logoPath: "/images/logo1.svg",
    title: "Junior Web Developer",
    date: "2021 - 2023",
    responsibilities: [
      "Developed 10+ static and dynamic websites using HTML, CSS (Bootstrap), JavaScript, and PHP with responsive design principles.",
      "Designed and implemented MySQL database schemas for academic projects, optimizing query performance by structuring normalized tables.",
      "Built school-level web systems featuring secure login authentication, role-based access control, and full CRUD operations for data management.",
    ],
  },
  {
    review:
      "I ventured into mobile app development and transformed ideas into visually engaging, cross-platform experiences. Using Flutter with Firebase, I delivered real-time features and intuitive interfaces that enhanced user engagement.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Flutter Developer",
    date: "2024 - 2025",
    responsibilities: [
      "Developed 5+ cross-platform mobile applications using Flutter and integrated Firebase for real-time authentication and cloud data synchronization.",
      "Led UI/UX implementation for the CampusCare guidance counseling app, achieving a modern, accessible interface that improved user satisfaction scores.",
      "Collaborated with a team of 4 developers on cross-functional features, implementing state management solutions that reduced app load time by 30%.",
    ],
  },
  {
    review:
      "I transitioned into React development to embrace modern web architecture and component-based design. I now build scalable web applications with cleaner code, reusable components, and optimized performance that delivers exceptional user experiences.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Developer",
    date: "2025 - Present",
    responsibilities: [
      "Created 8+ dynamic and interactive user interfaces using React and TailwindCSS, improving development speed by 40% through reusable component architecture.",
      "Implemented RESTful API integrations and client-side routing using React Router, enhancing navigation performance and reducing page load times.",
      "Currently developing personal portfolio projects and team-based applications using React Native Expo, focusing on mobile-first responsive design and cross-platform compatibility.",
    ],
  },
  {
    review:
      "I evolved into a full-stack software engineer, combining frontend expertise with robust backend development. I architect end-to-end solutions using modern frameworks and cloud technologies, delivering scalable applications that solve real-world problems.",
    imgPath: "/images/exp4.png",
    logoPath: "/images/logo4.png",
    title: "Software Engineer",
    date: "2025 - Present",
    responsibilities: [
      "Architected and deployed full-stack web/mobile applications using React, Node.js, Kotlin, and Flutter implementing RESTful APIs and microservices architecture.",
      "Integrated cloud services (AWS/Firebase) for scalable hosting, authentication, and real-time data synchronization across multiple platforms.",
      "Implemented CI/CD pipelines using Git, Docker, and automated testing frameworks, reducing deployment time by 50% and improving code quality.",
      "Led technical decision-making for system architecture, database design, and technology stack selection in academic and personal projects.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
  {
    name: "logo4",
    imgPath: "/images/logo4.png",
  },
];
const testimonials = [
  {
    name: "Mark Siazon",
    mentions: "msiazon.k12043276@umak.edu.ph ",
    review:
      "Ken showed real grit during our early web dev days. He always explored new tools beyond what was taught, and made sure we understood what we were building. His curiosity is contagious.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Timothy Forte",
    mentions: "tforte.a62241031@umak.edu.ph ",
    review:
      "When we transitioned to Flutter, Ken was the one who led the charge. He learned the framework fast and even taught us the basics. It’s rare to have a teammate that dedicated.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Jam Villarosa",
    mentions: "jvillarosa.a12240987@umak.edu.ph",
    review:
      "Ken’s progress in React is seriously impressive. He doesn’t just learn tools—he builds things. He’s the kind of teammate who levels up the whole group by sharing what he knows.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Lanz Corpuz",
    mentions: "lcorpuz.a12241569@umak.edu.ph ",
    review:
      "Ken naturally took the lead in most of our projects. Even under pressure, he kept the team organized and focused. He made sure everyone had a role and felt valued.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Brian Ashley Papa",
    mentions: "bpapa.a12034938@umak.edu.ph ",
    review:
      "You can tell Ken isn’t in this just to pass subjects—he’s here to grow. His willingness to explore new tech and take feedback makes him stand out as a leader.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Mars Maguddayao",
    mentions: "lmaguddayao.a12240891@umak.edu.ph",
    review:
      "Ken is detail-oriented and driven. Whether it’s frontend polish or code clarity, he’ll always push for better. His calm leadership made our collabs smoother and more productive.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    url: "https://www.instagram.com/sinpayken/",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    url: "https://www.facebook.com/kenpatrickgarcia123/",
  },
  {
    name: "dev",
    imgPath: "/images/dev.png",
    url: "https://dev.to/kpg782",
  },
  {
    name: "github",
    imgPath: "/images/github1.png",
    url: "https://github.com/KpG782",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
