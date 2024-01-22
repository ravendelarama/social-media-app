import { useSession } from "next-auth/react";

export default async function useCurrentUser() {
    const { data: session } = useSession();

    return session;
}