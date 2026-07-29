"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ContactForm from "@/components/forms/ContactForm";

const LeadModalContext = createContext<{ open: () => void }>({
  open: () => {},
});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export default function LeadModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    restoreRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      // простий focus-trap: Tab циклюється всередині діалога
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <LeadModalContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div
          data-no-tilt
          onClick={close}
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(6,9,14,.6)] p-4 backdrop-blur-[6px]"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-card border border-line-1 bg-card p-8 shadow-[0_30px_80px_rgba(0,0,0,.6),0_0_40px_rgba(79,193,240,.12)]"
          >
            <button
              ref={closeRef}
              onClick={close}
              aria-label="Закрити"
              className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center text-lg text-ink-3 transition-colors hover:text-ink-1"
            >
              ✕
            </button>
            <h2
              id="lead-modal-title"
              className="mb-[18px] font-display text-[22px] font-bold"
            >
              Розрахувати вартість
            </h2>
            <ContactForm />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}
