"use client";

import { useState } from "react";
import { caseFilters, type CaseStudy } from "@/data/case-studies";
import CaseCard from "@/components/sections/CaseCard";
import Reveal from "@/components/fx/Reveal";

export default function PortfolioGrid({ items }: { items: CaseStudy[] }) {
  const [filter, setFilter] = useState("Усі");
  const shown =
    filter === "Усі" ? items : items.filter((c) => c.filter === filter);

  return (
    <>
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Фільтр за категорією"
      >
        {caseFilters.map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-btn border px-4 py-[9px] font-mono text-xs uppercase tracking-[.12em] transition-colors duration-150 ${
              filter === f
                ? "border-accent bg-accent text-white"
                : "border-line-1 text-ink-2 hover:border-line-2 hover:text-navy"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => (
          <Reveal key={c.slug} delay={i * 100} scale>
            <CaseCard caseStudy={c} />
          </Reveal>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="py-16 text-center text-ink-2">
          У цій категорії поки немає кейсів.
        </p>
      )}
    </>
  );
}
