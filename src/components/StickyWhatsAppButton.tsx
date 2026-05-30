import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { getProductWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp";

type StickyWhatsAppButtonProps = {
  secondary?: boolean;
  productTitle?: string;
};

export function StickyWhatsAppButton({ secondary = false, productTitle }: StickyWhatsAppButtonProps) {
  const whatsAppLink = getWhatsAppLink(
    productTitle ? getProductWhatsAppMessage(productTitle) : undefined,
  );

  if (secondary) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-screen-md rounded-t-2xl bg-[#eef4fb] p-2 shadow-[0_-10px_28px_rgba(16,32,51,0.12)]">
        <div className="grid grid-cols-2 gap-2">
          <a className="flex h-12 items-center justify-center gap-2 rounded-lg bg-novamedix-whatsapp-green text-base font-bold text-white" href={whatsAppLink} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp Quote
          </a>
          <a className="flex h-12 items-center justify-center gap-2 rounded-lg bg-novamedix-blue text-base font-bold text-white" href="mailto:info@novamedixcustom.com">
            <Icon name="mail" className="h-5 w-5" /> <LocalizedText k="sendInquiry">Send Inquiry</LocalizedText>
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={whatsAppLink}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-14 max-w-screen-xl items-center justify-center gap-3 rounded-t-2xl bg-novamedix-whatsapp-green text-2xl font-bold text-white shadow-[0_-10px_28px_rgba(16,32,51,0.12)]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
      <LocalizedText k="whatsAppInquiry">WhatsApp Inquiry</LocalizedText>
    </a>
  );
}
