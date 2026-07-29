export interface Service {
  slug: string;
  index: string;
  label: string;
  title: string;
  description: string;
  price: string;
  lead: string;
  cta: string;
  /** двоколонковий список обсягу робіт (design, installation) */
  scope?: string[];
  /** 4-крокова схема процесу (projects) */
  steps?: string[];
  /** ілюстрація для слайдера на головній */
  image?: string;
}

export const services: Service[] = [
  {
    slug: "design",
    index: "01",
    label: "ПРОЄКТУВАННЯ",
    title: "Проєктування",
    description:
      "Однолінійні схеми 0.4–10 кВ, розрахунок навантажень, узгодження з ДТЕК.",
    price: "від 5 000 грн",
    cta: "Замовити проєкт",
    lead: "Проєктна документація для мереж 0.4–10 кВ з розрахунком навантажень і повним узгодженням у ДТЕК — без вашої участі в бюрократії.",
    scope: [
      "Однолінійні схеми 0.4–10 кВ",
      "Розрахунок навантажень і перерізів",
      "Узгодження з ДТЕК",
      "Відповідність ДБН, ПУЕ, IEC 60898",
    ],
    image: "/images/services-design.webp",
  },
  {
    slug: "installation",
    index: "02",
    label: "МОНТАЖ",
    title: "Монтаж",
    description:
      "Прокладання кабелів, монтаж обладнання та щитів, контури заземлення.",
    price: "від 15 000 грн",
    cta: "Замовити монтаж",
    lead: "Електромонтажні роботи штатною командою з гарантією 1 рік — за вашим або нашим проєктом.",
    scope: [
      "Прокладання кабельних ліній",
      "Монтаж щитів та обладнання",
      "Контури заземлення",
      "Випробування та вимірювання",
    ],
    image: "/images/services-installation.webp",
  },
  {
    slug: "projects",
    index: "03",
    label: "ПРОЄКТИ",
    title: "Проєкти під ключ",
    description:
      "Повний цикл: від проєкту та закупівлі обладнання до запуску й здачі.",
    price: "від 50 000 грн",
    cta: "Обговорити проєкт",
    lead: "Повний цикл з єдиним відповідальним підрядником: проєкт, закупівля обладнання, монтаж, автоматизація, запуск і здача.",
    steps: [
      "Проєкт та кошторис",
      "Закупівля обладнання",
      "Монтаж та автоматизація",
      "Запуск і здача",
    ],
    image: "/images/services-projects.webp",
  },
];

export const serviceTypeOptions = [
  { value: "design", label: "Проєктування" },
  { value: "installation", label: "Монтаж" },
  { value: "projects", label: "Проєкт під ключ" },
] as const;
