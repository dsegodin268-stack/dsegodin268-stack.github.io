# Публікація та редагування сайту

**Живий сайт:** https://dsegodin268-stack.github.io/
**Код:** https://github.com/dsegodin268-stack/dsegodin268-stack.github.io

## Як це працює

Сайт опубліковано на **GitHub Pages** (безкоштовно, HTTPS, CDN).
Кожен push у гілку `main` автоматично запускає збірку
(`.github/workflows/deploy.yml`) і оновлює сайт за 2–3 хвилини.
Статус збірок: вкладка **Actions** у репозиторії.

## Як редагувати сайт

Весь контент — у трьох файлах, редагувати можна без знань коду:

| Що змінити | Файл |
|---|---|
| Телефон, адреса, email, статистика, «чому ми», перелік робіт | `data/site.ts` |
| Послуги та ціни | `data/services.ts` |
| Кейси портфоліо | `data/case-studies.ts` |
| Фото | покласти в `public/images/` і вказати шлях у `image` відповідного запису |

### Варіант 1 — через Claude (найшвидший)
Відкрийте Cowork-сесію з папкою `D:\Site` і скажіть, що змінити,
наприклад: «Зміни ціну проєктування на 6 000 грн і опублікуй».
Claude внесе зміни та завантажить їх на GitHub.

### Варіант 2 — вручну через GitHub
1. Відкрийте потрібний файл на github.com → олівець (Edit) → зміни → Commit.
2. Через 2–3 хв сайт оновиться автоматично.

### Варіант 3 — локально (для розробки)
```bash
npm install
npm run dev     # http://localhost:3000 — живий перегляд
```

## Форма заявок (Supabase) — 5 хвилин, безкоштовно

Зараз форма показує відвідувачу прохання зателефонувати.
Щоб заявки зберігались у базу:

1. Створіть безкоштовний проєкт на supabase.com
2. SQL Editor → виконайте вміст `supabase/schema.sql`.
3. Settings → API → скопіюйте `URL` та `anon key`.
4. У GitHub-репозиторії: **Settings → Secrets and variables → Actions → Variables** → додайте:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Actions → «Deploy to GitHub Pages» → **Run workflow**.
Заявки з'являтимуться в Supabase → Table Editor → `contacts`.

## Власний домен (sass-engineering.ua)

1. Купіть домен у реєстратора (nic.ua, hostinger тощо, ~200–400 грн/рік).
2. У DNS додайте CNAME: `www` → `dsegodin268-stack.github.io` та A-записи апексу на 185.199.108.153 / .109.153 / .110.153 / .111.153
3. GitHub: Settings → Pages → Custom domain → вкажіть домен, увімкніть **Enforce HTTPS**.
4. У `data/site.ts` замініть `url` на `https://sass-engineering.ua`.

## Просування (перші дзвінки)

Див. `PROMOTION.md` — покроковий план: Google Business Profile,
Search Console, Google Ads.
