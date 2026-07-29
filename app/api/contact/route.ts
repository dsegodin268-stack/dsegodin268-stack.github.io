import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некоректний запит" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Перевірте правильність заповнення полів" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const row = {
    name: data.name,
    phone: data.phone,
    message: data.message || null,
    service_type: data.service_type || null,
  };

  if (!isSupabaseConfigured) {
    // Демо-режим: Supabase не налаштовано (.env.local відсутній).
    console.log("[contact:demo-mode] Нова заявка:", row);
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = getSupabase()!;
  const { error } = await supabase.from("contacts").insert(row);

  if (error) {
    console.error("[contact] Supabase insert error:", error.message);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не вдалося надіслати заявку. Спробуйте пізніше або зателефонуйте нам.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
