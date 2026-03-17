import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Ley-line progress for the SVG path
  const pathLength = useTransform(scrollXProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.logRoot}>
      <div className={styles.logHeader}>
        <h2 className={`section-title ${styles.logTitle}`}>Path of Enlightenment</h2>
        <p className={styles.logSub}>The chronicle of my awakening across the technical realms</p>
      </div>

      <div className={styles.scrollContainer} ref={containerRef}>
        <div className={styles.philosopherPath}>
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
            {[450, 850, 1250, 1650, 2050, 2450, 2850].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
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
        </div>
      </div>
      
      <div className={styles.scrollHint}>
        <span>Horizontal Scroll</span>
        <div className={styles.hintLine} />
      </div>
    </div>
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
