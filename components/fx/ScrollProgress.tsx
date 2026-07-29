"use client";

import { useEffect, useState } from "react";

/** Cyan-прогрес скролу вгорі сторінки (з прототипу website-3d). */
export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    addEventListener("scroll", f, { passive: true });
    f();
    return () => removeEventListener("scroll", f);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[100] h-[3px] bg-cyan-bright shadow-[0_0_12px_rgba(79,193,240,.8)] transition-[width] duration-100"
      style={{ width: `${p * 100}%` }}
    />
  );
}
