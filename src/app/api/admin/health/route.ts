import { NextResponse } from "next/server";
import { getAdminAuthState } from "@/lib/admin-auth";
import { getMissingSupabaseAdminEnvNames, getSupabaseAdmin } from "@/lib/supabase/admin";

const bucketName = "product-images";

export async function GET() {
  const auth = await getAdminAuthState();

  if (!auth.isConfigured) {
    return NextResponse.json(
      {
        ok: false,
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
      env: getEnvStatus(),
      productsTable: { ok: false, message: "Supabase admin client is not configured." },
      storageBucket: { ok: false, bucket: bucketName, message: "Supabase admin client is not configured." },
      missingSupabaseEnvNames,
    });
  }

  const productsTable = await checkProductsTable(supabase);
  const storageBucket = await checkStorageBucket(supabase);

  return NextResponse.json({
    ok: productsTable.ok && storageBucket.ok,
    env: getEnvStatus(),
    productsTable,
    storageBucket,
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
