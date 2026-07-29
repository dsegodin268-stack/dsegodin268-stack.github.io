import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
  getNextCase,
} from "@/data/case-studies";
import Badge from "@/components/ui/Badge";
import PhotoPanel from "@/components/ui/PhotoPanel";
import Reveal from "@/components/fx/Reveal";
import PageHead from "@/components/sections/PageHead";
import CtaBand from "@/components/sections/CtaBand";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const c = getCaseStudyBySlug(params.slug);
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default function CaseDetailPage({ params }: PageProps) {
  const c = getCaseStudyBySlug(params.slug);
  if (!c) notFound();
  const next = getNextCase(c.slug);

  return (
    <>
      <PageHead
        crumbs={[{ label: "Портфоліо", href: "/portfolio" }, { label: c.title }]}
        title={c.title}
        beforeTitle={<Badge>{c.tag}</Badge>}
      />

      <section className="grid items-start gap-10 px-6 py-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:px-12">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line-1 bg-sunken">
            <PhotoPanel
              caption="фото об'єкта"
              src={c.image}
              alt={c.title}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-7">
          <Reveal delay={100}>
            <div>
              <h2 className="mb-3 font-mono text-xs font-normal uppercase tracking-label text-cyan">
                Задача
              </h2>
              <p className="text-[15px] leading-[1.65] text-ink-2">
                {c.challenge}
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <h2 className="mb-3 font-mono text-xs font-normal uppercase tracking-label text-navy">
                Рішення
              </h2>
              <p className="text-[15px] leading-[1.65] text-ink-2">
                {c.solution}
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="rounded-card border border-line-1 bg-card px-[22px] py-5">
              <h2 className="mb-3 font-mono text-xs font-normal uppercase tracking-label text-success">
                Результат
              </h2>
              <p className="text-[15px] font-semibold leading-[1.65]">
                ✓ {c.resultLong}
              </p>
            </div>
          </Reveal>
          <Link
            href={`/portfolio/${next.slug}`}
            className="text-sm font-semibold text-cyan transition-colors hover:text-accent-hover"
          >
            Наступний кейс: {next.title} →
          </Link>
        </div>
      </section>

      <CtaBand title="Схожа задача? Розрахуємо вартість за 24 години." />
    </>
  );
}
