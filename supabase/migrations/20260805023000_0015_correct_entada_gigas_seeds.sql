-- Correction validée par William Cinéa : IMG_7886 et IMG_7888 sont Entada gigas.
-- Les noms de fichiers/storage historiques restent inchangés pour préserver les URL publiques.

update plant_patterns.media
set caption_fr = 'Entada gigas'
where code in ('PP-SEED-SHEET-0069', 'PP-SEED-SHEET-0070');

update plant_patterns.identification_proposals p
set proposed_family = 'Fabaceae',
    rationale = 'Identification corrigée et validée par William Cinéa : Entada gigas.',
    confidence = 'forte',
    status = 'validee'
from plant_patterns.observations o
where p.observation_id = o.id
  and o.code in ('PP-SEED-SHEET-OBS-0069', 'PP-SEED-SHEET-OBS-0070')
  and p.author = 'William Cinéa';
