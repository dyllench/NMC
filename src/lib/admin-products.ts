"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ProductRow } from "@/types/product";

const bucketName = "product-images";
const categoryValues = ["head-face", "torso", "lower-limb", "gloves", "foot-garments"] as const;

export type ProductFormState = {
  error?: string;
};

export async function getAdminProducts() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as ProductRow[];
}

export async function getAdminProductById(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) throw new Error(error.message);
  return data as ProductRow;
}

export async function createProductAction(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return withFormError("SUPABASE_SERVICE_ROLE_KEY is not configured.");

  try {
    const payload = await buildProductPayload(formData);
    const { error } = await supabase.from("products").insert(payload);
    if (error) return withFormError(`Product could not be created: ${error.message}`);
  } catch (error) {
    return withFormError(getErrorMessage(error));
  }

  redirect("/admin/products");
}

export async function updateProductAction(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const supabase = getSupabaseAdmin();
  const id = Number(formData.get("id"));

  if (!Number.isFinite(id)) return withFormError("Product id is invalid.");
  if (!supabase) return withFormError("SUPABASE_SERVICE_ROLE_KEY is not configured.");

  try {
    const payload = await buildProductPayload(formData);
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) return withFormError(`Product could not be updated: ${error.message}`);
  } catch (error) {
    return withFormError(getErrorMessage(error));
  }

  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const id = Number(formData.get("id"));
  if (!supabase) redirectWithError("/admin/products", "SUPABASE_SERVICE_ROLE_KEY is not configured.");

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) redirectWithError("/admin/products", error.message);
  redirect("/admin/products");
}

async function buildProductPayload(formData: FormData) {
  const title = getString(formData, "title");
  const slug = getString(formData, "slug");
  const category = getString(formData, "category");

  if (!title) throw new Error("Title is required.");
  if (!slug) throw new Error("Slug is required.");
  if (!categoryValues.includes(category as (typeof categoryValues)[number])) {
    throw new Error("Category is invalid.");
  }

  const coverImageUrl = await uploadSingleImage(formData.get("cover_image"));
  const galleryUploadUrls = await uploadMultipleImages(formData.getAll("gallery_images"));
  const existingGallery = parseLines(formData.get("gallery_image_urls"));

  return {
    title,
    slug,
    category,
    subtitle: getString(formData, "subtitle"),
    short_description: getString(formData, "short_description"),
    overview: getString(formData, "overview"),
    cover_image_url: coverImageUrl || getString(formData, "cover_image_url"),
    gallery_image_urls: [...existingGallery, ...galleryUploadUrls],
    tags: parseLines(formData.get("tags")),
    features: parseLines(formData.get("features")),
    applications: parseLines(formData.get("applications")),
    custom_steps: parseLines(formData.get("custom_steps")),
    order_info: parseLines(formData.get("order_info")),
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
    sort_order: parseInteger(formData.get("sort_order")),
  };
}

async function uploadSingleImage(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return "";
  return uploadImage(value);
}

async function uploadMultipleImages(values: FormDataEntryValue[]) {
  const urls: string[] = [];

  for (const value of values) {
    if (value instanceof File && value.size > 0) {
      urls.push(await uploadImage(value));
    }
  }

  return urls;
}

async function uploadImage(file: File) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin client is not configured.");

  const extension = file.name.split(".").pop() || "jpg";
  const path = `products/${Date.now()}-${randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(bucketName).upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function parseLines(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseInteger(value: FormDataEntryValue | null) {
  const parsed = Number(String(value || "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Product could not be saved. Please check the form and try again.";
}

function withFormError(error: string): ProductFormState {
  return { error };
}
