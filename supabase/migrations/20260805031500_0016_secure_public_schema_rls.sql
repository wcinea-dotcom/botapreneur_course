-- Security Advisor: rls_disabled_in_public
-- Public botanical catalogue stays readable; operational tables become private.

begin;

-- RLS is mandatory on every table exposed through the public schema.
do $$
declare
  target record;
begin
  for target in
    select schemaname, tablename
    from pg_tables
    where schemaname = 'public'
  loop
    execute format(
      'alter table %I.%I enable row level security',
      target.schemaname,
      target.tablename
    );
  end loop;
end
$$;

-- Browser/API clients must never alter or delete catalogue data directly.
revoke insert, update, delete, truncate, references, trigger
on all tables in schema public
from anon, authenticated;

-- Public, non-sensitive reference catalogue used by the websites.
grant select on table
  public.familles,
  public.especes,
  public.types_usage,
  public.espece_usages,
  public.sources,
  public.espece_sources,
  public.communes,
  public.photos
to anon, authenticated;

-- Operational data is not exposed to anonymous or ordinary authenticated clients.
revoke select on table
  public.observateurs,
  public.observations,
  public.sites,
  public.plantations,
  public.specimens,
  public.changements_familles
from anon, authenticated;

-- Rebuild the catalogue policies as read-only policies.
drop policy if exists public_catalog_read on public.familles;
create policy public_catalog_read on public.familles
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.especes;
create policy public_catalog_read on public.especes
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.types_usage;
create policy public_catalog_read on public.types_usage
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.espece_usages;
create policy public_catalog_read on public.espece_usages
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.sources;
create policy public_catalog_read on public.sources
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.espece_sources;
create policy public_catalog_read on public.espece_sources
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.communes;
create policy public_catalog_read on public.communes
  for select to anon, authenticated using (true);

drop policy if exists public_catalog_read on public.photos;
create policy public_catalog_read on public.photos
  for select to anon, authenticated using (true);

commit;
