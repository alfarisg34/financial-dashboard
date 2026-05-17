const fs = require('fs');

// ── CONFIG ──────────────────────────────────────────────
const USER_ID = 'a975a7e0-2c3b-4f49-81a2-f8d3f2de8433'; // ← GANTI dengan user ID kamu
const CSV_FILE = process.argv[2] || 'transactions.csv';
// ────────────────────────────────────────────────────────

// Map nama kategori CSV → nama di database
const CATEGORY_MAP = {
  'HOUSING & UTILITAS':           'Housing & Utilitas',
  'TRANSPORTATION':               'Transportation',
  'FOOD & GROCERIES':             'Food & Groceries',
  'PERSONAL CARE & HEALTH':       'Personal Care & Health',
  'FIXED BILLS & INSURANCE':      'Fixed Bills & Insurance',
  'ENTERTAINMENT & HOBBIES':      'Entertainment & Hobbies',
  'EDUCATION & SELF-IMPROVEMENT': 'Education & Self-Improvement',
  'GIFTS, PETS & MISC.':          'Gifts, Pets & Misc.',
  'LOANS & DEBTS':                'Loans & Debts',
  'SAVINGS & INVESTMENTS':        'Savings & Investments',
  'PENGHASILAN UTAMA':            'Penghasilan Utama',
  'PENGHASILAN SAMPINGAN':        'Penghasilan Sampingan',
  'PENGHASILAN PASIF & LAINNYA':  'Penghasilan Pasif & Lainnya',
};

function parseDate(dateStr, timeStr) {
  // Support D/M/YYYY dan DD-MM-YYYY
  const separator = dateStr.includes('/') ? '/' : '-';
  const [day, month, year] = dateStr.trim().split(separator);
  const [hour, minute] = (timeStr || '00:00').trim().split(':');
  const d = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  const t = `${hour.padStart(2,'0')}:${minute.padStart(2,'0')}:00`;
  return `${d}T${t}+07:00`;
}

function parseNominal(str) {
  // "Rp33.000" → 33000
  return parseFloat(str.replace(/Rp|\.|\s/g, '').replace(',', '.')) || 0;
}

function parseType(str) {
  const s = str.trim().toLowerCase();
  if (s === 'pemasukan' || s === 'income') return 'income';
  return 'outcome';
}

function escapeSql(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Parse CSV manual (handle quoted fields)
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = [];
    let cur = '', inQuote = false;
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '"') { inQuote = !inQuote; continue; }
      if (line[c] === ',' && !inQuote) { cols.push(cur); cur = ''; continue; }
      cur += line[c];
    }
    cols.push(cur);
    rows.push(cols);
  }
  return rows;
}

const content = fs.readFileSync(CSV_FILE, 'utf8');
const rows = parseCSV(content);

let sql = `-- AUTO-GENERATED SEED: ${CSV_FILE}
-- Jalankan di Supabase SQL Editor
-- Generated: ${new Date().toISOString()}

DO $$
DECLARE
  uid uuid := '${USER_ID}';
  cat_id uuid;
  sub_id uuid;
BEGIN
`;

let count = 0;
const errors = [];

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  if (row.length < 6) continue;

  const [dateStr, timeStr, typeRaw, categoryRaw, subcategoryRaw, nominalRaw, ...descParts] = row;
  const desc = descParts.join(',').trim();

  const catName = CATEGORY_MAP[categoryRaw.trim()] || categoryRaw.trim();
  const subName = subcategoryRaw.trim();
  const type = parseType(typeRaw);
  const amount = parseNominal(nominalRaw);
  const timestamp = parseDate(dateStr, timeStr);

  if (!amount) {
    errors.push(`Row ${i+2}: nominal kosong — "${nominalRaw}"`);
    continue;
  }

  sql += `
  -- Row ${i+2}: ${dateStr} ${timeStr} | ${typeRaw} | ${categoryRaw} | ${subName} | ${nominalRaw}
  SELECT id INTO cat_id FROM categories WHERE user_id = uid AND name = ${escapeSql(catName)} LIMIT 1;
  SELECT id INTO sub_id FROM subcategories WHERE user_id = uid AND name = ${escapeSql(subName)} AND category_id = cat_id LIMIT 1;
  INSERT INTO transactions (user_id, type, category_id, subcategory_id, amount, description, date)
    VALUES (uid, '${type}', cat_id, sub_id, ${amount}, ${escapeSql(desc)}, '${timestamp}');
`;
  count++;
}

sql += `
  RAISE NOTICE 'Selesai: ${count} transaksi berhasil di-insert.';
END $$;
`;

fs.writeFileSync('seed_transactions.sql', sql);
console.log(`✅ Berhasil generate: seed_transactions.sql`);
console.log(`   Total transaksi: ${count}`);
if (errors.length) {
  console.log(`⚠️  Baris dilewati (${errors.length}):`);
  errors.forEach(e => console.log('   ', e));
}