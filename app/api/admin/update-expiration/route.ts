import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { userId, months, customDate } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID wajib disertakan.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    let expiresAtIso: string

    if (customDate) {
      const [year, month, day] = customDate.split('-').map(Number)
      const target = new Date(year, month - 1, day, 23, 59, 59, 999)
      expiresAtIso = target.toISOString()
    } else if (months) {
      const monthsNum = parseInt(months, 10)
      if (isNaN(monthsNum) || monthsNum <= 0) {
        return NextResponse.json({ error: 'Masa tenggang harus berupa angka positif.' }, { status: 400 })
      }
      const now = new Date()
      const target = new Date(now.getFullYear(), now.getMonth() + monthsNum, now.getDate(), 23, 59, 59, 999)
      expiresAtIso = target.toISOString()
    } else {
      return NextResponse.json({ error: 'Tentukan jumlah bulan atau tanggal baru.' }, { status: 400 })
    }

    // 1. Update public.profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ expires_at: expiresAtIso })
      .eq('id', userId)

    if (profileError) {
      throw profileError
    }

    // 2. Also try updating user_metadata in auth.users if admin API is available
    try {
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        user_metadata: { expires_at: expiresAtIso }
      })
    } catch (e) {}

    const formattedDate = new Date(expiresAtIso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    return NextResponse.json({
      success: true,
      message: `Masa tenggang berhasil diperbarui hingga ${formattedDate} pukul 23:59.`,
      expires_at: expiresAtIso
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Gagal memperbarui masa tenggang.' }, { status: 500 })
  }
}
