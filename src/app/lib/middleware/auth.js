import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// 🔒 Add ALL the routes you want to protect here
const protectedRoutes = [
  '/Program',
  '/Meals',
  '/Gemini',
  '/ContactUs',
  '/Exercise',
  '/Blog', // Add if exists
  '/Programs',
  '/Dashboard',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ Allow public pages
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // 🔐 Get token from cookie
  const token = request.cookies.get('accessToken')?.value;

  // ❌ If no token, redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  try {
    // ✅ Verify token using JWT secret
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    console.error('❌ JWT verification failed:', err.message);
    return NextResponse.redirect(new URL('/signup', request.url));
  }
}

// 👇 This tells Next.js which paths the middleware should apply to
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
