import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-transparent hover:bg-accent-hover hover:scale-[1.02]",
  secondary:
    "bg-transparent text-ink-1 border border-line-2 hover:text-accent-hover hover:border-accent-hover",
  // текст navy-deep замість токена #3D82C4: 7:1 на білому (AA)
  dark: "bg-white text-band border border-transparent hover:bg-[#E8F2FB]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-[11px] text-sm",
  lg: "px-7 py-[15px] text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-btn font-sans font-semibold leading-tight transition-[background,color,border-color,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
