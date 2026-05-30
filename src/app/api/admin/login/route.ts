import { NextResponse } from "next/server";
import {
  adminCookieName,
  getAdminCookieOptions,
  getAdminSessionValue,
  verifyAdminPasswordValue,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Admin password is not configured." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");

  if (!verifyAdminPasswordValue(password)) {
    return NextResponse.json(
      { ok: false, message: "Invalid password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, getAdminSessionValue(), getAdminCookieOptions());

  return response;
}
