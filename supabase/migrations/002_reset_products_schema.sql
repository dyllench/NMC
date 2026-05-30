drop table if exists public.products cascade;

create table public.products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  category text not null,
  title text not null,
  subtitle text,
  short_description text,
  overview text,
  cover_image_url text,
  gallery_image_urls text[] default '{}',
  tags text[] default '{}',
  features text[] default '{}',
  applications text[] default '{}',
  custom_steps text[] default '{}',
  order_info text[] default '{}',
  is_featured boolean default false,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index products_published_sort_idx on public.products (is_published, sort_order);
create index products_category_idx on public.products (category);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_products_updated_at();

alter table public.products enable row level security;

create policy "Public can read published products"
on public.products
for select
using (is_published = true);

insert into public.products (
  slug,
  category,
  title,
  subtitle,
  short_description,
  overview,
  cover_image_url,
  gallery_image_urls,
  tags,
  features,
  applications,
  custom_steps,
  order_info,
  is_featured,
  is_published,
  sort_order
) values
  (
    'head-face-compression-garment',
    'head-face',
    'Head & Face Compression Garment',
    'Ready styles and custom support for head, chin, neck and face coverage.',
    'Compression garment options for face, chin, neck and head support for B2B buyers.',
    'Designed for global buyers looking for head and face compression garment solutions with ready styles, custom sizing support and private label options.',
    '',
    '{}',
    array['Ready Style', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Soft elastic fabric', 'Smooth stitching', 'Custom sizing support', 'Ready styles available', 'Private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send basic measurements', 'Confirm details', 'Start production'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    false,
    true,
    10
  ),
  (
    'torso-compression-garment',
    'torso',
    'Torso Compression Garment',
    'Compression garment options for chest, abdomen, waist and upper body support.',
    'Factory direct torso compression garments for global buyers, clinics, distributors and OEM projects.',
    'A torso compression garment category for buyers who need ready styles, flexible sizing, wholesale supply and brand customization support.',
    '',
    '{}',
    array['Ready Style', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Comfortable elastic fabric', 'Reinforced sewing details', 'Custom sizing support', 'Ready styles available', 'Private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send body measurements', 'Confirm details', 'Start production'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    false,
    true,
    20
  ),
  (
    'lower-limb-compression-garment',
    'lower-limb',
    'Lower Limb Compression Garment',
    'Factory direct compression garment solution with ready styles, custom sizing and OEM support.',
    'Compression garments for thigh, leg and full lower-limb support for B2B supply and custom orders.',
    'This product is designed for buyers looking for lower-limb compression garment solutions. Ready styles and simple custom-made options are available.',
    '',
    '{}',
    array['Factory Direct', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Comfortable elastic fabric', 'Smooth stitching', 'Custom sizing support', 'Ready styles available', 'OEM / private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send basic measurements', 'Confirm and produce'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    true,
    true,
    30
  ),
  (
    'compression-gloves',
    'gloves',
    'Compression Gloves',
    'Compression glove options for hand and finger coverage.',
    'Factory direct compression gloves for clinics, distributors, wholesale buyers and OEM partners.',
    'A practical compression glove category for B2B buyers needing ready styles, custom sizing support and private label cooperation.',
    '',
    '{}',
    array['Ready Style', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Flexible hand coverage', 'Smooth stitching', 'Custom sizing support', 'Ready styles available', 'Private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send hand measurements', 'Confirm details', 'Start production'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    false,
    true,
    40
  ),
  (
    'foot-compression-garment',
    'foot-garments',
    'Foot Compression Garment',
    'Compression garment options for foot and ankle support.',
    'Foot compression garment supply for global buyers, clinics, distributors and OEM cooperation.',
    'A foot garment category for buyers who need ready styles, custom size support, export packaging and stable factory cooperation.',
    '',
    '{}',
    array['Ready Style', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Comfortable elastic fabric', 'Foot and ankle coverage', 'Custom sizing support', 'Ready styles available', 'Private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send foot measurements', 'Confirm details', 'Start production'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    false,
    true,
    50
  );
