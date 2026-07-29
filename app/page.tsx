import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { siteConfig, whyUs, works } from "@/data/site";
import Button from "@/components/ui/Button";
import CtaButton from "@/components/lead/CtaButton";
import Reveal from "@/components/fx/Reveal";
import Hero3DLazy from "@/components/fx/Hero3DLazy";
import StatsBar from "@/components/sections/StatsBar";
import EmergencyBand from "@/components/sections/EmergencyBand";
import ServicesTabs from "@/components/sections/ServicesTabs";
import GeminiFlow from "@/components/sections/GeminiFlow";
import CaseCard from "@/components/sections/CaseCard";
import CtaBand from "@/components/sections/CtaBand";

const h2 = "font-display text-3xl font-bold md:text-4xl";

export default function HomePage() {
  return (
    <>
      {/* hero */}
      <section className="glow-hero relative grid items-center gap-10 overflow-hidden px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:px-12 lg:pt-[72px]">
        <div
          aria-hidden
          className="absolute inset-0 [perspective:620px]"
          style={{ pointerEvents: "none" }}
        >
          <div className="fx-grid" />
        </div>
        <div className="relative">
          <Reveal>
            <div className="mb-5 font-mono text-xs tracking-[.22em] text-cyan">
              ПРОЄКТУВАННЯ · МОНТАЖ · АВТОМАТИЗАЦІЯ — КИЇВ ТА ОБЛАСТЬ
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mb-[22px] font-display text-4xl font-extrabold leading-[1.08] tracking-[-.01em] md:text-[56px]">
              Електромонтаж під&nbsp;ключ.{" "}
              <span className="text-cyan">Від проєкту до&nbsp;запуску.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mb-8 max-w-[520px] text-[17px] leading-relaxed text-ink-2">
              Проєктування мереж 0.4–10 кВ, узгодження з ДТЕК, монтаж
              обладнання та повний супровід — для бізнесу, забудовників і
              промислових об&apos;єктів.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap items-center gap-3.5">
              <CtaButton size="lg">Розрахувати вартість</CtaButton>
              <Button size="lg" variant="secondary" href="/services">
                Послуги
              </Button>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-[22px] flex items-center gap-2 text-[13px] text-ink-2">
              <span aria-hidden className="tracking-[2px] text-accent">
                ★★★★★
              </span>
              <span>
                <strong className="text-ink-1">{siteConfig.googleRating}</strong>{" "}
                — рейтинг Google за відгуками клієнтів
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="relative">
            <Hero3DLazy />
            <div className="badge-float absolute bottom-1.5 left-1.5 rounded-btn border border-line-cyan bg-brand px-[18px] py-3.5 text-[13px] leading-[1.4] text-white shadow-[0_12px_34px_rgba(0,0,0,.5),0_0_26px_rgba(79,193,240,.18)]">
            <span className="font-mono text-[11px] tracking-tag text-cyan">
                ГАРАНТІЯ
              </span>
              <br />1 рік на всі роботи
            </div>
          </div>
        </Reveal>
      </section>

      <StatsBar />
      <EmergencyBand />

      {/* послуги */}
      <section id="services" className="px-6 py-16 lg:px-12 lg:py-[72px]">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={h2}>Послуги</h2>
          <Link
            href="/services"
            className="text-sm font-semibold text-cyan transition-colors hover:text-accent-hover"
          >
            Усі послуги →
          </Link>
        </div>
        <ServicesTabs />
        <div className="mt-7 flex flex-wrap gap-2.5">
          {works.map((w) => (
            <Link
              key={w.title}
              href="/services"
              className="inline-block rounded-tag border border-line-1 bg-card px-4 py-[9px] text-[13px] font-medium text-ink-2 transition-colors hover:border-line-2 hover:text-ink-1"
            >
              {w.title}
            </Link>
          ))}
        </div>
      </section>

      {/* портфоліо */}
      <section id="portfolio" className="px-6 pb-16 lg:px-12 lg:pb-[72px]">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={h2}>Портфоліо</h2>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-cyan transition-colors hover:text-accent-hover"
          >
            Усі кейси →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 120}>
              <CaseCard caseStudy={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <GeminiFlow />

      {/* чому ми */}
      <section className="bg-brand px-6 py-16 lg:px-12">
        <h2 className={`${h2} mb-9 text-white`}>Чому ми</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyUs.map((w) => (
            <div key={w.title} className="border-t-2 border-cyan-bright pt-4">
              <h3 className="mb-2 font-display text-base font-bold text-white">
                {w.title}
              </h3>
              <div className="text-[13px] leading-[1.55] text-onnavy">
                {w.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
