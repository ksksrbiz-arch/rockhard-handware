insert into products (slug, name, tagline, price, category, status, inventory)
values
  ('heavy-duty-glove', 'HEAVY DUTY', 'Built for the toughest jobs.', 48, 'Heavy Duty', 'active', 100),
  ('cut-resistant-glove', 'CUT RESISTANT', 'Protection when it matters.', 52, 'Cut Resistant', 'active', 100),
  ('cold-weather-glove', 'COLD WEATHER', 'Stay warm. Keep working.', 58, 'Cold Weather', 'active', 100),
  ('mechanic-glove', 'MECHANIC', 'Precision and performance.', 42, 'Mechanic', 'active', 100),
  ('framer-glove', 'FRAMER PRO', 'Built for the job site.', 46, 'Heavy Duty', 'active', 100),
  ('welder-glove', 'WELDER GAUNTLET', 'Heat-rated. Sparks-ready.', 68, 'Heavy Duty', 'active', 100),
  ('winter-lined-glove', 'ARCTIC LINED', 'Sub-zero rated.', 64, 'Cold Weather', 'active', 100),
  ('impact-glove', 'IMPACT PRO', 'Knuckle armor. Full grip.', 54, 'Mechanic', 'active', 100)
on conflict (slug) do nothing;
