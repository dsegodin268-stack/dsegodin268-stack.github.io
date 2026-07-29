import Image from "next/image";

interface PhotoPanelProps {
  caption: string;
  src?: string;
  alt?: string;
  sizes?: string;
  /** масштабування фото при hover батьківської групи */
  zoomOnHover?: boolean;
}

/**
 * Фото об'єкта або dashed-заглушка (за readme handoff-бандла: панель
 * #0F1319 зі штриховою cyan-рамкою та mono-підписом у квадратних дужках,
 * поки немає реальних фото).
 */
export default function PhotoPanel({
  caption,
  src,
  alt,
  sizes = "100vw",
  zoomOnHover = false,
}: PhotoPanelProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt || caption}
        fill
        sizes={sizes}
        className={`object-cover ${
          zoomOnHover
            ? "transition-transform duration-[450ms] group-hover:scale-105"
            : ""
        }`}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[#0F1319] p-2.5" aria-hidden>
      <div className="grid h-full w-full place-items-center rounded-[3px] border border-dashed border-[rgba(0,160,208,.4)]">
        <span className="px-4 text-center font-mono text-xs text-ink-3">
          [ {caption} ]
        </span>
      </div>
    </div>
  );
}
