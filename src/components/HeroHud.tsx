import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { DecipherText } from "./DecipherText";

type TechBadge = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  left: string;
  top: string;
  delay: string;
};

type HeroHudProps = {
  badges: TechBadge[];
};

export default function HeroHud({ badges }: HeroHudProps) {
  return (
    <div className="hud-layer">
      {/* Corner reticles */}
      <div className="hud-reticle hud-reticle--tl" aria-hidden="true" />
      <div className="hud-reticle hud-reticle--tr" aria-hidden="true" />
      <div className="hud-reticle hud-reticle--bl" aria-hidden="true" />
      <div className="hud-reticle hud-reticle--br" aria-hidden="true" />

      {/* Left vertical label */}
      <div className="hero-side-left" aria-hidden="true">
        <span className="hero-vert-text">EST. 2021</span>
      </div>

      {/* Right vertical label */}
      <div className="hero-side-right" aria-hidden="true">
        <span className="hero-vert-text">CAIRO · EGYPT</span>
      </div>

      {/* Center editorial name block */}
      <div className="hero-center-text">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-eyebrow-line" />
          <span>FULL · STACK ARCHITECT</span>
          <span className="hero-eyebrow-line" />
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Huzaifa"
        >
          <DecipherText text="HU" className="hero-title-light" triggerDistance={300} />
          <DecipherText text="ZAI" className="hero-title-gold" triggerDistance={300} />
          <DecipherText text="FA" className="hero-title-light" triggerDistance={300} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.9 }}
        >
          <DecipherText 
            text="Seeker of the Clair Obscur — Forger of Digital Realms" 
            className="hero-tagline" 
            triggerDistance={220}
            scrambleSpeed={35}
          />
        </motion.p>
      </div>

      {/* Bottom HUD strip — tech chips + scroll cue */}
      <div className="hero-bottom-strip">
        <motion.div
          className="hero-tech-chips"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                className="hero-chip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.07, duration: 0.4 }}
              >
                <Icon className="hero-chip-icon" />
                <span>{badge.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <span>SCROLL</span>
          <div className="hero-scroll-bar" />
        </motion.div>
      </div>
    </div>
  );
}
