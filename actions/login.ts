"use server";

import { signIn } from "@/auth";
import { getUserByUsername } from "@/data/user";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import z from "zod";

/**
 * This server action logs in the user
 * @param credentials 
 * @returns {type object | AuthError}
 */
export async function login(credentials: z.infer<typeof loginSchema>) {
    const validatedFields = await loginSchema.safeParse(credentials);

    if (!validatedFields.success) {
        return { error: "Invalid credentials" };
    }

    const { username, password } = validatedFields.data;

    const user = await getUserByUsername(username);

    if (!user || !user.username) {
        return { error: "Username does not exist" };
    }

    // Checks if email is verified
    if (!user.emailVerified) {
        const token = await generateVerificationToken("email");

        await sendVerificationEmail(token.email, token.token);
        
        return { success: "Confirmation email sent." };
    }

    if (user.isBanned) {
        return { error: "Permission denied" };
    }

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
    }
}