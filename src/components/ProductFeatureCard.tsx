import { Icon } from "@/components/Icon";

export function ProductFeatureCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="grid min-h-20 place-items-center rounded-lg border border-novamedix-border bg-white px-2 py-3 text-center shadow-soft">
      <Icon name={icon} className="h-9 w-9 text-novamedix-blue" />
      <p className="mt-2 text-xs font-semibold leading-tight text-navy">{title}</p>
    </div>
  );
}
