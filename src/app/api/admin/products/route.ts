import { NextResponse } from "next/server";
import { createProductFromFormData, updateProductFromFormData } from "@/lib/admin-products";
import { getAdminAuthState } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const authError = await getAuthError();
  if (authError) return authError;

  const formData = await request.formData();
  const result = await createProductFromFormData(formData);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const authError = await getAuthError();
  if (authError) return authError;

  const formData = await request.formData();
  const result = await updateProductFromFormData(formData);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

async function getAuthError() {
  const auth = await getAdminAuthState();

  if (!auth.isConfigured) {
    return NextResponse.json({ ok: false, message: "Admin password is not configured." }, { status: 500 });
  }

  if (!auth.isAuthenticated) {
    return NextResponse.json({ ok: false, message: "Admin login is required." }, { status: 401 });
  }

  return null;
}
