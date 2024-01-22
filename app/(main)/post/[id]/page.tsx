import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function PostPage({ params }: Props) {
  const session = auth();

  if (!!session) {
    redirect("/login");
  }

  return <div>Post: {params.id}</div>;
}

export default PostPage;
