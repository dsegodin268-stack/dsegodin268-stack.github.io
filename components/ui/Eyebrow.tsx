import { type ReactNode } from "react";

/** Mono-«еліза» над заголовком: "01 — ПРОЄКТУВАННЯ" тощо */
export default function Eyebrow({
  children,
  color = "accent",
  className = "",
}: {
  children: ReactNode;
  color?: "accent" | "cyan" | "muted" | "success" | "navy";
  className?: string;
}) {
  const colors = {
    // navy #3D82C4 замість accent #2273C9: 4.8:1 на темному (accent дає 4.0 —
    // фейл AA для 12px); для кнопок accent лишається
    accent: "text-navy",
    cyan: "text-cyan",
    muted: "text-ink-3",
    success: "text-success",
    navy: "text-navy",
  };
  return (
    <div
      className={`font-mono text-xs uppercase tracking-label ${colors[color]} ${className}`}
    >
      {children}
    </div>
  );
}
