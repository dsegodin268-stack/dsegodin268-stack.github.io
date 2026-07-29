# SASS Engineering — сайт компанії

B2B-сайт електромонтажної компанії: генерація лідів + портфоліо кейсів.
Київ та область · sass-engineering.ua

**Живий сайт:** https://dsegodin268-stack.github.io/

Див. **DEPLOY.md** — як редагувати й публікувати, **PROMOTION.md** — план просування.

## Стек

- Next.js 14 (App Router) + TypeScript, static export → GitHub Pages
- Tailwind CSS — дизайн-токени в tailwind.config.ts
- three.js — 3D-емблема в hero
- Supabase — збереження заявок (опційно, див. DEPLOY.md)

## Локальний запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # статична збірка в out/
```

## Структура

- `app/` — сторінки (/ /services /portfolio /about /contact)
- `components/` — UI, ефекти, форма
- `data/` — ВЕСЬ контент сайту (site.ts, services.ts, case-studies.ts)
- `supabase/schema.sql` — схема БД для форми заявок
