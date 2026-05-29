import { Icon } from "@/components/Icon";

type CTASectionProps = {
  title: string;
  text: string;
  buttonText?: string;
  greenButton?: boolean;
};

export function CTASection({ title, text, buttonText = "WhatsApp Inquiry", greenButton = false }: CTASectionProps) {
  return (
    <section className="mx-auto w-[calc(100%-42px)] max-w-screen-xl rounded-card bg-[linear-gradient(135deg,#0b66dd,#0058d6)] px-8 py-6 text-white shadow-card">
      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
          <p className="mt-1 max-w-xl text-base leading-6 text-white/95">{text}</p>
        </div>
        <a
          href="https://wa.me/8618902221129"
          className={`flex h-14 min-w-64 items-center justify-center gap-3 rounded-lg px-6 text-lg font-bold shadow-soft ${greenButton ? "bg-novamedix-whatsapp-green text-white" : "bg-white text-novamedix-blue"}`}
        >
          <Icon name="whatsapp" className="h-7 w-7" />
          {buttonText}
        </a>
      </div>
    </section>
  );
}
