import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FactoryImageGrid } from "@/components/FactoryImageGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { StrengthCard } from "@/components/StrengthCard";
import { getHomepageProductCategories } from "@/lib/products";
import { buyerStrengths } from "@/lib/static-data";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function Home() {
  const homepageProductCategories = await getHomepageProductCategories();

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="overflow-hidden border-b border-novamedix-border bg-[linear-gradient(120deg,#fff_0%,#fff_36%,#eef7ff_100%)]">
          <div className="mx-auto grid max-w-screen-xl gap-5 px-8 py-10 md:grid-cols-[1fr_1.25fr] md:items-center md:py-0 md:pl-8 md:pr-0">
            <div className="relative z-10">
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-navy md:text-6xl">
                <LocalizedText k="factoryDirectCompressionGarments">Factory Direct Compression Garments</LocalizedText>
              </h1>
              <p className="mt-5 max-w-lg text-xl leading-8 text-slate-600">
                <LocalizedText k="homeHeroDescription">
                  Ready styles, custom-made service, and OEM support for global buyers,
                  clinics, distributors and wholesalers.
                </LocalizedText>
              </p>
              <div className="mt-8 grid max-w-sm gap-4">
                <a href={getWhatsAppLink()} className="flex h-12 items-center justify-center gap-3 rounded-lg bg-novamedix-whatsapp-green text-lg font-bold text-white shadow-card" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" className="h-6 w-6" /> <LocalizedText k="getQuoteOnWhatsApp">Get Quote on WhatsApp</LocalizedText>
                </a>
                <Link href="/products" className="flex h-12 items-center justify-center rounded-lg border border-novamedix-blue text-lg font-bold text-novamedix-blue">
                  <LocalizedText k="viewProducts">View Products</LocalizedText>
                </Link>
              </div>
            </div>
            <div className="relative -mx-8 -mb-10 md:m-0">
              <div className="relative aspect-[1.42/1] min-h-80">
                <Image src="/placeholder/hero-home.png" alt="" fill priority className="object-cover object-left" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 py-5">
          <SectionTitle><LocalizedText k="whyBuyersChooseUs">Why Buyers Choose Us</LocalizedText></SectionTitle>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {buyerStrengths.map((item) => <StrengthCard key={item.title} item={item} />)}
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 pb-5">
          <SectionTitle><LocalizedText k="productCategories">Product Categories</LocalizedText></SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-4 min-[760px]:grid-cols-5">
            {homepageProductCategories.map((category) => <ProductCategoryCard key={category.name} category={category} />)}
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 pb-7">
          <SectionTitle><LocalizedText k="simpleCustomOrderSupport">Simple Custom Order Support</LocalizedText></SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            {[
              ["1", "clipboard", "Send product type"],
              ["2", "ruler", "Send body measurements"],
              ["3", "shield", "Confirm details"],
              ["4", "factory", "Start production"],
            ].map(([num, icon, label]) => (
              <div key={num} className="relative rounded-card border border-novamedix-border bg-white px-4 py-5 text-center shadow-soft">
                <span className="absolute right-1/2 top-12 translate-x-10 rounded-full bg-novamedix-blue px-2 text-sm font-bold text-white">{num}</span>
                <Icon name={icon} className="mx-auto h-12 w-12 text-novamedix-blue" />
                <p className="mt-3 text-base leading-tight text-navy">{label}</p>
              </div>
            ))}
          </div>
          <a href="mailto:info@novamedixcustom.com" className="mx-auto mt-3 flex h-10 max-w-48 items-center justify-center rounded-lg bg-novamedix-blue text-base font-bold text-white">Send Inquiry</a>
        </section>

        <section className="bg-[#f7faff] py-5">
          <div className="mx-auto max-w-screen-xl px-7">
            <SectionTitle><LocalizedText k="reliableFactorySupport">Reliable Factory Support</LocalizedText></SectionTitle>
            <div className="mt-4"><FactoryImageGrid /></div>
          </div>
        </section>

        <div className="pt-5">
          <CTASection
            title="Need Ready Styles or Custom Compression Garments?"
            text="Contact us for product catalog, wholesale quotation and OEM cooperation."
          />
        </div>
      </main>
      <Footer />
      <StickyWhatsAppButton />
    </>
  );
}
