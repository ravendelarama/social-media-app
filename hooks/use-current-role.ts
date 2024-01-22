import { useSession } from "next-auth/react";

export default async function useCurrentRole() {
    const { data: session } = useSession();

    return session?.user?.role;
}