import type { FactoryImage, FeatureItem, ProductCategory } from "@/types";

export const productCategories: ProductCategory[] = [
  {
    name: "Head & Face",
    href: "/products/lower-limb-compression-garment",
    description: "Compression garments for face, chin, neck and head support.",
    image: "/placeholder/cat-head-face.png",
  },
  {
    name: "Torso",
    href: "/products/lower-limb-compression-garment",
    description: "Compression garments for chest, abdomen, waist and upper body support.",
    image: "/placeholder/cat-torso.png",
  },
  {
    name: "Lower Limb",
    href: "/products/lower-limb-compression-garment",
    description: "Compression garments for thigh, leg and full lower-limb support.",
    image: "/placeholder/cat-lower-limb.png",
  },
  {
    name: "Gloves",
    href: "/products/lower-limb-compression-garment",
    description: "Compression gloves for hand and finger coverage.",
    image: "/placeholder/cat-gloves.png",
  },
  {
    name: "Foot Garments",
    href: "/products/lower-limb-compression-garment",
    description: "Compression garments for foot and ankle support.",
    image: "/placeholder/cat-foot.png",
  },
];

export const productListImages = [
  "/placeholder/product-head-face.png",
  "/placeholder/product-torso.png",
  "/placeholder/product-lower-limb.png",
  "/placeholder/product-gloves.png",
  "/placeholder/product-foot.png",
];

export const buyerStrengths: FeatureItem[] = [
  { title: "Factory Direct Supply", icon: "factory" },
  { title: "Ready Styles & Custom Made", icon: "shirt" },
  { title: "OEM / Private Label", icon: "tag" },
  { title: "Global Shipping Support", icon: "globe" },
];

export const factoryImages: FactoryImage[] = [
  { label: "Workshop", image: "/placeholder/factory-workshop.png" },
  { label: "Sewing Process", image: "/placeholder/factory-sewing.png" },
  { label: "Fabric Detail", image: "/placeholder/factory-fabric.png" },
  { label: "Quality Check", image: "/placeholder/factory-quality.png" },
  { label: "Packaging", image: "/placeholder/factory-packaging.png" },
];

export const detailGallery = [
  "/placeholder/detail-thumb-front.png",
  "/placeholder/detail-thumb-side.png",
  "/placeholder/detail-thumb-zip.png",
  "/placeholder/detail-thumb-fabric.png",
];
