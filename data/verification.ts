import db from "@/lib/db";

/**
 * This function gets the verification token by email.
 * @param email 
 * @returns {type VerificationToken}
 */
export async function getVerificationTokenByEmail(email: string) {
    try {
        const token = await db.verificationToken.findUnique({
            where: {
                email
            }
        });

        return token;
    } catch {
        return null;
    }
}

/**
 * This function gets the verification token by token.
 * @param token 
 * @returns {type VerificationToken}
 */
export async function getVerificationTokenByToken(token: string) {
    try {
        const existingToken = await db.verificationToken.findUnique({
            where: {
                token
            }
        });

        return existingToken;
    } catch {
        return null;
    }
}