import { getMySubscriptions, getLiveClasses, getMe, getMyBatches, getMyCourses } from "@/lib/data";
import StudentDashboardClient from "./student-client";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }
  
  // Role-based authorization: only students can access this dashboard
  if (user.role !== "student") {
    redirect("/dashboard/teacher");
  }
  
  const subscriptions = await getMySubscriptions();
  const liveClasses = await getLiveClasses();
  const myBatches = await getMyBatches();
  const myCourses = await getMyCourses();
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const isSubscribed = subscriptions.some((s: any) => s.month === currentMonth && s.status === 'verified');

  return (
    <StudentDashboardClient 
      initialSubscriptions={subscriptions}
      initialMaterials={liveClasses}
      initialIsSubscribed={isSubscribed}
      allBatches={myBatches}
      allCourses={myCourses}
      bkash={process.env.BKASH}
      nagad={process.env.NAGAD}
    />
  );
}
