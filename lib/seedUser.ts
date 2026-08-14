import { SupabaseClient } from '@supabase/supabase-js'

export const FALLBACK_FUND_SOURCES = [
  { name: 'Dompet Tunai', icon: '💵', type: 'cash', initial_balance: 0 },
  { name: 'Bank', icon: '🏦', type: 'bank', initial_balance: 0 },
  { name: 'GoPay', icon: '📱', type: 'e-wallet', initial_balance: 0 },
  { name: 'OVO', icon: '📱', type: 'e-wallet', initial_balance: 0 },
  { name: 'DANA', icon: '📱', type: 'e-wallet', initial_balance: 0 },
  { name: 'ShopeePay', icon: '📱', type: 'e-wallet', initial_balance: 0 },
]

export const FALLBACK_CATEGORIES = [
  // INCOME
  {
    name: 'Penghasilan Utama',
    type: 'income',
    subcategories: ['Gaji Pokok', 'Tunjangan', 'Bonus/Komisi', 'THR']
  },
  {
    name: 'Penghasilan Sampingan',
    type: 'income',
    subcategories: ['Freelance/Proyek', 'Bisnis Sampingan', 'Komisi/Affiliate', 'Other Sampingan']
  },
  {
    name: 'Penghasilan Pasif & Lainnya',
    type: 'income',
    subcategories: ['Investasi/Dividen/Bunga', 'Hadiah / Warisan', 'Cashback / Refund']
  },
  // OUTCOME
  {
    name: 'Food & Groceries',
    type: 'outcome',
    subcategories: ['Groceries', 'Dining Out', 'Jajan/Snack']
  },
  {
    name: 'Housing & Utilitas',
    type: 'outcome',
    subcategories: ['Household Supplies', 'Maintenance or Repairs', 'Gas', 'Water and Sewer', 'Listrik (PLN)']
  },
  {
    name: 'Transportation',
    type: 'outcome',
    subcategories: ['Fuel', 'Parking', 'Toll', 'Bus/Taxi Fare', 'Vehicle Maintenance']
  },
  {
    name: 'Fixed Bills & Insurance',
    type: 'outcome',
    subcategories: ['Mobile Phone Bill/Pulsa', 'Health Insurance', 'Taxes (Admin Fee/Bank)']
  },
  {
    name: 'Personal Care & Health',
    type: 'outcome',
    subcategories: ['Skin and Body Care', 'Medical', 'Clothing', 'Grooming / Potong Rambut']
  },
  {
    name: 'Entertainment & Hobbies',
    type: 'outcome',
    subcategories: ['Streaming (Youtube, Netflix, dll.)', 'Games', 'Shopping (Non-Clothing)', 'Electronic', 'Other Entertainment']
  },
  {
    name: 'Education & Self-Improvement',
    type: 'outcome',
    subcategories: ['Kursus / Buku / Workshop', 'FC & Print']
  },
  {
    name: 'Gifts, Pets & Misc.',
    type: 'outcome',
    subcategories: ['Donation & Gift', 'Family / Keluarga', 'Pets']
  },
  {
    name: 'Loans & Debts',
    type: 'outcome',
    subcategories: ['Friend (Repayment)', 'Cicilan / Pinjaman']
  },
  {
    name: 'Savings & Investments',
    type: 'outcome',
    subcategories: ['Tabungan Darurat', 'Reksadana / Saham / Emas']
  }
]

export async function seedUserData(supabase: SupabaseClient, userId: string) {
  // 1. Fetch customized default seeds from database if available
  let fundSources = FALLBACK_FUND_SOURCES
  let categories = FALLBACK_CATEGORIES

  try {
    const { data: seedData } = await supabase
      .from('default_seeds')
      .select('id, data')

    if (seedData && seedData.length > 0) {
      const fsRow = seedData.find(r => r.id === 'fund_sources')
      const catRow = seedData.find(r => r.id === 'categories')
      if (fsRow?.data && Array.isArray(fsRow.data)) {
        fundSources = fsRow.data
      }
      if (catRow?.data && Array.isArray(catRow.data)) {
        categories = catRow.data
      }
    }
  } catch (e) {
    console.warn('Using fallback seeds because default_seeds table is not reachable')
  }

  // 2. Seed Fund Sources
  const fundSourcesToInsert = fundSources.map(fs => ({
    user_id: userId,
    name: fs.name,
    icon: fs.icon,
    type: fs.type,
    initial_balance: fs.initial_balance || 0
  }))

  const { error: fsError } = await supabase
    .from('fund_sources')
    .insert(fundSourcesToInsert)

  if (fsError) {
    console.error('Error seeding fund sources:', fsError)
  }

  // 3. Seed Categories & Subcategories
  for (const cat of categories) {
    const { data: createdCat, error: catError } = await supabase
      .from('categories')
      .insert({
        user_id: userId,
        name: cat.name,
        type: cat.type
      })
      .select('id')
      .single()

    if (catError || !createdCat) {
      console.error(`Error seeding category ${cat.name}:`, catError)
      continue
    }

    const subcategories = cat.subcategories || []
    if (subcategories.length > 0) {
      const subcategoriesToInsert = subcategories.map((subName: string) => ({
        user_id: userId,
        category_id: createdCat.id,
        name: subName
      }))

      const { error: subError } = await supabase
        .from('subcategories')
        .insert(subcategoriesToInsert)

      if (subError) {
        console.error(`Error seeding subcategories for ${cat.name}:`, subError)
      }
    }
  }
}
