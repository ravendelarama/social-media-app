/**
 * Public routes are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/welcome",
    "/faq",
    "/verify"
]

/**
 * Auth routes are used for authentication
 * These routes will redirect logged in users to /home
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/error",
    "/reset"
];

/**
 * User routes are accessible for logged in users
 * These routes require authentication
 * @type {string[]}
 */
export const userRoutes = [
    "/",
    "/settings",
    "/search",
    "/notification",
    "/chat",
];

/**
 * Admin routes are only accessible for administrators of the app
 * These routes are forbidden for normal users
 * @type {string[]}
 */
export const adminRoutes = [
    "/dashboard",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";