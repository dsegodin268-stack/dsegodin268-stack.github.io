import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { caseStudies } from "@/data/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact/`, changeFrequency: "monthly", priority: 0.9 },
  ];

  const cases: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/portfolio/${c.slug}/`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...cases];
}
