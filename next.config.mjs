/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Статичний експорт для GitHub Pages (out/). API-роут прибирається в CI.
  output: "export",
  trailingSlash: true,
  images: {
    // GitHub Pages не має сервера оптимізації зображень
    unoptimized: true,
  },
  // Примітка: redirects() не підтримується у static export.
  // Старі URL /services/:slug більше не існують — всі посилання ведуть на /services.
};

export default nextConfig;
