import { getMe, getMyBatches, getMyCourses } from "@/lib/data";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import Link from "next/link";

const MyBatch = async () => {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }

  const [batches, courses] = await Promise.all([
    getMyBatches(),
    getMyCourses()
  ]);

  return (
    <div className="container-premium pt-24 md:pt-32 min-h-screen pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
          My <span className="text-gradient-gold">Learning</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Welcome back, <span className="text-white font-bold">{user.name}</span>. Continue your journey to excellence.
        </p>
      </div>

      <div className="space-y-20">

        {/* My Batches Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-royal-gold rounded-full"></span>
              My Active Batches
            </h2>
          </div>

          {batches && batches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {batches.map((batch: any, i: number) => (
                <Card key={`batch-${i}`} title={batch?.name || batch?.title}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col gap-1 items-start w-full">
                      <div className="flex gap-2">
                        {batch?.classLevel && <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-royal-blue-light border border-white/10 text-royal-gold">Class {batch.classLevel}</span>}
                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Live</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-400 text-sm line-clamp-3 leading-relaxed mt-4">{batch?.description}</p>
                  <div className="mt-auto pt-4">
                    <Link href={`/dashboard/student`} className="block w-full text-center py-3 px-4 rounded-lg bg-royal-gold text-royal-blue-light font-bold hover:bg-royal-gold-hover hover:text-white transition-all shadow-lg text-sm">
                      Go to Dashboard
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-slate-400 mb-4">You haven't enrolled in any batches yet.</p>
              <Link href="/batches" className="text-royal-gold hover:underline">Browse Batches</Link>
            </div>
          )}
        </section>

        {/* My Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              My Courses
            </h2>
          </div>

          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course: any, i: number) => (
                <Card key={`course-${i}`} title={course?.title}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col gap-1 items-start w-full">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">Recorded</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-400 text-sm line-clamp-3 leading-relaxed mt-4">{course?.description}</p>
                  <div className="mt-auto pt-4">
                    <button className="w-full py-3 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold text-slate-200">
                      Start Learning
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-slate-400 mb-4">You haven't purchased any courses yet.</p>
              <Link href="/courses" className="text-royal-gold hover:underline">Browse Courses</Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default MyBatch;
