import { getPosts } from "@/data/post";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export default async function posts() {
    const posts = await getPosts();

    revalidatePath("/");

    return posts;
}