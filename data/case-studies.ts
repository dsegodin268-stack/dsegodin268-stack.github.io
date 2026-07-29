export interface CaseStudy {
  slug: string;
  tag: string;
  filter: string;
  title: string;
  description: string;
  result: string;
  challenge: string;
  solution: string;
  resultLong: string;
  /** реальне фото об'єкта; поки немає — рендериться dashed-заглушка */
  image?: string;
}

export const caseFilters = ["Усі", "Проєктування", "Житлові", "Бізнес"];

export const caseStudies: CaseStudy[] = [
  {
    slug: "dtek-005596",
    tag: "ПРОЄКТУВАННЯ",
    filter: "Проєктування",
    title: "ДТЕК 005596",
    description:
      "Перепроєктування нестандартного вводу 45А під стандарт IEC 60898 (50А).",
    result: "Погоджено за 1 місяць, введено в експлуатацію",
    challenge:
      "Клієнт використовував нестандартний ввід 45А, який ДТЕК не погоджував.",
    solution:
      "Переробили схему під стандарт IEC 60898 (50А) з перерахунком навантажень.",
    resultLong: "Проєкт погоджено за 1 місяць, об'єкт введено в експлуатацію.",
    image: "/images/case-dtek-005596.webp",
  },
  {
    slug: "cottages-kyiv",
    tag: "ЖИТЛОВІ",
    filter: "Житлові",
    title: "Котеджі, Київщина",
    description:
      "10+ приватних котеджів зі змішаними навантаженнями — оптимізовані схеми на Schneider Electric.",
    result: "10+ об'єктів за 6 місяців",
    challenge:
      "10+ приватних котеджів зі змішаними навантаженнями та різними вимогами власників.",
    solution: "Оптимізовані типові схеми на обладнанні Schneider Electric.",
    resultLong: "10+ об'єктів здано за 6 місяців, середній бюджет — 45 000 грн.",
    image: "/images/case-cottages-kyiv.webp",
  },
  {
    slug: "galafoods-office",
    tag: "БІЗНЕС",
    filter: "Бізнес",
    title: "Офіс Galafoods",
    description:
      "Освітлення Smart Home з автоматизацією: трекові LED + система KNX.",
    result: "30% економії енергії",
    challenge:
      "Освітлення офісу з автоматизацією сценаріїв — Smart Home для бізнес-простору.",
    solution: "Трекові LED-світильники + система автоматизації KNX.",
    resultLong: "30% економії електроенергії проти попереднього рішення.",
    image: "/images/case-galafoods-office.webp",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy {
  const idx = Math.max(0, caseStudies.findIndex((c) => c.slug === slug));
  return caseStudies[(idx + 1) % caseStudies.length];
}
