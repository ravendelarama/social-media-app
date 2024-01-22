import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import moment from "moment";

export const {
    handlers: {
        GET,
        POST
    },
    auth,
    signIn,
    signOut,
    unstable_update: update
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            return true;
        },
        // @ts-ignore
        async session({ session, token }) {

            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                const data = await getUserById(user.id!)
            

                if (data) {
                    token.id = data.id;
                    token.username = data.username;
                    token.fullName = data.fullName;
                    token.email = data.email;
                    token.role = data.role;
                }
            }
            
            return token;
        }
    },
    ...authConfig,
})