import Link from "next/link";
import { type ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

/** Шапка внутрішньої сторінки: mono-breadcrumb + H1 + лід-абзац. */
export default function PageHead({
  crumbs,
  title,
  lead,
  beforeTitle,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  beforeTitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line-1 px-6 pb-12 pt-16 lg:px-12">
      <nav
        aria-label="Хлібні крихти"
        className="mb-4 font-mono text-xs uppercase tracking-crumb text-ink-3"
      >
        <Link href="/" className="transition-colors hover:text-accent-hover">
          Головна
        </Link>
        {crumbs.map((c) => (
          <span key={c.label}>
            {" / "}
            {c.href ? (
              <Link
                href={c.href}
                className="transition-colors hover:text-accent-hover"
              >
                {c.label}
              </Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
      {beforeTitle && <div className="mb-4">{beforeTitle}</div>}
      <h1 className="mb-4 font-display text-4xl font-extrabold md:text-5xl">
        {title}
      </h1>
      {lead && (
        <p className="max-w-[560px] text-[17px] leading-relaxed text-ink-2">
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
