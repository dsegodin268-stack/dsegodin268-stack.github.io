import Link from "next/link";
import { type CaseStudy } from "@/data/case-studies";
import PhotoPanel from "@/components/ui/PhotoPanel";

export default function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${caseStudy.slug}`}
      data-tilt
      className="group block overflow-hidden rounded-card border border-line-1 bg-card text-ink-1 transition-[transform,box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(.3,1.4,.5,1)] hover:-translate-y-2.5 hover:scale-[1.01] hover:border-line-cyan-hover hover:shadow-lift"
    >
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden border-b border-line-1 bg-sunken">
        <PhotoPanel
          caption="фото кейса"
          src={caseStudy.image}
          alt={caseStudy.title}
          sizes="(max-width: 768px) 100vw, 33vw"
          zoomOnHover
        />
        <div className="pointer-events-none absolute inset-0 bg-[rgba(18,54,95,.18)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-2.5 p-6 pt-[22px]">
        <span className="self-start rounded-tag border border-line-cyan px-2 py-[3px] font-mono text-[11px] uppercase tracking-tag text-cyan">
          {caseStudy.tag}
        </span>
        <h3 className="font-display text-lg font-bold">{caseStudy.title}</h3>
        <p className="text-[13.5px] leading-[1.55] text-ink-2">
          {caseStudy.description}
        </p>
        <div className="text-[13px] text-success">✓ {caseStudy.result}</div>
      </div>
    </Link>
  );
}
