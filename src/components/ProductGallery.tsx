import Image from "next/image";
import { detailGallery } from "@/lib/static-data";

type ProductGalleryProps = {
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  title?: string;
};

export function ProductGallery({
  coverImageUrl = "/placeholder/detail-main.png",
  galleryImageUrls = detailGallery,
  title = "Product image",
}: ProductGalleryProps) {
  const gallery = galleryImageUrls.length > 0 ? galleryImageUrls : detailGallery;

  return (
    <section className="px-7 pt-3">
      <div className="mx-auto max-w-screen-md">
        <div className="relative aspect-[1.67/1] overflow-hidden rounded-card border border-novamedix-border bg-white shadow-soft">
          <Image src={coverImageUrl} alt={title} fill priority className="object-cover" unoptimized={isRemoteImage(coverImageUrl)} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {gallery.slice(0, 4).map((image) => (
            <div key={image} className="relative aspect-[1.55/1] overflow-hidden rounded-lg border border-novamedix-border bg-white shadow-soft">
              <Image src={image} alt={title} fill className="object-cover" unoptimized={isRemoteImage(image)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}
