import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function ProfilePage({ params }: Props) {
  const session = auth();

  if (!!session) {
    redirect("/login");
  }

  return <div>Profile: {params.id}</div>;
}

export default ProfilePage;
