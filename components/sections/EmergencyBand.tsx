import { emergency, siteConfig } from "@/data/site";

/** Смуга «Аварійний виклик 24/7» на брендовому navy. */
export default function EmergencyBand() {
  return (
    <section className="flex flex-col gap-4 border-b border-line-1 bg-brand px-6 py-[22px] md:flex-row md:items-center md:justify-between md:gap-6 lg:px-12">
      <div className="flex items-start gap-4 md:items-center">
        <span className="whitespace-nowrap rounded-tag border border-line-cyan px-3 py-1.5 font-mono text-[11px] tracking-label text-cyan">
          {emergency.tag}
        </span>
        <div>
          <div className="font-display text-lg font-bold text-white">
            {emergency.title}
          </div>
          <div className="text-[13px] text-onnavy">{emergency.description}</div>
        </div>
      </div>
      <a
        href={siteConfig.phoneHref}
        className="whitespace-nowrap font-display text-xl font-bold text-cyan transition-colors hover:text-white"
      >
        {siteConfig.phone}
      </a>
    </section>
  );
}
