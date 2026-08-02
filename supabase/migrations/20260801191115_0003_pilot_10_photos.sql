insert into plant_patterns.media (code,original_name,storage_original,storage_large,storage_thumb,author,license,width,height,checksum_sha256,organ_id,caption_fr,publication_status) values
('PP-MED-000001','IMG_0216.JPG','PP-MED-000001.jpg','PP-MED-000001.jpg','PP-MED-000001.jpg','William Cinéa','© William Cinéa — tous droits réservés',5712,4284,'147709649cbca847b55e93114136fd50f7ad03bd83f96460eceaae427a3009a8',(select id from plant_patterns.organs where code='fleur'),'Calice accrescent persistant — fleur non identifiée','draft'),
('PP-MED-000002','IMG_0284.JPG','PP-MED-000002.jpg','PP-MED-000002.jpg','PP-MED-000002.jpg','William Cinéa','© William Cinéa — tous droits réservés',5712,4284,'54a56c2c4c5eb9f95a9e0c00d8d8a70566bb1985038b8a0b847ca3c1ac400761',(select id from plant_patterns.organs where code='fleur'),'Capitule d''Astéracée — ligules + fleurons','published'),
('PP-MED-000003','IMG_0489.JPG','PP-MED-000003.jpg','PP-MED-000003.jpg','PP-MED-000003.jpg','William Cinéa','© William Cinéa — tous droits réservés',5712,4284,'6236c31d679911da96b1e5e34784be63c9af84dd460cadfd1b8a1b41057759ca',(select id from plant_patterns.organs where code='fleur'),'Moringa / Benzolive — fleurs blanches, étamines jaunes','published'),
('PP-MED-000004','IMG_0617.JPG','PP-MED-000004.jpg','PP-MED-000004.jpg','PP-MED-000004.jpg','William Cinéa','© William Cinéa — tous droits réservés',4032,3024,'e2779e0b99b8f79b9c693561be9be8aac2d6a23179f7d656c4817c3c8bd8a736',(select id from plant_patterns.organs where code='fleur'),'Corolle gamopétale tubulaire, feuillage velu','draft'),
('PP-MED-000005','IMG_0784.JPG','PP-MED-000005.jpg','PP-MED-000005.jpg','PP-MED-000005.jpg','William Cinéa','© William Cinéa — tous droits réservés',5712,4284,'53ce79fe52d727b01dfc785cf754866b4e8a29607351ff6a1b21044ceb15ae84',(select id from plant_patterns.organs where code='fleur'),'Type Hibiscus — colonne staminale (monadelphe)','published'),
('PP-MED-000006','IMG_0890.JPG','PP-MED-000006.jpg','PP-MED-000006.jpg','PP-MED-000006.jpg','William Cinéa','© William Cinéa — tous droits réservés',4032,3024,'548e488e5e8738c9e273c1ff4a1cd7173fe7a23d4388c29633203fe2c361b0b0',(select id from plant_patterns.organs where code='fleur'),'Fleur zygomorphe à labelle','draft'),
('PP-MED-000007','IMG_0904.JPG','PP-MED-000007.jpg','PP-MED-000007.jpg','PP-MED-000007.jpg','William Cinéa','© William Cinéa — tous droits réservés',5712,4284,'9ecb4661660ac7183998909f86926c7eb39e563a335c5bca31e695234236b858',(select id from plant_patterns.organs where code='fleur'),'Longue corolle tubulaire pendante (type Brugmansia)','draft'),
('PP-MED-000008','IMG_0984.JPG','PP-MED-000008.jpg','PP-MED-000008.jpg','PP-MED-000008.jpg','William Cinéa','© William Cinéa — tous droits réservés',4032,3024,'f8b1912a25c7a7bddba43f751980995efd02c24a38cbf37ceb6182a574c14800',(select id from plant_patterns.organs where code='fleur'),'Spathe blanche + spadice','published'),
('PP-MED-000009','IMG_1265.JPG','PP-MED-000009.jpg','PP-MED-000009.jpg','PP-MED-000009.jpg','William Cinéa','© William Cinéa — tous droits réservés',4032,3024,'0828f134675eb1a0bd31994ccde548f2db4cee4f74cd103049eb3cf886b60599',(select id from plant_patterns.organs where code='fleur'),'Nombreuses étamines jaunes (indéfinies)','draft'),
('PP-MED-000010','IMG_0834.JPG','PP-MED-000010.jpg','PP-MED-000010.jpg','PP-MED-000010.jpg','William Cinéa','© William Cinéa — tous droits réservés',4032,3024,'286d2bceaff73c6ee7678d55c93564a91acd47e5025f127cb3650461f1e4a328',(select id from plant_patterns.organs where code='fleur'),'Cyathe d''Euphorbia + bractées rouges','draft')
on conflict (code) do nothing;

insert into plant_patterns.observations (code,organ_id,status) values
('PP-OBS-000001',(select id from plant_patterns.organs where code='fleur'),'a_identifier'),
('PP-OBS-000002',(select id from plant_patterns.organs where code='fleur'),'identifie'),
('PP-OBS-000003',(select id from plant_patterns.organs where code='fleur'),'en_cours'),
('PP-OBS-000004',(select id from plant_patterns.organs where code='fleur'),'a_identifier'),
('PP-OBS-000005',(select id from plant_patterns.organs where code='fleur'),'en_cours'),
('PP-OBS-000006',(select id from plant_patterns.organs where code='fleur'),'en_cours'),
('PP-OBS-000007',(select id from plant_patterns.organs where code='fleur'),'en_cours'),
('PP-OBS-000008',(select id from plant_patterns.organs where code='fleur'),'en_cours'),
('PP-OBS-000009',(select id from plant_patterns.organs where code='fleur'),'a_identifier'),
('PP-OBS-000010',(select id from plant_patterns.organs where code='fleur'),'en_cours')
on conflict (code) do nothing;

insert into plant_patterns.evidence (media_id,observation_id) values
((select id from plant_patterns.media where code='PP-MED-000001'),(select id from plant_patterns.observations where code='PP-OBS-000001')),
((select id from plant_patterns.media where code='PP-MED-000002'),(select id from plant_patterns.observations where code='PP-OBS-000002')),
((select id from plant_patterns.media where code='PP-MED-000003'),(select id from plant_patterns.observations where code='PP-OBS-000003')),
((select id from plant_patterns.media where code='PP-MED-000004'),(select id from plant_patterns.observations where code='PP-OBS-000004')),
((select id from plant_patterns.media where code='PP-MED-000005'),(select id from plant_patterns.observations where code='PP-OBS-000005')),
((select id from plant_patterns.media where code='PP-MED-000006'),(select id from plant_patterns.observations where code='PP-OBS-000006')),
((select id from plant_patterns.media where code='PP-MED-000007'),(select id from plant_patterns.observations where code='PP-OBS-000007')),
((select id from plant_patterns.media where code='PP-MED-000008'),(select id from plant_patterns.observations where code='PP-OBS-000008')),
((select id from plant_patterns.media where code='PP-MED-000009'),(select id from plant_patterns.observations where code='PP-OBS-000009')),
((select id from plant_patterns.media where code='PP-MED-000010'),(select id from plant_patterns.observations where code='PP-OBS-000010'));

insert into plant_patterns.observation_traits (observation_id,character_state_id,confidence,status) values
((select id from plant_patterns.observations where code='PP-OBS-000001'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__duree_et_evolution' and cs.code='calice_persistant'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000001'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__duree_et_evolution' and cs.code='sepales_accrescents'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000002'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__inflorescence' and cs.code='capitule'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000002'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__symetrie' and cs.code='actinomorphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000003'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__sexualite' and cs.code='fleur_bisexuee'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000003'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__calice_et_corolle' and cs.code='dialypetale'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000004'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__calice_et_corolle' and cs.code='gamopetale'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000004'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__forme_florale' and cs.code='corolle_tubulaire'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000004'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__symetrie' and cs.code='zygomorphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000005'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__androcee' and cs.code='monadelphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000005'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__symetrie' and cs.code='actinomorphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000005'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__merisie' and cs.code='pentamere'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000006'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__symetrie' and cs.code='zygomorphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000006'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__forme_florale' and cs.code='labelle'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000007'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__forme_florale' and cs.code='corolle_tubulaire'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000007'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__calice_et_corolle' and cs.code='gamopetale'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000007'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__merisie' and cs.code='pentamere'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000008'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__anatomie_florale' and cs.code='spathe_et_spadice'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000009'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__androcee' and cs.code='etamines_indefinies'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000009'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__symetrie' and cs.code='actinomorphe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000010'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__inflorescence' and cs.code='cyathe'),'forte','observed'),
((select id from plant_patterns.observations where code='PP-OBS-000010'),(select cs.id from plant_patterns.character_states cs join plant_patterns.characters c on c.id=cs.character_id where c.code='fleur__inflorescence' and cs.code='inflorescence_a_bractees_voyantes'),'forte','observed');

insert into plant_patterns.identification_proposals (observation_id,proposed_family,author,confidence,status) values
((select id from plant_patterns.observations where code='PP-OBS-000002'),'Asteraceae','William Cinéa','forte','validee'),
((select id from plant_patterns.observations where code='PP-OBS-000003'),'Moringaceae','William Cinéa','moyenne','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000004'),'Gesneriaceae','William Cinéa','faible','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000005'),'Malvaceae','William Cinéa','forte','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000006'),'Orchidaceae','William Cinéa','moyenne','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000007'),'Solanaceae','William Cinéa','moyenne','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000008'),'Araceae','William Cinéa','forte','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000009'),'Calophyllaceae','William Cinéa','faible','proposee'),
((select id from plant_patterns.observations where code='PP-OBS-000010'),'Euphorbiaceae','William Cinéa','moyenne','proposee');

insert into plant_patterns.identification_reviews (proposal_id,decision,reviewer,notes)
 select p.id,'valider','William Cinéa','Capitule caractéristique confirmé' from plant_patterns.identification_proposals p join plant_patterns.observations o on o.id=p.observation_id where o.code='PP-OBS-000002';

insert into plant_patterns.media_projects (media_id,project) values
((select id from plant_patterns.media where code='PP-MED-000001'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000002'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000003'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000004'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000005'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000006'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000007'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000008'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000009'),'plant_patterns'),
((select id from plant_patterns.media where code='PP-MED-000010'),'plant_patterns')
on conflict do nothing;;
