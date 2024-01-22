import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "./data/user";

export default {
    providers: [
        Credentials({
            name: "login",
            credentials: {
                username: {
                    label: "username",
                    type: "text"
                },
                password: {
                    label: "password",
                    type: "password"
                }
            },
            authorize: async (credentials) => {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    
                    // Search for username
                    const user = await getUserByUsername(username);

                    if (!user || !user.password) {
                        return null;
                    }

                    // Compare hashed password
                    const isMatched = await bcrypt.compare(password, user?.password!);

                    if (isMatched) {
                        return user;
                    }
                }
                
                return null;
            }
        })
    ],
} satisfies NextAuthConfig