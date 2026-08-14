import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Sign up the admin user properly through Supabase Auth endpoint
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@fintrack.com',
      password: 'admin1234',
      options: {
        data: {
          display_name: 'Super Admin',
          role: 'admin',
          full_name: 'Super Admin'
        }
      }
    })

    if (error) {
      // If already registered, it's ok
      return NextResponse.json({ 
        message: 'Admin signup attempted', 
        error: error.message 
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Akun admin berhasil didaftarkan via Auth API!',
      user: data.user
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
