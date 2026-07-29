import type { Metadata } from "next";
import { services } from "@/data/services";
import { works } from "@/data/site";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaButton from "@/components/lead/CtaButton";
import Reveal from "@/components/fx/Reveal";
import PageHead from "@/components/sections/PageHead";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Послуги",
  description:
    "Проєктування мереж 0.4–10 кВ, електромонтаж, проєкти під ключ. Ціна фіксується в кошторисі до початку робіт.",
};

const osbbItems = [
  "Обслуговування електромереж будинку за договором",
  "Модернізація щитових та вводно-розподільних пристроїв",
  "Освітлення під'їздів і прибудинкової території — LED, датчики руху",
  "Аварійні виїзди 24/7 для мешканців",
];

const contractItems = [
  "Офіційний договір і кошторис до початку робіт",
  "Акти виконаних робіт, безготівковий розрахунок",
  "Гарантійні зобов'язання 1 рік — зафіксовані в договорі",
  "Працюємо з юрособами, ФОП та ОСББ",
];

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumbs={[{ label: "Послуги" }]}
        title="Послуги"
        lead="Три формати співпраці — від окремого проєкту до повного циклу «під ключ». Ціна фіксується в кошторисі до початку робіт."
      />

      {services.map((s, i) => (
        <Reveal key={s.index}>
          <section
            className={`grid gap-8 px-6 py-14 lg:grid-cols-[400px_1fr] lg:gap-14 lg:px-12 ${
              i < services.length - 1 ? "border-b border-line-1" : ""
            }`}
          >
            <div>
              <Eyebrow className="mb-3">
                {s.index} — {s.label}
              </Eyebrow>
              <h2 className="mb-3.5 font-display text-[28px] font-bold md:text-[32px]">
                {s.title}
              </h2>
              <div className="mb-5 font-mono text-base">{s.price}</div>
              <CtaButton>{s.cta}</CtaButton>
            </div>
            <div>
              <p className="mb-6 max-w-[640px] text-[15px] leading-[1.65] text-ink-2">
                {s.lead}
              </p>
              {s.scope ? (
                <div className="grid max-w-[640px] gap-x-8 gap-y-3 text-[14.5px] leading-normal sm:grid-cols-2">
                  {s.scope.map((item) => (
                    <div key={item} className="flex gap-2.5">
                      <span aria-hidden className="text-accent">
                        —
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid max-w-[720px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {s.steps!.map((step, j) => (
                    <div
                      key={step}
                      className="rounded-card border border-line-1 bg-card p-[18px]"
                      data-tilt
                    >
                      <div className="mb-2 font-mono text-[11px] text-cyan">
                        КРОК {j + 1}
                      </div>
                      <div className="text-[13.5px] font-semibold">{step}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </Reveal>
      ))}

      {/* перелік робіт */}
      <section className="border-t border-line-1 bg-sunken px-6 py-16 lg:px-12">
        <h2 className="mb-3 font-display text-[28px] font-bold md:text-[32px]">
          Перелік робіт
        </h2>
        <p className="mb-9 max-w-[560px] text-[15px] leading-relaxed text-ink-2">
          Комплексний електромонтаж для житла та бізнесу — від технічного
          проєкту до реалізації та запуску. Усе необхідне — в одній команді.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div
                className="flex h-full flex-col gap-2.5 rounded-card border border-line-1 bg-card p-[22px]"
                data-tilt
              >
                <div className="font-mono text-[11px] tracking-label text-navy">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-base font-bold">{w.title}</h3>
                <p className="flex-1 text-[13.5px] leading-[1.55] text-ink-2">
                  {w.description}
                </p>
                <CtaButton
                  variant="secondary"
                  className="-my-2 self-start !border-none !px-0 !py-2 text-[13px] font-semibold !text-cyan hover:!text-accent-hover"
                >
                  Обрати послугу →
                </CtaButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ОСББ + договір */}
      <section className="border-t border-line-1 px-6 py-16 lg:px-12">
        <h2 className="mb-3 font-display text-[28px] font-bold md:text-[32px]">
          Співпраця з ОСББ та бізнесом
        </h2>
        <p className="mb-9 max-w-[560px] text-[15px] leading-relaxed text-ink-2">
          Працюємо офіційно — за договором, з кошторисом та актами виконаних
          робіт.
        </p>
        <div className="mb-9 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line-1 bg-card p-7">
            <Eyebrow className="mb-3 !text-[11px]">ДЛЯ ОСББ</Eyebrow>
            <div className="mb-4 font-display text-xl font-bold">
              Обслуговування будинків
            </div>
            <div className="flex flex-col gap-3 text-[14.5px] leading-[1.55]">
              {osbbItems.map((item) => (
                <div key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-line-1 bg-card p-7">
            <Eyebrow className="mb-3 !text-[11px]">РОБОТА ПО ДОГОВОРУ</Eyebrow>
            <div className="mb-4 font-display text-xl font-bold">
              Офіційно та прозоро
            </div>
            <div className="flex flex-col gap-3 text-[14.5px] leading-[1.55]">
              {contractItems.map((item) => (
                <div key={item} className="flex gap-2.5">
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <CtaButton>Отримати комерційну пропозицію</CtaButton>
      </section>

      <CtaBand title="Не впевнені, який формат підходить? Підкажемо за 15 хвилин." />
    </>
  );
}
