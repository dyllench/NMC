import Image from "next/image";
import { factoryImages } from "@/lib/static-data";

export function FactoryImageGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {factoryImages.map((item) => (
        <div key={item.label} className="relative overflow-hidden rounded-lg shadow-soft">
          <div className="relative aspect-[1.18/0.9]">
            <Image src={item.image} alt="" fill className="object-cover" />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-3 pb-2 pt-8 text-center text-sm font-bold text-white">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
