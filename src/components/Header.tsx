"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import { getWhatsAppLink } from "@/lib/whatsapp";

type HeaderProps = {
  title?: string;
  titleKey?: TranslationKey;
  detail?: boolean;
};

const menuItems: Array<{ href: string; label: TranslationKey }> = [
  { href: "/", label: "home" },
  { href: "/products", label: "products" },
  { href: "/about", label: "aboutUs" },
];

export function Header({ title, titleKey, detail = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const visibleTitle = titleKey ? t(titleKey) : title;

  return (
    <header className="sticky top-0 z-30 border-b border-novamedix-border bg-white/95 shadow-[0_2px_12px_rgba(16,32,51,0.06)] backdrop-blur">
      <div className={`mx-auto flex ${detail ? "h-14 max-w-screen-md" : "h-16 max-w-screen-xl"} items-center justify-between gap-3 px-7`}>
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-novamedix-blue sm:text-3xl" onClick={() => setIsOpen(false)}>
          NovaMedix <span className="text-novamedix-teal">Custom</span>
        </Link>
        {visibleTitle ? (
          <div className="hidden min-w-0 flex-1 truncate text-center text-xl font-bold text-navy sm:block">
            {visibleTitle}
          </div>
        ) : null}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <LanguageSwitch />
          <WhatsAppIcon />
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="text-navy"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <Icon name="menu" className="h-7 w-7" />
          </button>
        </div>
      </div>
      {detail ? (
        <div className="mx-auto flex max-w-screen-md items-center gap-4 px-7 pb-3">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#f1f5fb] px-4 py-2 text-sm font-bold text-novamedix-blue" onClick={() => setIsOpen(false)}>
            <Icon name="back" className="h-4 w-4" />
            {t("backToProducts")}
          </Link>
          <Link href="/" className="text-sm font-bold text-navy" onClick={() => setIsOpen(false)}>
            {t("home")}
          </Link>
        </div>
      ) : null}
      {isOpen ? <MobileMenu onClose={() => setIsOpen(false)} /> : null}
    </header>
  );
}

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const options = [
    ["en", "EN"],
    ["ru", "RU"],
    ["cn", "CN"],
  ] as const;

  return (
    <div className="flex text-sm font-semibold text-slate-500 sm:text-base">
      {options.map(([value, label], index) => (
        <span key={value} className="flex items-center">
          {index > 0 ? <span className="px-1 sm:px-2">/</span> : null}
          <button
            className={language === value ? "text-novamedix-blue" : "text-slate-500"}
            onClick={() => setLanguage(value)}
            type="button"
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <a
      href={getWhatsAppLink()}
      className="grid h-10 w-10 place-items-center rounded-lg bg-novamedix-whatsapp-green text-white shadow-soft"
      aria-label="WhatsApp inquiry"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="absolute inset-x-4 top-[calc(100%+8px)] mx-auto max-w-screen-xl rounded-card border border-novamedix-border bg-white p-3 shadow-card">
      <nav className="grid gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-4 py-3 text-base font-bold text-novamedix-blue hover:bg-[#f1f5fb]"
            onClick={onClose}
          >
            {t(item.label)}
          </Link>
        ))}
        <a
          href={getWhatsAppLink()}
          className="mt-1 flex items-center gap-3 rounded-lg bg-[#effbf5] px-4 py-3 text-base font-bold text-[#087d3e]"
          onClick={onClose}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          {t("whatsAppInquiry")}
        </a>
      </nav>
    </div>
  );
}
