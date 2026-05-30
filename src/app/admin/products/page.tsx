import Link from "next/link";
import { AdminLogin, AdminNotConfigured, AdminShell, SupabaseAdminNotConfigured } from "@/components/admin/AdminGate";
import { deleteProductAction, getAdminProducts } from "@/lib/admin-products";
import { getAdminAuthState } from "@/lib/admin-auth";
import { getSupabaseAdminConfigError } from "@/lib/supabase/admin";

type AdminProductsPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const auth = await getAdminAuthState();
  const { error } = await searchParams;

  if (!auth.isConfigured) return <AdminNotConfigured />;
  if (!auth.isAuthenticated) return <AdminLogin error={error} />;

  const configError = getSupabaseAdminConfigError();
  if (configError) return <SupabaseAdminNotConfigured message={configError} />;

  const products = await getAdminProducts();

  return (
    <AdminShell title="Products">
      <div className="mb-4 flex justify-end">
        <Link href="/admin/products/new" className="rounded-lg bg-novamedix-blue px-5 py-3 text-base font-bold text-white">
          Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-card bg-white shadow-soft">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead className="bg-[#eef6ff] text-navy">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Sort</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-novamedix-border">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3 font-bold text-navy">{product.title}</td>
                <td className="px-4 py-3 text-slate-600">{product.slug}</td>
                <td className="px-4 py-3 text-slate-600">{product.category}</td>
                <td className="px-4 py-3">{product.is_published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{product.is_featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{product.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/products/${product.id}/edit`} className="font-bold text-novamedix-blue">
                      Edit
                    </Link>
                    <details className="relative">
                      <summary className="cursor-pointer list-none font-bold text-red-600">Delete</summary>
                      <form action={deleteProductAction} className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-red-100 bg-white p-3 shadow-card">
                        <input type="hidden" name="id" value={product.id} />
                        <p className="text-sm text-slate-700">Delete this product?</p>
                        <button type="submit" className="mt-3 rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white">
                          Confirm Delete
                        </button>
                      </form>
                    </details>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
