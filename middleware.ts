import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    publicRoutes,
    authRoutes,
    userRoutes,
    adminRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;

    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isUserRoute = userRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
    
    if (isAdminRoute && req.auth?.user.role != UserRole.admin) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isAuthRoute && req.auth) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isPublicRoute && req.auth) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isUserRoute && !req.auth) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
