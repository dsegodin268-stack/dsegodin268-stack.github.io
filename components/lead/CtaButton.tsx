"use client";

import Button, { type ButtonProps } from "@/components/ui/Button";
import { useLeadModal } from "@/components/lead/LeadModalProvider";

/** Кнопка, що відкриває лід-модалку «Розрахувати вартість» */
export default function CtaButton(props: Omit<ButtonProps, "href">) {
  const { open } = useLeadModal();
  return <Button {...props} onClick={open} />;
}
