"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(v: string): { num: number | null; suffix: string } {
  const m = String(v).match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : { num: null, suffix: String(v) };
}

/** Числовий показник; countUp — анімація 0→N за 2с при появі у в'юпорті. */
export default function Stat({
  value,
  label,
  countUp = false,
}: {
  value: string;
  label: string;
  countUp?: boolean;
}) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(countUp && num !== null ? 0 : num);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!countUp || num === null) {
      setDisplay(num);
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(num);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const start = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 2000);
        setDisplay(Math.round(num * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      setTimeout(() => setDisplay(num), 2200);
    };
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [countUp, num]);

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-extrabold leading-[1.1] text-accent">
        {num === null ? suffix : `${display}${suffix}`}
      </div>
      <div className="mt-1 text-sm text-ink-2">{label}</div>
    </div>
  );
}
