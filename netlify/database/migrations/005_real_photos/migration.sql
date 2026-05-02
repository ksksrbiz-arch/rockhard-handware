-- 005_real_photos: replace Unsplash placeholders with Daryl's real
-- product photography for the 5 glove products that have matching shots.
-- cold-storm-glove, site-foreman-cap, trade-day-tee keep their 004 values.

UPDATE products
   SET image_url = '/img/glove-tactical-black.jpg',
       images    = '["/img/glove-tactical-black.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ironclad-tactical-gloves';

UPDATE products
   SET image_url = '/img/glove-tactical-black.jpg',
       images    = '["/img/glove-tactical-black.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'ranger-impact-glove';

UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/rockhard-hero.jpg", "/img/glove-tactical-black.jpg"]'::jsonb
 WHERE slug = 'framer-pro-work-glove';

UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'anvil-leather-glove';

UPDATE products
   SET image_url = '/img/glove-leather-tan.jpg',
       images    = '["/img/glove-leather-tan.jpg", "/img/glove-tactical-black.jpg", "/img/rockhard-hero.jpg"]'::jsonb
 WHERE slug = 'demolition-grip-glove';
