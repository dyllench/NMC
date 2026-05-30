import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminAuthState } from "@/lib/admin-auth";
import { getMissingSupabaseAdminEnvNames, getSupabaseAdmin } from "@/lib/supabase/admin";

const bucketName = "product-images";
const adminUploadFixVersion = "admin-upload-fix-2026-05-31-v2";

export async function GET(request: Request) {
  const auth = await getAdminAuthState();

  if (!auth.isConfigured) {
    return NextResponse.json(
      {
        ok: false,
        version: adminUploadFixVersion,
        latestAdminUploadFixVersion: adminUploadFixVersion,
        environment: process.env.NODE_ENV,
        env: getEnvStatus(),
        message: "Admin password is not configured.",
      },
      { status: 500 },
    );
  }

  if (!auth.isAuthenticated) {
    return NextResponse.json(
      {
        ok: false,
        version: adminUploadFixVersion,
        latestAdminUploadFixVersion: adminUploadFixVersion,
        environment: process.env.NODE_ENV,
        env: getEnvStatus(),
        message: "Admin login is required.",
      },
      { status: 401 },
    );
  }

  const supabase = getSupabaseAdmin();
  const missingSupabaseEnvNames = getMissingSupabaseAdminEnvNames();

  if (!supabase) {
    return NextResponse.json({
      ok: false,
      version: adminUploadFixVersion,
      latestAdminUploadFixVersion: adminUploadFixVersion,
      environment: process.env.NODE_ENV,
      env: getEnvStatus(),
      productsTable: { ok: false, message: "Supabase admin client is not configured." },
      storageBucket: { ok: false, bucket: bucketName, message: "Supabase admin client is not configured." },
      missingSupabaseEnvNames,
    });
  }

  const productsTable = await checkProductsTable(supabase);
  const storageBucket = await checkStorageBucket(supabase);
  const url = new URL(request.url);
  const writeSmoke = url.searchParams.get("writeSmoke") === "1" ? await runWriteSmoke(supabase) : null;

  return NextResponse.json({
    ok: productsTable.ok && storageBucket.ok && (writeSmoke ? writeSmoke.ok : true),
    version: adminUploadFixVersion,
    latestAdminUploadFixVersion: adminUploadFixVersion,
    environment: process.env.NODE_ENV,
    env: getEnvStatus(),
    productsTable,
    storageBucket,
    writeSmoke,
  });
}

function getEnvStatus() {
  return {
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

async function checkProductsTable(supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>) {
  const { error } = await supabase.from("products").select("id", { count: "exact", head: true });

  if (error) {
    return {
      ok: false,
      message: error.message,
      code: error.code || null,
    };
  }

  return {
    ok: true,
    message: "Products table query succeeded.",
  };
}

async function checkStorageBucket(supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>) {
  const { error } = await supabase.storage.getBucket(bucketName);

  if (error) {
    return {
      ok: false,
      bucket: bucketName,
      message: error.message,
      code: "statusCode" in error ? error.statusCode : null,
    };
  }

  return {
    ok: true,
    bucket: bucketName,
    message: "Storage bucket access succeeded.",
  };
}

async function runWriteSmoke(supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>) {
  const smokeId = `${Date.now()}-${randomUUID()}`;
  const coverPath = `products/smoke-cover-${smokeId}.png`;
  const galleryPath = `products/smoke-gallery-${smokeId}.png`;
  const slug = `health-write-smoke-${smokeId}`;
  const uploadedPaths: string[] = [];

  try {
    const imageBytes = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
      "base64",
    );
    const coverUpload = await supabase.storage.from(bucketName).upload(coverPath, imageBytes, {
      contentType: "image/png",
      upsert: false,
    });

    if (coverUpload.error) {
      return {
        ok: false,
        step: "cover-upload",
        message: coverUpload.error.message,
        code: "statusCode" in coverUpload.error ? coverUpload.error.statusCode : null,
      };
    }
    uploadedPaths.push(coverPath);

    const galleryUpload = await supabase.storage.from(bucketName).upload(galleryPath, imageBytes, {
      contentType: "image/png",
      upsert: false,
    });

    if (galleryUpload.error) {
      return {
        ok: false,
        step: "gallery-upload",
        message: galleryUpload.error.message,
        code: "statusCode" in galleryUpload.error ? galleryUpload.error.statusCode : null,
      };
    }
    uploadedPaths.push(galleryPath);

    const coverUrl = supabase.storage.from(bucketName).getPublicUrl(coverPath).data.publicUrl;
    const galleryUrl = supabase.storage.from(bucketName).getPublicUrl(galleryPath).data.publicUrl;
    const insert = await supabase.from("products").insert({
      slug,
      category: "lower-limb",
      title: "Health Write Smoke",
      subtitle: "",
      short_description: "",
      overview: "",
      cover_image_url: coverUrl,
      gallery_image_urls: [galleryUrl],
      tags: [],
      features: [],
      applications: [],
      custom_steps: [],
      order_info: [],
      is_featured: false,
      is_published: false,
      sort_order: 0,
    });

    if (insert.error) {
      return {
        ok: false,
        step: "product-insert",
        message: insert.error.message,
        code: insert.error.code || null,
      };
    }

    return {
      ok: true,
      coverUpload: true,
      galleryUpload: true,
      productInsert: true,
      cleanup: await cleanupWriteSmoke(supabase, slug, uploadedPaths),
    };
  } finally {
    await cleanupWriteSmoke(supabase, slug, uploadedPaths);
  }
}

async function cleanupWriteSmoke(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  slug: string,
  paths: string[],
) {
  const productDelete = await supabase.from("products").delete().eq("slug", slug);
  const storageDelete = paths.length > 0 ? await supabase.storage.from(bucketName).remove(paths) : { error: null };

  return {
    product: !productDelete.error,
    storage: !storageDelete.error,
  };
}
