"use client";

import type { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";

type LocalizedTextProps = {
  k: TranslationKey;
  children?: React.ReactNode;
};

export function LocalizedText({ k, children }: LocalizedTextProps) {
  const { t } = useLanguage();
  return <>{t(k) || children}</>;
}
