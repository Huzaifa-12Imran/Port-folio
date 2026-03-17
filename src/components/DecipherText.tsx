import { useState, useEffect, useRef } from "react";

interface DecipherTextProps {
  text: string;
  className?: string;
  triggerDistance?: number;
  scrambleSpeed?: number;
}

const CHARS = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789%@#$!^&*()";

export const DecipherText = ({ 
  text, 
  className, 
  triggerDistance = 300,
  scrambleSpeed = 50 
}: DecipherTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < triggerDistance) {
        if (!isScrambling) setIsScrambling(true);
      } else {
        if (isScrambling) {
          setIsScrambling(false);
          setDisplayText(text);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isScrambling, text, triggerDistance]);

  useEffect(() => {
    let interval: any;
    if (isScrambling) {
      interval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char) => {
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplayText(scrambled);
      }, scrambleSpeed);
    } else {
      setDisplayText(text);
    }
    return () => clearInterval(interval);
  }, [isScrambling, text, scrambleSpeed]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
};
