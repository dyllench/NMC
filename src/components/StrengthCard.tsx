import { Icon } from "@/components/Icon";
import type { FeatureItem } from "@/types";

export function StrengthCard({ item, horizontal = false }: { item: FeatureItem; horizontal?: boolean }) {
  return (
    <div className={`rounded-card border border-novamedix-border bg-white shadow-soft ${horizontal ? "flex items-center gap-6 px-8 py-5" : "grid place-items-center gap-3 px-4 py-6 text-center"}`}>
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f1f5fb] text-novamedix-blue">
        <Icon name={item.icon} className="h-9 w-9" />
      </div>
      <h3 className="max-w-40 text-base font-bold leading-tight text-navy">{item.title}</h3>
    </div>
  );
}
