"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const CODE_CHARS = ["{", "}", "<", ">", "/", "(", ")", "[", "]", ";", "=", "+"];

export function CursorFollower() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (shouldReduceMotion) {
      setEnabled(false);
      return;
    }

    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(pointerFine);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      const isInteractive = Boolean(target.closest("a, button, [data-cursor]"));
      setActive(isInteractive);
    };

    const handleOut = () => {
      setActive(false);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let lastTime = 0;
    const throttleDelay = 50;

    const handleMove = (event: PointerEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) {
        return;
      }
      lastTime = now;

      const char = document.createElement("span");
      char.className = "code-trail";
      char.textContent = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      char.style.left = `${event.clientX}px`;
      char.style.top = `${event.clientY}px`;
      char.style.transform = `translate3d(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px, 0)`;

      document.body.appendChild(char);

      window.setTimeout(() => {
        char.remove();
      }, 1200);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className="cursor-follower"
      data-active={active ? "true" : "false"}
      style={{ translateX: springX, translateY: springY }}
      aria-hidden="true"
    />
  );
}
