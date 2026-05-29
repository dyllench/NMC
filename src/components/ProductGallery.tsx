import Image from "next/image";
import { detailGallery } from "@/lib/static-data";

export function ProductGallery() {
  return (
    <section className="px-7 pt-3">
      <div className="mx-auto max-w-screen-md">
        <div className="relative aspect-[1.67/1] overflow-hidden rounded-card border border-novamedix-border bg-white shadow-soft">
          <Image src="/placeholder/detail-main.png" alt="" fill priority className="object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {detailGallery.map((image) => (
            <div key={image} className="relative aspect-[1.55/1] overflow-hidden rounded-lg border border-novamedix-border bg-white shadow-soft">
              <Image src={image} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
