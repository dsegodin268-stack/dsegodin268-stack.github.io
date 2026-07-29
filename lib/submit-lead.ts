import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { siteConfig } from "@/data/site";

export interface LeadPayload {
  name: string;
  phone: string;
  service_type?: string;
  message?: string;
}

/**
 * Надсилання заявки без серверного API (сайт — статичний, GitHub Pages).
 *
 * 1. Якщо Supabase налаштовано (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY на етапі
 *    збірки) — заявка пишеться напряму в таблицю contacts (RLS дозволяє
 *    anon лише INSERT — див. supabase/schema.sql).
 * 2. Якщо ні — кидаємо помилку з проханням зателефонувати (номер клікабельний
 *    у шапці та футері сайту).
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!isSupabaseConfigured) {
    console.log("[contact:static-demo] Нова заявка:", payload);
    throw new Error(
      `Онлайн-форма ще налаштовується. Зателефонуйте нам: ${siteConfig.phone} — відповідаємо щодня.`
    );
  }

  const supabase = getSupabase()!;
  const { error } = await supabase.from("contacts").insert({
    name: payload.name,
    phone: payload.phone,
    message: payload.message || null,
    service_type: payload.service_type || null,
  });

  if (error) {
    console.error("[contact] Supabase insert error:", error.message);
    throw new Error(
      `Не вдалося надіслати заявку. Спробуйте пізніше або зателефонуйте: ${siteConfig.phone}.`
    );
  }
}
