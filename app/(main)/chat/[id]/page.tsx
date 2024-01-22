import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function ChatRoomPage({ params }: Props) {
  const session = auth();

  if (!!session) {
    redirect("/login");
  }

  return <div>Room: {params.id}</div>;
}

export default ChatRoomPage;
