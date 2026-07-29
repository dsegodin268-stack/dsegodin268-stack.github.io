"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  serviceTypeOptions,
  type ContactFormData,
} from "@/lib/contact-schema";
import Button from "@/components/ui/Button";
import { submitLead } from "@/lib/submit-lead";

// text-base (16px) на мобільних — iOS автозумить поля з меншим шрифтом
const fieldClasses =
  "w-full min-h-[44px] rounded-btn border border-line-1 bg-card px-3.5 py-3 font-sans text-base md:text-sm text-ink-1 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-3 focus:border-accent focus:shadow-ring";

const labelClasses =
  "mb-2 block font-mono text-[11px] uppercase tracking-tag text-ink-3";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[12.5px] text-danger">
      {message}
    </p>
  );
}

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { consent: false },
    // валідація після blur, а не лише на submit (inline-validation)
    mode: "onTouched",
  });

  async function onSubmit(data: ContactFormData) {
    setServerError("");
    try {
      const { consent: _consent, ...payload } = data;
      // Статичний сайт (GitHub Pages) — заявка йде напряму в Supabase,
      // без серверного API. Див. lib/submit-lead.ts
      await submitLead(payload);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Не вдалося надіслати заявку. Спробуйте пізніше або зателефонуйте."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="px-6 py-12 text-center">
        <div className="mb-3 text-[40px] leading-none text-success">✓</div>
        <div className="mb-2 font-display text-[22px] font-bold">
          Заявку надіслано
        </div>
        <div className="mb-6 text-sm text-ink-2">
          Кошторис — протягом 24 годин.
        </div>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Нова заявка
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="lead-name" className={labelClasses}>
          Ім'я <span className="text-navy" aria-hidden>*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          placeholder="Ваше ім'я"
          autoComplete="name"
          aria-required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          className={`${fieldClasses} ${errors.name ? "border-danger" : ""}`}
          {...register("name")}
        />
        <FieldError id="lead-name-error" message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="lead-phone" className={labelClasses}>
          Телефон <span className="text-navy" aria-hidden>*</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="+38 (0__) ___ __ __"
          autoComplete="tel"
          aria-required
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
          className={`${fieldClasses} ${errors.phone ? "border-danger" : ""}`}
          {...register("phone")}
        />
        <FieldError id="lead-phone-error" message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="lead-service" className={labelClasses}>
          Послуга
        </label>
        <div className="relative">
          <select
            id="lead-service"
            defaultValue=""
            className={`${fieldClasses} cursor-pointer appearance-none pr-9`}
            {...register("service_type")}
          >
            <option value="" disabled>
              Оберіть послугу
            </option>
            {serviceTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-ink-3"
          >
            ▾
          </span>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="lead-message" className={labelClasses}>
            Опишіть задачу
          </label>
          <textarea
            id="lead-message"
            rows={4}
            placeholder="Тип об'єкта, площа, строки…"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "lead-message-error" : undefined}
            className={`${fieldClasses} resize-y leading-relaxed`}
            {...register("message")}
          />
          <FieldError id="lead-message-error" message={errors.message?.message} />
        </div>
      )}

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
          <input
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "lead-consent-error" : undefined}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-line-2 bg-transparent transition-colors checked:border-accent checked:bg-accent checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M3.5%208.5l3%203%206-7%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat"
            {...register("consent")}
          />
          Погоджуюсь з обробкою персональних даних
        </label>
        <FieldError id="lead-consent-error" message={errors.consent?.message} />
      </div>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="rounded-btn border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-[13px] text-danger"
        >
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Надсилання…" : "Надіслати заявку"}
      </Button>
    </form>
  );
}
