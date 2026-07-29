import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import PageHead from "@/components/sections/PageHead";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Портфоліо",
  description:
    "Реалізовані об'єкти SASS Engineering: від погодження з ДТЕК до автоматизації офісів.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHead
        crumbs={[{ label: "Портфоліо" }]}
        title="Портфоліо"
        lead="Реалізовані об'єкти: від погодження з ДТЕК до автоматизації офісів."
      />
      <section className="px-6 py-12 pb-[72px] lg:px-12">
        <PortfolioGrid items={caseStudies} />
      </section>
      <CtaBand />
    </>
  );
}
