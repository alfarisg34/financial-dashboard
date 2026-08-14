import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { userId, action } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID dan Action (soft/restore) wajib diisi.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    if (action === 'soft') {
      // Soft Delete: Mark profile as deleted and deactivate
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_deleted: true,
          deleted_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) throw error

      return NextResponse.json({
        success: true,
        message: 'Akun berhasil dinonaktifkan (Soft Delete).'
      })
    } else if (action === 'restore') {
      // Restore Soft Deleted Account
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_deleted: false,
          deleted_at: null
        })
        .eq('id', userId)

      if (error) throw error

      return NextResponse.json({
        success: true,
        message: 'Akun berhasil diaktifkan kembali (Restored).'
      })
    } else {
      return NextResponse.json({ error: 'Action tidak valid.' }, { status: 400 })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Gagal memproses tindakan akun.' }, { status: 500 })
  }
}
