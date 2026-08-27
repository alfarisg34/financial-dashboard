import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const { pathname } = request.nextUrl
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/reset-password' ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api')

  // 1. Bypass Supabase call entirely if env vars are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
    // 2. Add an explicit timeout to prevent hanging network calls
    global: {
      fetch: (url, options = {}) =>
        fetch(url, {
          ...options,
          signal: AbortSignal.timeout(3000), // Abort if slower than 3 seconds
        }),
    },
  })

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  } catch (e) {
    // Gracefully handle timeouts or network failures
    user = null
  }

  // Unauthenticated user attempting to access protected route
  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Authenticated user routing logic
  if (user) {
    const isAdmin =
      user.email === 'admin@fintrack.com' ||
      user.user_metadata?.role === 'admin'

    if (pathname === '/login') {
      return NextResponse.redirect(
        new URL(isAdmin ? '/admin' : '/dashboard', request.url)
      )
    }

    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const userOnlyRoutes = ['/dashboard', '/input', '/transfer', '/budget']
    if (userOnlyRoutes.includes(pathname) && isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return supabaseResponse
}

// 3. Exclude all static assets, media, fonts, and metadata files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf)$).*)',
  ],
}