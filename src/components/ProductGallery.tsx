"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { detailGallery } from "@/lib/static-data";

type ProductGalleryProps = {
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  title?: string;
};

export function ProductGallery({
  coverImageUrl = "",
  galleryImageUrls = detailGallery,
  title = "Product image",
}: ProductGalleryProps) {
  const images = useMemo(() => getGalleryImages(coverImageUrl, galleryImageUrls), [coverImageUrl, galleryImageUrls]);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const activeImage = images.includes(selectedImage) ? selectedImage : images[0];

  return (
    <section className="px-7 pt-3">
      <div className="mx-auto max-w-screen-md">
        <div className="relative aspect-[1.67/1] overflow-hidden rounded-card border border-novamedix-border bg-white shadow-soft">
          <Image src={activeImage} alt={title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" unoptimized={isRemoteImage(activeImage)} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`Show ${title}`}
              className={`relative aspect-[1.55/1] overflow-hidden rounded-lg border bg-white shadow-soft transition ${activeImage === image ? "border-2 border-novamedix-blue" : "border-novamedix-border"}`}
            >
              <Image src={image} alt={title} fill sizes="(max-width: 768px) 25vw, 180px" className="object-cover" unoptimized={isRemoteImage(image)} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function getGalleryImages(coverImageUrl: string, galleryImageUrls: string[]) {
  const fallbackImage = "/placeholder/detail-main.png";
  const uniqueImages = [coverImageUrl, ...galleryImageUrls]
    .map((image) => image.trim())
    .filter(Boolean)
    .filter((image, index, images) => images.indexOf(image) === index);

  return uniqueImages.length > 0 ? uniqueImages : [fallbackImage];
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}
