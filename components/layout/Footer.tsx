import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "@/components/layout/Header";

const colHead =
  "mb-1 font-mono text-[11px] uppercase tracking-crumb text-ink-3";

export default function Footer() {
  return (
    <footer className="border-t border-line-1 bg-page px-6 pb-8 pt-14 lg:px-12">
      <div className="grid gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="mb-3.5 inline-block" aria-label="SASS Engineering — на головну">
            <Logo size={26} />
          </Link>
          <p className="max-w-[280px] text-[13px] leading-relaxed text-ink-2">
            {siteConfig.footerTagline}
          </p>
        </div>

        <nav className="flex flex-col gap-2.5 text-[13.5px]" aria-label="Меню">
          <div className={colHead}>Меню</div>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-2 transition-colors duration-150 hover:text-accent-hover"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-2.5 text-[13.5px]" aria-label="Послуги">
          <div className={colHead}>Послуги</div>
          {services.map((s) => (
            <Link
              key={s.slug}
              href="/services"
              className="text-ink-2 transition-colors duration-150 hover:text-accent-hover"
            >
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-[13.5px] text-ink-2">
          <div className={colHead}>Контакти</div>
          <a
            href={siteConfig.phoneHref}
            className="font-semibold tabular-nums text-ink-1 transition-colors hover:text-accent-hover"
          >
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-accent-hover"
          >
            {siteConfig.email}
          </a>
          <div>{siteConfig.address}</div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2 border-t border-line-1 pt-5 text-xs text-ink-3">
        <span>© {new Date().getFullYear()} SASS Engineering</span>
        <span>{siteConfig.domain}</span>
      </div>
    </footer>
  );
}
