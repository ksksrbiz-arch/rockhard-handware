-- 002_seed: starter catalog. Idempotent (upserts on slug).

INSERT INTO products (slug, name, tagline, price, compare_at_price, category, inventory, status)
VALUES
  ('ironclad-tactical-gloves', 'Ironclad Tactical Gloves', 'Cut-resistant. Knuckle-armored. Bombproof.', 48, 58, 'Tactical', 100, 'active'),
  ('framer-pro-work-glove', 'Framer Pro Work Glove', 'Padded palm. Reinforced fingertips.', 38, NULL, 'Work Gloves', 100, 'active'),
  ('anvil-leather-glove', 'Anvil Leather Glove', 'Cowhide everything. Built to outlast.', 42, NULL, 'Work Gloves', 100, 'active'),
  ('ranger-impact-glove', 'Ranger Impact Glove', 'TPR knuckles. Touch-screen tips.', 44, NULL, 'Tactical', 100, 'active'),
  ('demolition-grip-glove', 'Demolition Grip Glove', 'Goatskin palm. Vibration dampening.', 46, NULL, 'Work Gloves', 100, 'active'),
  ('cold-storm-glove', 'Cold Storm Glove', 'Insulated. Waterproof. Sub-zero ready.', 52, NULL, 'Work Gloves', 100, 'active'),
  ('site-foreman-cap', 'Site Foreman Cap', 'Hi-vis trim. Sweat-wicking band.', 26, NULL, 'Accessories', 100, 'active'),
  ('trade-day-tee', 'Trade Day Tee', 'Heavyweight cotton. Built for Mondays.', 32, NULL, 'Accessories', 100, 'active')
ON CONFLICT (slug) DO NOTHING;
