import { AdminLogin, AdminNotConfigured, AdminShell } from "@/components/admin/AdminGate";
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

  return (
    <AdminShell title="New Product">
      <ProductForm
        action={createProductAction}
        error={safeDecode(error)}
        notice={configError ? `${configError} You can still prepare the product form, but saving requires the server-side Supabase service key.` : ""}
        submitLabel="Save Product"
      />
    </AdminShell>
  );
}

function safeDecode(value?: string) {
  if (!value) return "";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
