import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { ProductCategoryTabs } from "@/components/ProductCategoryTabs";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { getPublishedProducts } from "@/lib/products";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <Header titleKey="products" />
      <main className="bg-white px-7 pb-6 pt-8">
        <ProductCategoryTabs products={products} />

        <section className="mx-auto mt-5 grid max-w-screen-xl items-center gap-5 rounded-card border border-teal-200 bg-[#f4fffe] px-8 py-6 shadow-soft sm:grid-cols-[auto_1fr_auto]">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-novamedix-teal shadow-soft">
            <Icon name="ruler" className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#087160]">
              <LocalizedText k="needCustomSize">Need a custom size?</LocalizedText>
            </h2>
            <p className="mt-1 text-lg leading-7 text-slate-700">Send us your product type and basic measurements for quotation.</p>
          </div>
          <a href={getWhatsAppLink()} className="flex h-14 min-w-64 items-center justify-center gap-3 rounded-lg border border-novamedix-whatsapp-green bg-white text-lg font-bold text-[#087d3e]" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" className="h-7 w-7" /> <LocalizedText k="askOnWhatsApp">Ask on WhatsApp</LocalizedText>
          </a>
        </section>

        <div className="mx-auto mt-5 max-w-screen-xl">
          <CTASection
            title="Looking for a reliable factory supplier?"
            text="Factory direct, quality assured, global trusted."
          />
        </div>
      </main>
      <Footer />
      <StickyWhatsAppButton />
    </>
  );
}
