import { getPendingSubscriptions, getBatches, getCourses, getMe } from "@/lib/data";
import TeacherDashboardClient from "./teacher-client";
import { redirect } from "next/navigation";
import { getTeacherStats } from "@/actions/stats";
import { cookies } from "next/headers";

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

  // Fetch real teacher statistics
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const statsResult = await getTeacherStats(token);

  const stats = statsResult.success ? {
    activeStudents: statsResult.stats.active_students,
    pendingPayments: statsResult.stats.pending_payments,
    monthlyRevenue: statsResult.stats.monthly_revenue
  } : {
    activeStudents: 0,
    pendingPayments: pendingSubs.length,
    monthlyRevenue: 0
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
