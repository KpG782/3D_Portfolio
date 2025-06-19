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
  { value: 20, suffix: "+", label: "Personal & Academic Projects", icon: "laptop" },
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
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Flutter Developer",
    modelPath: "/models/Flutter.glb",
    scale: 26,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/elephpant1.glb",
    scale: .3,
    rotation: [0, 0, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
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
const expCards = [
  {
    review: "Ken began his development journey with solid fundamentals in HTML, Bootstrap, JavaScript, and PHP. His curiosity and persistence laid the foundation for his current growth as a modern web developer.",
    imgPath: "/images/exp11.png",
    logoPath: "/images/logo1.svg",
    title: "Junior Web Developer",
    date: "2021 - 2023",
    responsibilities: [
      "Built static and dynamic websites using HTML, CSS (Bootstrap), JS, and PHP.",
      "Explored database management using MySQL in academic projects.",
      "Created school-level web systems with login/authentication and CRUD operations.",
    ],
  },
  {
    review: "Ken's venture into mobile app development showed great potential. His use of Flutter with Firebase transformed ideas into visually engaging, cross-platform mobile experiences.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Flutter Developer",
    date: "2024 - 2025",
    responsibilities: [
      "Developed mobile apps using Flutter and Firebase for authentication and real-time data.",
      "Led UI implementation in the CampusCare guidance counseling app.",
      "Collaborated with teammates on cross-functional features in mobile app projects.",
    ],
  },
  {
    review: "Ken’s transition into React development demonstrates his adaptability and modern mindset. He now builds web apps with cleaner architecture, reusable components, and optimized performance.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Developer",
    date: "2025 - Present",
    responsibilities: [
      "Created dynamic and interactive UIs using React and TailwindCSS.",
      "Implemented RESTful APIs and routing using React Router.",
      "Currently building personal projects and team-based applications using React Native Expo.",
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
    url: "https://www.facebook.com/kenpatrickgarcia123/"
  },
  {
    name: "dev",
    imgPath: "/images/dev.png",
    url: "https://dev.to/kpg782"
  },
  {
    name: "github",
    imgPath: "/images/github1.png",
    url: "https://github.com/KpG782"
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/"
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
