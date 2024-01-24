import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification";
import { createSafeActionClient } from "next-safe-action";
import db from "@/lib/db";
import { verifySchema } from "@/schemas";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient()

/**
 * This server action verifies the email using the existing verification token.
 * @param token 
 * @returns {type object}
 */
const verify = action(verifySchema, async (token) => {
    // Gets the existing verification token.
    const existingToken = await getVerificationTokenByToken(token);

    // Checks if the token exists.
    if (!existingToken) {
        return { error: "Token does not exist!" };
    }
    
    const hasExpired = new Date(existingToken?.expires) < new Date();

    // Checks if the token has expired.
    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    // Checks if the email exists.
    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    // Verifies the user email
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date()
        }
    });

    // Removes the token.
    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });

    revalidatePath("/auth/verify");

    return { success: "Email verified!" };
});

export default verify;