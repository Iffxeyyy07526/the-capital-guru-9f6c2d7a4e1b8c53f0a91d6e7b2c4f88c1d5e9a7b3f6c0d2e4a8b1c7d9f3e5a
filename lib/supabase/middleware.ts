import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;

  // Define route groups
  const isAuthPage = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/forgot-password');
  const isVerifyEmailPage = path === '/verify-email';
  const isDashboardPage = path.startsWith('/dashboard');
  const isPaymentPage = path.startsWith('/payment');
  const isAdminPage = path.startsWith('/admin');
  
  const isProtectedPage = isDashboardPage || isPaymentPage || isAdminPage || path.startsWith('/signals') || path.startsWith('/account');

  // Case 1: Unauthenticated user trying to access protected page
  if (!user && isProtectedPage) {
    url.pathname = '/login';
    url.searchParams.set('redirectTo', path);
    return NextResponse.redirect(url);
  }

  // Case 2: Authenticated user
  if (user) {
    const isEmailConfirmed = !!user.email_confirmed_at;

    // Case 2a: Email not confirmed but trying to access protected page (except verify-email)
    if (!isEmailConfirmed && isProtectedPage && !isVerifyEmailPage) {
      url.pathname = '/verify-email';
      url.searchParams.set('email', user.email || '');
      return NextResponse.redirect(url);
    }

    // Case 2b: Email confirmed but visiting verify-email page
    if (isEmailConfirmed && isVerifyEmailPage) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // Case 2c: Authenticated user visiting auth pages
    if (isAuthPage && isEmailConfirmed) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // Case 3: Admin page protection
    if (isAdminPage) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (!profile || profile.role !== 'admin') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}
