"use client";

import { useEffect } from "react";

/**
 * Глобальні 3D-ефекти з fx3d.js прототипу: cyan-«ліхтарик» за курсором
 * та tilt-нахил карток [data-tilt]. Вимкнено на тач-пристроях і при
 * prefers-reduced-motion.
 */
export default function FxLayer() {
  useEffect(() => {
    if (
      matchMedia("(pointer: coarse)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const glow = document.createElement("div");
    glow.style.cssText =
      "position:fixed;width:560px;height:560px;border-radius:50%;pointer-events:none;z-index:60;mix-blend-mode:screen;background:radial-gradient(circle,rgba(79,193,240,.13),rgba(79,193,240,.05) 45%,transparent 70%);transform:translate(-50%,-50%);left:-9999px;top:-9999px";
    document.body.appendChild(glow);

    let cur: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.style.transform = "";
      el.style.boxShadow = "";
      el.style.zIndex = "";
    };

    const onMove = (e: PointerEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      const target = e.target as HTMLElement | null;
      let el = target?.closest?.("[data-tilt]") as HTMLElement | null;
      if (el && el.closest("[data-no-tilt]")) el = null;
      if (cur && cur !== el) {
        reset(cur);
        cur = null;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width > 720 || r.width < 60 || r.height < 30) return;
      if (!el.dataset.tiltInit) {
        el.dataset.tiltInit = "1";
        el.style.transition = "transform .18s ease-out, box-shadow .35s ease";
        el.style.willChange = "transform";
      }
      cur = el;
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px) scale(1.02)`;
      el.style.boxShadow = `${(-px * 22).toFixed(0)}px ${(14 - py * 10).toFixed(0)}px 44px rgba(0,0,0,.55), 0 0 34px rgba(79,193,240,.16)`;
      el.style.zIndex = "5";
    };

    const onLeave = () => {
      if (cur) {
        reset(cur);
        cur = null;
      }
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      glow.remove();
      if (cur) reset(cur);
    };
  }, []);

  return null;
}
