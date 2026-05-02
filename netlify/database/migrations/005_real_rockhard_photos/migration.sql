-- 005_real_rockhard_photos: replaces Unsplash placeholders with real Rockhard product photography
-- for the 5 glove products that have a real photo match.
--
-- Source photos in /public/img/:
--   rockhard-hero.jpg          — branded gauntlet glove + wrench + Rockhard RH metal sign
--   glove-leather-tan.jpg      — tan distressed leather Rockhard work glove + hammer
--   glove-tactical-black.jpg   — black tactical Rockhard glove + power tool
--   lifestyle-framer.jpg       — framer swinging a hammer in tan Rockhard gloves
--   lifestyle-mechanic.jpg     — mechanic under a vehicle in black Rockhard Mechanic Pro gloves
--   lifestyle-welder.jpg       — welder + sparks + Rockhard welding gloves
--
-- Products without a matching real photo (cold-storm-glove, site-foreman-cap, trade-day-tee)
-- keep their 004_product_images Unsplash placeholders.
--
-- Re-runnable: UPDATEs are naturally idempotent.

-- BLACK TACTICAL GLOVES
UPDATE products
   SET image_url = '/img/glove-tactical-black.jpg',
       images    = '["/img/glove-tactical-black.jpg", "/img/lifestyle-mechanic.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ironclad-tactical-gloves';

UPDATE products
   SET image_url = '/img/glove-tactical-black.jpg',
       images    = '["/img/glove-tactical-black.jpg", "/img/lifestyle-mechanic.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ranger-impact-glove';

-- TAN LEATHER GLOVES
UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/lifestyle-framer.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'framer-pro-work-glove';

UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/rockhard-hero.jpg", "/img/lifestyle-framer.jpg"]'::jsonb
 WHERE slug = 'anvil-leather-glove';

-- DEMOLITION GRIP — has tan + black variants, mix both colorways in the gallery
UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/glove-tactical-black.jpg", "/img/lifestyle-mechanic.jpg"]'::jsonb
 WHERE slug = 'demolition-grip-glove';
