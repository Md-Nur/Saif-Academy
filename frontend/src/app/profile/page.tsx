import { getMe } from "@/lib/data";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";
import { getUserStats } from "@/actions/stats";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  // Fetch user statistics
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const statsResult = await getUserStats(token);
  const userStats = statsResult.success ? statsResult.stats : null;

  return <ProfileClient user={user} userStats={userStats} />;
}
