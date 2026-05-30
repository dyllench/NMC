import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "nmc_admin_session";

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

export function verifyAdminPasswordValue(submittedPassword: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  return safeEqual(hashPassword(submittedPassword), hashPassword(password));
}

export function getAdminSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  return password ? hashPassword(password) : "";
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  };
}

export function hashPassword(value: string) {
  return createHash("sha256").update(`nmc-admin:${value}`).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}
