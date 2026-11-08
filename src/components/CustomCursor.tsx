"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorTarget = "none" | "text" | "button" | "link" | "card";

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const hideCursor = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (pointRef.current) pointRef.current.style.opacity = "0";
      ringRef.current?.classList.remove("is-active");
    };

    const updateTarget = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const state: CursorTarget = element?.closest("input, textarea, [contenteditable='true']")
        ? "text"
        : element?.closest("button, [role='button'], .btn-main, .btn-secondary")
          ? "button"
          : element?.closest("a, select")
            ? "link"
            : element?.closest(".project-scroll-card, .service-scroll-card, .cinema-viewport-card")
              ? "card"
              : "none";

      if (ringRef.current) ringRef.current.dataset.state = state;
    };

    const syncPreferences = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      document.documentElement.classList.toggle("custom-cursor-enabled", enabled);
      setIsEnabled((current) => current === enabled ? current : enabled);
      hideCursor();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      for (const cursor of [ringRef.current, pointRef.current]) {
        if (!cursor) continue;
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.style.opacity = "1";
      }

      updateTarget(event.target);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hideCursor();
    };

    const onPointerDown = () => ringRef.current?.classList.add("is-active");
    const onPointerUp = () => ringRef.current?.classList.remove("is-active");
    const onWindowBlur = hideCursor;

    const onScroll = () => {
      const point = pointRef.current;
      if (!point || point.style.opacity !== "1") return;
      updateTarget(
        document.elementFromPoint(
          Number.parseFloat(point.style.left),
          Number.parseFloat(point.style.top),
        ),
      );
    };

    syncPreferences();
    finePointer.addEventListener("change", syncPreferences);
    reducedMotion.addEventListener("change", syncPreferences);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      finePointer.removeEventListener("change", syncPreferences);
      reducedMotion.removeEventListener("change", syncPreferences);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" data-state="none" />
      <div ref={pointRef} className="custom-cursor-point" />
    </div>
  );
};
