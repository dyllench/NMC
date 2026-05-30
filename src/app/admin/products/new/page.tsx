import { AdminLogin, AdminNotConfigured, AdminShell, SupabaseAdminNotConfigured } from "@/components/admin/AdminGate";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "@/lib/admin-products";
import { getAdminAuthState } from "@/lib/admin-auth";
import { getSupabaseAdminConfigError } from "@/lib/supabase/admin";

type NewProductPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewProductPage({ searchParams }: NewProductPageProps) {
  const auth = await getAdminAuthState();
  const { error } = await searchParams;

  if (!auth.isConfigured) return <AdminNotConfigured />;
  if (!auth.isAuthenticated) return <AdminLogin error={error} />;

  const configError = getSupabaseAdminConfigError();
  if (configError) return <SupabaseAdminNotConfigured message={configError} />;

  return (
    <AdminShell title="New Product">
      <ProductForm action={createProductAction} submitLabel="Save Product" />
    </AdminShell>
  );
}
