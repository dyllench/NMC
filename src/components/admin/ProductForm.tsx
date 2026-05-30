import Link from "next/link";
import type { ProductRow } from "@/types/product";

const categoryOptions = [
  ["head-face", "Head & Face"],
  ["torso", "Torso"],
  ["lower-limb", "Lower Limb"],
  ["gloves", "Gloves"],
  ["foot-garments", "Foot Garments"],
];

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  error?: string;
  notice?: string;
  product?: ProductRow | null;
  submitLabel: string;
};

export function ProductForm({ action, error, notice, product, submitLabel }: ProductFormProps) {
  return (
    <form action={action} className="grid gap-5 rounded-card bg-white p-5 shadow-soft">
      {error ? (
        <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}
      {notice ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
          {notice}
        </div>
      ) : null}

      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Title" name="title" defaultValue={product?.title} required />
        <TextField label="Slug" name="slug" defaultValue={product?.slug} required />
        <SelectField label="Category" name="category" defaultValue={product?.category || "lower-limb"} />
        <TextField label="Sort Order" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
      </div>

      <TextField label="Subtitle" name="subtitle" defaultValue={product?.subtitle || ""} />
      <TextArea label="Short Description" name="short_description" defaultValue={product?.short_description || ""} rows={3} />
      <TextArea label="Overview" name="overview" defaultValue={product?.overview || ""} rows={4} />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Cover Image URL" name="cover_image_url" defaultValue={product?.cover_image_url || ""} />
        <FileField label="Upload Cover Image" name="cover_image" />
      </div>

      <FileField label="Upload Gallery Images" name="gallery_images" multiple />
      <TextArea
        label="Gallery Image URLs"
        name="gallery_image_urls"
        defaultValue={lines(product?.gallery_image_urls)}
        rows={4}
        help="One URL per line. Uploaded gallery URLs will be appended."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea label="Tags" name="tags" defaultValue={lines(product?.tags)} rows={5} help="One item per line." />
        <TextArea label="Features" name="features" defaultValue={lines(product?.features)} rows={5} help="One item per line." />
        <TextArea label="Applications" name="applications" defaultValue={lines(product?.applications)} rows={5} help="One item per line." />
        <TextArea label="Custom Steps" name="custom_steps" defaultValue={lines(product?.custom_steps)} rows={5} help="One item per line." />
      </div>
      <TextArea label="Order Info" name="order_info" defaultValue={lines(product?.order_info)} rows={5} help="One item per line." />

      <div className="flex flex-wrap gap-5">
        <CheckboxField label="Featured" name="is_featured" defaultChecked={product?.is_featured ?? false} />
        <CheckboxField label="Published" name="is_published" defaultChecked={product?.is_published ?? true} />
      </div>

      <div className="flex flex-wrap gap-3 border-t border-novamedix-border pt-5">
        <button className="h-11 rounded-lg bg-novamedix-blue px-6 text-base font-bold text-white" type="submit">
          {submitLabel}
        </button>
        <Link href="/admin/products" className="flex h-11 items-center rounded-lg border border-novamedix-border px-6 text-base font-bold text-navy">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-2 h-11 w-full rounded-lg border border-novamedix-border px-3 outline-none focus:border-novamedix-blue"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows,
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows: number;
  help?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue || ""}
        rows={rows}
        className="mt-2 w-full rounded-lg border border-novamedix-border px-3 py-2 outline-none focus:border-novamedix-blue"
      />
      {help ? <span className="mt-1 block text-xs text-slate-500">{help}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-lg border border-novamedix-border bg-white px-3 outline-none focus:border-novamedix-blue"
      >
        {categoryOptions.map(([value, labelText]) => (
          <option key={value} value={value}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileField({
  label,
  name,
  multiple = false,
}: {
  label: string;
  name: string;
  multiple?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <input
        name={name}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="mt-2 w-full rounded-lg border border-novamedix-border bg-white px-3 py-2 text-sm"
      />
    </label>
  );
}

function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-bold text-navy">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-novamedix-blue" />
      {label}
    </label>
  );
}

function lines(value?: string[] | null) {
  return value?.join("\n") || "";
}
