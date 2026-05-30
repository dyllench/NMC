"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminCookieName = "nmc_admin_session";

export type AdminAuthState = {
  isConfigured: boolean;
  isAuthenticated: boolean;
};

export async function getAdminAuthState(): Promise<AdminAuthState> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return {
      isConfigured: false,
      isAuthenticated: false,
    };
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(adminCookieName)?.value;

  return {
    isConfigured: true,
    isAuthenticated: Boolean(cookieValue && safeEqual(cookieValue, hashPassword(password))),
  };
}

export async function verifyAdminPassword(formData: FormData) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return;

  const submittedPassword = String(formData.get("password") || "");

  if (!safeEqual(hashPassword(submittedPassword), hashPassword(password))) {
    redirect("/admin/products?error=invalid-password");
  }

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, hashPassword(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin/products");
}

function hashPassword(value: string) {
  return createHash("sha256").update(`nmc-admin:${value}`).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}
