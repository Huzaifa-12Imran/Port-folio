import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsTreeData } from "./SkillsData";
import type { SkillNode } from "./SkillsData";
import styles from "./ArtesGrid.module.css";

// Roman numerals for categories
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

// Lore descriptions for each category
const LORE: Record<string, string> = {
  Languages:
    "The primordial tongues of the machine — each a different pact with the iron mind. Master them and bend logic to your will.",
  Frontend:
    "The art of weaving illusions for mortal eyes — beauty, motion, and response crafted from pure intention.",
  Backend:
    "The hidden architecture beneath the canvas — where data flows like blood through unseen veins.",
  Databases:
    "Vaults of memory, written in structured runes. What is remembered endures; what is forgotten, fades.",
  "Tools & OS":
    "The instruments of the Painter — brushes, frames, and the canvas itself. Without tools, even genius is silent.",
};

export default function ArtesGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = skillsTreeData.children ?? [];

  const active = categories.find((c) => c.name === activeCategory);

  return (
    <div className={styles.artesRoot}>
      <div className={styles.artesHeader}>
        <h2 className={`section-title ${styles.artesTitle}`}>Artes</h2>
        <p className={styles.artesSub}>Select a school of magic to reveal its spells</p>
      </div>

      {/* Category Circles */}
      <div className={styles.categoryRing}>
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            className={`${styles.categoryPill} ${activeCategory === cat.name ? styles.categoryPillActive : ""}`}
            onClick={() =>
              setActiveCategory(activeCategory === cat.name ? null : cat.name)
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ "--cat-color": cat.color } as React.CSSProperties}
          >
            <span className={styles.pillRoman}>{ROMAN[i]}</span>
            <span className={styles.pillName}>{cat.name}</span>
            <span className={styles.pillCount}>{cat.children?.length ?? 0} artes</span>
          </motion.button>
        ))}
      </div>

      {/* Spells Panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.name}
            className={styles.spellsPanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.spellsPanelHeader}>
              <span className={styles.spellsCategoryTitle} style={{ color: active.color }}>
                {active.name}
              </span>
              <p className={styles.spellsLore}>
                {LORE[active.name] ?? "A school of arcane knowledge."}
              </p>
            </div>

            <div className={styles.spellsGrid}>
              {(active.children ?? []).map((skill: SkillNode, i: number) => (
                <SpellCard key={skill.name} skill={skill} index={i} parentColor={active.color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpellCard({
  skill,
  index,
  parentColor,
}: {
  skill: SkillNode;
  index: number;
  parentColor?: string;
}) {
  const Icon = skill.icon;
  return (
    <motion.div
      className={styles.spellCard}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      style={{ "--spell-color": skill.color ?? parentColor } as React.CSSProperties}
    >
      {Icon && (
        <span className={styles.spellIcon}>
          <Icon />
        </span>
      )}
      <span className={styles.spellName}>{skill.name}</span>
    </motion.div>
  );
}
