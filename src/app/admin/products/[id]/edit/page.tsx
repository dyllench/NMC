import { notFound } from "next/navigation";
import { AdminLogin, AdminNotConfigured, AdminShell, SupabaseAdminNotConfigured } from "@/components/admin/AdminGate";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminProductById, updateProductAction } from "@/lib/admin-products";
import { getAdminAuthState } from "@/lib/admin-auth";
import { getSupabaseAdminConfigError } from "@/lib/supabase/admin";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProductPage({ params, searchParams }: EditProductPageProps) {
  const auth = await getAdminAuthState();
  const { error } = await searchParams;

  if (!auth.isConfigured) return <AdminNotConfigured />;
  if (!auth.isAuthenticated) return <AdminLogin error={error} />;

  const configError = getSupabaseAdminConfigError();
  if (configError) return <SupabaseAdminNotConfigured message={configError} />;

  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) notFound();

  return (
    <AdminShell title="Edit Product">
      <ProductForm
        action={updateProductAction}
        error={safeDecode(error)}
        product={product}
        submitLabel="Save Changes"
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
