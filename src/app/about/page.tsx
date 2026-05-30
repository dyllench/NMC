import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { FactoryImageGrid } from "@/components/FactoryImageGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { SectionTitle } from "@/components/SectionTitle";
import { StickyWhatsAppButton } from "@/components/StickyWhatsAppButton";
import { StrengthCard } from "@/components/StrengthCard";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="overflow-hidden border-b border-novamedix-border bg-[linear-gradient(120deg,#fff_0%,#fff_36%,#eef7ff_100%)]">
          <div className="mx-auto grid max-w-screen-xl gap-5 px-8 py-10 md:grid-cols-[0.9fr_1.25fr] md:items-center md:py-0 md:pr-0">
            <div>
              <h1 className="text-5xl font-bold leading-[1.08] text-navy md:text-6xl">
                <LocalizedText k="aboutNovaMedixCustom">About NovaMedix Custom</LocalizedText>
              </h1>
              <p className="mt-5 max-w-md text-xl leading-8 text-slate-600">
                Factory direct compression garment supplier for global buyers, clinics,
                distributors and OEM partners.
              </p>
              <a href="mailto:info@novamedixcustom.com" className="mt-8 inline-flex h-14 items-center gap-4 rounded-lg bg-novamedix-blue px-8 text-xl font-bold text-white shadow-card">
                <LocalizedText k="contactUs">Contact Us</LocalizedText> <Icon name="arrow" className="h-6 w-6" />
              </a>
            </div>
            <div className="relative -mx-8 -mb-10 md:m-0">
              <div className="relative aspect-[1.57/1] min-h-80">
                <Image src="/placeholder/hero-about.png" alt="" fill priority className="object-cover object-left" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 py-4">
          <div className="grid items-center gap-6 rounded-card bg-[#f3f8ff] p-8 shadow-soft sm:grid-cols-[140px_1fr]">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-novamedix-blue shadow-soft">
              <Icon name="factory" className="h-16 w-16" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy"><LocalizedText k="whoWeAre">Who We Are</LocalizedText></h2>
              <p className="mt-2 max-w-2xl text-xl leading-8 text-slate-700">
                We focus on compression garment production with ready styles,
                custom-made service and OEM/private label support for international buyers.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-lg px-8 pb-5">
          <SectionTitle><LocalizedText k="ourStrengths">Our Strengths</LocalizedText></SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Factory Direct Production", icon: "factory" },
              { title: "Flexible Custom Orders", icon: "ruler" },
              { title: "Quality Control Support", icon: "shield" },
              { title: "Global Shipping Experience", icon: "globe" },
            ].map((item) => <StrengthCard key={item.title} item={item} horizontal />)}
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-7 pb-4">
          <SectionTitle><LocalizedText k="productionCapability">Production Capability</LocalizedText></SectionTitle>
          <div className="mt-4"><FactoryImageGrid /></div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Ready styles", "Custom-made", "OEM support", "Export packaging"].map((item) => (
              <div key={item} className="flex h-10 items-center justify-center gap-3 rounded-lg bg-[#eef6ff] text-base text-navy">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-novamedix-blue text-white"><Icon name="check" className="h-3 w-3" /></span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 pb-5">
          <div className="grid items-center gap-6 rounded-card bg-[#eef7ff] p-8 shadow-soft sm:grid-cols-[140px_1fr]">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-novamedix-blue shadow-soft">
              <Icon name="shield" className="h-16 w-16" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy"><LocalizedText k="qualityFocus">Quality Focus</LocalizedText></h2>
              <p className="mt-2 max-w-2xl text-xl leading-8 text-slate-700">
                We pay attention to fabric selection, sewing details, inspection and
                packaging to support stable production quality.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-8 pb-5">
          <SectionTitle><LocalizedText k="builtForB2BCooperation">Built for B2B Cooperation</LocalizedText></SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["users", "Wholesale supply"],
              ["clinic", "Clinic cooperation"],
              ["handshake", "Distributor support"],
              ["tag", "OEM / private label projects"],
            ].map(([icon, label]) => (
              <div key={label} className="flex min-h-20 items-center gap-4 rounded-lg border border-novamedix-border bg-white px-5 shadow-soft">
                <Icon name={icon} className="h-10 w-10 text-novamedix-blue" />
                <span className="text-base font-bold leading-tight text-navy">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <CTASection
          title="Looking for a Reliable Compression Garment Factory?"
          text="Contact us for product catalog, factory quotation and cooperation discussion."
          buttonText="Get Quote on WhatsApp"
          buttonTextKey="getQuoteOnWhatsApp"
          greenButton
        />
      </main>
      <Footer />
      <StickyWhatsAppButton />
    </>
  );
}
