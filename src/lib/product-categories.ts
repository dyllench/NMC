export const productCategoryOptions = [
  { value: "head-face", label: "Head & Face" },
  { value: "torso", label: "Torso" },
  { value: "lower-limb", label: "Lower Limb" },
  { value: "gloves", label: "Gloves" },
  { value: "foot-garments", label: "Foot Garments" },
] as const;

export type ProductCategoryValue = (typeof productCategoryOptions)[number]["value"];

export function isProductCategoryValue(value: string): value is ProductCategoryValue {
  return productCategoryOptions.some((category) => category.value === value);
}
