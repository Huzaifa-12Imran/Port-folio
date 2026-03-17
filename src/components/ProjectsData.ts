export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  placeholderColor?: string;
}

export const projectsData: Project[] = [
  {
    id: "academix",
    title: "AcademiX",
    description:
      "A modern attendance & academic management system with role-based dashboards for students, teachers, and admins. Features real-time attendance tracking, grade management, performance analytics, and a scalable MongoDB backend.",
    tech: ["Next.js", "React", "MongoDB", "Node.js"],
    liveUrl: "https://academi-x-by-3070-3040-3025.vercel.app",
    githubUrl: "https://github.com/Huzaifa-12Imran/AcademiX-By-3070-3040-3025",
    placeholderColor: "#0a1628",
  },
  {
    id: "huzaifa-portfolio",
    title: "Huzaifa — Portfolio",
    description:
      "A personal developer portfolio showcasing projects, skills, and experience. Built with a dark aesthetic and smooth animations for an immersive presentation.",
    tech: ["React", "Vite", "Framer Motion", "JavaScript"],
    liveUrl: "https://huzaifa-lyart.vercel.app",
    githubUrl: "https://github.com/Huzaifa-12Imran/Huzaifa",
    placeholderColor: "#0a0a14",
  },
  {
    id: "nexus-mail",
    title: "Nexus Mail",
    description:
      "An AI-powered Gmail clone that elevates email workflows with intelligent features. Write, summarise, and manage emails smarter with built-in AI assistance.",
    tech: ["TypeScript", "React", "AI Integration", "REST APIs"],
    liveUrl: "https://nexus-mail-x7bq.vercel.app",
    githubUrl: "https://github.com/Huzaifa-12Imran/Nexus-Mail",
    placeholderColor: "#0a1420",
  },
  {
    id: "gravity-flip",
    title: "Gravity Flip",
    description:
      "A browser-based physics game where players manipulate gravity to navigate surreal obstacle courses. Features smooth collision detection and progressive difficulty.",
    tech: ["JavaScript", "Canvas API", "CSS"],
    liveUrl: "https://gravity-flip-one.vercel.app",
    githubUrl: "https://github.com/Huzaifa-12Imran/Gravity-Flip",
    placeholderColor: "#100a1e",
  },
  {
    id: "v0-clone",
    title: "v0 Clone",
    description:
      "A functional clone of Vercel's v0 AI UI generator — a tool that converts natural language prompts into production-ready React component code in real time.",
    tech: ["TypeScript", "Next.js", "AI", "Tailwind"],
    liveUrl: "https://v0-clone-ruddy-iota.vercel.app",
    githubUrl: "https://github.com/Huzaifa-12Imran/v0-Clone",
    placeholderColor: "#12100a",
  },
  {
    id: "react-knowledge-hub",
    title: "React Knowledge Hub",
    description:
      "A modern React learning platform with 6 interactive pages, live API integration, an interactive quiz system, dark/light themes, and fully responsive design.",
    tech: ["React", "Vite", "React Router", "REST APIs"],
    liveUrl: "https://huzaifa-12imran.github.io/React-Knowledge-Hub/",
    githubUrl: "https://github.com/Huzaifa-12Imran/React-Knowledge-Hub",
    placeholderColor: "#0a1a14",
  },
  {
    id: "user-auth-system",
    title: "User Authentication System",
    description:
      "A full-stack web application for managing student records with secure JWT login, role-based access control, and a modern responsive interface.",
    tech: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
    githubUrl: "https://github.com/Huzaifa-12Imran/User-Authentication-System",
    placeholderColor: "#14100a",
  },
  {
    id: "blog-app",
    title: "Blog App",
    description:
      "A full-stack blogging platform with user authentication, protected routes, create/edit/delete posts, and a clean, responsive reader interface.",
    tech: ["Node.js", "Express", "MongoDB", "JavaScript"],
    githubUrl: "https://github.com/Huzaifa-12Imran/Blog-App_With-User-Auth",
    placeholderColor: "#0a100e",
  },
  {
    id: "web-dev",
    title: "Web Dev Playground",
    description:
      "A collection of foundational web development experiments and mini-projects — HTML, CSS, and vanilla JavaScript exercises that laid the groundwork for advanced full-stack work.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Huzaifa-12Imran/Web-dev",
    placeholderColor: "#100a0a",
  },
];
