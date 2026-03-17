import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ExpeditionLog.module.css";

interface LogEntry {
  day: string;
  title: string;
  description: string;
  lore: string;
}

const entries: LogEntry[] = [
  {
    day: "Day 1",
    title: "The Alchemist's Forge",
    description: "Conquered the foundations of C++ and logic.",
    lore: "Where it all began. In the fires of the forge, I learned that every byte is a promise, and every error a lesson in patience.",
  },
  {
    day: "Day 45",
    title: "Scripting the Void",
    description: "Mastered the dynamic arts of JavaScript.",
    lore: "Reality became fluid. The static world of the machine learned to move, to respond, and to breathe through the power of the script.",
  },
  {
    day: "Day 120",
    title: "Arcane React Rituals",
    description: "Harnessing the power of reactive components.",
    lore: "State and Effect—the twin pillars of modern enchantment. No longer just building pages, but orchestrating living ecosystems of interface.",
  },
  {
    day: "Day 210",
    title: "The Fullstack Synthesis",
    description: "Uniting the iron pits (Backend) with the illusions (Frontend).",
    lore: "The bridge was built. Data flows across the abyss, from the deep vaults of MongoDB to the eyes of the beholder, without a tremor.",
  },
  {
    day: "Day 333",
    title: "The Clair Obscur",
    description: "Reaching the zenith of aesthetics and motion.",
    lore: "The technical becomes the spiritual. Here, at the edge of the world, I don't just write code—I craft the Expedition.",
  },
];

export default function ExpeditionLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(3000);
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const updateMeasurements = () => {
      if (pathRef.current) {
        setContentWidth(pathRef.current.scrollWidth);
      }
      setViewportWidth(window.innerWidth);
    };

    updateMeasurements();
    
    // Slight delay to ensure fonts/layout are fully rendered
    const timeoutId = setTimeout(updateMeasurements, 100);

    window.addEventListener("resize", updateMeasurements);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const requiresParallax = contentWidth > viewportWidth;
  const scrollDistance = requiresParallax ? contentWidth - viewportWidth : 0;
  
  // Add 40% of viewport width as a buffer to pause scrolling at the end
  // Allows user to read the 5th item comfortably before it scrolls away
  const pauseBuffer = requiresParallax ? viewportWidth * 0.4 : 0;
  const totalScrollDistance = scrollDistance + pauseBuffer;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation based on scroll progress
  const endFraction = totalScrollDistance > 0 ? scrollDistance / totalScrollDistance : 1;
  const x = useTransform(
    scrollYProgress, 
    requiresParallax ? [0, endFraction, 1] : [0, 1], 
    requiresParallax ? [0, -scrollDistance, -scrollDistance] : [0, 0]
  );
  
  // Use scrollYProgress for the ley line when parallax is active
  const pathLength = useTransform(
    scrollYProgress, 
    requiresParallax ? [0, endFraction, 1] : [0, 1], 
    requiresParallax ? [0, 1, 1] : [0, 1]
  );

  return (
    <section 
      ref={sectionRef} 
      className={styles.logSection}
      style={{ height: requiresParallax ? `calc(100vh + ${totalScrollDistance}px)` : "auto" }}
    >
      <div className={`${styles.logRoot} ${requiresParallax ? styles.parallaxActive : ""}`}>
        <div className={styles.logHeader}>
          <h2 className={`section-title ${styles.logTitle}`}>Path of Enlightenment</h2>
          <p className={styles.logSub}>The chronicle of my awakening across the technical realms</p>
        </div>

        <div className={styles.scrollContainer} style={{ overflow: requiresParallax ? "hidden" : "auto" }}>
          <motion.div 
            ref={pathRef}
            className={styles.philosopherPath}
            style={{ x: requiresParallax ? x : 0 }}
          >
            {/* Ley-Line SVG Background */}
            <svg className={styles.leyLineSvg} width="3000" height="400" viewBox="0 0 3000 400" fill="none">
              <motion.path
                d="M 50 200 Q 250 50 450 200 T 850 200 T 1250 200 T 1650 200 T 2050 200 T 2450 200 T 2850 200"
                stroke="var(--color-gold)"
                strokeWidth="1.5"
                strokeDasharray="10 5"
                opacity="0.3"
                style={{ pathLength }}
              />
              {/* Pulsing highlights at junctions */}
              {[450, 850, 1250, 1650, 2050, 2450, 2850].map((cx, i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy="200"
                  r="4"
                  fill="var(--color-gold)"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.8 }}
                  transition={{ delay: i * 0.2 + 0.5 }}
                />
              ))}
            </svg>

            {/* Cards */}
            <div className={styles.cardsWrapper}>
              {entries.map((entry, i) => (
                <LogNode key={entry.day} entry={entry} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className={styles.scrollHint}>
          <span>{requiresParallax ? "Scroll Down" : "Horizontal Scroll"}</span>
          <div className={`${styles.hintLine} ${requiresParallax ? styles.verticalHint : ""}`} />
        </div>
      </div>
    </section>
  );
}

function LogNode({ entry, index }: { entry: LogEntry; index: number }) {

  return (
    <motion.div
      className={styles.logNode}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className={styles.dayHex}>
        <span className={styles.dayValue}>{entry.day}</span>
      </div>
      
      <div className={styles.nodeContent}>
        <div className={styles.nodeDecor} />
        <h3 className={styles.nodeTitle}>{entry.title}</h3>
        <p className={styles.nodeDesc}>{entry.description}</p>
        <div className={styles.nodeLore}>"{entry.lore}"</div>
      </div>
    </motion.div>
  );
}
