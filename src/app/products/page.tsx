import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { productCategories, productListImages } from "@/lib/static-data";

const tabs = ["Head & Face", "Torso", "Lower Limb", "Gloves", "Foot Garments"];

export default function ProductsPage() {
  return (
    <>
      <Header title="Products" />
      <main className="bg-white px-7 pb-6 pt-8">
        <section className="mx-auto max-w-screen-xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-navy">Compression Garment Categories</h1>
          <p className="mx-auto mt-4 max-w-xl text-2xl leading-8 text-slate-600">
            Explore our ready styles and custom-made options for global buyers.
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
          {productCategories.map((category, index) => (
            <article key={category.name} className="grid grid-cols-[34%_1fr] gap-5 rounded-card border border-novamedix-border bg-white p-0 shadow-soft md:grid-cols-[260px_1fr_280px] md:items-center">
              <div className="relative min-h-44 overflow-hidden rounded-l-card bg-novamedix-light-gray md:min-h-44">
                <Image src={productListImages[index]} alt="" fill className="object-cover" />
              </div>
              <div className="py-6 pr-3">
                <h2 className="text-3xl font-bold text-navy">{category.name}</h2>
                <p className="mt-2 max-w-sm text-lg leading-7 text-slate-600">{category.description}</p>
                <Link href="/products/lower-limb-compression-garment" className="mt-3 inline-flex h-10 items-center gap-3 rounded-lg bg-novamedix-blue px-5 text-lg font-bold text-white shadow-soft">
                  View Details <Icon name="arrow" className="h-5 w-5" />
                </Link>
              </div>
              <div className="col-span-2 grid gap-2 px-5 pb-5 md:col-span-1 md:px-0 md:pb-0 md:pr-8">
                {["Ready Style", "Custom Available", "OEM"].map((label, badgeIndex) => (
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
            <h2 className="text-3xl font-bold text-[#087160]">Need a custom size?</h2>
            <p className="mt-1 text-lg leading-7 text-slate-700">Send us your product type and basic measurements for quotation.</p>
          </div>
          <a href="https://wa.me/8618902221129" className="flex h-14 min-w-64 items-center justify-center gap-3 rounded-lg border border-novamedix-whatsapp-green bg-white text-lg font-bold text-[#087d3e]">
            <Icon name="whatsapp" className="h-7 w-7" /> Ask on WhatsApp
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
