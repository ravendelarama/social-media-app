import db from "@/lib/db";
import { Post } from "@prisma/client";

/**
 * This function fetches the posts.
 * @returns {type Post | null}
 */
export async function getPosts() {
    try {
        const posts = await db.post.findMany({
            take: 10,
            orderBy: {
                createdAt: "asc"
            }
        });

        return posts;
    } catch {
        return null;
    }
}

export async function getPostById(id: string) {
    try {
        const post = await db.post.findFirst({
            where: {
                id
            }
        });

        return post;
    } catch {
        return null;
    }
}