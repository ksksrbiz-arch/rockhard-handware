-- 003_variants: per-product size/color SKUs.
-- Idempotent — uses sku UNIQUE constraint to skip duplicates on re-apply.

-- ironclad-tactical-gloves
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S', 'RH-ITG-BLA-S', 48, 12, '{"size": "S", "color": "Black"}'::jsonb),
  ('M', 'RH-ITG-BLA-M', 48, 28, '{"size": "M", "color": "Black"}'::jsonb),
  ('L', 'RH-ITG-BLA-L', 48, 36, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL', 'RH-ITG-BLA-XL', 48, 24, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL', 'RH-ITG-BLA-XXL', 48, 0, '{"size": "XXL", "color": "Black"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'ironclad-tactical-gloves'
ON CONFLICT (sku) DO NOTHING;

-- framer-pro-work-glove
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S / Tan', 'RH-FPW-TAN-S', 38, 14, '{"size": "S", "color": "Tan"}'::jsonb),
  ('M / Tan', 'RH-FPW-TAN-M', 38, 26, '{"size": "M", "color": "Tan"}'::jsonb),
  ('L / Tan', 'RH-FPW-TAN-L', 38, 32, '{"size": "L", "color": "Tan"}'::jsonb),
  ('XL / Tan', 'RH-FPW-TAN-XL', 38, 22, '{"size": "XL", "color": "Tan"}'::jsonb),
  ('XXL / Tan', 'RH-FPW-TAN-XXL', 38, 8, '{"size": "XXL", "color": "Tan"}'::jsonb),
  ('S / Black', 'RH-FPW-BLA-S', 38, 14, '{"size": "S", "color": "Black"}'::jsonb),
  ('M / Black', 'RH-FPW-BLA-M', 38, 26, '{"size": "M", "color": "Black"}'::jsonb),
  ('L / Black', 'RH-FPW-BLA-L', 38, 32, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL / Black', 'RH-FPW-BLA-XL', 38, 22, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL / Black', 'RH-FPW-BLA-XXL', 38, 8, '{"size": "XXL", "color": "Black"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'framer-pro-work-glove'
ON CONFLICT (sku) DO NOTHING;

-- anvil-leather-glove
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S', 'RH-ALG-TAN-S', 42, 10, '{"size": "S", "color": "Tan"}'::jsonb),
  ('M', 'RH-ALG-TAN-M', 42, 24, '{"size": "M", "color": "Tan"}'::jsonb),
  ('L', 'RH-ALG-TAN-L', 42, 30, '{"size": "L", "color": "Tan"}'::jsonb),
  ('XL', 'RH-ALG-TAN-XL', 42, 18, '{"size": "XL", "color": "Tan"}'::jsonb),
  ('XXL', 'RH-ALG-TAN-XXL', 42, 4, '{"size": "XXL", "color": "Tan"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'anvil-leather-glove'
ON CONFLICT (sku) DO NOTHING;

-- ranger-impact-glove
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S', 'RH-RIG-BLA-S', 44, 12, '{"size": "S", "color": "Black"}'::jsonb),
  ('M', 'RH-RIG-BLA-M', 44, 26, '{"size": "M", "color": "Black"}'::jsonb),
  ('L', 'RH-RIG-BLA-L', 44, 28, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL', 'RH-RIG-BLA-XL', 44, 0, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL', 'RH-RIG-BLA-XXL', 44, 6, '{"size": "XXL", "color": "Black"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'ranger-impact-glove'
ON CONFLICT (sku) DO NOTHING;

-- demolition-grip-glove
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S / Black', 'RH-DGG-BLA-S', 46, 8, '{"size": "S", "color": "Black"}'::jsonb),
  ('M / Black', 'RH-DGG-BLA-M', 46, 22, '{"size": "M", "color": "Black"}'::jsonb),
  ('L / Black', 'RH-DGG-BLA-L', 46, 28, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL / Black', 'RH-DGG-BLA-XL', 46, 16, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL / Black', 'RH-DGG-BLA-XXL', 46, 4, '{"size": "XXL", "color": "Black"}'::jsonb),
  ('S / Tan', 'RH-DGG-TAN-S', 46, 8, '{"size": "S", "color": "Tan"}'::jsonb),
  ('M / Tan', 'RH-DGG-TAN-M', 46, 22, '{"size": "M", "color": "Tan"}'::jsonb),
  ('L / Tan', 'RH-DGG-TAN-L', 46, 28, '{"size": "L", "color": "Tan"}'::jsonb),
  ('XL / Tan', 'RH-DGG-TAN-XL', 46, 16, '{"size": "XL", "color": "Tan"}'::jsonb),
  ('XXL / Tan', 'RH-DGG-TAN-XXL', 46, 4, '{"size": "XXL", "color": "Tan"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'demolition-grip-glove'
ON CONFLICT (sku) DO NOTHING;

-- cold-storm-glove
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S', 'RH-CSG-BLA-S', 52, 10, '{"size": "S", "color": "Black"}'::jsonb),
  ('M', 'RH-CSG-BLA-M', 52, 18, '{"size": "M", "color": "Black"}'::jsonb),
  ('L', 'RH-CSG-BLA-L', 52, 24, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL', 'RH-CSG-BLA-XL', 52, 14, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL', 'RH-CSG-BLA-XXL', 52, 6, '{"size": "XXL", "color": "Black"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'cold-storm-glove'
ON CONFLICT (sku) DO NOTHING;

-- trade-day-tee
INSERT INTO product_variants (product_id, name, sku, price, inventory, attributes)
SELECT p.id, v.name, v.sku, v.price, v.inventory, v.attrs
FROM products p,
     (VALUES
  ('S', 'RH-TDT-BLA-S', 32, 16, '{"size": "S", "color": "Black"}'::jsonb),
  ('M', 'RH-TDT-BLA-M', 32, 30, '{"size": "M", "color": "Black"}'::jsonb),
  ('L', 'RH-TDT-BLA-L', 32, 26, '{"size": "L", "color": "Black"}'::jsonb),
  ('XL', 'RH-TDT-BLA-XL', 32, 18, '{"size": "XL", "color": "Black"}'::jsonb),
  ('XXL', 'RH-TDT-BLA-XXL', 32, 8, '{"size": "XXL", "color": "Black"}'::jsonb)
     ) AS v(name, sku, price, inventory, attrs)
WHERE p.slug = 'trade-day-tee'
ON CONFLICT (sku) DO NOTHING;
