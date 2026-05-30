import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import type { TranslationKey } from "@/lib/i18n";
import { getWhatsAppLink } from "@/lib/whatsapp";

type CTASectionProps = {
  title: string;
  text: string;
  buttonText?: string;
  buttonTextKey?: TranslationKey;
  greenButton?: boolean;
  whatsAppMessage?: string;
};

export function CTASection({ title, text, buttonText = "WhatsApp Inquiry", buttonTextKey = "whatsAppInquiry", greenButton = false, whatsAppMessage }: CTASectionProps) {
  return (
    <section className="mx-auto w-[calc(100%-42px)] max-w-screen-xl rounded-card bg-[linear-gradient(135deg,#0b66dd,#0058d6)] px-8 py-6 text-white shadow-card">
      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
          <p className="mt-1 max-w-xl text-base leading-6 text-white/95">{text}</p>
        </div>
        <a
          href={getWhatsAppLink(whatsAppMessage)}
          className={`flex h-14 min-w-64 items-center justify-center gap-3 rounded-lg px-6 text-lg font-bold shadow-soft ${greenButton ? "bg-novamedix-whatsapp-green text-white" : "bg-white text-novamedix-blue"}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" className="h-7 w-7" />
          <LocalizedText k={buttonTextKey}>{buttonText}</LocalizedText>
        </a>
      </div>
    </section>
  );
}
