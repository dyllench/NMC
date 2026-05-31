"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getMissingSupabaseAdminEnvNames, getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ProductRow } from "@/types/product";

const bucketName = "product-images";
const categoryValues = ["head-face", "torso", "lower-limb", "gloves", "foot-garments"] as const;

export type ProductFormState = {
  error?: string;
};

export type ProductMutationResult = {
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
  const result = await createProductFromFormData(formData);
  if (result.error) return withFormError(result.error);

  redirect("/admin/products");
}

export async function createProductFromFormData(formData: FormData): Promise<ProductMutationResult> {
  const supabase = getSupabaseAdmin();
  const missingEnvNames = getMissingSupabaseAdminEnvNames();
  if (!supabase) {
    logAdminProductEvent("product_create_missing_env", { missingEnvNames });
    return { error: `Product save failed: ${missingEnvNames.join(", ")} is not configured.` };
  }

  try {
    const payload = await buildProductPayload(formData);
    logAdminProductEvent("product_create_insert_start", {
      payloadFieldNames: Object.keys(payload),
      slug: payload.slug,
      category: payload.category,
    });

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select("id, category, cover_image_url, gallery_image_urls")
      .single();

    if (error) {
      logAdminProductEvent("product_create_insert_error", {
        supabaseError: toSupabaseErrorLog(error),
        payloadFieldNames: Object.keys(payload),
        slug: payload.slug,
        category: payload.category,
      });

      return { error: `Product save failed: ${formatSupabaseError(error)}` };
    }

    logAdminProductEvent("product_create_insert_success", {
      savedProductId: data?.id,
      savedCategory: data?.category,
      savedCoverImageUrlExists: Boolean(data?.cover_image_url),
      savedGalleryImageCount: data?.gallery_image_urls?.length || 0,
      payloadFieldNames: Object.keys(payload),
      slug: payload.slug,
      category: payload.category,
    });
  } catch (error) {
    logAdminProductEvent("product_create_unexpected_error", {
      error: toUnknownErrorLog(error),
      fieldNames: getFormFieldNames(formData),
    });

    return { error: `Product save failed: ${getErrorMessage(error)}` };
  }

  return {};
}

export async function updateProductAction(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const result = await updateProductFromFormData(formData);
  if (result.error) return withFormError(result.error);

  redirect("/admin/products");
}

export async function updateProductFromFormData(formData: FormData): Promise<ProductMutationResult> {
  const supabase = getSupabaseAdmin();
  const id = Number(formData.get("id"));

  if (!Number.isFinite(id)) return { error: "Product id is invalid." };
  if (!supabase) {
    const missingEnvNames = getMissingSupabaseAdminEnvNames();
    logAdminProductEvent("product_update_missing_env", { missingEnvNames, productId: id });
    return { error: `Product save failed: ${missingEnvNames.join(", ")} is not configured.` };
  }

  try {
    const payload = await buildProductPayload(formData);
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select("id, category, cover_image_url, gallery_image_urls")
      .single();

    if (error) {
      logAdminProductEvent("product_update_error", {
        productId: id,
        supabaseError: toSupabaseErrorLog(error),
        payloadFieldNames: Object.keys(payload),
      });

      return { error: `Product save failed: ${formatSupabaseError(error)}` };
    }

    logAdminProductEvent("product_update_success", {
      savedProductId: data?.id,
      savedCategory: data?.category,
      savedCoverImageUrlExists: Boolean(data?.cover_image_url),
      savedGalleryImageCount: data?.gallery_image_urls?.length || 0,
      payloadFieldNames: Object.keys(payload),
    });
  } catch (error) {
    logAdminProductEvent("product_update_unexpected_error", {
      productId: id,
      error: toUnknownErrorLog(error),
      fieldNames: getFormFieldNames(formData),
    });

    return { error: `Product save failed: ${getErrorMessage(error)}` };
  }

  return {};
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

  const extension = getSafeExtension(file.name);
  const path = `products/${Date.now()}-${randomUUID()}.${extension}`;
  const contentType = file.type || "image/jpeg";
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  logAdminProductEvent("product_image_upload_start", {
    bucket: bucketName,
    path,
    file: {
      name: file.name,
      size: file.size,
      type: contentType,
    },
  });

  const { error } = await supabase.storage.from(bucketName).upload(path, fileBuffer, {
    contentType,
    upsert: false,
  });

  if (error) {
    logAdminProductEvent("product_image_upload_error", {
      bucket: bucketName,
      path,
      file: {
        name: file.name,
        size: file.size,
        type: contentType,
      },
      supabaseError: toSupabaseErrorLog(error),
    });

    throw new Error(`Image upload failed: ${formatSupabaseError(error)}`);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  logAdminProductEvent("product_image_upload_success", {
    bucket: bucketName,
    path,
    file: {
      name: file.name,
      size: file.size,
      type: contentType,
    },
  });

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

function getSafeExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return extension || "jpg";
}

function getFormFieldNames(formData: FormData) {
  return Array.from(new Set(Array.from(formData.keys()).filter((key) => !key.startsWith("$ACTION"))));
}

function formatSupabaseError(error: unknown) {
  const maybeError = error as { code?: string; message?: string };
  const message = maybeError.message || "Unknown Supabase error.";
  return maybeError.code ? `${message} (${maybeError.code})` : message;
}

function toSupabaseErrorLog(error: unknown) {
  const maybeError = error as { code?: string; message?: string; name?: string; statusCode?: string | number };

  return {
    code: maybeError.code || maybeError.statusCode || null,
    message: maybeError.message || "Unknown Supabase error.",
    name: maybeError.name || null,
  };
}

function toUnknownErrorLog(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return {
    name: null,
    message: "Unknown error.",
  };
}

function logAdminProductEvent(operation: string, details: Record<string, unknown>) {
  const payload = JSON.stringify({
    scope: "admin_products",
    operation,
    ...details,
  });

  if (operation.includes("_error") || operation.includes("_missing_env")) {
    console.error(payload);
    return;
  }

  console.info(payload);
}
