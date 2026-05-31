import { supabase } from "@/lib/supabase/client";
import type { Product, ProductRow } from "@/types/product";

const defaultFeatures = [
  "Comfortable elastic fabric",
  "Smooth stitching",
  "Custom sizing support",
  "Ready styles available",
  "OEM / private label support",
];

const defaultApplications = [
  "Recovery support",
  "Compression use",
  "Clinic supply",
  "Distributor / wholesale",
  "OEM projects",
];

const defaultCustomSteps = [
  "Choose product type",
  "Send basic measurements",
  "Confirm and produce",
];

const defaultOrderInfo = [
  "Ready styles available",
  "Custom-made support",
  "OEM / private label available",
  "Lead time depends on quantity",
];

const placeholderByCategory: Record<string, string> = {
  "head-face": "/placeholder/product-head-face.png",
  torso: "/placeholder/product-torso.png",
  "lower-limb": "/placeholder/detail-main.png",
  gloves: "/placeholder/product-gloves.png",
  "foot-garments": "/placeholder/product-foot.png",
};

const galleryByCategory: Record<string, string[]> = {
  "head-face": ["/placeholder/product-head-face.png", "/placeholder/cat-head-face.png"],
  torso: ["/placeholder/product-torso.png", "/placeholder/cat-torso.png"],
  "lower-limb": [
    "/placeholder/detail-thumb-front.png",
    "/placeholder/detail-thumb-side.png",
    "/placeholder/detail-thumb-zip.png",
    "/placeholder/detail-thumb-fabric.png",
  ],
  gloves: ["/placeholder/product-gloves.png", "/placeholder/cat-gloves.png"],
  "foot-garments": ["/placeholder/product-foot.png", "/placeholder/cat-foot.png"],
};

const productSelectFields =
  "id, slug, category, title, subtitle, short_description, overview, cover_image_url, gallery_image_urls, tags, features, applications, custom_steps, order_info, is_featured, is_published, sort_order, created_at, updated_at";

const fallbackProducts: Product[] = [
  {
    id: "fallback-head-face",
    slug: "head-face-compression-garment",
    category: "head-face",
    title: "Head & Face Compression Garment",
    subtitle: "Ready styles and custom support for head, chin, neck and face coverage.",
    shortDescription: "Compression garments for face, chin, neck and head support.",
    overview:
      "Designed for B2B buyers looking for head and face compression garment solutions with ready styles, custom sizing support and private label options.",
    coverImageUrl: placeholderByCategory["head-face"],
    galleryImageUrls: galleryByCategory["head-face"],
    tags: ["Ready Style", "Custom Available", "OEM"],
    features: defaultFeatures,
    applications: defaultApplications,
    customSteps: ["Choose product type", "Send basic measurements", "Confirm details"],
    orderInfo: defaultOrderInfo,
    isFeatured: false,
    isPublished: true,
    sortOrder: 10,
  },
  {
    id: "fallback-torso",
    slug: "torso-compression-garment",
    category: "torso",
    title: "Torso Compression Garment",
    subtitle: "Compression garment options for chest, abdomen, waist and upper body support.",
    shortDescription: "Compression garments for chest, abdomen, waist and upper body support.",
    overview:
      "A torso compression garment category for buyers who need ready styles, flexible sizing, wholesale supply and brand customization support.",
    coverImageUrl: placeholderByCategory.torso,
    galleryImageUrls: galleryByCategory.torso,
    tags: ["Ready Style", "Custom Available", "OEM"],
    features: defaultFeatures,
    applications: defaultApplications,
    customSteps: ["Choose product type", "Send body measurements", "Confirm details"],
    orderInfo: defaultOrderInfo,
    isFeatured: false,
    isPublished: true,
    sortOrder: 20,
  },
  {
    id: "fallback-lower-limb",
    slug: "lower-limb-compression-garment",
    category: "lower-limb",
    title: "Lower Limb Compression Garment",
    subtitle: "Factory direct compression garment solution with ready styles, custom sizing and OEM support.",
    shortDescription: "Compression garments for thigh, leg and full lower-limb support.",
    overview:
      "This product is designed for buyers looking for lower-limb compression garment solutions. Ready styles and simple custom-made options are available.",
    coverImageUrl: placeholderByCategory["lower-limb"],
    galleryImageUrls: galleryByCategory["lower-limb"],
    tags: ["Factory Direct", "Custom Available", "OEM Support", "Global Shipping"],
    features: defaultFeatures,
    applications: defaultApplications,
    customSteps: defaultCustomSteps,
    orderInfo: defaultOrderInfo,
    isFeatured: true,
    isPublished: true,
    sortOrder: 30,
  },
  {
    id: "fallback-gloves",
    slug: "compression-gloves",
    category: "gloves",
    title: "Compression Gloves",
    subtitle: "Compression glove options for hand and finger coverage.",
    shortDescription: "Compression gloves for hand and finger coverage.",
    overview:
      "A practical compression glove category for B2B buyers needing ready styles, custom sizing support and private label cooperation.",
    coverImageUrl: placeholderByCategory.gloves,
    galleryImageUrls: galleryByCategory.gloves,
    tags: ["Ready Style", "Custom Available", "OEM"],
    features: defaultFeatures,
    applications: defaultApplications,
    customSteps: ["Choose product type", "Send hand measurements", "Confirm details"],
    orderInfo: defaultOrderInfo,
    isFeatured: false,
    isPublished: true,
    sortOrder: 40,
  },
  {
    id: "fallback-foot",
    slug: "foot-compression-garment",
    category: "foot-garments",
    title: "Foot Compression Garment",
    subtitle: "Compression garment options for foot and ankle support.",
    shortDescription: "Compression garments for foot and ankle support.",
    overview:
      "A foot garment category for buyers who need ready styles, custom size support, export packaging and stable factory cooperation.",
    coverImageUrl: placeholderByCategory["foot-garments"],
    galleryImageUrls: galleryByCategory["foot-garments"],
    tags: ["Ready Style", "Custom Available", "OEM"],
    features: defaultFeatures,
    applications: defaultApplications,
    customSteps: ["Choose product type", "Send foot measurements", "Confirm details"],
    orderInfo: defaultOrderInfo,
    isFeatured: false,
    isPublished: true,
    sortOrder: 50,
  },
];

export async function getPublishedProducts() {
  const products = await fetchProducts();
  return products.length > 0 ? products : fallbackProducts;
}

export async function getFeaturedProducts() {
  const products = await getPublishedProducts();
  const featured = products.filter((product) => product.isFeatured);
  return featured.length > 0 ? featured : products.slice(0, 1);
}

export async function getProductsByCategory(category: string) {
  const products = await getPublishedProducts();
  return products.filter((product) => product.category === category);
}

export async function getProductBySlug(slug: string) {
  if (!supabase) return getFallbackProductBySlug(slug);

  const { data, error } = await supabase
    .from("products")
    .select(productSelectFields)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) return getFallbackProductBySlug(slug);

  return mapProductRow(data as ProductRow);
}

function getPlaceholderForCategory(category: string) {
  return placeholderByCategory[category] || "/placeholder/detail-main.png";
}

function getGalleryForCategory(category: string) {
  return galleryByCategory[category] || [getPlaceholderForCategory(category)];
}

async function fetchProducts() {
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from("products")
    .select(productSelectFields)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return fallbackProducts;

  return data.map(mapProductRow);
}

function mapProductRow(row: ProductRow): Product {
  const coverImageUrl = getImageUrl(row.cover_image_url, getPlaceholderForCategory(row.category));
  const galleryUrls = nonEmptyArray(row.gallery_image_urls, []);
  const galleryImageUrls = galleryUrls.length > 0 ? galleryUrls : getGalleryForCategory(row.category);

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title || "Compression Garment",
    subtitle: row.subtitle || "Factory direct compression garment solution with ready styles, custom sizing and OEM support.",
    shortDescription: row.short_description || "Compression garment options for B2B buyers and OEM cooperation.",
    overview:
      row.overview ||
      "This product is designed for buyers looking for compression garment solutions. Ready styles and simple custom-made options are available.",
    coverImageUrl,
    galleryImageUrls,
    tags: nonEmptyArray(row.tags, ["Ready Style", "Custom Available", "OEM"]),
    features: nonEmptyArray(row.features, defaultFeatures),
    applications: nonEmptyArray(row.applications, defaultApplications),
    customSteps: nonEmptyArray(row.custom_steps, defaultCustomSteps),
    orderInfo: nonEmptyArray(row.order_info, defaultOrderInfo),
    isFeatured: row.is_featured ?? false,
    isPublished: row.is_published ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

function nonEmptyArray(value: string[] | null, fallback: string[]) {
  const cleaned = value?.map((item) => item.trim()).filter(Boolean) || [];
  return cleaned.length > 0 ? cleaned : fallback;
}

function getImageUrl(value: string | null, fallback: string) {
  const cleaned = value?.trim();
  return cleaned || fallback;
}

function getFallbackProductBySlug(slug: string) {
  return fallbackProducts.find((product) => product.slug === slug) || fallbackProducts[0];
}
