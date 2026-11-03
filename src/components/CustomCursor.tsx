"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

type CursorTarget = "none" | "link" | "button" | "card" | "image";

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<CursorTarget>("none");
  const enabledRef = useRef(false);
  const visibleRef = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      document.documentElement.classList.toggle("custom-cursor-enabled", enabled);
      enabledRef.current = enabled;
      setIsEnabled((current) => current === enabled ? current : enabled);
      if (!enabled) {
        visibleRef.current = false;
        setIsVisible(false);
        setHoverState("none");
      }
    };

    const updateTarget = (event: PointerEvent) => {
      if (!enabledRef.current || event.pointerType === "touch") return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const nextState: CursorTarget = target.closest("button, [role='button'], .btn-main, .btn-secondary")
        ? "button"
        : target.closest("a, select")
          ? "link"
          : target.closest(".project-scroll-card, .service-scroll-card, .cinema-viewport-card")
            ? "card"
            : target.closest("img")
              ? "image"
              : "none";

      setHoverState((current) => current === nextState ? current : nextState);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabledRef.current || event.pointerType === "touch") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      updateTarget(event);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      visibleRef.current = false;
      setIsVisible(false);
      setHoverState("none");
    };

    const onWindowBlur = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    syncPreferences();
    finePointer.addEventListener("change", syncPreferences);
    reducedMotion.addEventListener("change", syncPreferences);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      finePointer.removeEventListener("change", syncPreferences);
      reducedMotion.removeEventListener("change", syncPreferences);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onWindowBlur);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [pointerX, pointerY]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`custom-cursor-ring custom-cursor-ring-${hoverState}`}
        style={{ x: pointerX, y: pointerY }}
      />
      <motion.div
        aria-hidden="true"
        className="custom-cursor-point"
        style={{ x: pointerX, y: pointerY }}
      />
    </>
  );
};
