import Link from "next/link";
import { Icon } from "@/components/Icon";

type HeaderProps = {
  title?: string;
  detail?: boolean;
  compact?: boolean;
};

export function Header({ title, detail = false, compact = false }: HeaderProps) {
  if (detail) {
    return (
      <header className="sticky top-0 z-30 border-b border-novamedix-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-md items-center justify-between px-7">
          <Link href="/products" aria-label="Back to products" className="text-navy">
            <Icon name="back" className="h-7 w-7" />
          </Link>
          <div className="text-center text-xl font-bold text-navy sm:text-2xl">{title}</div>
          <WhatsAppIcon />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-novamedix-border bg-white/95 shadow-[0_2px_12px_rgba(16,32,51,0.06)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-7">
        {title ? (
          <>
            <button aria-label="Open menu" className="text-navy">
              <Icon name="menu" className="h-7 w-7" />
            </button>
            <h1 className="text-center text-2xl font-bold text-navy">{title}</h1>
            <div className="flex items-center gap-5">
              <LanguageSwitch />
              <WhatsAppIcon />
            </div>
          </>
        ) : (
          <>
            <Link href="/" className="text-2xl font-bold tracking-tight text-novamedix-blue sm:text-3xl">
              NovaMedix <span className="text-novamedix-teal">Custom</span>
            </Link>
            <div className="flex items-center gap-5">
              {!compact && <LanguageSwitch />}
              <WhatsAppIcon />
              <button aria-label="Open menu" className="text-navy">
                <Icon name="menu" className="h-7 w-7" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function LanguageSwitch() {
  return (
    <div className="hidden text-base font-semibold text-slate-500 min-[520px]:block">
      <span className="text-novamedix-blue">EN</span>
      <span className="px-2">/</span>RU<span className="px-2">/</span>CN
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <a
      href="https://wa.me/8618902221129"
      className="grid h-10 w-10 place-items-center rounded-lg bg-novamedix-whatsapp-green text-white shadow-soft"
      aria-label="WhatsApp inquiry"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
