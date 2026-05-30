import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

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
  const initialError = error === "invalid-password" ? "Invalid password." : "";

  return (
    <AdminShell title="Product Admin">
      <AdminLoginForm initialError={initialError} />
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
