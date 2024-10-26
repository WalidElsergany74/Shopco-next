import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/forum(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth()

  // Check if the user is not logged in and is accessing a protected route
  if (!userId && isProtectedRoute(req)) {
    // Redirect to sign-in page if the user is not authenticated
    return auth().redirectToSignIn()
  }

  // Check if the user ID is not equal to the specified ID
  if (userId !== "user_2nK2ExRVxqJFzFBdvPuhLoatgeI" && isProtectedRoute(req)) {
    // Redirect to the homepage
    return Response.redirect('http://localhost:3000/globalRedirect', 302)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
