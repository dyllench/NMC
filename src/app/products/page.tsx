import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { getPublishedProducts } from "@/lib/products";
import { getWhatsAppLink } from "@/lib/whatsapp";

const tabs = ["Head & Face", "Torso", "Lower Limb", "Gloves", "Foot Garments"];

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <Header titleKey="products" />
      <main className="bg-white px-7 pb-6 pt-8">
        <section className="mx-auto max-w-screen-xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-navy">
            <LocalizedText k="compressionGarmentCategories">Compression Garment Categories</LocalizedText>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-2xl leading-8 text-slate-600">
            <LocalizedText k="productsIntro">Explore our ready styles and custom-made options for global buyers.</LocalizedText>
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 min-[760px]:grid-cols-5">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`h-14 rounded-lg border text-xl font-semibold ${index === 0 ? "border-novamedix-blue bg-novamedix-blue text-white shadow-soft" : "border-novamedix-border bg-white text-slate-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-5 grid max-w-screen-xl gap-3">
          {products.map((product) => (
            <article key={product.slug} className="grid grid-cols-[34%_1fr] gap-5 rounded-card border border-novamedix-border bg-white p-0 shadow-soft md:grid-cols-[260px_1fr_280px] md:items-center">
              <div className="relative min-h-44 overflow-hidden rounded-l-card bg-novamedix-light-gray md:min-h-44">
                <Image src={product.coverImageUrl} alt={product.title} fill className="object-cover" unoptimized={isRemoteImage(product.coverImageUrl)} />
              </div>
              <div className="py-6 pr-3">
                <h2 className="text-3xl font-bold text-navy">{getDisplayTitle(product.title)}</h2>
                <p className="mt-2 max-w-sm text-lg leading-7 text-slate-600">{product.shortDescription}</p>
                <Link href={`/products/${product.slug}`} className="mt-3 inline-flex h-10 items-center gap-3 rounded-lg bg-novamedix-blue px-5 text-lg font-bold text-white shadow-soft">
                  <LocalizedText k="viewDetails">View Details</LocalizedText> <Icon name="arrow" className="h-5 w-5" />
                </Link>
              </div>
              <div className="col-span-2 grid gap-2 px-5 pb-5 md:col-span-1 md:px-0 md:pb-0 md:pr-8">
                {product.tags.slice(0, 3).map((label, badgeIndex) => (
                  <div key={label} className="flex h-9 items-center gap-3 rounded-full bg-[#f1f5fb] px-5 text-base font-bold text-novamedix-blue">
                    <Icon name={badgeIndex === 0 ? "shirt" : badgeIndex === 1 ? "ruler" : "shield"} className="h-5 w-5" />
                    {label}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

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

function getDisplayTitle(title: string) {
  return title.replace(" Compression Garment", "").replace("Compression Gloves", "Gloves").replace("Foot Compression Garment", "Foot Garments");
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}
