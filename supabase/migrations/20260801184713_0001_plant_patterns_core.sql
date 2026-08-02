create schema if not exists plant_patterns;

create table plant_patterns.sources (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('botanique','ethnobotanique','taxonomique','pharmacologique','autre')),
  title text not null, url text, scope text, created_at timestamptz default now()
);

create table plant_patterns.taxa (
  id uuid primary key default gen_random_uuid(),
  rank text not null check (rank in ('famille','genre','espece','sous_espece','variete')),
  scientific_name text not null,
  author text,
  accepted_taxon_id uuid references plant_patterns.taxa(id),
  synonym_of uuid references plant_patterns.taxa(id),
  source_id uuid references plant_patterns.sources(id),
  version text, created_at timestamptz default now(),
  unique (scientific_name, rank)
);

create table plant_patterns.taxon_names (
  id uuid primary key default gen_random_uuid(),
  taxon_id uuid not null references plant_patterns.taxa(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('commun','synonyme_scientifique')),
  lang text check (lang in ('fr','en','es'))
);

create table plant_patterns.organs (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name_fr text not null, name_en text, name_es text
);

create table plant_patterns.characters (
  id uuid primary key default gen_random_uuid(),
  organ_id uuid not null references plant_patterns.organs(id) on delete cascade,
  code text unique not null,
  group_label text,
  label_fr text not null, label_en text, label_es text
);

create table plant_patterns.character_states (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references plant_patterns.characters(id) on delete cascade,
  code text not null,
  label_fr text not null, label_en text, label_es text,
  definition_fr text, definition_en text, definition_es text,
  unique (character_id, code)
);

create table plant_patterns.media (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  original_name text,
  storage_original text, storage_large text, storage_thumb text,
  author text, license text,
  width int, height int, checksum_sha256 text,
  organ_id uuid references plant_patterns.organs(id),
  caption_fr text, caption_en text, caption_es text,
  publication_status text not null default 'draft'
    check (publication_status in ('draft','published','archived')),
  created_at timestamptz default now()
);

create table plant_patterns.observations (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  accepted_taxon_id uuid references plant_patterns.taxa(id),
  organ_id uuid references plant_patterns.organs(id),
  notes text,
  status text not null default 'a_identifier'
    check (status in ('a_identifier','en_cours','identifie')),
  created_at timestamptz default now()
);

create table plant_patterns.observation_traits (
  id uuid primary key default gen_random_uuid(),
  observation_id uuid not null references plant_patterns.observations(id) on delete cascade,
  character_state_id uuid not null references plant_patterns.character_states(id),
  confidence text check (confidence in ('faible','moyenne','forte')),
  status text not null default 'observed'
    check (status in ('observed','not_observed','unknown','not_applicable'))
);

create table plant_patterns.identification_proposals (
  id uuid primary key default gen_random_uuid(),
  observation_id uuid not null references plant_patterns.observations(id) on delete cascade,
  proposed_taxon_id uuid references plant_patterns.taxa(id),
  proposed_family text,
  author text, rationale text,
  confidence text check (confidence in ('faible','moyenne','forte')),
  status text not null default 'proposee'
    check (status in ('proposee','validee','rejetee')),
  created_at timestamptz default now()
);

create table plant_patterns.identification_reviews (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references plant_patterns.identification_proposals(id) on delete cascade,
  decision text not null check (decision in ('valider','rejeter','complement')),
  reviewer text, notes text, reviewed_at timestamptz default now()
);

create table plant_patterns.taxon_trait_assertions (
  id uuid primary key default gen_random_uuid(),
  taxon_id uuid not null references plant_patterns.taxa(id) on delete cascade,
  character_state_id uuid references plant_patterns.character_states(id),
  frequency text check (frequency in ('rare','frequent','tres_frequent','constant')),
  confidence text check (confidence in ('faible','moyenne','forte')),
  source_id uuid references plant_patterns.sources(id),
  note text
);

create table plant_patterns.evidence (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references plant_patterns.media(id) on delete cascade,
  observation_id uuid references plant_patterns.observations(id) on delete cascade,
  character_state_id uuid references plant_patterns.character_states(id),
  assertion_id uuid references plant_patterns.taxon_trait_assertions(id),
  source_id uuid references plant_patterns.sources(id)
);

create table plant_patterns.media_projects (
  media_id uuid not null references plant_patterns.media(id) on delete cascade,
  project text not null check (project in ('plant_patterns','medicinal','biodiversite')),
  primary key (media_id, project)
);

create index on plant_patterns.observation_traits (character_state_id);
create index on plant_patterns.evidence (media_id);
create index on plant_patterns.identification_proposals (status);
create index on plant_patterns.media (publication_status);
create index on plant_patterns.taxon_names (taxon_id);
create index on plant_patterns.characters (organ_id);
create index on plant_patterns.character_states (character_id);

-- RLS activé partout
alter table plant_patterns.sources enable row level security;
alter table plant_patterns.taxa enable row level security;
alter table plant_patterns.taxon_names enable row level security;
alter table plant_patterns.organs enable row level security;
alter table plant_patterns.characters enable row level security;
alter table plant_patterns.character_states enable row level security;
alter table plant_patterns.media enable row level security;
alter table plant_patterns.observations enable row level security;
alter table plant_patterns.observation_traits enable row level security;
alter table plant_patterns.identification_proposals enable row level security;
alter table plant_patterns.identification_reviews enable row level security;
alter table plant_patterns.taxon_trait_assertions enable row level security;
alter table plant_patterns.evidence enable row level security;
alter table plant_patterns.media_projects enable row level security;

-- Lecture publique du vocabulaire de référence
create policy pub_read on plant_patterns.organs for select using (true);
create policy pub_read on plant_patterns.characters for select using (true);
create policy pub_read on plant_patterns.character_states for select using (true);
create policy pub_read on plant_patterns.taxa for select using (true);
create policy pub_read on plant_patterns.taxon_names for select using (true);
create policy pub_read on plant_patterns.sources for select using (true);
create policy pub_read on plant_patterns.observations for select using (true);
create policy pub_read on plant_patterns.observation_traits for select using (true);
create policy pub_read on plant_patterns.identification_proposals for select using (true);
create policy pub_read on plant_patterns.identification_reviews for select using (true);
create policy pub_read on plant_patterns.taxon_trait_assertions for select using (true);
create policy pub_read on plant_patterns.evidence for select using (true);
create policy pub_read on plant_patterns.media_projects for select using (true);

-- Médias : lecture publique uniquement si publié
create policy pub_read_published on plant_patterns.media for select using (publication_status = 'published');;
