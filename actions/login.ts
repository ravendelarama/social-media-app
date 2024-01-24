"use server";

import { signIn } from "@/auth";
import { getUserByUsername } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

/**
 * This server action logs in the user
 * @param credentials 
 * @returns {type object | AuthError}
 */
const login = action(loginSchema, async (credentials) => {
    const { username, password } = credentials;

    const user = await getUserByUsername(username);

    if (!user || !user.username) {
        return { error: "Username does not exist" };
    }

    // Checks if email is verified
    if (!user.emailVerified) {
        const token = await generateVerificationToken(user.email!);

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
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
    }
});

export default login;