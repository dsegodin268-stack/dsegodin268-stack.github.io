import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-32 text-center">
      <div className="font-mono text-xs uppercase tracking-crumb text-ink-3">
        Помилка 404
      </div>
      <h1 className="font-display text-5xl font-extrabold text-accent">404</h1>
      <p className="max-w-md text-ink-2">
        Сторінку не знайдено. Можливо, її переміщено або видалено.
      </p>
      <Button href="/">На головну</Button>
    </section>
  );
}
