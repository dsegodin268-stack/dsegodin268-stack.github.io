import type { Metadata } from "next";
import { whyUs } from "@/data/site";
import PhotoPanel from "@/components/ui/PhotoPanel";
import Reveal from "@/components/fx/Reveal";
import PageHead from "@/components/sections/PageHead";
import StatsBar from "@/components/sections/StatsBar";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "SASS Engineering — інженерна компанія з Києва: проєктування, електромонтаж та автоматизація. Частина групи компаній SASS Dynamics.",
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={[{ label: "Про нас" }]}
        title="Про нас"
        lead="SASS Engineering — інженерна компанія з Києва: проєктування, електромонтаж та автоматизація для бізнесу, забудовників і промислових об'єктів. Частина групи компаній SASS Dynamics."
      />

      <StatsBar />

      <section className="grid items-start gap-10 px-6 pb-[72px] pt-14 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line-1 bg-sunken">
            <PhotoPanel
              caption="фото команди"
              src="/images/team.webp"
              alt="Команда SASS Engineering"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-[22px]">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 90}>
              <div className="border-l-2 border-cyan-bright pl-[18px]">
                <h2 className="mb-1 font-display text-lg font-bold">
                  {w.title}
                </h2>
                <div className="text-sm leading-relaxed text-ink-2">
                  {w.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
