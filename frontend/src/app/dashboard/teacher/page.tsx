import { getPendingSubscriptions, getBatches, getCourses, getMe } from "@/lib/data";
import TeacherDashboardClient from "./teacher-client";
import { redirect } from "next/navigation";

export default async function TeacherDashboard({ searchParams }: { searchParams: Promise<any> }) {
  const sp = await searchParams;
  const batchId = sp.batchId;
  const courseId = sp.courseId;
  const month = sp.month;

  const user = await getMe();
  if (!user) {
    redirect("/login");
  }
  
  // Role-based authorization: only teachers can access this dashboard
  if (user.role !== "teacher") {
    redirect("/dashboard/student");
  }
  
  const [pendingSubs, batches, courses] = await Promise.all([
    getPendingSubscriptions(batchId, month, courseId),
    getBatches(),
    getCourses()
  ]);
  
  const stats = {
    activeStudents: 42,
    pendingPayments: pendingSubs.length
  };

  return (
    <TeacherDashboardClient 
      initialPendingSubs={pendingSubs} 
      initialStats={stats} 
      initialBatches={batches}
      initialCourses={courses}
    />
  );
}
