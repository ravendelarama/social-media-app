import db from "@/lib/db";

/**
 * This function gets the user by username.
 * @param username 
 * @returns {type User}
 */
export async function getUserByUsername(username: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                username
            }
        });
    
        return user;
    } catch {
        return null;
    }
}

/**
 * This function gets the user by email.
 * @param email 
 * @returns {type User}
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
    
        return user;
    } catch {
        return null;
    }
}

/**
 * This function gets the user by id.
 * @param id 
 * @returns {type User}
 */
export async function getUserById(id: string) {
    try {
        const user = await db.user.findFirst({
            where: {
                id
            }
        });
    
        return user;
    } catch {
        return null;
    }
}