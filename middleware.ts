import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/discover', '/shows/popular', '/movies/popular', '/shows/top-rated', '/movies/top-rated', '/shows/on-the-air', '/movies/now-playing', "/api/genres"]

const publicRoutes = ['/login', '/register', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const isLogged = (await cookies()).get('isLogged')?.value === 'true'
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /discover if the user is authenticated
  if (
    isPublicRoute &&
    isLogged &&
    !req.nextUrl.pathname.startsWith('/discover')
  ) {
    return NextResponse.redirect(new URL('/discover', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}