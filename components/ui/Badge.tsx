import { type ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-tag border border-line-cyan px-2 py-[3px] font-mono text-[11px] uppercase leading-[1.4] tracking-tag text-cyan">
      {children}
    </span>
  );
}
