-- Relie explicitement la famille Annonaceae aux patterns distique et trimère.
-- Référence botanique : Kew, Plants of the World Online, Annonaceae.

insert into plant_patterns.character_states
  (character_id, code, label_fr, definition_fr, how_fr)
select
  c.id,
  'distique',
  'Distique',
  'Les feuilles, généralement alternes, sont disposées dans un même plan et forment deux rangs opposés le long du rameau.',
  'Observer un rameau entier de côté et vérifier une feuille par nœud ainsi que l’alignement des insertions en deux rangs.'
from plant_patterns.characters c
where c.code = 'feuille__phyllotaxie'
on conflict (character_id, code) do update set
  label_fr = excluded.label_fr,
  definition_fr = excluded.definition_fr,
  how_fr = excluded.how_fr;

update plant_patterns.character_states
set
  definition_fr = 'Les pièces florales sont organisées par trois ou par multiples de trois.',
  how_fr = 'Compter séparément les sépales, les pétales et les autres verticilles. La trimérie est un indice comparatif, pas une preuve suffisante de monocotylédonie.'
where character_id = (select id from plant_patterns.characters where code = 'fleur__merisie')
  and code = 'trimere';

insert into plant_patterns.taxon_trait_assertions
  (taxon_id, character_state_id, frequency, confidence, note)
select t.id, s.id, 'tres_frequent', 'forte',
  'Feuilles généralement alternes et distiques chez les Annonaceae.'
from plant_patterns.taxa t
join plant_patterns.character_states s on s.code = 'distique'
join plant_patterns.characters c on c.id = s.character_id and c.code = 'feuille__phyllotaxie'
where t.scientific_name = 'Annonaceae' and t.rank = 'famille'
  and not exists (
    select 1 from plant_patterns.taxon_trait_assertions a
    where a.taxon_id = t.id and a.character_state_id = s.id
  );

insert into plant_patterns.taxon_trait_assertions
  (taxon_id, character_state_id, frequency, confidence, note)
select t.id, s.id, 'tres_frequent', 'forte',
  'Fleurs le plus souvent trimères; typiquement 3 sépales et 6 pétales en deux verticilles.'
from plant_patterns.taxa t
join plant_patterns.character_states s on s.code = 'trimere'
join plant_patterns.characters c on c.id = s.character_id and c.code = 'fleur__merisie'
where t.scientific_name = 'Annonaceae' and t.rank = 'famille'
  and not exists (
    select 1 from plant_patterns.taxon_trait_assertions a
    where a.taxon_id = t.id and a.character_state_id = s.id
  );

update plant_patterns.taxon_trait_assertions
set note = 'Magnoliidées. Feuilles simples, entières, sans stipules, généralement alternes et distiques; fleurs le plus souvent trimères, typiquement à 3 sépales et 6 pétales en deux verticilles; nombreuses étamines et carpelles libres; fruits agrégés charnus.'
where taxon_id = (
  select id from plant_patterns.taxa
  where scientific_name = 'Annonaceae' and rank = 'famille'
)
and character_state_id is null
and note like 'Angiospermes basales%';
