import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/fx/Reveal";
import PageHead from "@/components/sections/PageHead";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв'яжіться з SASS Engineering: м. Київ, вул. Куренівська 5/7, +38 (050) 555 66 40. Кошторис протягом 24 годин.",
};

const rowHead =
  "mb-1.5 font-mono text-[11px] uppercase tracking-crumb text-ink-3";

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumbs={[{ label: "Контакти" }]}
        title="Контакти"
        lead="Залиште заявку — кошторис протягом 24 годин."
      />

      <section className="grid items-start gap-10 px-6 pb-[72px] pt-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-14 lg:px-12">
        <div className="flex flex-col gap-[26px]">
          <div>
            <div className={rowHead}>Телефон</div>
            <a
              href={siteConfig.phoneHref}
              className="font-display text-2xl font-bold tabular-nums text-ink-1 transition-colors hover:text-accent-hover"
            >
              {siteConfig.phone}
            </a>
          </div>
          <div>
            <div className={rowHead}>Email</div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-base text-cyan transition-colors hover:text-accent-hover"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <div className={rowHead}>Адреса</div>
            <div className="text-base text-ink-2">{siteConfig.address}</div>
          </div>
          <div className="aspect-video overflow-hidden rounded-card border border-line-1 bg-sunken">
            <iframe
              title="Мапа: вул. Куренівська 5/7, Київ"
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.4451%2C50.4785%2C30.4951%2C50.4985&layer=mapnik&marker=50.4885%2C30.4701"
              className="block h-full w-full border-0 grayscale-[.2]"
              loading="lazy"
            />
          </div>
        </div>

        <Reveal delay={100}>
          <div className="rounded-card border border-line-1 bg-card p-8" data-no-tilt>
            <h2 className="mb-5 font-display text-[22px] font-bold">
              Розрахувати вартість
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
