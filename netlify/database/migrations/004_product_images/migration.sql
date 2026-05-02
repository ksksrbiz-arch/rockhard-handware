-- 004_product_images: curated photography per product.
-- All URLs verified live before commit.
-- Re-runnable; UPDATE statements are naturally idempotent.

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1605651531144-51381895e23d?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1605651531144-51381895e23d?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'ironclad-tactical-gloves';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'framer-pro-work-glove';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'anvil-leather-glove';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1605651531144-51381895e23d?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'ranger-impact-glove';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'demolition-grip-glove';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1605651531144-51381895e23d?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'cold-storm-glove';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'site-foreman-cap';

UPDATE products
   SET image_url = 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1400&q=80',
       images    = '["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1400&q=80"]'::jsonb
 WHERE slug = 'trade-day-tee';
