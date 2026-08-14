-- Migration: Create Default Seeds Configuration Table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.default_seeds (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.default_seeds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all to read default seeds" ON public.default_seeds;
CREATE POLICY "Allow all to read default seeds" 
ON public.default_seeds FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow all to update default seeds" ON public.default_seeds;
CREATE POLICY "Allow all to update default seeds" 
ON public.default_seeds FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert initial default fund sources
INSERT INTO public.default_seeds (id, data)
VALUES (
    'fund_sources',
    '[
        {"name": "Dompet Tunai", "icon": "💵", "type": "cash", "initial_balance": 0},
        {"name": "Bank", "icon": "🏦", "type": "bank", "initial_balance": 0},
        {"name": "GoPay", "icon": "📱", "type": "e-wallet", "initial_balance": 0},
        {"name": "OVO", "icon": "📱", "type": "e-wallet", "initial_balance": 0},
        {"name": "DANA", "icon": "📱", "type": "e-wallet", "initial_balance": 0},
        {"name": "ShopeePay", "icon": "📱", "type": "e-wallet", "initial_balance": 0}
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Insert initial default categories & subcategories
INSERT INTO public.default_seeds (id, data)
VALUES (
    'categories',
    '[
        {
            "name": "Penghasilan Utama",
            "type": "income",
            "subcategories": ["Gaji Pokok", "Tunjangan", "Bonus/Komisi", "THR"]
        },
        {
            "name": "Penghasilan Sampingan",
            "type": "income",
            "subcategories": ["Freelance/Proyek", "Bisnis Sampingan", "Komisi/Affiliate", "Other Sampingan"]
        },
        {
            "name": "Penghasilan Pasif & Lainnya",
            "type": "income",
            "subcategories": ["Investasi/Dividen/Bunga", "Hadiah / Warisan", "Cashback / Refund"]
        },
        {
            "name": "Food & Groceries",
            "type": "outcome",
            "subcategories": ["Groceries", "Dining Out", "Jajan/Snack"]
        },
        {
            "name": "Housing & Utilitas",
            "type": "outcome",
            "subcategories": ["Household Supplies", "Maintenance or Repairs", "Gas", "Water and Sewer", "Listrik (PLN)"]
        },
        {
            "name": "Transportation",
            "type": "outcome",
            "subcategories": ["Fuel", "Parking", "Toll", "Bus/Taxi Fare", "Vehicle Maintenance"]
        },
        {
            "name": "Fixed Bills & Insurance",
            "type": "outcome",
            "subcategories": ["Mobile Phone Bill/Pulsa", "Health Insurance", "Taxes (Admin Fee/Bank)"]
        },
        {
            "name": "Personal Care & Health",
            "type": "outcome",
            "subcategories": ["Skin and Body Care", "Medical", "Clothing", "Grooming / Potong Rambut"]
        },
        {
            "name": "Entertainment & Hobbies",
            "type": "outcome",
            "subcategories": ["Streaming (Youtube, Netflix, dll.)", "Games", "Shopping (Non-Clothing)", "Electronic", "Other Entertainment"]
        },
        {
            "name": "Education & Self-Improvement",
            "type": "outcome",
            "subcategories": ["Kursus / Buku / Workshop", "FC & Print"]
        },
        {
            "name": "Gifts, Pets & Misc.",
            "type": "outcome",
            "subcategories": ["Donation & Gift", "Family / Keluarga", "Pets"]
        },
        {
            "name": "Loans & Debts",
            "type": "outcome",
            "subcategories": ["Friend (Repayment)", "Cicilan / Pinjaman"]
        },
        {
            "name": "Savings & Investments",
            "type": "outcome",
            "subcategories": ["Tabungan Darurat", "Reksadana / Saham / Emas"]
        }
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
