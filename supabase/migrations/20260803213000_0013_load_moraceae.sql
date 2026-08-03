-- Moraceae: import idempotent des 41 médias, observations et identifications.
-- Les identifications Ficus cf. benghalensis restent proposées et non validées.
create temporary table _moraceae(
  code text, filename text, public_url text, organ_code text,
  scientific_name text, observation_status text, confidence text,
  proposal_status text, original_filename text, visible_organs text
) on commit drop;

insert into _moraceae values
('PP-MOR-0001','Moraceae_Artocarpus_altilis_fruit_feuille_001.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_001.jpg','fruit','Artocarpus altilis','identifie','forte','validee','20210726_132745.jpg','fruit;feuille'),
('PP-MOR-0002','Moraceae_Artocarpus_altilis_fruit_feuille_002.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_002.jpg','fruit','Artocarpus altilis','identifie','forte','validee','DSC_0378.JPG','fruit;feuille'),
('PP-MOR-0003','Moraceae_Artocarpus_altilis_fruit_feuille_003.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_003.jpg','fruit','Artocarpus altilis','identifie','forte','validee','DSC_0476.heic','fruit;feuille'),
('PP-MOR-0004','Moraceae_Artocarpus_altilis_fruit_004.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_004.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_1940.JPG','fruit'),
('PP-MOR-0005','Moraceae_Artocarpus_altilis_fruit_feuille_005.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_005.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_3153.JPG','fruit;feuille'),
('PP-MOR-0006','Moraceae_Artocarpus_altilis_fruit_coupe_006.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_coupe_006.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_3389.JPG','fruit;coupe'),
('PP-MOR-0007','Moraceae_Artocarpus_altilis_fruit_007.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_007.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_5329.JPG','fruit'),
('PP-MOR-0008','Moraceae_Artocarpus_altilis_fruit_008.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_008.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_5618.JPG','fruit'),
('PP-MOR-0009','Moraceae_Artocarpus_altilis_fruit_feuille_009.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_009.jpg','fruit','Artocarpus altilis','identifie','forte','validee','IMG_7691.HEIC','fruit;feuille'),
('PP-MOR-0010','Moraceae_Artocarpus_altilis_fruit_feuille_010.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_altilis_fruit_feuille_010.jpg','fruit','Artocarpus altilis','identifie','forte','validee','Veritab.jpg','fruit;feuille'),
('PP-MOR-0011','Moraceae_Artocarpus_heterophyllus_fruit_001.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_001.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','DSC_0700.JPG','fruit'),
('PP-MOR-0012','Moraceae_Artocarpus_heterophyllus_fruit_002.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_002.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_2411.JPG','fruit'),
('PP-MOR-0013','Moraceae_Artocarpus_heterophyllus_fruit_coupe_003.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_coupe_003.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_3550.JPG','fruit;coupe'),
('PP-MOR-0014','Moraceae_Artocarpus_heterophyllus_fruit_004.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_004.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_3961.HEIC','fruit'),
('PP-MOR-0015','Moraceae_Artocarpus_heterophyllus_fruit_005.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_005.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_3964.HEIC','fruit'),
('PP-MOR-0016','Moraceae_Artocarpus_heterophyllus_fruit_006.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_006.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_3965.HEIC','fruit'),
('PP-MOR-0017','Moraceae_Artocarpus_heterophyllus_fruit_007.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_007.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_4205.JPG','fruit'),
('PP-MOR-0018','Moraceae_Artocarpus_heterophyllus_fruit_008.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_008.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5623.JPG','fruit'),
('PP-MOR-0019','Moraceae_Artocarpus_heterophyllus_fruit_009.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_009.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5751.JPG','fruit'),
('PP-MOR-0020','Moraceae_Artocarpus_heterophyllus_fruit_010.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_010.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5869.JPG','fruit'),
('PP-MOR-0021','Moraceae_Artocarpus_heterophyllus_fruit_011.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_011.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5876.JPG','fruit'),
('PP-MOR-0022','Moraceae_Artocarpus_heterophyllus_fruit_012.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_012.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5953.JPG','fruit'),
('PP-MOR-0023','Moraceae_Artocarpus_heterophyllus_fruit_013.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_013.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5954.JPG','fruit'),
('PP-MOR-0024','Moraceae_Artocarpus_heterophyllus_fruit_014.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_014.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5956.JPG','fruit'),
('PP-MOR-0025','Moraceae_Artocarpus_heterophyllus_fruit_015.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_015.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5965.JPG','fruit'),
('PP-MOR-0026','Moraceae_Artocarpus_heterophyllus_fruit_016.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_016.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5966.JPG','fruit'),
('PP-MOR-0027','Moraceae_Artocarpus_heterophyllus_fruit_017.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_017.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5979.JPG','fruit'),
('PP-MOR-0028','Moraceae_Artocarpus_heterophyllus_fruit_018.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_018.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','IMG_5981.JPG','fruit'),
('PP-MOR-0029','Moraceae_Artocarpus_heterophyllus_fruit_019.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Artocarpus_heterophyllus_fruit_019.jpg','fruit','Artocarpus heterophyllus','identifie','forte','validee','Jaca.jpg','fruit'),
('PP-MOR-0030','Moraceae_Ficus_cf_benghalensis_fruit_feuille_001.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_001.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','DSC_0348.JPG','fruit;feuille'),
('PP-MOR-0031','Moraceae_Ficus_cf_benghalensis_fruit_feuille_002.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_002.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_0192.JPG','fruit;feuille'),
('PP-MOR-0032','Moraceae_Ficus_cf_benghalensis_feuille_stipule_003.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_feuille_stipule_003.jpg','structure_specialisee','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_2425.JPG','feuille;stipule'),
('PP-MOR-0033','Moraceae_Ficus_cf_benghalensis_fruit_004.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_004.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3483.JPG','fruit'),
('PP-MOR-0034','Moraceae_Ficus_cf_benghalensis_fruit_feuille_005.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_005.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3484.JPG','fruit;feuille'),
('PP-MOR-0035','Moraceae_Ficus_cf_benghalensis_fruit_006.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_006.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3488.JPG','fruit'),
('PP-MOR-0036','Moraceae_Ficus_cf_benghalensis_fruit_feuille_tige_007.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_tige_007.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3767.JPG','fruit;feuille;tige'),
('PP-MOR-0037','Moraceae_Ficus_cf_benghalensis_stipule_tige_008.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_stipule_tige_008.jpg','structure_specialisee','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3787.JPG','stipule;tige'),
('PP-MOR-0038','Moraceae_Ficus_cf_benghalensis_fruit_feuille_009.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_009.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_3794.JPG','fruit;feuille'),
('PP-MOR-0039','Moraceae_Ficus_cf_benghalensis_latex_feuille_tige_010.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_latex_feuille_tige_010.jpg','structure_specialisee','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_5490.JPG','latex;feuille;tige'),
('PP-MOR-0040','Moraceae_Ficus_cf_benghalensis_feuille_stipule_011.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_feuille_stipule_011.jpg','structure_specialisee','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_8216.JPG','feuille;stipule'),
('PP-MOR-0041','Moraceae_Ficus_cf_benghalensis_fruit_feuille_012.jpg','https://aqvlamiahynbyrzjnppr.supabase.co/storage/v1/object/public/pp-large/moraceae/Moraceae_Ficus_cf_benghalensis_fruit_feuille_012.jpg','fruit','Ficus cf. benghalensis','a_identifier','moyenne','proposee','IMG_8362.JPG','fruit;feuille');

insert into plant_patterns.media(
  code, original_name, storage_large, organ_id, caption_fr,
  author, license, publication_status
)
select m.code, m.original_filename, m.public_url, o.id, m.scientific_name,
       'William Cinéa', '© William Cinéa', 'published'
from _moraceae m
join plant_patterns.organs o on o.code=m.organ_code
on conflict (code) do update set
  original_name=excluded.original_name,
  storage_large=excluded.storage_large,
  organ_id=excluded.organ_id,
  caption_fr=excluded.caption_fr,
  publication_status=excluded.publication_status;

insert into plant_patterns.observations(code,organ_id,status)
select 'PP-MOR-OBS-'||right(m.code,4), o.id, m.observation_status
from _moraceae m
join plant_patterns.organs o on o.code=m.organ_code
on conflict (code) do update set organ_id=excluded.organ_id,status=excluded.status;

insert into plant_patterns.evidence(media_id,observation_id)
select med.id,obs.id
from _moraceae m
join plant_patterns.media med on med.code=m.code
join plant_patterns.observations obs on obs.code='PP-MOR-OBS-'||right(m.code,4)
on conflict do nothing;

insert into plant_patterns.identification_proposals(
  observation_id,proposed_family,author,rationale,confidence,status
)
select obs.id,'Moraceae','William Cinéa',
       'Nom scientifique: '||m.scientific_name||'. Organes visibles: '||m.visible_organs||
       '. Fichier source: '||m.original_filename,
       m.confidence,m.proposal_status
from _moraceae m
join plant_patterns.observations obs on obs.code='PP-MOR-OBS-'||right(m.code,4)
where not exists (
  select 1 from plant_patterns.identification_proposals p
  where p.observation_id=obs.id and p.author='William Cinéa'
);

insert into plant_patterns.media_projects(media_id,project)
select med.id,'plant_patterns'
from _moraceae m join plant_patterns.media med on med.code=m.code
on conflict do nothing;
