export type Product = {
  id: number | string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  overview: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  tags: string[];
  features: string[];
  applications: string[];
  customSteps: string[];
  orderInfo: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
};

export type ProductRow = {
  id: number;
  slug: string;
  category: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  overview: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  tags: string[] | null;
  features: string[] | null;
  applications: string[] | null;
  custom_steps: string[] | null;
  order_info: string[] | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  sort_order: number | null;
};
