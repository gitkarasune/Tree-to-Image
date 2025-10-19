import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/protected(.*)",
  "/collaborate(.*)",
  "/ai-generate(.*)",
  "/github-import(.*)",
  "/batch-export(.*)",
  "/compare(.*)",
  "/themes(.*)",
  "/analytics(.*)",
  "/pdf-report(.*)",
  "/version-control(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
