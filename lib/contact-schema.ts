import { z } from "zod";

export { serviceTypeOptions } from "@/data/services";

/** Серверна схема — те, що зберігається в БД */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Вкажіть ім'я")
    .max(255, "Занадто довге ім'я"),
  phone: z
    .string()
    .max(20, "Занадто довгий номер")
    .regex(/^\+?[\d\s()-]{9,}$/, "Вкажіть коректний номер телефону"),
  service_type: z.string().max(100).optional(),
  message: z.string().max(5000, "Занадто довге повідомлення").optional(),
});

/** Клієнтська схема — додає обов'язкову згоду (в БД не пишеться) */
export const contactFormSchema = contactSchema.extend({
  consent: z.boolean().refine((v) => v, {
    message: "Потрібна згода на обробку даних",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
