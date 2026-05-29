import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/types";

export function ProductCategoryCard({ category }: { category: ProductCategory }) {
  return (
    <Link href={category.href} className="group overflow-hidden rounded-card border border-novamedix-border bg-white shadow-soft">
      <div className="relative aspect-[1.18/1] bg-novamedix-light-gray">
        <Image src={category.image} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="-mt-9 mx-1.5 relative rounded-lg bg-white px-3 py-3 text-center text-base font-bold text-navy shadow-soft">
        {category.name}
      </div>
    </Link>
  );
}
