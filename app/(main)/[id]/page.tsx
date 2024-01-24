import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function ProfilePage({ params }: Props) {
  const session = auth();

  // Checks if the user is logged in
  if (!!session) {
    redirect("/login");
  }

  return <div>Profile: {params.id}</div>;
}

export default ProfilePage;
