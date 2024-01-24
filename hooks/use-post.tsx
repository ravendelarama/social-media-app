import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function usePost(name: string) {
  const [count, setCount] = useState<string>("");
  //   setInterval(async () => setCount(await uuidv4()), 1000);

  const { data } = useQuery({
    queryKey: ["name", name],
    queryFn: ({ queryKey }) => {
      return `name ${name}`;
    },
    staleTime: 1000,
    refetchInterval: 1000,
  });

  return data;
}
