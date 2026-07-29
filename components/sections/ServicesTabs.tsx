"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import PhotoPanel from "@/components/ui/PhotoPanel";

const AUTO_PLAY = 5000;

/** Вертикальні вкладки послуг з автопрокруткою (з прототипу website-3d). */
export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setActive((p) => (p + 1) % services.length);
  const prev = () => setActive((p) => (p - 1 + services.length) % services.length);

  useEffect(() => {
    if (paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(next, AUTO_PLAY);
    return () => clearInterval(t);
  }, [active, paused]);

  const s = services[active];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
      {/* вкладки */}
      <div className="flex flex-col" role="group" aria-label="Послуги">
        {services.map((sv, i) => {
          const isActive = i === active;
          return (
            <button
              key={sv.index}
              aria-pressed={isActive}
              onClick={() => {
                if (i !== active) {
                  setActive(i);
                  setPaused(false);
                }
              }}
              className={`relative flex items-start gap-4 py-[26px] pl-[22px] text-left transition-colors duration-[400ms] ${
                i > 0 ? "border-t border-line-1" : ""
              } ${isActive ? "text-ink-1" : "text-ink-3"}`}
            >
              <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-sunken">
                {isActive && (
                  <span
                    key={active + (paused ? "p" : "r")}
                    className="absolute left-0 top-0 w-full bg-navy"
                    style={{
                      animation: `tabProgress ${AUTO_PLAY}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </span>
              <span className="mt-2 font-mono text-[11px] text-ink-3">
                /{sv.index}
              </span>
              <span className="flex-1">
                <span className="block font-display text-2xl font-bold tracking-[-.01em] md:text-3xl">
                  {sv.title}
                </span>
                <span
                  className="block overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
                  style={{
                    maxHeight: isActive ? "120px" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <span className="mb-1 mt-2.5 block max-w-[380px] text-[14.5px] leading-relaxed text-ink-2">
                    {sv.description}
                  </span>
                  <span className="flex items-center gap-[18px]">
                    <span className="font-mono text-[13px] text-ink-1">
                      {sv.price}
                    </span>
                    <Link
                      href="/services"
                      className="text-[13px] font-semibold text-cyan hover:text-accent-hover"
                      tabIndex={isActive ? 0 : -1}
                    >
                      Детальніше →
                    </Link>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* панель фото */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative aspect-[16/11] overflow-hidden rounded-xl border border-line-1 bg-sunken"
        data-no-tilt
      >
        <div key={active} className="tab-slide absolute inset-0" onClick={next}>
          <PhotoPanel
            caption={`Фото робіт — ${s.title}`}
            src={s.image}
            alt={`${s.title} — ілюстрація послуги`}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="pointer-events-none absolute bottom-5 left-5 z-[2] rounded-[3px] bg-[rgba(10,14,20,.55)] px-2.5 py-1.5 font-mono text-[11px] tracking-tag text-white backdrop-blur-[4px]">
            {s.index} — {s.label}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[rgba(10,14,20,.55)] to-transparent" />
        </div>
        <div className="absolute bottom-6 right-6 z-[2] flex gap-2.5">
          <button
            aria-label="Попередня послуга"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-1 bg-[rgba(255,255,255,.85)] text-lg text-[#10161F] backdrop-blur-[6px] transition-transform hover:scale-105"
          >
            ←
          </button>
          <button
            aria-label="Наступна послуга"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-1 bg-[rgba(255,255,255,.85)] text-lg text-[#10161F] backdrop-blur-[6px] transition-transform hover:scale-105"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
