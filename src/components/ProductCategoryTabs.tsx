"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { LocalizedText } from "@/components/LocalizedText";
import { isProductCategoryValue, productCategoryOptions } from "@/lib/product-categories";
import type { Product } from "@/types/product";

export function ProductCategoryTabs({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const activeCategory = isProductCategoryValue(categoryParam) ? categoryParam : "head-face";
  const visibleProducts = products.filter((product) => product.category === activeCategory);

  function handleCategoryClick(category: string) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("category", category);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }

  return (
    <>
      <section className="mx-auto max-w-screen-xl text-center">
        <h1 className="text-5xl font-bold leading-tight text-navy">
          <LocalizedText k="compressionGarmentCategories">Compression Garment Categories</LocalizedText>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-2xl leading-8 text-slate-600">
          <LocalizedText k="productsIntro">Explore our ready styles and custom-made options for global buyers.</LocalizedText>
        </p>
        <div className="mt-7 grid grid-cols-2 gap-4 min-[760px]:grid-cols-5">
          {productCategoryOptions.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryClick(category.value)}
              className={`h-14 rounded-lg border text-xl font-semibold ${activeCategory === category.value ? "border-novamedix-blue bg-novamedix-blue text-white shadow-soft" : "border-novamedix-border bg-white text-slate-700"}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-5 grid max-w-screen-xl gap-3">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => <ProductListItem key={product.slug} product={product} />)
        ) : (
          <div className="rounded-card border border-novamedix-border bg-white p-8 text-center text-lg font-semibold text-slate-600 shadow-soft">
            No products in this category yet.
          </div>
        )}
      </section>
    </>
  );
}

function ProductListItem({ product }: { product: Product }) {
  return (
    <article className="grid grid-cols-[34%_1fr] gap-5 rounded-card border border-novamedix-border bg-white p-0 shadow-soft md:grid-cols-[260px_1fr_280px] md:items-center">
      <div className="relative min-h-44 overflow-hidden rounded-l-card bg-novamedix-light-gray md:min-h-44">
        <Image src={product.coverImageUrl} alt={product.title} fill sizes="(max-width: 768px) 34vw, 260px" className="object-cover" unoptimized={isRemoteImage(product.coverImageUrl)} />
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
  );
}

function getDisplayTitle(title: string) {
  return title.replace(" Compression Garment", "").replace("Compression Gloves", "Gloves").replace("Foot Compression Garment", "Foot Garments");
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}
