import { siteConfig } from "@/data/site";
import CtaButton from "@/components/lead/CtaButton";

/** Конверсійна смуга на navy #1B4E8E (з дизайн-системи). */
export default function CtaBand({
  title = "Розрахуємо вартість вашого проєкту протягом 24 годин",
  buttonLabel = "Розрахувати вартість",
}: {
  title?: string;
  buttonLabel?: string;
}) {
  return (
    <section className="flex flex-col gap-6 bg-band px-6 py-11 text-white md:flex-row md:items-center md:justify-between md:gap-8 lg:px-12">
      <h2 className="max-w-[620px] font-display text-2xl font-extrabold leading-[1.25] md:text-[28px]">
        {title}
      </h2>
      <div className="flex flex-none flex-wrap items-center gap-6">
        <CtaButton variant="dark" size="lg">
          {buttonLabel}
        </CtaButton>
        <a
          href={siteConfig.phoneHref}
          className="text-lg font-bold tabular-nums text-white"
        >
          {siteConfig.phone}
        </a>
      </div>
    </section>
  );
}
