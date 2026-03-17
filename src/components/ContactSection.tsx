import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import AnimatedHobbyStickers from "./AnimatedHobbyStickers";
import contactPhoto from "../assets/contact_me_new.jpg";
import styles from "./ContactSection.module.css";

interface SocialCard {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  url: string;
  previewUrl: string;
  color: string;
  accentColor: string;
  bgGradient: string;
}

function buildPreviewShot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=540`;
}

const socials: SocialCard[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/huzaifa.imran.75098364",
    previewUrl: "https://www.facebook.com/huzaifa.imran.75098364",
    color: "#3b5998",
    accentColor: "rgba(59, 89, 152, 0.5)",
    bgGradient: "linear-gradient(145deg, #1c1e26 0%, #111318 100%)",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com",
    previewUrl: "https://www.instagram.com",
    color: "#d62976",
    accentColor: "rgba(214, 41, 118, 0.5)",
    bgGradient: "linear-gradient(145deg, #221c20 0%, #151113 100%)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/huzaifa-imran-12b10b3b3/",
    previewUrl: "https://www.linkedin.com/in/huzaifa-imran-12b10b3b3/",
    color: "#0077b5",
    accentColor: "rgba(0, 119, 181, 0.5)",
    bgGradient: "linear-gradient(145deg, #181d24 0%, #0f1217 100%)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    url: "https://wa.me/923096123772",
    previewUrl: "https://wa.me/923096123772",
    color: "#25d366",
    accentColor: "rgba(37, 211, 102, 0.5)",
    bgGradient: "linear-gradient(145deg, #18221c 0%, #0f1511 100%)",
  },
  {
    id: "gmail",
    label: "Gmail",
    icon: SiGmail,
    url: "mailto:sungpg89@gmail.com",
    previewUrl: "mailto:sungpg89@gmail.com",
    color: "#ea4335",
    accentColor: "rgba(234, 67, 53, 0.5)",
    bgGradient: "linear-gradient(145deg, #241c1c 0%, #161111 100%)",
  },
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    url: "https://github.com/Huzaifa-12Imran",
    previewUrl: "https://github.com/Huzaifa-12Imran",
    color: "#c5a059",
    accentColor: "rgba(197, 160, 89, 0.4)",
    bgGradient: "linear-gradient(145deg, #1e1e1e 0%, #121212 100%)",
  },
];

// Fan positions: 3 left, center photo (gap), 3 right
const fanPositions = [
  { rotate: -30, x: -400, y: 25 }, // far left
  { rotate: -18, x: -250, y: -12 }, // mid left
  { rotate: -6, x: -115, y: -25 }, // near left
  { rotate: 6, x: 115, y: -25 }, // near right
  { rotate: 18, x: 250, y: -12 }, // mid right
  { rotate: 30, x: 400, y: 25 }, // far right
];

export default function ContactSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [compactLayout, setCompactLayout] = useState(false);
  const [failedPreviews, setFailedPreviews] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompactLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const markPreviewFailed = (id: string) => {
    setFailedPreviews((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={styles.contactRoot}>
      {/* Header with Stickers */}
      <div className={styles.contactHeader}>
        <AnimatedHobbyStickers color="rgba(197, 160, 89, 0.85)" />
        <h2 className={`section-title ${styles.contactTitle}`}>Find Me On</h2>
      </div>

      {/* Fanned cards + center photo */}
      <div className={styles.fanDeck}>
        {/* Center photo */}
        <motion.div
          className={styles.centerPhoto}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={contactPhoto}
            alt="Huzaifa Imran"
            className={styles.centerPhotoImg}
          />
        </motion.div>

        {/* Social cards fanned around the photo */}
        {socials.map((social, i) => {
          const pos = fanPositions[i];
          const Icon = social.icon;
          const isHovered = hoveredId === social.id;
          const previewSrc = buildPreviewShot(social.previewUrl);
          const previewFailed = !!failedPreviews[social.id];

          return (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredId(social.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={styles.socialCard}
              style={{
                background: social.bgGradient,
                zIndex: isHovered ? 20 : i < 3 ? 5 - i : i,
                borderColor: social.color + "22",
                boxShadow: isHovered
                  ? `0 20px 80px ${social.color}22`
                  : "0 8px 30px rgba(0,0,0,0.4)",
              }}
              initial={{
                x: compactLayout ? 0 : pos.x,
                y: compactLayout ? 0 : pos.y,
                rotate: compactLayout ? 0 : pos.rotate,
              }}
              animate={{
                x: compactLayout ? 0 : isHovered ? pos.x * 1.15 : pos.x,
                y: compactLayout ? 0 : isHovered ? pos.y - 30 : pos.y,
                rotate: compactLayout
                  ? 0
                  : isHovered
                    ? pos.rotate * 0.5
                    : pos.rotate,
                scale: isHovered ? 1.12 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
            >
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.socialPreview}
                >
                  <div className={styles.previewChrome}>
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#ff5f57" }}
                    />
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#febc2e" }}
                    />
                    <span
                      className={styles.chromeDot}
                      style={{ background: "#28c840" }}
                    />
                    <span className={styles.previewUrl}>
                      {social.previewUrl.replace("https://", "")}
                    </span>
                  </div>
                  <div className={styles.previewBody}>
                    {previewFailed ? (
                      <div className={styles.previewFallback}>
                        <Icon size={22} color={social.color} />
                        <span>{social.label} Preview</span>
                      </div>
                    ) : (
                      <img
                        src={previewSrc}
                        alt={`${social.label} preview`}
                        className={styles.previewImg}
                        onError={() => markPreviewFailed(social.id)}
                      />
                    )}
                  </div>
                </motion.div>
              )}
              <Icon size={40} color="white" />
              <span className={styles.socialLabel}>{social.label}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Footer text */}
      <p className={styles.contactFooter}>
        Let&apos;s connect — whether it&apos;s about a project, collaboration,
        or just a conversation.
      </p>
    </div>
  );
}
