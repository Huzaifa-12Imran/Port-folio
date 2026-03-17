import * as React from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaReact, FaNodeJs, FaCode, FaJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiCplusplus } from "react-icons/si";
import CursorLens from "./CursorLens";
import SectionBlock from "./components/SectionBlock";
import LoadingScreen from "./components/LoadingScreen";
import { projectsData } from "./components/ProjectsData";
import ProjectCard from "./components/ProjectCard";
import AnimatedHobbyStickers from "./components/AnimatedHobbyStickers";
import SiteHeader from "./components/SiteHeader";
import HeroHud from "./components/HeroHud";
import startupVideo from "./assets/videoplayback.mp4";

// Lazy-loaded heavy components for performance
const ArtesGrid = React.lazy(
  () => import("./components/ArtesGrid"),
);
const ExpeditionLog = React.lazy(
  () => import("./components/ExpeditionLog"),
);
const ContactSection = React.lazy(() => import("./components/ContactSection"));
import "./App.css";
import aboutImage from "./assets/about_me_new.png";

type TechBadge = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  left: string;
  top: string;
  delay: string;
};

const techBadges: TechBadge[] = [
  { label: "React", icon: FaReact, left: "2%", top: "72%", delay: "0s" },
  { label: "Next.js", icon: SiNextdotjs, left: "10%", top: "48%", delay: "0.4s" },
  { label: "TS", icon: SiTypescript, left: "24%", top: "28%", delay: "0.8s" },
  { label: "JS", icon: FaJs, left: "40%", top: "14%", delay: "1.2s" },
  { label: "Node.js", icon: FaNodeJs, left: "58%", top: "12%", delay: "1.6s" },
  { label: "C++", icon: SiCplusplus, left: "76%", top: "24%", delay: "2s" },
  { label: "C", icon: FaCode, left: "90%", top: "44%", delay: "2.4s" },
  { label: "Python", icon: FaPython, left: "98%", top: "68%", delay: "2.8s" },
];

const navLinks = [
  { label: "HOME", id: "hero" },
  { label: "ABOUT ME", id: "about" },
  { label: "SKILLS", id: "skills" },
  { label: "PROJECTS", id: "projects" },
  { label: "EXPERIENCE / LEARNING", id: "experience" },
  { label: "CONTACT", id: "contact" },
];

// Reusable scroll-reveal wrapper component
function SectionReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="section-reveal"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [onDarkBg, setOnDarkBg] = React.useState(false);
  const aboutRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroToAboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"],
  });

  // Calculate header color based on scroll
  // Hero is light background -> text should be dark (#2c330f)
  // About and beyond are dark -> text should be light (#e2e0d4)
  const headerTextColor = useTransform(
    heroToAboutProgress,
    [0.1, 0.4],
    ["#2c330f", "#e2e0d4"],
  );

  const headerBorderColor = useTransform(
    heroToAboutProgress,
    [0.1, 0.4],
    ["rgba(44, 51, 15, 0.4)", "rgba(255, 255, 255, 0.4)"],
  );

  // Track when we've scrolled onto a dark section
  useMotionValueEvent(heroToAboutProgress, "change", (v) => {
    setOnDarkBg(v > 0.25);
  });

  // Lines should be light when on dark backgrounds OR when menu is open
  const needsLightLines = onDarkBg || isMenuOpen;

  const aboutContentOpacity = useTransform(
    heroToAboutProgress,
    [0, 0.45, 1],
    [0.2, 0.65, 1],
  );

  // Lock body scroll while nav is open
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="page-root">
      <SiteHeader
        isMenuOpen={isMenuOpen}
        needsLightLines={needsLightLines}
        headerTextColor={headerTextColor}
        headerBorderColor={headerBorderColor}
        activeSection={activeSection}
        navLinks={navLinks}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onNavigate={scrollToSection}
      />

      <section id="hero" className="hero-section">
        <HeroHud badges={techBadges} />

        <CursorLens
          baseImage="radial-gradient(circle at 50% 50%, #0a0a0a 0%, #050505 100%)"
          revealImage="radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.4) 0%, rgba(139, 0, 0, 0.15) 50%, transparent 100%)"
          objectFit="cover"
          backgroundColor="#050505"
          blobOutlineColor="rgba(197, 160, 89, 0.15)"
          parallaxStrength={0}
          showBackground={true}
          bgBlobCount={20}
          bgBlobSize={300}
          bgBlobComplexity={200}
          bgBlobSpeed={0.3}
          blobStrokeWidth={0.5}
          previewCursor={false}
          blobSize={600}
          speed={350}
        />
      </section>

      {/* About Me — deep olive dark, lime-tinted blobs */}
      <SectionBlock
        id="about"
        className="about-section"
        sectionRef={aboutRef}
        blob={{
          backgroundColor: "#0a0a0a",
          blobColor: "#8b0000",
          blobCount: 12,
          blobSize: 400,
          blobComplexity: 220,
          blobSpeed: 0.4,
          strokeOpacity: 0.12,
        }}
      >
        <SectionReveal>
          <motion.div
            className="about-layout"
            style={{ opacity: aboutContentOpacity }}
          >
            {/* Header row: index number + title + decorative line + hobby icon */}
            <div className="about-header-row">
              <span className="about-section-num">01</span>
              <h2 className="about-heading">About Me</h2>
              <div className="about-heading-line" />
              <AnimatedHobbyStickers />
            </div>

            {/* Main content grid */}
            <div className="about-content-grid">
              {/* Photo panel */}
              <div className="about-photo-panel">
                <div className="about-photo-wrap">
                  <img
                    src={aboutImage}
                    alt="Huzaifa"
                    className="about-photo"
                    loading="lazy"
                  />
                  <div className="about-photo-overlay">
                    <span className="about-photo-badge-text">AVAILABLE FOR HIRE</span>
                  </div>
                </div>
              </div>

              {/* Text panel */}
              <div className="about-text-panel">
                <p className="about-lead">
                  I am <strong>Huzaifa</strong>, a full-stack architect dedicated
                  to the pursuit of digital elegance and technical mastery.
                </p>
                <p className="about-body">
                  From the precise disciplines of C++ to the reactive rituals of
                  React and Next.js, I forge systems that are as robust as they
                  are beautiful. My work on projects like <strong>Nexus Mail</strong>
                  {" "}and <strong>AcademiX</strong> represents my commitment to
                  pushing the boundaries of what is possible in the digital realm.
                </p>
                <blockquote className="about-quote">
                  The code is the canvas; the logic is the brush; the experience
                  is the masterpiece.
                </blockquote>

                {/* Stats row */}
                <div className="about-stats-row">
                  <div className="about-stat">
                    <span className="about-stat-number">4+</span>
                    <span className="about-stat-label">Years Coding</span>
                  </div>
                  <div className="about-stat-divider" />
                  <div className="about-stat">
                    <span className="about-stat-number">10+</span>
                    <span className="about-stat-label">Projects Built</span>
                  </div>
                  <div className="about-stat-divider" />
                  <div className="about-stat">
                    <span className="about-stat-number">8+</span>
                    <span className="about-stat-label">Technologies</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </SectionReveal>
      </SectionBlock>

      {/* Artes (Skills) — deep teal, gold blobs */}
      <SectionBlock
        id="skills"
        blob={{
          backgroundColor: "#070a08",
          blobColor: "#c5a059",
          blobCount: 11,
          blobSize: 260,
          blobComplexity: 140,
          blobSpeed: 0.8,
          strokeOpacity: 0.12,
        }}
      >
        <SectionReveal>
          <React.Suspense
            fallback={
              <div className="section-loading-fallback">
                Awakening Artes...
              </div>
            }
          >
            <ArtesGrid />
          </React.Suspense>
        </SectionReveal>
      </SectionBlock>

      {/* Projects — rich black, crimson blobs */}
      <SectionBlock
        id="projects"
        className="projects-section"
        blob={{
          backgroundColor: "#0a0a0a",
          blobColor: "#8b0000",
          blobCount: 10,
          blobSize: 320,
          blobComplexity: 200,
          blobSpeed: 0.5,
          strokeOpacity: 0.16,
        }}
      >
        <div className="projects-shell">
          <SectionReveal>
            <h2 className="section-title section-title-center">Projects</h2>

            <div className="projects-grid">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </SectionBlock>      {/* Expedition Log (Timeline) — midnight, gold blobs */}
      <SectionBlock
        id="experience"
        className="experience-section"
        blob={{
          backgroundColor: "#050808",
          blobColor: "#c5a059",
          blobCount: 8,
          blobSize: 340,
          blobComplexity: 160,
          blobSpeed: 0.65,
          strokeOpacity: 0.15,
        }}
      >
        <React.Suspense
          fallback={
            <div className="section-loading-fallback padded">
              Consulting the Archives...
            </div>
          }
        >
          <ExpeditionLog />
        </React.Suspense>
      </SectionBlock>
      {/* Contact — charcoal, offwhite blobs */}
      <SectionBlock
        id="contact"
        className="contact-section"
        blob={{
          backgroundColor: "#0a0a0a",
          blobColor: "#e8e4d9",
          blobCount: 9,
          blobSize: 290,
          blobComplexity: 150,
          blobSpeed: 0.55,
          strokeOpacity: 0.18,
        }}
      >
        <SectionReveal>
          <React.Suspense
            fallback={
              <div className="section-loading-fallback padded">
                Loading Contact...
              </div>
            }
          >
            <ContactSection />
          </React.Suspense>
        </SectionReveal>
      </SectionBlock>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [soundPreference, setSoundPreference] = React.useState<
    "pending" | "allowed" | "muted"
  >("pending");

  const onDone = React.useCallback(() => {
    setLoaded(true);
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("cursor-prime"));
    });
  }, []);

  return (
    <>
      {/* Site renders underneath so resources preload during the loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AppContent />
      </motion.div>

      {/* Loader sits on top (fixed z-9999), unmounts after flash */}
      <AnimatePresence>
        {!loaded && (
          <LoadingScreen 
            key="loader" 
            onDone={onDone} 
            videoRef={videoRef}
            soundPreference={soundPreference}
            setSoundPreference={setSoundPreference}
          />
        )}
      </AnimatePresence>

      {/* Persistent Startup Video — outside loader to avoid audio cutoff */}
      <video
        ref={videoRef}
        src={startupVideo}
        className={`loader-video ${!loaded ? "visible" : "persistent-bg"}`}
        style={{ 
          position: "fixed", 
          inset: 0, 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          zIndex: 9998, // just below loader-root but above AppContent
          pointerEvents: "none",
          transition: "opacity 1.2s ease, filter 2s ease",
          opacity: (soundPreference === "allowed" && !loaded) ? 1 : 0,
        }}
        playsInline
        muted={soundPreference === "muted"}
      />
    </>
  );
}

export default App;
