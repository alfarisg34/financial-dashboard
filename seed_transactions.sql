-- AUTO-GENERATED SEED: transactions.csv
-- Jalankan di Supabase SQL Editor
-- Generated: 2026-05-17T05:06:15.709Z

DO $$
DECLARE
  uid uuid := 'a975a7e0-2c3b-4f49-81a2-f8d3f2de8433';
  cat_id uuid;
  sub_id uuid;
BEGIN

  -- Row 2: 01-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp33.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33000, 'telur 1kg', '2026-01-01T08:00:00+07:00');

  -- Row 3: 01-01-2026 8:00 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp2.244.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2244500, NULL, '2026-01-01T08:00:00+07:00');

  -- Row 4: 05-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp33.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33000, 'telur 1kg', '2026-01-05T08:00:00+07:00');

  -- Row 5: 05-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp13.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13000, 'tahu 1', '2026-01-05T08:00:00+07:00');

  -- Row 6: 06-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp37.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 37000, 'belanja bumbu', '2026-01-06T08:00:00+07:00');

  -- Row 7: 06-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp44.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 44000, 'sayur', '2026-01-06T08:00:00+07:00');

  -- Row 8: 06-01-2026 8:00 | Pemasukan | PENGHASILAN PASIF & LAINNYA | Hadiah / Warisan | Rp1.400.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Pasif & Lainnya' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Hadiah / Warisan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 1400000, 'temen kantor', '2026-01-06T08:00:00+07:00');

  -- Row 9: 06-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp81.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 81000, 'bumbu, sayur', '2026-01-06T08:00:00+07:00');

  -- Row 10: 06-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp60.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60800, 'okamoto, roma sari gandum', '2026-01-06T08:00:00+07:00');

  -- Row 11: 08-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'sayur gado2', '2026-01-08T08:00:00+07:00');

  -- Row 12: 09-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp595.564
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 595564, 'naga', '2026-01-09T08:00:00+07:00');

  -- Row 13: 09-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp6.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 6000, 'parkir naga', '2026-01-09T08:00:00+07:00');

  -- Row 14: 09-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp117.501
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 117501, 'sambal bakar', '2026-01-09T08:00:00+07:00');

  -- Row 15: 09-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'circle k bandara', '2026-01-09T08:00:00+07:00');

  -- Row 16: 09-01-2026 8:00 | Pemasukan | PENGHASILAN PASIF & LAINNYA | Hadiah / Warisan | Rp500.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Pasif & Lainnya' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Hadiah / Warisan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 500000, 'bulek indah', '2026-01-09T08:00:00+07:00');

  -- Row 17: 09-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp48.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 48600, 'kwetiau, wedang, es krim', '2026-01-09T08:00:00+07:00');

  -- Row 18: 10-01-2026 8:00 | Pemasukan | PENGHASILAN PASIF & LAINNYA | Hadiah / Warisan | Rp1.150.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Pasif & Lainnya' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Hadiah / Warisan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 1150000, 'keluarga ayah', '2026-01-10T08:00:00+07:00');

  -- Row 19: 11-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp150.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 150000, 'bensin mobil dan tol', '2026-01-11T08:00:00+07:00');

  -- Row 20: 11-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp46.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 46000, 'kopisoe', '2026-01-11T08:00:00+07:00');

  -- Row 21: 11-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'sakha', '2026-01-11T08:00:00+07:00');

  -- Row 22: 11-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp177.386
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 177386, 'kado mba ciki', '2026-01-11T08:00:00+07:00');

  -- Row 23: 11-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'softex, kiranti', '2026-01-11T08:00:00+07:00');

  -- Row 24: 11-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp53.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 53000, 'gamchi', '2026-01-11T08:00:00+07:00');

  -- Row 25: 12-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp19.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 19000, 'sayur sop, tempe', '2026-01-12T08:00:00+07:00');

  -- Row 26: 13-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'puyo', '2026-01-13T08:00:00+07:00');

  -- Row 27: 13-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp21.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 21000, 'reddog', '2026-01-13T08:00:00+07:00');

  -- Row 28: 13-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp59.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 59000, 'halal guys', '2026-01-13T08:00:00+07:00');

  -- Row 29: 13-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp57.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 57500, 'indomaret. hansaplast, sabun, rexona', '2026-01-13T08:00:00+07:00');

  -- Row 30: 13-01-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp360.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 360000, 'jaket', '2026-01-13T08:00:00+07:00');

  -- Row 31: 13-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp179.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 179900, 'flat shoes', '2026-01-13T08:00:00+07:00');

  -- Row 32: 15-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Clothing | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'jahit baju', '2026-01-15T08:00:00+07:00');

  -- Row 33: 16-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp3.500.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3500000, 'kasur', '2026-01-16T08:00:00+07:00');

  -- Row 34: 16-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp29.100
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 29100, 'mama lemon, teh celup', '2026-01-16T08:00:00+07:00');

  -- Row 35: 16-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'BCBD', '2026-01-16T08:00:00+07:00');

  -- Row 36: 17-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp80.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 80000, 'wisma asri', '2026-01-17T08:00:00+07:00');

  -- Row 37: 18-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp35.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35000, 'mbok darmi', '2026-01-18T08:00:00+07:00');

  -- Row 38: 18-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp325.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 325000, 'ban depan', '2026-01-18T08:00:00+07:00');

  -- Row 39: 19-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Maintenance or Repairs | Rp54.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Maintenance or Repairs' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 54000, 'wallpaper', '2026-01-19T08:00:00+07:00');

  -- Row 40: 20-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp106.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 106000, 'gulai ayam', '2026-01-20T08:00:00+07:00');

  -- Row 41: 20-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'kantin kemnaker', '2026-01-20T08:00:00+07:00');

  -- Row 42: 20-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp122.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 122000, 'jatinangor house', '2026-01-20T08:00:00+07:00');

  -- Row 43: 21-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp68.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 68000, 'kue ultah adek', '2026-01-21T08:00:00+07:00');

  -- Row 44: 21-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp384.013
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 384013, 'hadiah kursi gaming', '2026-01-21T08:00:00+07:00');

  -- Row 45: 21-01-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Family/Adek/My Beb | Rp39.405
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 39405, 'pensil alis', '2026-01-21T08:00:00+07:00');

  -- Row 46: 21-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp32.120
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32120, 'alfamidi', '2026-01-21T08:00:00+07:00');

  -- Row 47: 22-01-2026 8:00 | Pengeluaran | EDUCATION & SELF-IMPROVEMENT | FC & Print | Rp26.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Education & Self-Improvement' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'FC & Print' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 26000, 'print + materai', '2026-01-22T08:00:00+07:00');

  -- Row 48: 22-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp33.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33000, 'mie ayam', '2026-01-22T08:00:00+07:00');

  -- Row 49: 22-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp33.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33500, 'cokro', '2026-01-22T08:00:00+07:00');

  -- Row 50: 23-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp22.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 22000, 'tempe + krupuk', '2026-01-23T08:00:00+07:00');

  -- Row 51: 24-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'parkir', '2026-01-24T08:00:00+07:00');

  -- Row 52: 24-01-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp150.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 150000, 'scaling', '2026-01-24T08:00:00+07:00');

  -- Row 53: 24-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp167.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 167000, 'haka dimsum', '2026-01-24T08:00:00+07:00');

  -- Row 54: 24-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp56.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 56000, 'telur 2kg', '2026-01-24T08:00:00+07:00');

  -- Row 55: 24-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp28.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 28000, 'es krim duren', '2026-01-24T08:00:00+07:00');

  -- Row 56: 25-01-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'mas danu', '2026-01-25T08:00:00+07:00');

  -- Row 57: 25-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'parkir', '2026-01-25T08:00:00+07:00');

  -- Row 58: 25-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp74.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 74000, 'solaria', '2026-01-25T08:00:00+07:00');

  -- Row 59: 25-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'tarobun', '2026-01-25T08:00:00+07:00');

  -- Row 60: 25-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp104.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 104500, 'aeon', '2026-01-25T08:00:00+07:00');

  -- Row 61: 26-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam 1 ekor', '2026-01-26T08:00:00+07:00');

  -- Row 62: 27-01-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp59.334
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 59334, 'ponco hujan', '2026-01-27T08:00:00+07:00');

  -- Row 63: 28-01-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Gas | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gas' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, '2 tabung', '2026-01-28T08:00:00+07:00');

  -- Row 64: 28-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'pastel, sosis', '2026-01-28T08:00:00+07:00');

  -- Row 65: 28-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp74.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 74000, 'padang guci', '2026-01-28T08:00:00+07:00');

  -- Row 66: 28-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-01-28T08:00:00+07:00');

  -- Row 67: 29-01-2026 9:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp32.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32000, 'susu beruang, ritz', '2026-01-29T09:00:00+07:00');

  -- Row 68: 30-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp38.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 38000, 'Bakso', '2026-01-30T08:00:00+07:00');

  -- Row 69: 30-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'Ayam Kalasan', '2026-01-30T08:00:00+07:00');

  -- Row 70: 30-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'broker', '2026-01-30T08:00:00+07:00');

  -- Row 71: 30-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-01-30T08:00:00+07:00');

  -- Row 72: 30-01-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Clothing | Rp629.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 629800, 'excecutive', '2026-01-30T08:00:00+07:00');

  -- Row 73: 30-01-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp16.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 16000, 'obat diare', '2026-01-30T08:00:00+07:00');

  -- Row 74: 31-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, NULL, '2026-01-31T08:00:00+07:00');

  -- Row 75: 31-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp51.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 51000, 'tarobun', '2026-01-31T08:00:00+07:00');

  -- Row 76: 31-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam 12 potong', '2026-01-31T08:00:00+07:00');

  -- Row 77: 31-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'bus jemputan', '2026-01-31T08:00:00+07:00');

  -- Row 78: 31-01-2026 8:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, NULL, '2026-01-31T08:00:00+07:00');

  -- Row 79: 31-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'lumpia semarang', '2026-01-31T08:00:00+07:00');

  -- Row 80: 31-01-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp187.100
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 187100, 'naga', '2026-01-31T08:00:00+07:00');

  -- Row 81: 01-02-2026 8:00 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp2.244.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2244500, NULL, '2026-02-01T08:00:00+07:00');

  -- Row 82: 01-02-2026 8:00 | Pengeluaran | LOANS & DEBTS | Friend (Repayment) | Rp1.200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Loans & Debts' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Friend (Repayment)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1200000, 'utang pc', '2026-02-01T08:00:00+07:00');

  -- Row 83: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp36.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 36000, 'pecel', '2026-02-01T08:00:00+07:00');

  -- Row 84: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'misro cobro', '2026-02-01T08:00:00+07:00');

  -- Row 85: 01-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, NULL, '2026-02-01T08:00:00+07:00');

  -- Row 86: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'bubur', '2026-02-01T08:00:00+07:00');

  -- Row 87: 01-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Water and Sewer | Rp413.100
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Water and Sewer' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 413100, NULL, '2026-02-01T08:00:00+07:00');

  -- Row 88: 01-02-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 200000, 'adek', '2026-02-01T08:00:00+07:00');

  -- Row 89: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'wedang', '2026-02-01T08:00:00+07:00');

  -- Row 90: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'susu beruang', '2026-02-01T08:00:00+07:00');

  -- Row 91: 01-02-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'panadol, paracetamol', '2026-02-01T08:00:00+07:00');

  -- Row 92: 01-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp27.200
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27200, 'susu beruang,ritz,capbadak', '2026-02-01T08:00:00+07:00');

  -- Row 93: 02-02-2026 8:00 | Pemasukan | PENGHASILAN SAMPINGAN | Tunjangan | Rp686.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Sampingan' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 686000, NULL, '2026-02-02T08:00:00+07:00');

  -- Row 94: 02-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam seekor', '2026-02-02T08:00:00+07:00');

  -- Row 95: 03-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'bubur', '2026-02-03T08:00:00+07:00');

  -- Row 96: 03-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp23.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23500, 'tisu', '2026-02-03T08:00:00+07:00');

  -- Row 97: 03-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'sayur', '2026-02-03T08:00:00+07:00');

  -- Row 98: 03-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp23.111
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23111, 'lanyard freshcare', '2026-02-03T08:00:00+07:00');

  -- Row 99: 03-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp14.059
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 14059, 'ikat pinggang', '2026-02-03T08:00:00+07:00');

  -- Row 100: 03-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp32.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32000, 'putih telur', '2026-02-03T08:00:00+07:00');

  -- Row 101: 04-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp37.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 37700, 'happy harvest', '2026-02-04T08:00:00+07:00');

  -- Row 102: 04-02-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp62.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 62000, 'kapas, micelar', '2026-02-04T08:00:00+07:00');

  -- Row 103: 04-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp24.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 24000, 'dkriuk', '2026-02-04T08:00:00+07:00');

  -- Row 104: 04-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'parkir sebulan', '2026-02-04T08:00:00+07:00');

  -- Row 105: 04-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp9.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9900, 'roti', '2026-02-04T08:00:00+07:00');

  -- Row 106: 05-02-2026 8:00 | Pengeluaran | EDUCATION & SELF-IMPROVEMENT | FC & Print | Rp9.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Education & Self-Improvement' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'FC & Print' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9000, 'print', '2026-02-05T08:00:00+07:00');

  -- Row 107: 05-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'tebs', '2026-02-05T08:00:00+07:00');

  -- Row 108: 05-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'pisang mas', '2026-02-05T08:00:00+07:00');

  -- Row 109: 05-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'warteg', '2026-02-05T08:00:00+07:00');

  -- Row 110: 05-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'kripik', '2026-02-05T08:00:00+07:00');

  -- Row 111: 05-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp75.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 75000, NULL, '2026-02-05T08:00:00+07:00');

  -- Row 112: 06-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, 'pasar asri', '2026-02-06T08:00:00+07:00');

  -- Row 113: 06-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp65.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 65600, 'toblerone', '2026-02-06T08:00:00+07:00');

  -- Row 114: 06-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp16.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 16000, 'kopi', '2026-02-06T08:00:00+07:00');

  -- Row 115: 06-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'mizone', '2026-02-06T08:00:00+07:00');

  -- Row 116: 07-02-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'mas farhan', '2026-02-07T08:00:00+07:00');

  -- Row 117: 07-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'gedung nikah', '2026-02-07T08:00:00+07:00');

  -- Row 118: 07-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Toll | Rp53.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Toll' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 53000, 'tol', '2026-02-07T08:00:00+07:00');

  -- Row 119: 07-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Parking | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'summarecon', '2026-02-07T08:00:00+07:00');

  -- Row 120: 07-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Other Entertainment | Rp110.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Other Entertainment' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 110000, 'KAI Bogor-Sukabumi', '2026-02-07T08:00:00+07:00');

  -- Row 121: 07-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp142.065
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 142065, 'toast box', '2026-02-07T08:00:00+07:00');

  -- Row 122: 07-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp291.726
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 291726, 'naga, persiapan romadon', '2026-02-07T08:00:00+07:00');

  -- Row 123: 08-02-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'sedekah ramadhan', '2026-02-08T08:00:00+07:00');

  -- Row 124: 08-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Other Entertainment | Rp386.106
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Other Entertainment' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 386106, 'hotel sukabumi', '2026-02-08T08:00:00+07:00');

  -- Row 125: 08-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'fam cafe', '2026-02-08T08:00:00+07:00');

  -- Row 126: 12-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp14.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 14000, 'roti', '2026-02-12T08:00:00+07:00');

  -- Row 127: 09-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp91.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 91000, 'wisma asri', '2026-02-09T08:00:00+07:00');

  -- Row 128: 12-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'warteg', '2026-02-12T08:00:00+07:00');

  -- Row 129: 10-02-2026 8:00 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp62.740
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 62740, 'cuci muka kkg 2', '2026-02-10T08:00:00+07:00');

  -- Row 130: 10-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Other Entertainment | Rp160.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Other Entertainment' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 160000, 'tkt sukabumi-bogor executive', '2026-02-10T08:00:00+07:00');

  -- Row 131: 11-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'filter mesin cuci', '2026-02-11T08:00:00+07:00');

  -- Row 132: 11-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Maintenance or Repairs | Rp12.043
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Maintenance or Repairs' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12043, 'timer air', '2026-02-11T08:00:00+07:00');

  -- Row 133: 11-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp62.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 62000, 'gantungan pakaian', '2026-02-11T08:00:00+07:00');

  -- Row 134: 11-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp18.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 18000, 'tali tambang', '2026-02-11T08:00:00+07:00');

  -- Row 135: 12-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp38.356
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 38356, 'temperglass', '2026-02-12T08:00:00+07:00');

  -- Row 136: 12-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'kopi,roti', '2026-02-12T08:00:00+07:00');

  -- Row 137: 13-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, NULL, '2026-02-13T08:00:00+07:00');

  -- Row 138: 13-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp2.200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2200000, 'mesin cuci', '2026-02-13T08:00:00+07:00');

  -- Row 139: 14-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp64.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 64000, 'ramen', '2026-02-14T08:00:00+07:00');

  -- Row 140: 14-02-2026 8:00 | Pengeluaran | ENTERTAINMENT & HOBBIES | Streaming (Youtube, Netflix, dll.) | Rp76.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Streaming (Youtube, Netflix, dll.)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 76000, NULL, '2026-02-14T08:00:00+07:00');

  -- Row 141: 14-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'soto mie bogor', '2026-02-14T08:00:00+07:00');

  -- Row 142: 14-02-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'adit,icam', '2026-02-14T08:00:00+07:00');

  -- Row 143: 14-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp67.100
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 67100, 'minyak,tisu', '2026-02-14T08:00:00+07:00');

  -- Row 144: 14-02-2026 8:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp128.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 128000, 'elud', '2026-02-14T08:00:00+07:00');

  -- Row 145: 15-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'krl', '2026-02-15T08:00:00+07:00');

  -- Row 146: 15-02-2026 8:00 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp51.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 51000, 'kuota', '2026-02-15T08:00:00+07:00');

  -- Row 147: 15-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp7.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 7000, 'krl', '2026-02-15T08:00:00+07:00');

  -- Row 148: 15-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp170.910
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 170910, 'dudukan mesin cuci', '2026-02-15T08:00:00+07:00');

  -- Row 149: 15-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp27.730
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27730, 'cover mesin cuci', '2026-02-15T08:00:00+07:00');

  -- Row 150: 15-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp27.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27000, 'maxim ke rmh ppap', '2026-02-15T08:00:00+07:00');

  -- Row 151: 15-02-2026 8:00 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'maxim ke alun', '2026-02-15T08:00:00+07:00');

  -- Row 152: 15-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp59.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 59000, 'di alun alun', '2026-02-15T08:00:00+07:00');

  -- Row 153: 15-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp35.750
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35750, 'sono coffe', '2026-02-15T08:00:00+07:00');

  -- Row 154: 15-02-2026 8:00 | Pengeluaran | HOUSING & UTILITAS | Maintenance or Repairs | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Maintenance or Repairs' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'tukang mesin cuci', '2026-02-15T08:00:00+07:00');

  -- Row 155: 15-02-2026 8:00 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp3.132.760
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3132760, 'tukin', '2026-02-15T08:00:00+07:00');

  -- Row 156: 18-02-2026 8:00 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp527.510
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 527510, 'uang makan', '2026-02-18T08:00:00+07:00');

  -- Row 157: 19-02-2026 16:04 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'takjil', '2026-02-19T16:04:00+07:00');

  -- Row 158: 19-02-2026 20:09 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5800, 'Teh pucuk less sugar', '2026-02-19T20:09:00+07:00');

  -- Row 159: 19-02-2026 22:15 | Pengeluaran | TRANSPORTATION | Parking | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'bebek perdikan', '2026-02-19T22:15:00+07:00');

  -- Row 160: 19-02-2026 22:15 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp152.327
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 152327, 'bukber bebek perdikan', '2026-02-19T22:15:00+07:00');

  -- Row 161: 20-02-2026 12:34 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp57.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 57800, '2 sampo tresemme', '2026-02-20T12:34:00+07:00');

  -- Row 162: 20-02-2026 12:39 | Pemasukan | PENGHASILAN UTAMA | Bonus/Komisi | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bonus/Komisi' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 20000, 'selisih beli elud umi', '2026-02-20T12:39:00+07:00');

  -- Row 163: 20-02-2026 12:41 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp116.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 116000, '3 box elud buat bekasi dan bukber', '2026-02-20T12:41:00+07:00');

  -- Row 164: 20-02-2026 12:41 | Pengeluaran | TRANSPORTATION | Fuel | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'bensin beat', '2026-02-20T12:41:00+07:00');

  -- Row 165: 20-02-2026 12:41 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp105.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 105000, 'sendal sakha dan hilya', '2026-02-20T12:41:00+07:00');

  -- Row 166: 17-02-2026 17:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp79.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 79500, 'richeese', '2026-02-17T17:00:00+07:00');

  -- Row 167: 17-02-2026 17:00 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'parkir richeese', '2026-02-17T17:00:00+07:00');

  -- Row 168: 18-02-2026 8:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp76.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 76000, 'belanja sayur dan ayam', '2026-02-18T08:00:00+07:00');

  -- Row 169: 20-02-2026 16:24 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp2.058.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2058000, 'rapat balai bekasi', '2026-02-20T16:24:00+07:00');

  -- Row 170: 20-02-2026 10:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 200000, 'dp maranggi', '2026-02-20T10:00:00+07:00');

  -- Row 171: 21-02-2026 14:03 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp42.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 42000, 'tepung, kulit lumpia', '2026-02-21T14:03:00+07:00');

  -- Row 172: 21-02-2026 16:05 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp39.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 39500, 'Ring kipas angin', '2026-02-21T16:05:00+07:00');

  -- Row 173: 22-02-2026 14:11 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp13.496
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13496, 'amplop lebaran', '2026-02-22T14:11:00+07:00');

  -- Row 174: 22-02-2026 14:12 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp36.052
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 36052, 'tisu', '2026-02-22T14:12:00+07:00');

  -- Row 175: 22-02-2026 14:13 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp19.081
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 19081, 'tisu basah', '2026-02-22T14:13:00+07:00');

  -- Row 176: 22-02-2026 14:14 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp15.447
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15447, 'lampu tidur', '2026-02-22T14:14:00+07:00');

  -- Row 177: 22-02-2026 14:15 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp32.615
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32615, 'sendal nenis', '2026-02-22T14:15:00+07:00');

  -- Row 178: 22-02-2026 14:16 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp28.355
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 28355, 'keset', '2026-02-22T14:16:00+07:00');

  -- Row 179: 22-02-2026 14:16 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp35.950
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35950, 'jemuran besi', '2026-02-22T14:16:00+07:00');

  -- Row 180: 22-02-2026 14:16 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp21.607
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 21607, 'sapu kasur', '2026-02-22T14:16:00+07:00');

  -- Row 181: 22-02-2026 16:22 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp34.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 34000, 'pasar duta', '2026-02-22T16:22:00+07:00');

  -- Row 182: 22-02-2026 16:23 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp38.300
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 38300, 'tepung titipan umi', '2026-02-22T16:23:00+07:00');

  -- Row 183: 22-02-2026 16:24 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp4.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 4000, 'kulit lumpia', '2026-02-22T16:24:00+07:00');

  -- Row 184: 22-02-2026 17:51 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'corndog', '2026-02-22T17:51:00+07:00');

  -- Row 185: 22-02-2026 19:10 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'Baut kipas', '2026-02-22T19:10:00+07:00');

  -- Row 186: 22-02-2026 19:57 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-02-22T19:57:00+07:00');

  -- Row 187: 22-02-2026 21:02 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp35.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35000, 'Bakso', '2026-02-22T21:02:00+07:00');

  -- Row 188: 22-02-2026 21:02 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-02-22T21:02:00+07:00');

  -- Row 189: 23-02-2026 8:21 | Pengeluaran | TRANSPORTATION | Fuel | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, NULL, '2026-02-23T08:21:00+07:00');

  -- Row 190: 23-02-2026 11:40 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp119.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 119000, 'facial', '2026-02-23T11:40:00+07:00');

  -- Row 191: 23-02-2026 15:57 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'Sumbangan duka', '2026-02-23T15:57:00+07:00');

  -- Row 192: 23-02-2026 15:57 | Pengeluaran | TRANSPORTATION | Fuel | Rp72.782
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 72782, NULL, '2026-02-23T15:57:00+07:00');

  -- Row 193: 23-02-2026 15:59 | Pengeluaran | FIXED BILLS & INSURANCE | Taxes (Admin Fee/Bank) | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Taxes (Admin Fee/Bank)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, NULL, '2026-02-23T15:59:00+07:00');

  -- Row 194: 23-02-2026 15:57 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'satpam dompet ilang', '2026-02-23T15:57:00+07:00');

  -- Row 195: 24-02-2026 10:22 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp96.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 96800, 'sampo, telur, saos, mie', '2026-02-24T10:22:00+07:00');

  -- Row 196: 24-02-2026 10:23 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'tahu tempe', '2026-02-24T10:23:00+07:00');

  -- Row 197: 24-02-2026 12:44 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp48.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 48000, 'teh botol 1 dus', '2026-02-24T12:44:00+07:00');

  -- Row 198: 24-02-2026 15:25 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp22.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 22000, 'Kopi jago', '2026-02-24T15:25:00+07:00');

  -- Row 199: 25-02-2026 21:41 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'es batu', '2026-02-25T21:41:00+07:00');

  -- Row 200: 26-02-2026 10:38 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp57.120
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 57120, 'setelan hitam', '2026-02-26T10:38:00+07:00');

  -- Row 201: 26-02-2026 15:23 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp55.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 55000, 'Neurobion, Sangobion', '2026-02-26T15:23:00+07:00');

  -- Row 202: 26-02-2026 21:29 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'cukur', '2026-02-26T21:29:00+07:00');

  -- Row 203: 26-02-2026 21:29 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp32.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32000, 'burger kfc', '2026-02-26T21:29:00+07:00');

  -- Row 204: 26-02-2026 21:29 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp64.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 64800, 'roll on, dettol, wipol', '2026-02-26T21:29:00+07:00');

  -- Row 205: 28-02-2026 10:41 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'cabe keriting', '2026-02-28T10:41:00+07:00');

  -- Row 206: 28-02-2026 10:42 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'cabe merah', '2026-02-28T10:42:00+07:00');

  -- Row 207: 28-02-2026 11:02 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'penguis', '2026-02-28T11:02:00+07:00');

  -- Row 208: 28-02-2026 11:02 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'golden city', '2026-02-28T11:02:00+07:00');

  -- Row 209: 28-02-2026 11:03 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'permak celana', '2026-02-28T11:03:00+07:00');

  -- Row 210: 28-02-2026 20:25 | Pengeluaran | TRANSPORTATION | Fuel | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, NULL, '2026-02-28T20:25:00+07:00');

  -- Row 211: 28-02-2026 20:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'Pizze Hut', '2026-02-28T20:25:00+07:00');

  -- Row 212: 28-02-2026 20:26 | Pengeluaran | TRANSPORTATION | Parking | Rp8.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 8000, NULL, '2026-02-28T20:26:00+07:00');

  -- Row 213: 28-02-2026 20:26 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, NULL, '2026-02-28T20:26:00+07:00');

  -- Row 214: 28-02-2026 20:27 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'Sate Padang', '2026-02-28T20:27:00+07:00');

  -- Row 215: 28-02-2026 20:28 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-02-28T20:28:00+07:00');

  -- Row 216: 28-02-2026 20:51 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'pizza hut', '2026-02-28T20:51:00+07:00');

  -- Row 217: 01-03-2026 5:39 | Pengeluaran | HOUSING & UTILITAS | Water and Sewer | Rp307.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Water and Sewer' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 307500, 'pdam maret', '2026-03-01T05:39:00+07:00');

  -- Row 218: 01-03-2026 5:39 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 200000, NULL, '2026-03-01T05:39:00+07:00');

  -- Row 219: 01-03-2026 5:40 | Pengeluaran | FIXED BILLS & INSURANCE | Health Insurance | Rp37.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Health Insurance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 37500, NULL, '2026-03-01T05:40:00+07:00');

  -- Row 220: 01-03-2026 5:40 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'kuota nenis', '2026-03-01T05:40:00+07:00');

  -- Row 221: 01-03-2026 11:37 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp2.244.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2244500, NULL, '2026-03-01T11:37:00+07:00');

  -- Row 222: 01-03-2026 6:10 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp80.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 80000, 'pasar asri', '2026-03-01T06:10:00+07:00');

  -- Row 223: 01-03-2026 13:30 | Pengeluaran | LOANS & DEBTS | Friend (Repayment) | Rp1.200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Loans & Debts' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Friend (Repayment)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1200000, NULL, '2026-03-01T13:30:00+07:00');

  -- Row 224: 01-03-2026 12:56 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'es', '2026-03-01T12:56:00+07:00');

  -- Row 225: 01-03-2026 17:40 | Pengeluaran | HOUSING & UTILITAS | Maintenance or Repairs | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Maintenance or Repairs' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'Perbaikan kipas angin', '2026-03-01T17:40:00+07:00');

  -- Row 226: 02-03-2026 14:09 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp1.360.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 1360000, 'Rapat bekasi', '2026-03-02T14:09:00+07:00');

  -- Row 227: 03-03-2026 14:18 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp102.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 102500, 'Zakat fitrah', '2026-03-03T14:18:00+07:00');

  -- Row 228: 03-03-2026 16:13 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'Cuci motor', '2026-03-03T16:13:00+07:00');

  -- Row 229: 03-03-2026 16:13 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp85.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 85500, 'Oli mesin, Oli gardan', '2026-03-03T16:13:00+07:00');

  -- Row 230: 03-03-2026 16:31 | Pengeluaran | TRANSPORTATION | Fuel | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, NULL, '2026-03-03T16:31:00+07:00');

  -- Row 231: 04-03-2026 9:41 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp45.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45000, 'ayam', '2026-03-04T09:41:00+07:00');

  -- Row 232: 05-03-2026 12:47 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp42.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 42500, NULL, '2026-03-05T12:47:00+07:00');

  -- Row 233: 05-03-2026 12:51 | Pengeluaran | TRANSPORTATION | Parking | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'Member sebulan', '2026-03-05T12:51:00+07:00');

  -- Row 234: 04-03-2026 20:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'es batu', '2026-03-04T20:00:00+07:00');

  -- Row 235: 05-03-2026 18:10 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'kanebo', '2026-03-05T18:10:00+07:00');

  -- Row 236: 05-03-2026 21:17 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp28.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 28900, 'odol dan sabun', '2026-03-05T21:17:00+07:00');

  -- Row 237: 05-03-2026 21:17 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp63.400
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 63400, 'bear brand, lasegar', '2026-03-05T21:17:00+07:00');

  -- Row 238: 06-03-2026 9:21 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp3.132.760
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3132760, 'Tukin', '2026-03-06T09:21:00+07:00');

  -- Row 239: 07-03-2026 11:13 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp61.057
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 61057, 'Thumbgrip joystick', '2026-03-07T11:13:00+07:00');

  -- Row 240: 07-03-2026 20:46 | Pengeluaran | TRANSPORTATION | Parking | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'kota bintang', '2026-03-07T20:46:00+07:00');

  -- Row 241: 07-03-2026 21:53 | Pengeluaran | TRANSPORTATION | Fuel | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'mobil kota bintang', '2026-03-07T21:53:00+07:00');

  -- Row 242: 08-03-2026 12:58 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'naga', '2026-03-08T12:58:00+07:00');

  -- Row 243: 08-03-2026 12:58 | Pengeluaran | TRANSPORTATION | Fuel | Rp47.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 47000, 'nmax', '2026-03-08T12:58:00+07:00');

  -- Row 244: 08-03-2026 16:49 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.350
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5350, 'naga', '2026-03-08T16:49:00+07:00');

  -- Row 245: 08-03-2026 16:49 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp23.685
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23685, 'molto, sabun', '2026-03-08T16:49:00+07:00');

  -- Row 246: 08-03-2026 16:49 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp88.833
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 88833, 'bukber mba dona', '2026-03-08T16:49:00+07:00');

  -- Row 247: 08-03-2026 21:30 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp13.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13000, 'teh pucuk', '2026-03-08T21:30:00+07:00');

  -- Row 248: 09-03-2026 10:09 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp45.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45000, 'ayam', '2026-03-09T10:09:00+07:00');

  -- Row 249: 09-03-2026 11:20 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'jeruk', '2026-03-09T11:20:00+07:00');

  -- Row 250: 09-03-2026 12:43 | Pemasukan | PENGHASILAN UTAMA | THR/Gaji ke-13 | Rp2.486.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'THR/Gaji ke-13' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2486000, 'THR gapok only', '2026-03-09T12:43:00+07:00');

  -- Row 251: 09-03-2026 19:25 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp16.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 16000, 'bekasi lenteng agung', '2026-03-09T19:25:00+07:00');

  -- Row 252: 09-03-2026 19:26 | Pengeluaran | TRANSPORTATION | Parking | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'parkir stasiun', '2026-03-09T19:26:00+07:00');

  -- Row 253: 09-03-2026 19:26 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'takjil', '2026-03-09T19:26:00+07:00');

  -- Row 254: 10-03-2026 11:56 | Pemasukan | PENGHASILAN UTAMA | THR/Gaji ke-13 | Rp3.132.760
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'THR/Gaji ke-13' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3132760, 'THR tukin', '2026-03-10T11:56:00+07:00');

  -- Row 255: 10-03-2026 12:41 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp500.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 500000, 'THR sepupu', '2026-03-10T12:41:00+07:00');

  -- Row 256: 10-03-2026 12:42 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp300.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 300000, 'THR ponakan', '2026-03-10T12:42:00+07:00');

  -- Row 257: 10-03-2026 12:45 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp1.000.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1000000, 'THR my beb', '2026-03-10T12:45:00+07:00');

  -- Row 258: 10-03-2026 12:46 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp250.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 250000, 'THR ayah ibu', '2026-03-10T12:46:00+07:00');

  -- Row 259: 10-03-2026 15:49 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp10.940
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10940, 'pouch gantung', '2026-03-10T15:49:00+07:00');

  -- Row 260: 10-03-2026 15:50 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp11.989
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 11989, 'tas ke masjid', '2026-03-10T15:50:00+07:00');

  -- Row 261: 10-03-2026 15:51 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp27.949
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27949, 'rak rinso', '2026-03-10T15:51:00+07:00');

  -- Row 262: 10-03-2026 15:51 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp107.459
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 107459, 'kotak bekal', '2026-03-10T15:51:00+07:00');

  -- Row 263: 10-03-2026 15:52 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp58.002
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 58002, 'keranjang baju bersih', '2026-03-10T15:52:00+07:00');

  -- Row 264: 10-03-2026 21:25 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp4.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 4000, 'goodie bag', '2026-03-10T21:25:00+07:00');

  -- Row 265: 10-03-2026 21:25 | Pengeluaran | TRANSPORTATION | Bus/Taxi Fare | Rp23.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Bus/Taxi Fare' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23500, 'bukber hansel', '2026-03-10T21:25:00+07:00');

  -- Row 266: 11-03-2026 20:51 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp340.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 340500, 'Aki, bearing', '2026-03-11T20:51:00+07:00');

  -- Row 267: 12-03-2026 10:44 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp75.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 75000, 'micellar; kapas', '2026-03-12T10:44:00+07:00');

  -- Row 268: 12-03-2026 10:44 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'patungan halbil', '2026-03-12T10:44:00+07:00');

  -- Row 269: 12-03-2026 11:52 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp562.400
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 562400, 'Uang makan', '2026-03-12T11:52:00+07:00');

  -- Row 270: 12-03-2026 16:12 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp74.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 74000, 'Alpro obat tensi', '2026-03-12T16:12:00+07:00');

  -- Row 271: 13-03-2026 21:06 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp53.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 53000, 'bakso sri raja wisma asri', '2026-03-13T21:06:00+07:00');

  -- Row 272: 13-03-2026 21:06 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'dimsum keju goreng', '2026-03-13T21:06:00+07:00');

  -- Row 273: 14-03-2026 20:39 | Pengeluaran | TRANSPORTATION | Fuel | Rp73.844
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 73844, NULL, '2026-03-14T20:39:00+07:00');

  -- Row 274: 14-03-2026 20:39 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp680.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 680000, NULL, '2026-03-14T20:39:00+07:00');

  -- Row 275: 14-03-2026 20:40 | Pengeluaran | PERSONAL CARE & HEALTH | Clothing | Rp517.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Clothing' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 517900, 'Matahari', '2026-03-14T20:40:00+07:00');

  -- Row 276: 14-03-2026 21:24 | Pengeluaran | TRANSPORTATION | Parking | Rp9.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9000, 'mm', '2026-03-14T21:24:00+07:00');

  -- Row 277: 14-03-2026 21:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp129.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 129000, 'wingstop', '2026-03-14T21:25:00+07:00');

  -- Row 278: 15-03-2026 15:45 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp31.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 31500, 'ayam', '2026-03-15T15:45:00+07:00');

  -- Row 279: 15-03-2026 15:45 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'sayur tahu tempe', '2026-03-15T15:45:00+07:00');

  -- Row 280: 15-03-2026 21:46 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp6.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 6000, 'es batu dan jajan', '2026-03-15T21:46:00+07:00');

  -- Row 281: 16-03-2026 12:08 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'proyek', '2026-03-16T12:08:00+07:00');

  -- Row 282: 16-03-2026 12:08 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'ban beat', '2026-03-16T12:08:00+07:00');

  -- Row 283: 16-03-2026 19:29 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp57.400
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 57400, 'snack indomaret', '2026-03-16T19:29:00+07:00');

  -- Row 284: 16-03-2026 19:49 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'tahu bakso', '2026-03-16T19:49:00+07:00');

  -- Row 285: 16-03-2026 20:15 | Pengeluaran | TRANSPORTATION | Fuel | Rp27.754
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27754, NULL, '2026-03-16T20:15:00+07:00');

  -- Row 286: 16-03-2026 20:04 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'Masker', '2026-03-16T20:04:00+07:00');

  -- Row 287: 17-03-2026 10:07 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'camay', '2026-03-17T10:07:00+07:00');

  -- Row 288: 17-03-2026 10:22 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'es batu', '2026-03-17T10:22:00+07:00');

  -- Row 289: 18-03-2026 10:22 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'parkir pasar', '2026-03-18T10:22:00+07:00');

  -- Row 290: 18-03-2026 10:23 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp28.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 28000, 'dumpling', '2026-03-18T10:23:00+07:00');

  -- Row 291: 18-03-2026 10:23 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'bumbu lebaran', '2026-03-18T10:23:00+07:00');

  -- Row 292: 18-03-2026 16:49 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp4.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 4000, 'es batu', '2026-03-18T16:49:00+07:00');

  -- Row 293: 18-03-2026 18:05 | Pengeluaran | HOUSING & UTILITAS | Gas | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gas' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, NULL, '2026-03-18T18:05:00+07:00');

  -- Row 294: 18-03-2026 20:17 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp31.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 31600, 'kopi indomaret', '2026-03-18T20:17:00+07:00');

  -- Row 295: 18-03-2026 21:48 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp4.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 4500, 'teh botol less sugar', '2026-03-18T21:48:00+07:00');

  -- Row 296: 18-03-2026 21:48 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'otak2', '2026-03-18T21:48:00+07:00');

  -- Row 297: 19-03-2026 14:40 | Pengeluaran | TRANSPORTATION | Toll | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Toll' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'bni tap cash', '2026-03-19T14:40:00+07:00');

  -- Row 298: 19-03-2026 21:09 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'doorprize', '2026-03-19T21:09:00+07:00');

  -- Row 299: 19-03-2026 21:09 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp67.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 67000, 'solaria', '2026-03-19T21:09:00+07:00');

  -- Row 300: 19-03-2026 21:10 | Pengeluaran | TRANSPORTATION | Parking | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'solaria', '2026-03-19T21:10:00+07:00');

  -- Row 301: 19-03-2026 21:10 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp16.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 16000, 'kopi janjiw', '2026-03-19T21:10:00+07:00');

  -- Row 302: 19-03-2026 21:10 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp700.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 700000, 'kulkas', '2026-03-19T21:10:00+07:00');

  -- Row 303: 20-03-2026 12:11 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'pasar', '2026-03-20T12:11:00+07:00');

  -- Row 304: 20-03-2026 12:12 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'tempe', '2026-03-20T12:12:00+07:00');

  -- Row 305: 20-03-2026 14:43 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'Cuci mobil', '2026-03-20T14:43:00+07:00');

  -- Row 306: 20-03-2026 14:43 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'Isi ban mobil', '2026-03-20T14:43:00+07:00');

  -- Row 307: 21-03-2026 13:19 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp68.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 68600, 'kacang, teh', '2026-03-21T13:19:00+07:00');

  -- Row 308: 21-03-2026 21:10 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp33.200
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33200, 'neurobion', '2026-03-21T21:10:00+07:00');

  -- Row 309: 22-03-2026 12:33 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'Kopi nescafe indomaret', '2026-03-22T12:33:00+07:00');

  -- Row 310: 22-03-2026 15:17 | Pengeluaran | TRANSPORTATION | Parking | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'masjid', '2026-03-22T15:17:00+07:00');

  -- Row 311: 22-03-2026 15:19 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp13.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13000, 'jus alpukat', '2026-03-22T15:19:00+07:00');

  -- Row 312: 23-03-2026 18:16 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp46.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 46000, 'sarapan', '2026-03-23T18:16:00+07:00');

  -- Row 313: 23-03-2026 18:17 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp32.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32000, 'sarapan', '2026-03-23T18:17:00+07:00');

  -- Row 314: 23-03-2026 18:18 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'kapas', '2026-03-23T18:18:00+07:00');

  -- Row 315: 24-03-2026 20:34 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'burayot', '2026-03-24T20:34:00+07:00');

  -- Row 316: 25-03-2026 14:21 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp140.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 140000, 'in parfume', '2026-03-25T14:21:00+07:00');

  -- Row 317: 25-03-2026 20:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'ayam', '2026-03-25T20:00:00+07:00');

  -- Row 318: 25-03-2026 20:00 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp203.532
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 203532, 'naga', '2026-03-25T20:00:00+07:00');

  -- Row 319: 26-03-2026 16:03 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp23.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23000, 'lauk', '2026-03-26T16:03:00+07:00');

  -- Row 320: 26-03-2026 21:54 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'cimol', '2026-03-26T21:54:00+07:00');

  -- Row 321: 26-03-2026 21:55 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp36.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 36000, 'bakso', '2026-03-26T21:55:00+07:00');

  -- Row 322: 27-03-2026 7:49 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp27.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 27000, 'sayur', '2026-03-27T07:49:00+07:00');

  -- Row 323: 27-03-2026 7:50 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp45.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45000, 'ayam 12 potong', '2026-03-27T07:50:00+07:00');

  -- Row 324: 27-03-2026 7:51 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'bubur', '2026-03-27T07:51:00+07:00');

  -- Row 325: 27-03-2026 7:51 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp36.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 36000, 'semangka makwo', '2026-03-27T07:51:00+07:00');

  -- Row 326: 27-03-2026 11:14 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp13.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13000, 'pepaya', '2026-03-27T11:14:00+07:00');

  -- Row 327: 27-03-2026 12:04 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, NULL, '2026-03-27T12:04:00+07:00');

  -- Row 328: 27-03-2026 12:04 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp61.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 61000, 'Kopi selama lebaran', '2026-03-27T12:04:00+07:00');

  -- Row 329: 27-03-2026 12:05 | Pengeluaran | ENTERTAINMENT & HOBBIES | Games | Rp129.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Games' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 129000, 'Detroit, COD', '2026-03-27T12:05:00+07:00');

  -- Row 330: 27-03-2026 12:05 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp77.050
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 77050, 'Kabel cas c to c', '2026-03-27T12:05:00+07:00');

  -- Row 331: 27-03-2026 12:06 | Pengeluaran | FIXED BILLS & INSURANCE | Taxes (Admin Fee/Bank) | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Taxes (Admin Fee/Bank)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, NULL, '2026-03-27T12:06:00+07:00');

  -- Row 332: 27-03-2026 13:43 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'sakha', '2026-03-27T13:43:00+07:00');

  -- Row 333: 27-03-2026 13:44 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp40.296
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40296, 'holand + pajak', '2026-03-27T13:44:00+07:00');

  -- Row 334: 29-03-2026 19:39 | Pengeluaran | ENTERTAINMENT & HOBBIES | Electronic | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Electronic' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'jual barang bekas + beli monitor', '2026-03-29T19:39:00+07:00');

  -- Row 335: 29-03-2026 19:40 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp110.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 110000, 'mie aceh kak salma', '2026-03-29T19:40:00+07:00');

  -- Row 336: 29-03-2026 19:40 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp74.400
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 74400, 'Hokkaido cheese tart', '2026-03-29T19:40:00+07:00');

  -- Row 337: 29-03-2026 19:41 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam bakar kalasan', '2026-03-29T19:41:00+07:00');

  -- Row 338: 31-03-2026 9:50 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp24.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 24600, 'sarden maya', '2026-03-31T09:50:00+07:00');

  -- Row 339: 31-03-2026 9:50 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'sayur lodeh', '2026-03-31T09:50:00+07:00');

  -- Row 340: 31-03-2026 12:29 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp93.200
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 93200, 'usb hub', '2026-03-31T12:29:00+07:00');

  -- Row 341: 31-03-2026 17:38 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp41.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 41000, 'Kebab Republik', '2026-03-31T17:38:00+07:00');

  -- Row 342: 31-03-2026 17:38 | Pengeluaran | TRANSPORTATION | Fuel | Rp75.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 75000, NULL, '2026-03-31T17:38:00+07:00');

  -- Row 343: 31-03-2026 18:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, '1 bal es kristal', '2026-03-31T18:00:00+07:00');

  -- Row 344: 01-04-2026 5:06 | Pengeluaran | HOUSING & UTILITAS | Water and Sewer | Rp252.200
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Water and Sewer' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 252200, 'pdam', '2026-04-01T05:06:00+07:00');

  -- Row 345: 01-04-2026 5:21 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 200000, NULL, '2026-04-01T05:21:00+07:00');

  -- Row 346: 01-04-2026 5:21 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'kuota 13gb nenis', '2026-04-01T05:21:00+07:00');

  -- Row 347: 01-04-2026 5:21 | Pengeluaran | FIXED BILLS & INSURANCE | Health Insurance | Rp37.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Health Insurance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 37500, 'bpjs nenis', '2026-04-01T05:21:00+07:00');

  -- Row 348: 01-04-2026 10:57 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp2.244.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2244500, NULL, '2026-04-01T10:57:00+07:00');

  -- Row 349: 01-04-2026 11:08 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp279.658
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 279658, 'naga', '2026-04-01T11:08:00+07:00');

  -- Row 350: 01-04-2026 11:08 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp19.440
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 19440, 'naga', '2026-04-01T11:08:00+07:00');

  -- Row 351: 01-04-2026 11:09 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp180.560
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 180560, 'naga', '2026-04-01T11:09:00+07:00');

  -- Row 352: 01-04-2026 11:09 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'ramen bajuri', '2026-04-01T11:09:00+07:00');

  -- Row 353: 01-04-2026 20:16 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp37.400
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 37400, 'ramen bajuri', '2026-04-01T20:16:00+07:00');

  -- Row 354: 01-04-2026 20:17 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp34.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 34000, 'bioplacenton', '2026-04-01T20:17:00+07:00');

  -- Row 355: 01-04-2026 20:18 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp22.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 22000, 'sabana', '2026-04-01T20:18:00+07:00');

  -- Row 356: 03-04-2026 9:42 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'aicha', '2026-04-03T09:42:00+07:00');

  -- Row 357: 03-04-2026 9:42 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp45.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45000, 'bubur', '2026-04-03T09:42:00+07:00');

  -- Row 358: 03-04-2026 11:57 | Pengeluaran | TRANSPORTATION | Parking | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'Member parkir 2 bulan', '2026-04-03T11:57:00+07:00');

  -- Row 359: 02-04-2026 19:42 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, 'aicha', '2026-04-02T19:42:00+07:00');

  -- Row 360: 03-04-2026 7:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'bolu', '2026-04-03T07:00:00+07:00');

  -- Row 361: 03-04-2026 19:15 | Pengeluaran | ENTERTAINMENT & HOBBIES | Other Entertainment | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Other Entertainment' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'fotobox', '2026-04-03T19:15:00+07:00');

  -- Row 362: 03-04-2026 19:15 | Pengeluaran | HOUSING & UTILITAS | Gas | Rp150.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gas' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 150000, '3 tabung', '2026-04-03T19:15:00+07:00');

  -- Row 363: 03-04-2026 19:18 | Pemasukan | PENGHASILAN SAMPINGAN | Other Sampingan | Rp500.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Sampingan' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Other Sampingan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 500000, 'sisa bulan maret', '2026-04-03T19:18:00+07:00');

  -- Row 364: 03-04-2026 19:23 | Pengeluaran | LOANS & DEBTS | Friend (Repayment) | Rp1.200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Loans & Debts' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Friend (Repayment)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1200000, 'cicilan pc', '2026-04-03T19:23:00+07:00');

  -- Row 365: 04-04-2026 16:15 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp23.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23000, 'ayam', '2026-04-04T16:15:00+07:00');

  -- Row 366: 04-04-2026 16:16 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'Kopi sj', '2026-04-04T16:16:00+07:00');

  -- Row 367: 04-04-2026 20:08 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'bakso mie ayam', '2026-04-04T20:08:00+07:00');

  -- Row 368: 05-04-2026 7:43 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp126.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 126000, 'Nasduk', '2026-04-05T07:43:00+07:00');

  -- Row 369: 05-04-2026 15:34 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp126.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 126000, 'steak ultah wisma asri', '2026-04-05T15:34:00+07:00');

  -- Row 370: 05-04-2026 20:28 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp19.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 19500, 'susu', '2026-04-05T20:28:00+07:00');

  -- Row 371: 06-04-2026 9:46 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam', '2026-04-06T09:46:00+07:00');

  -- Row 372: 06-04-2026 9:47 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp34.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 34000, 'telur', '2026-04-06T09:47:00+07:00');

  -- Row 373: 06-04-2026 9:47 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp148.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 148000, 'bcbd cirebon', '2026-04-06T09:47:00+07:00');

  -- Row 374: 06-04-2026 11:07 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'camay', '2026-04-06T11:07:00+07:00');

  -- Row 375: 06-04-2026 19:50 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp16.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 16700, 'es krim', '2026-04-06T19:50:00+07:00');

  -- Row 376: 07-04-2026 19:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp29.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 29000, 'lawson', '2026-04-07T19:00:00+07:00');

  -- Row 377: 08-04-2026 9:47 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp13.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 13000, 'es batu', '2026-04-08T09:47:00+07:00');

  -- Row 378: 09-04-2026 9:15 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp45.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45000, 'camay', '2026-04-09T09:15:00+07:00');

  -- Row 379: 10-04-2026 11:00 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp54.200
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 54200, 'micellar facetology', '2026-04-10T11:00:00+07:00');

  -- Row 380: 10-04-2026 19:15 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'moji', '2026-04-10T19:15:00+07:00');

  -- Row 381: 12-04-2026 7:13 | Pengeluaran | TRANSPORTATION | Parking | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'e money', '2026-04-12T07:13:00+07:00');

  -- Row 382: 12-04-2026 16:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, 'iga bakar kayuringin', '2026-04-12T16:25:00+07:00');

  -- Row 383: 12-04-2026 16:26 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp21.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 21000, 'snack nonton', '2026-04-12T16:26:00+07:00');

  -- Row 384: 13-04-2026 18:53 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp22.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 22000, 'jus dan misro', '2026-04-13T18:53:00+07:00');

  -- Row 385: 14-04-2026 15:58 | Pengeluaran | TRANSPORTATION | Fuel | Rp80.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 80000, NULL, '2026-04-14T15:58:00+07:00');

  -- Row 386: 14-04-2026 15:59 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'Angin ban', '2026-04-14T15:59:00+07:00');

  -- Row 387: 14-04-2026 15:59 | Pengeluaran | HOUSING & UTILITAS | Household Supplies | Rp66.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Household Supplies' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 66000, 'Sabun Muka, Tisu basah di Kantor', '2026-04-14T15:59:00+07:00');

  -- Row 388: 14-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp34.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 34000, 'Susu, kiranti', '2026-04-14T16:00:00+07:00');

  -- Row 389: 14-04-2026 16:00 | Pengeluaran | TRANSPORTATION | Fuel | Rp73.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 73000, NULL, '2026-04-14T16:00:00+07:00');

  -- Row 390: 14-04-2026 16:00 | Pengeluaran | TRANSPORTATION | Parking | Rp9.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9000, NULL, '2026-04-14T16:00:00+07:00');

  -- Row 391: 14-04-2026 16:00 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'Batik Pak Ses', '2026-04-14T16:00:00+07:00');

  -- Row 392: 14-04-2026 16:01 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'Batagor, kue apem', '2026-04-14T16:01:00+07:00');

  -- Row 393: 14-04-2026 18:49 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, 'camay', '2026-04-14T18:49:00+07:00');

  -- Row 394: 14-04-2026 18:49 | Pengeluaran | HOUSING & UTILITAS | Maintenance or Repairs | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Maintenance or Repairs' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'cuci ac', '2026-04-14T18:49:00+07:00');

  -- Row 395: 14-04-2026 18:50 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp11.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 11000, 'asam mefenamat', '2026-04-14T18:50:00+07:00');

  -- Row 396: 14-04-2026 18:52 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp3.123.362
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3123362, 'tukin', '2026-04-14T18:52:00+07:00');

  -- Row 397: 15-04-2026 13:25 | Pengeluaran | ENTERTAINMENT & HOBBIES | Streaming (Youtube, Netflix, dll.) | Rp76.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Streaming (Youtube, Netflix, dll.)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 76000, NULL, '2026-04-15T13:25:00+07:00');

  -- Row 398: 15-04-2026 13:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'Nasduk', '2026-04-15T13:25:00+07:00');

  -- Row 399: 15-04-2026 16:49 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp585.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 585000, 'MCU', '2026-04-15T16:49:00+07:00');

  -- Row 400: 15-04-2026 21:24 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'puskesmas', '2026-04-15T21:24:00+07:00');

  -- Row 401: 15-04-2026 21:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'bubur', '2026-04-15T21:25:00+07:00');

  -- Row 402: 15-04-2026 21:25 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'dkriuk', '2026-04-15T21:25:00+07:00');

  -- Row 403: 15-04-2026 21:25 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp32.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 32000, 'mi yamin', '2026-04-15T21:25:00+07:00');

  -- Row 404: 15-04-2026 21:26 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'tip shopeefood', '2026-04-15T21:26:00+07:00');

  -- Row 405: 15-04-2026 21:26 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp26.560
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 26560, 'roti bakar', '2026-04-15T21:26:00+07:00');

  -- Row 406: 17-04-2026 19:11 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, NULL, '2026-04-17T19:11:00+07:00');

  -- Row 407: 17-04-2026 19:12 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp77.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 77000, 'Lawson, cokro', '2026-04-17T19:12:00+07:00');

  -- Row 408: 18-04-2026 9:42 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp45.800
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 45800, 'Body soap, korek kuping, shave', '2026-04-18T09:42:00+07:00');

  -- Row 409: 31-01-2026 19:40 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp3.132.760
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3132760, NULL, '2026-01-31T19:40:00+07:00');

  -- Row 410: 31-01-2026 19:43 | Pengeluaran | HOUSING & UTILITAS | Water and Sewer | Rp254.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Water and Sewer' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 254700, NULL, '2026-01-31T19:43:00+07:00');

  -- Row 411: 20-04-2026 8:27 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'es kelapa', '2026-04-20T08:27:00+07:00');

  -- Row 412: 20-04-2026 8:27 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'Jus mangga', '2026-04-20T08:27:00+07:00');

  -- Row 413: 20-04-2026 8:28 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp6.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 6000, 'isi angin', '2026-04-20T08:28:00+07:00');

  -- Row 414: 20-04-2026 8:28 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp25.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 25000, 'elud', '2026-04-20T08:28:00+07:00');

  -- Row 415: 20-04-2026 8:28 | Pengeluaran | TRANSPORTATION | Fuel | Rp51.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 51000, NULL, '2026-04-20T08:28:00+07:00');

  -- Row 416: 20-04-2026 8:28 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp33.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 33000, 'korek kuping, alat cukur jenggot', '2026-04-20T08:28:00+07:00');

  -- Row 417: 20-04-2026 8:29 | Pengeluaran | PERSONAL CARE & HEALTH | Medical | Rp52.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Medical' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 52000, 'obat tensi', '2026-04-20T08:29:00+07:00');

  -- Row 418: 25-04-2026 7:59 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp527.250
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 527250, 'Uang makan', '2026-04-25T07:59:00+07:00');

  -- Row 419: 25-04-2026 8:00 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp560.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 560000, 'DL', '2026-04-25T08:00:00+07:00');

  -- Row 420: 25-04-2026 8:03 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp5.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5000, 'Gorengan', '2026-04-25T08:03:00+07:00');

  -- Row 421: 25-04-2026 8:03 | Pengeluaran | FIXED BILLS & INSURANCE | Taxes (Admin Fee/Bank) | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Taxes (Admin Fee/Bank)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, NULL, '2026-04-25T08:03:00+07:00');

  -- Row 422: 25-04-2026 8:03 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp9.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9700, NULL, '2026-04-25T08:03:00+07:00');

  -- Row 423: 25-04-2026 8:04 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'Dining out', '2026-04-25T08:04:00+07:00');

  -- Row 424: 25-04-2026 8:04 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp18.600
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 18600, 'Indomaret', '2026-04-25T08:04:00+07:00');

  -- Row 425: 25-04-2026 8:05 | Pengeluaran | TRANSPORTATION | Fuel | Rp51.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 51000, NULL, '2026-04-25T08:05:00+07:00');

  -- Row 426: 21-04-2026 8:05 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40000, 'ayam jangkung', '2026-04-21T08:05:00+07:00');

  -- Row 427: 25-04-2026 8:05 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp6.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 6000, 'Isi angin', '2026-04-25T08:05:00+07:00');

  -- Row 428: 25-04-2026 8:05 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'Bubur', '2026-04-25T08:05:00+07:00');

  -- Row 429: 17-04-2026 8:05 | Pengeluaran | FIXED BILLS & INSURANCE | Taxes (Admin Fee/Bank) | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Taxes (Admin Fee/Bank)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'bca', '2026-04-17T08:05:00+07:00');

  -- Row 430: 25-04-2026 8:06 | Pengeluaran | FIXED BILLS & INSURANCE | Taxes (Admin Fee/Bank) | Rp5.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Taxes (Admin Fee/Bank)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5500, NULL, '2026-04-25T08:06:00+07:00');

  -- Row 431: 22-04-2026 8:06 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp18.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 18000, 'asinan phr', '2026-04-22T08:06:00+07:00');

  -- Row 432: 23-04-2026 8:06 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'bakso goreng', '2026-04-23T08:06:00+07:00');

  -- Row 433: 25-04-2026 8:07 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp24.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 24000, 'bubur', '2026-04-25T08:07:00+07:00');

  -- Row 434: 23-04-2026 8:07 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp5.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 5900, 'air indomaret cikini', '2026-04-23T08:07:00+07:00');

  -- Row 435: 13-04-2026 8:08 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp40.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40500, 'fresh care, rexona', '2026-04-13T08:08:00+07:00');

  -- Row 436: 25-04-2026 15:01 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp35.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35000, 'cukur', '2026-04-25T15:01:00+07:00');

  -- Row 437: 25-04-2026 15:02 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'sempol', '2026-04-25T15:02:00+07:00');

  -- Row 438: 26-04-2026 10:33 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp294.978
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 294978, 'naga', '2026-04-26T10:33:00+07:00');

  -- Row 439: 26-04-2026 11:14 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, 'naga', '2026-04-26T11:14:00+07:00');

  -- Row 440: 27-04-2026 15:42 | Pengeluaran | FOOD & GROCERIES | Groceries | Rp55.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Groceries' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 55000, 'ayam sambel', '2026-04-27T15:42:00+07:00');

  -- Row 441: 29-04-2026 11:28 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp403.436
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 403436, 'Steak 21', '2026-04-29T11:28:00+07:00');

  -- Row 442: 29-04-2026 11:29 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'Kopi', '2026-04-29T11:29:00+07:00');

  -- Row 443: 29-04-2026 11:30 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp20.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 20000, 'mie rebus, teh', '2026-04-29T11:30:00+07:00');

  -- Row 444: 29-04-2026 11:30 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp150.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 150000, 'ayang salon', '2026-04-29T11:30:00+07:00');

  -- Row 445: 29-04-2026 15:00 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp52.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 52000, 'salon', '2026-04-29T15:00:00+07:00');

  -- Row 446: 30-04-2026 16:00 | Pengeluaran | FIXED BILLS & INSURANCE | Mobile Phone Bill/Pulsa | Rp60.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Fixed Bills & Insurance' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Mobile Phone Bill/Pulsa' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 60000, 'kuota', '2026-04-30T16:00:00+07:00');

  -- Row 447: 30-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'nasgor', '2026-04-30T16:00:00+07:00');

  -- Row 448: 30-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'batagor', '2026-04-30T16:00:00+07:00');

  -- Row 449: 30-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp9.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9700, 'susu', '2026-04-30T16:00:00+07:00');

  -- Row 450: 30-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp83.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 83000, 'pancong', '2026-04-30T16:00:00+07:00');

  -- Row 451: 30-04-2026 16:00 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, 'cilor', '2026-04-30T16:00:00+07:00');

  -- Row 452: 30-04-2026 17:38 | Pengeluaran | TRANSPORTATION | Fuel | Rp70.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 70000, NULL, '2026-04-30T17:38:00+07:00');

  -- Row 453: 01-05-2026 13:56 | Pemasukan | PENGHASILAN UTAMA | Gaji Pokok | Rp2.519.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Gaji Pokok' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 2519700, NULL, '2026-05-01T13:56:00+07:00');

  -- Row 454: 01-05-2026 13:56 | Pengeluaran | HOUSING & UTILITAS | Water and Sewer | Rp307.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Housing & Utilitas' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Water and Sewer' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 307500, NULL, '2026-05-01T13:56:00+07:00');

  -- Row 455: 01-05-2026 13:57 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 200000, NULL, '2026-05-01T13:57:00+07:00');

  -- Row 456: 01-05-2026 13:58 | Pengeluaran | LOANS & DEBTS | Friend (Repayment) | Rp1.200.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Loans & Debts' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Friend (Repayment)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1200000, NULL, '2026-05-01T13:58:00+07:00');

  -- Row 457: 01-05-2026 14:04 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp1.500.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 1500000, NULL, '2026-05-01T14:04:00+07:00');

  -- Row 458: 03-05-2026 10:39 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp99.580
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 99580, 'Sabun mandi 3 pouch', '2026-05-03T10:39:00+07:00');

  -- Row 459: 03-05-2026 8:35 | Pengeluaran | TRANSPORTATION | Vehicle Maintenance | Rp161.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Vehicle Maintenance' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 161500, 'service rutin, oli mesin, oli gardan', '2026-05-03T08:35:00+07:00');

  -- Row 460: 05-05-2026 8:36 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp50.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 50000, 'bpjs', '2026-05-05T08:36:00+07:00');

  -- Row 461: 05-05-2026 8:37 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp18.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 18000, 'hisana', '2026-05-05T08:37:00+07:00');

  -- Row 462: 05-05-2026 8:37 | Pengeluaran | PERSONAL CARE & HEALTH | Skin and Body Care | Rp72.699
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Personal Care & Health' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Skin and Body Care' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 72699, 'fashwash', '2026-05-05T08:37:00+07:00');

  -- Row 463: 05-05-2026 8:38 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp21.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 21900, 'Indomaret', '2026-05-05T08:38:00+07:00');

  -- Row 464: 06-05-2026 8:38 | Pengeluaran | GIFTS, PETS & MISC. | Donation & Gift | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Donation & Gift' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'Mba may nikah', '2026-05-06T08:38:00+07:00');

  -- Row 465: 06-05-2026 8:38 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp35.500
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35500, 'lap kacamata', '2026-05-06T08:38:00+07:00');

  -- Row 466: 06-05-2026 8:39 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp100.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 100000, 'kado abi', '2026-05-06T08:39:00+07:00');

  -- Row 467: 07-05-2026 8:39 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'buah potong', '2026-05-07T08:39:00+07:00');

  -- Row 468: 07-05-2026 8:39 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp15.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 15000, 'cimol cilok', '2026-05-07T08:39:00+07:00');

  -- Row 469: 08-05-2026 8:39 | Pengeluaran | EDUCATION & SELF-IMPROVEMENT | FC & Print | Rp6.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Education & Self-Improvement' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'FC & Print' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 6000, NULL, '2026-05-08T08:39:00+07:00');

  -- Row 470: 08-05-2026 8:41 | Pengeluaran | TRANSPORTATION | Parking | Rp2.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 2000, NULL, '2026-05-08T08:41:00+07:00');

  -- Row 471: 08-05-2026 8:41 | Pengeluaran | GIFTS, PETS & MISC. | Family/Adek/My Beb | Rp30.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Gifts, Pets & Misc.' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Family/Adek/My Beb' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 30000, 'sate ayam', '2026-05-08T08:41:00+07:00');

  -- Row 472: 08-05-2026 8:41 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp35.900
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 35900, 'indomaret', '2026-05-08T08:41:00+07:00');

  -- Row 473: 11-05-2026 8:41 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp12.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 12000, 'buah potong', '2026-05-11T08:41:00+07:00');

  -- Row 474: 11-05-2026 8:42 | Pengeluaran | ENTERTAINMENT & HOBBIES | Shopping (Non-Clothing) | Rp40.948
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Shopping (Non-Clothing)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 40948, 'case hp', '2026-05-11T08:42:00+07:00');

  -- Row 475: 11-05-2026 8:42 | Pengeluaran | TRANSPORTATION | Toll | Rp58.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Toll' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 58000, 'toll bandara', '2026-05-11T08:42:00+07:00');

  -- Row 476: 11-05-2026 8:47 | Pengeluaran | TRANSPORTATION | Parking | Rp23.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 23000, 'parkir bandara', '2026-05-11T08:47:00+07:00');

  -- Row 477: 11-05-2026 8:48 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp3.132.760
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 3132760, 'tukin', '2026-05-11T08:48:00+07:00');

  -- Row 478: 11-05-2026 16:05 | Pengeluaran | FOOD & GROCERIES | Dining Out | Rp18.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Dining Out' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 18000, 'warteg', '2026-05-11T16:05:00+07:00');

  -- Row 479: 11-05-2026 16:06 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp10.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 10000, NULL, '2026-05-11T16:06:00+07:00');

  -- Row 480: 11-05-2026 16:06 | Pengeluaran | TRANSPORTATION | Fuel | Rp81.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Fuel' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 81000, NULL, '2026-05-11T16:06:00+07:00');

  -- Row 481: 11-05-2026 16:06 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp680.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 680000, 'dinas bekasi', '2026-05-11T16:06:00+07:00');

  -- Row 482: 14-05-2026 16:07 | Pengeluaran | FOOD & GROCERIES | Jajan/Snack | Rp9.700
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Food & Groceries' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Jajan/Snack' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 9700, 'susu', '2026-05-14T16:07:00+07:00');

  -- Row 483: 14-05-2026 16:07 | Pengeluaran | TRANSPORTATION | Parking | Rp3.000
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Transportation' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Parking' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 3000, NULL, '2026-05-14T16:07:00+07:00');

  -- Row 484: 14-05-2026 16:08 | Pemasukan | PENGHASILAN UTAMA | Tunjangan | Rp527.250
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Penghasilan Utama' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Tunjangan' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'income', cat_id, sub_id, 527250, 'uang makan', '2026-05-14T16:08:00+07:00');

  -- Row 485: 14-05-2026 16:11 | Pengeluaran | ENTERTAINMENT & HOBBIES | Streaming (Youtube, Netflix, dll.) | Rp22.089
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = 'Entertainment & Hobbies' LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = 'Streaming (Youtube, Netflix, dll.)' AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, 'outcome', cat_id, sub_id, 22089, 'member raditya dika', '2026-05-14T16:11:00+07:00');

  RAISE NOTICE 'Selesai: 484 transaksi berhasil di-insert.';
END $$;
