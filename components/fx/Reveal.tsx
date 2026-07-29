"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Поява при скролі: fade-in + slide-up з легким 3D-нахилом (з прототипу). */
export default function Reveal({
  children,
  delay = 0,
  scale = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        setOn(true);
        removeEventListener("scroll", onScroll);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on
          ? "none"
          : scale
            ? "perspective(1000px) rotateX(22deg) translateY(56px) scale(.94)"
            : "perspective(1000px) rotateX(18deg) translateY(48px)",
        transformOrigin: "50% 100%",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
