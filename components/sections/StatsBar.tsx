import { siteConfig } from "@/data/site";
import Stat from "@/components/ui/Stat";

/** Смуга показників із хairline-роздільниками (мотив дизайн-системи). */
export default function StatsBar() {
  return (
    <section className="grid border-y border-line-1 sm:grid-cols-3">
      {siteConfig.stats.map((s, i) => (
        <div
          key={s.label}
          className={`px-6 py-7 lg:px-12 ${
            i < 2 ? "border-b border-line-1 sm:border-b-0 sm:border-r" : ""
          }`}
        >
          <Stat value={s.value} label={s.label} countUp />
        </div>
      ))}
    </section>
  );
}
