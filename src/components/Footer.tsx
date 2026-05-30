import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-screen-xl px-7 pb-20 pt-5">
      <div className="grid gap-8 rounded-t-2xl bg-white md:grid-cols-[1.3fr_0.8fr_1.2fr]">
        <div>
          <div className="text-2xl font-bold text-novamedix-blue">
            NovaMedix <span className="text-novamedix-teal">Custom</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-700">
            Factory-direct compression garment manufacturer providing ready styles,
            custom-made service and OEM solutions for global buyers, clinics,
            distributors and wholesalers.
          </p>
        </div>
        <div>
          <h3 className="text-base font-bold text-navy">Quick Links</h3>
          <nav className="mt-3 grid gap-1 text-sm text-slate-700">
            <Link href="/"><LocalizedText k="home">Home</LocalizedText></Link>
            <Link href="/products"><LocalizedText k="products">Products</LocalizedText></Link>
            <Link href="/products/lower-limb-compression-garment">Custom Service</Link>
            <Link href="/about"><LocalizedText k="aboutUs">About Us</LocalizedText></Link>
            <Link href="mailto:info@novamedixcustom.com">Contact</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-base font-bold text-navy"><LocalizedText k="contactUs">Contact Us</LocalizedText></h3>
          <div className="mt-3 grid gap-3 text-sm text-slate-700">
            <p className="flex items-center gap-3"><Icon name="mail" className="h-5 w-5 text-navy" /> info@novamedixcustom.com</p>
            <p className="flex items-center gap-3"><Icon name="whatsapp" className="h-5 w-5 text-novamedix-whatsapp-green" /> WhatsApp: +86 189 0222 1129</p>
            <p className="flex items-center gap-3"><Icon name="globe" className="h-5 w-5 text-navy" /> WeChat: novamedixcustom</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
