import { getMe } from "@/lib/data";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return <ProfileClient user={user} />;
}
