import posts from "@/actions/posts";
import { useQuery } from "@tanstack/react-query";

export default function usePosts() {
  const { data, error, fetchStatus, status } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await posts(),
  });

  return {
    data,
    error,
    fetchStatus,
    status,
  };
}
