"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ProductRow } from "@/types/product";

const bucketName = "product-images";

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

export async function createProductAction(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) redirectWithError("/admin/products/new", "SUPABASE_SERVICE_ROLE_KEY is not configured.");

  let errorMessage = "";

  try {
    const payload = await buildProductPayload(formData);
    const { error } = await supabase.from("products").insert(payload);
    if (error) errorMessage = error.message;
  } catch (error) {
    errorMessage = getErrorMessage(error);
  }

  if (errorMessage) redirectWithError("/admin/products/new", errorMessage);

  redirect("/admin/products");
}

export async function updateProductAction(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const id = Number(formData.get("id"));

  if (!supabase) redirectWithError(`/admin/products/${id}/edit`, "SUPABASE_SERVICE_ROLE_KEY is not configured.");

  let errorMessage = "";

  try {
    const payload = await buildProductPayload(formData);
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) errorMessage = error.message;
  } catch (error) {
    errorMessage = getErrorMessage(error);
  }

  if (errorMessage) redirectWithError(`/admin/products/${id}/edit`, errorMessage);

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
  const coverImageUrl = await uploadSingleImage(formData.get("cover_image"));
  const galleryUploadUrls = await uploadMultipleImages(formData.getAll("gallery_images"));
  const existingGallery = parseLines(formData.get("gallery_image_urls"));

  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    category: getString(formData, "category"),
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
    sort_order: Number(formData.get("sort_order") || 0),
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
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) throw new Error(error.message);

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

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Product could not be saved. Please check the form and try again.";
}
