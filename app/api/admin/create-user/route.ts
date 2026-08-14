import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { seedUserData } from '@/lib/seedUser'

export async function POST(request: Request) {
  try {
    const { email, months } = await request.json()

    if (!email || !months) {
      return NextResponse.json(
        { error: 'Email dan masa tenggang (bulan) wajib diisi.' },
        { status: 400 }
      )
    }

    const monthsNum = parseInt(months, 10)
    if (isNaN(monthsNum) || monthsNum <= 0) {
      return NextResponse.json(
        { error: 'Masa tenggang harus berupa angka positif dalam bulan.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    // We use service client to admin-create users or sign up directly
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Calculate expiration date at 23:59:59 on the target month
    const now = new Date()
    const targetDate = new Date(now.getFullYear(), now.getMonth() + monthsNum, now.getDate(), 23, 59, 59, 999)
    const expiresAtIso = targetDate.toISOString()

    const defaultPassword = 'fintrack@2026'

    // 1. Try to create user via admin API
    let newUserId: string | null = null
    const { data: adminUserData, error: adminUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: defaultPassword,
      email_confirm: true,
      user_metadata: {
        display_name: email.split('@')[0],
        role: 'user',
        expires_at: expiresAtIso
      }
    })

    if (adminUserError) {
      // If service role key not provided, fallback to signUp
      const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
        email,
        password: defaultPassword,
        options: {
          data: {
            display_name: email.split('@')[0],
            role: 'user',
            expires_at: expiresAtIso
          }
        }
      })

      if (signUpError) {
        throw signUpError
      }
      newUserId = signUpData.user?.id || null
    } else {
      newUserId = adminUserData.user?.id || null
    }

    if (!newUserId) {
      return NextResponse.json({ error: 'Gagal membuat user baru.' }, { status: 500 })
    }

    // 2. Ensure profile has expiration and role
    await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUserId,
        email,
        display_name: email.split('@')[0],
        role: 'user',
        expires_at: expiresAtIso
      })

    // 3. Seed default fund sources and categories/subcategories for this user
    await seedUserData(supabaseAdmin, newUserId)

    return NextResponse.json({
      success: true,
      message: `Pengguna ${email} berhasil dibuat dengan masa tenggang ${monthsNum} bulan (hingga ${targetDate.toLocaleDateString('id-ID')}).`,
      user: {
        id: newUserId,
        email,
        expires_at: expiresAtIso
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}
