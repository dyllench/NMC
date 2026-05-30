export const defaultWhatsAppMessage =
  "Hello, I am interested in NovaMedix Custom compression garments. Please send me the product catalog and quotation.";

export function getWhatsAppLink(message = defaultWhatsAppMessage) {
  const fallbackNumber = "8618902221129";
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const number = (configuredNumber || fallbackNumber).replace(/[^\d]/g, "");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppMessage(productTitle: string) {
  return `Hello, I am interested in ${productTitle}. Please send me quotation, catalog and custom order details.`;
}
