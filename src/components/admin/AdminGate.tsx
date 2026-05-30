import Link from "next/link";
import { verifyAdminPassword } from "@/lib/admin-auth";

type AdminGateProps = {
  error?: string;
};

export function AdminNotConfigured() {
  return (
    <AdminShell title="Admin">
      <div className="rounded-card border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-soft">
        Admin password is not configured.
      </div>
    </AdminShell>
  );
}

export function SupabaseAdminNotConfigured({ message }: { message: string }) {
  return (
    <AdminShell title="Admin">
      <div className="rounded-card border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-soft">
        {message}
      </div>
    </AdminShell>
  );
}

export function AdminLogin({ error }: AdminGateProps) {
  return (
    <AdminShell title="Product Admin">
      <form action={verifyAdminPassword} className="max-w-md rounded-card border border-novamedix-border bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold text-navy">Admin Login</h2>
        <p className="mt-2 text-sm text-slate-600">Enter the admin password to manage products.</p>
        {error === "invalid-password" ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Invalid password.
          </p>
        ) : null}
        <label className="mt-5 block text-sm font-bold text-navy" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-2 h-11 w-full rounded-lg border border-novamedix-border px-3 outline-none focus:border-novamedix-blue"
          required
        />
        <button className="mt-5 h-11 rounded-lg bg-novamedix-blue px-5 text-base font-bold text-white" type="submit">
          Enter Admin
        </button>
      </form>
    </AdminShell>
  );
}

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f7faff] px-5 py-6 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-card bg-white px-5 py-4 shadow-soft">
          <Link href="/" className="text-2xl font-bold text-novamedix-blue">
            NovaMedix <span className="text-novamedix-teal">Custom</span>
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-navy">{title}</h1>
            <Link href="/admin/products" className="text-sm font-semibold text-novamedix-blue">
              Products
            </Link>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
