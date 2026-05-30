import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { ProductFeatureCard } from "@/components/ProductFeatureCard";
import { ProductGallery } from "@/components/ProductGallery";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { getProductWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp";

const productBadges = [
  ["factory", "Factory Direct"],
  ["ruler", "Custom Available"],
  ["shield", "OEM Support"],
  ["globe", "Global Shipping"],
];

const productTitle = "Lower Limb Compression Garment";
const productWhatsAppMessage = getProductWhatsAppMessage(productTitle);

export default function LowerLimbCompressionGarmentPage() {
  return (
    <>
      <Header detail title={productTitle} />
      <main className="mx-auto w-full max-w-screen-md bg-white pb-6">
        <ProductGallery />

        <section className="px-7 pt-5 text-center">
          <h1 className="text-3xl font-bold text-navy">Lower Limb Compression Garment</h1>
          <p className="mx-auto mt-1 max-w-lg text-base leading-6 text-slate-600">
            Factory direct compression garment solution with ready styles, custom sizing and OEM support.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {productBadges.map(([icon, label]) => (
              <div key={label} className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#f1f5fb] text-sm font-bold text-novamedix-blue">
                <Icon name={icon} className="h-4 w-4" /> {label}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href={getWhatsAppLink(productWhatsAppMessage)} className="flex h-11 items-center justify-center gap-3 rounded-lg bg-novamedix-whatsapp-green text-base font-bold text-white shadow-soft" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" className="h-5 w-5" /> <LocalizedText k="getQuoteOnWhatsApp">Get Quote on WhatsApp</LocalizedText>
            </a>
            <a href="mailto:info@novamedixcustom.com" className="flex h-11 items-center justify-center gap-3 rounded-lg border border-novamedix-blue text-base font-bold text-novamedix-blue">
              <Icon name="mail" className="h-5 w-5" /> <LocalizedText k="sendInquiry">Send Inquiry</LocalizedText>
            </a>
          </div>
        </section>

        <section className="mx-7 mt-4 rounded-card border border-novamedix-border bg-white p-5 shadow-soft">
          <div className="grid grid-cols-[52px_1fr] gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#059b66] text-white"><Icon name="info" className="h-6 w-6" /></div>
            <div>
              <h2 className="text-xl font-bold text-navy"><LocalizedText k="productOverview">Product Overview</LocalizedText></h2>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                This product is designed for buyers looking for lower-limb compression garment solutions.
                Ready styles and simple custom-made options are available.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-7 mt-3 rounded-card border border-novamedix-border bg-white p-4 shadow-soft">
          <h2 className="text-xl font-bold text-navy"><LocalizedText k="keyFeatures">Key Features</LocalizedText></h2>
          <div className="mt-3 grid grid-cols-5 gap-3">
            {[
              ["wave", "Comfortable elastic fabric"],
              ["ruler", "Smooth stitching"],
              ["ruler", "Custom sizing support"],
              ["shirt", "Ready styles available"],
              ["shield", "OEM / private label support"],
            ].map(([icon, title]) => <ProductFeatureCard key={title} icon={icon} title={title} />)}
          </div>
        </section>

        <section className="mx-7 mt-3 rounded-card border border-novamedix-border bg-white p-4 shadow-soft">
          <h2 className="text-xl font-bold text-navy"><LocalizedText k="applications">Applications</LocalizedText></h2>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {["Recovery support", "Compression use", "Clinic supply", "Distributor / wholesale", "OEM projects"].map((label) => (
              <div key={label} className="flex items-center justify-center gap-2 rounded-full text-center text-sm text-navy">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-novamedix-teal text-novamedix-teal"><Icon name="check" className="h-5 w-5" /></span>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-7 mt-3 rounded-card border border-novamedix-border bg-white p-4 text-center shadow-soft">
          <h2 className="text-left text-xl font-bold text-navy"><LocalizedText k="simpleCustomOrder">Simple Custom Order</LocalizedText></h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              ["1", "shirt", "Choose product type"],
              ["2", "ruler", "Send basic measurements"],
              ["3", "shield", "Confirm and produce"],
            ].map(([num, icon, label]) => (
              <div key={num} className="relative rounded-lg border border-novamedix-border bg-white p-4 shadow-soft">
                <span className="absolute left-4 top-2 rounded-full bg-novamedix-teal px-3 text-sm font-bold text-white">{num}</span>
                <Icon name={icon} className="mx-auto h-11 w-11 text-novamedix-blue" />
                <p className="mt-2 text-sm font-semibold leading-tight text-navy">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600">Detailed measurement guidance can be provided after inquiry.</p>
          <a href={getWhatsAppLink(productWhatsAppMessage)} className="mx-auto mt-3 flex h-8 max-w-72 items-center justify-center gap-2 rounded-md bg-novamedix-teal text-sm font-bold text-white" target="_blank" rel="noopener noreferrer">
            <Icon name="headset" className="h-4 w-4" /> Ask for Custom Support
          </a>
        </section>

        <section className="mx-7 mt-3 rounded-card border border-novamedix-border bg-white p-4 shadow-soft">
          <h2 className="text-xl font-bold text-navy"><LocalizedText k="orderInformation">Order Information</LocalizedText></h2>
          <div className="mt-2 divide-y divide-novamedix-border rounded-lg bg-white text-slate-700">
            {["Ready styles available", "Custom-made support", "OEM / private label available", "Lead time depends on quantity"].map((item, index) => (
              <div key={item} className="flex h-10 items-center justify-between px-2 text-base">
                <span className="flex items-center gap-3"><Icon name={index === 0 ? "shirt" : index === 1 ? "ruler" : index === 2 ? "shield" : "info"} className="h-5 w-5 text-novamedix-blue" />{item}</span>
                <span className="text-slate-400">›</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-7 mt-4 grid items-center gap-4 rounded-card bg-[linear-gradient(135deg,#0b66dd,#0058d6)] p-6 text-white shadow-card sm:grid-cols-[auto_1fr_260px]">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/20">
            <Icon name="box" className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold leading-tight">Need this product for wholesale or custom order?</h2>
          <div className="grid gap-2">
            <a href={getWhatsAppLink(productWhatsAppMessage)} className="flex h-10 items-center justify-center gap-2 rounded-md bg-white text-base font-bold text-[#087d3e]" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" className="h-5 w-5" /> <LocalizedText k="whatsAppInquiry">WhatsApp Inquiry</LocalizedText>
            </a>
            <a href="mailto:info@novamedixcustom.com" className="flex h-10 items-center justify-center gap-2 rounded-md bg-white text-base font-bold text-novamedix-blue">
              <Icon name="mail" className="h-5 w-5" /> <LocalizedText k="askForCatalog">Ask for Catalog</LocalizedText>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWhatsAppButton secondary productTitle={productTitle} />
    </>
  );
}
