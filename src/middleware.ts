export { auth as middleware } from "@/auth"

export const config = {
    matcher: ["/member/:path*", "/admin/:path*"],
}
