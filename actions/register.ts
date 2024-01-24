"use server";

import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { registerSchema } from "@/schemas";
import { createSafeActionClient } from "next-safe-action"
import { revalidatePath } from "next/cache";


const action = createSafeActionClient();

/**
 * This server action registers the user.
 * Upon signing up, it sends a verification email to the user.
 * @param credentials
 * @returns {type object}
 */
const register = action(registerSchema, async (credentials) => {
    const { username, fullName, email, password } = credentials;
    
    const existingUser = await db.user.findUnique({
        where: {
            username,
            email
        }
    });

    if (existingUser) {
        return { error: "Username or email already exist." };
    }

    try {
        // Add a new user.
        await db.user.create({
            data: {
                username,
                fullName,
                email,
                password
            }
        });

        // Generates a verfication token.
        const token = await generateVerificationToken(email);

        // Sends a verification email.
        await sendVerificationEmail(email, token.token);
    } catch {
        return { error: "Something went wrong!" };
    }

    revalidatePath("/register");

    return { success: "Verification email sent!" };
});

export default register;