"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation, siteConfig } from "@/data/site";
import CtaButton from "@/components/lead/CtaButton";

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/images/logo-mark.webp"
        alt=""
        width={size + 8}
        height={size + 8}
        className="h-auto"
        style={{ height: size + 8, width: "auto" }}
        priority
      />
      <span className="leading-[1.05]">
        <span
          className="block font-display font-extrabold text-navy"
          style={{ fontSize: size * 0.5, letterSpacing: ".04em" }}
        >
          SASS
        </span>
        <span
          className="block font-display font-semibold tracking-wordmark text-cyan"
          style={{ fontSize: size * 0.29 }}
        >
          ENGINEERING
        </span>
      </span>
    </span>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-line-1 bg-page">
      <div className="flex h-[76px] items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          aria-label="SASS Engineering — на головну"
          onClick={() => setMobileOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden gap-8 lg:flex" aria-label="Головна навігація">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-150 hover:text-accent-hover ${
                pathname.startsWith(item.href) ? "text-accent-hover" : "text-ink-2"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-8 hidden flex-none items-center gap-5 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="whitespace-nowrap text-sm font-semibold tabular-nums text-ink-1 transition-colors hover:text-accent-hover"
          >
            {siteConfig.phone}
          </a>
          <CtaButton>Розрахувати вартість</CtaButton>
        </div>

        <button
          className="grid h-10 w-10 place-items-center lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <span className="text-xl leading-none">✕</span>
          ) : (
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span className="h-px w-full bg-ink-1" />
              <span className="h-px w-full bg-ink-1" />
              <span className="h-px w-full bg-ink-1" />
            </span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-line-1 px-6 pb-6 pt-2 lg:hidden"
          aria-label="Мобільна навігація"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-base font-medium ${
                pathname.startsWith(item.href) ? "text-accent-hover" : "text-ink-1"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="block py-3 text-base font-semibold tabular-nums"
          >
            {siteConfig.phone}
          </a>
          <CtaButton className="mt-2 w-full">Розрахувати вартість</CtaButton>
        </nav>
      )}
    </header>
  );
}
