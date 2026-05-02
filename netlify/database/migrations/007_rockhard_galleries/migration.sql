-- 006_rockhard_galleries: enrich PDP image galleries with lifestyle shots
-- and alternate angle product photography. Runs after 005_real_photos.
--
-- Photo inventory in /public/img/:
--   rockhard-hero.jpg              hero shot — RH metal sign + sparks
--   glove-leather-tan.jpg          tan leather glove + hammer + sawdust
--   glove-leather-pair.jpg         tan glove gripping hammer + flat-laid pair
--   glove-tactical-black.jpg       black tactical glove + drill + bolts on wet floor
--   glove-tactical-impact.jpg      black tactical glove + impact driver + sparks
--   lifestyle-framer.jpg           framer swinging hammer in tan Rockhard gloves
--   lifestyle-mechanic.jpg         mechanic under truck w/ Mechanic Pro tactical gloves
--   lifestyle-welder.jpg           welder + sparks
--
-- Galleries are 4 images each: hero product shot, alternate angle, lifestyle, brand shot
-- Idempotent — UPDATE is naturally so.

UPDATE products
   SET images = '["/img/glove-tactical-black.jpg", "/img/glove-tactical-impact.jpg", "/img/lifestyle-mechanic.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ironclad-tactical-gloves';

UPDATE products
   SET images = '["/img/glove-leather-tan.jpg", "/img/glove-leather-pair.jpg", "/img/lifestyle-framer.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'framer-pro-work-glove';

UPDATE products
   SET images = '["/img/glove-leather-tan.jpg", "/img/glove-leather-pair.jpg", "/img/rockhard-hero.jpg", "/img/lifestyle-framer.jpg"]'::jsonb
 WHERE slug = 'anvil-leather-glove';

UPDATE products
   SET images = '["/img/glove-tactical-black.jpg", "/img/glove-tactical-impact.jpg", "/img/lifestyle-mechanic.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ranger-impact-glove';

UPDATE products
   SET image_url = '/img/rockhard-hero.jpg',
       images    = '["/img/rockhard-hero.jpg", "/img/glove-leather-tan.jpg", "/img/glove-tactical-black.jpg", "/img/lifestyle-welder.jpg"]'::jsonb
 WHERE slug = 'demolition-grip-glove';
