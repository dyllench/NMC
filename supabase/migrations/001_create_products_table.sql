create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
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

alter table public.products
  add column if not exists slug text,
  add column if not exists category text,
  add column if not exists title text,
  add column if not exists subtitle text,
  add column if not exists short_description text,
  add column if not exists overview text,
  add column if not exists cover_image_url text,
  add column if not exists gallery_image_urls text[] default '{}',
  add column if not exists tags text[] default '{}',
  add column if not exists features text[] default '{}',
  add column if not exists applications text[] default '{}',
  add column if not exists custom_steps text[] default '{}',
  add column if not exists order_info text[] default '{}',
  add column if not exists is_featured boolean default false,
  add column if not exists is_published boolean default true,
  add column if not exists sort_order int default 0,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

alter table public.products
  alter column slug set not null,
  alter column category set not null,
  alter column title set not null,
  alter column gallery_image_urls set default '{}',
  alter column tags set default '{}',
  alter column features set default '{}',
  alter column applications set default '{}',
  alter column custom_steps set default '{}',
  alter column order_info set default '{}',
  alter column is_featured set default false,
  alter column is_published set default true,
  alter column sort_order set default 0,
  alter column created_at set default now(),
  alter column updated_at set default now();

create unique index if not exists products_slug_key on public.products (slug);
create index if not exists products_published_sort_idx on public.products (is_published, sort_order);
create index if not exists products_category_idx on public.products (category);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_products_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public can read published products" on public.products;
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
    'Compression garment options for head and face support, suitable for clinics, distributors and OEM buyers.',
    'Designed for B2B buyers looking for head and face compression garment solutions with ready styles, custom sizing support and private label options.',
    '/placeholder/cat-head-face.png',
    array['/placeholder/product-head-face.png', '/placeholder/cat-head-face.png'],
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
    '/placeholder/cat-torso.png',
    array['/placeholder/product-torso.png', '/placeholder/cat-torso.png'],
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
    '/placeholder/detail-main.png',
    array['/placeholder/detail-thumb-front.png', '/placeholder/detail-thumb-side.png', '/placeholder/detail-thumb-zip.png', '/placeholder/detail-thumb-fabric.png'],
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
    '/placeholder/cat-gloves.png',
    array['/placeholder/product-gloves.png', '/placeholder/cat-gloves.png'],
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
    '/placeholder/cat-foot.png',
    array['/placeholder/product-foot.png', '/placeholder/cat-foot.png'],
    array['Ready Style', 'Custom Available', 'OEM Support', 'Global Shipping'],
    array['Comfortable elastic fabric', 'Foot and ankle coverage', 'Custom sizing support', 'Ready styles available', 'Private label support'],
    array['Recovery support', 'Compression use', 'Clinic supply', 'Distributor wholesale', 'OEM projects'],
    array['Choose product type', 'Send foot measurements', 'Confirm details', 'Start production'],
    array['Ready styles available', 'Custom-made support', 'OEM / private label available', 'Lead time depends on quantity'],
    false,
    true,
    50
  )
on conflict (slug) do update set
  category = excluded.category,
  title = excluded.title,
  subtitle = excluded.subtitle,
  short_description = excluded.short_description,
  overview = excluded.overview,
  cover_image_url = excluded.cover_image_url,
  gallery_image_urls = excluded.gallery_image_urls,
  tags = excluded.tags,
  features = excluded.features,
  applications = excluded.applications,
  custom_steps = excluded.custom_steps,
  order_info = excluded.order_info,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  updated_at = now();
