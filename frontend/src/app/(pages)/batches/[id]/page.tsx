
import { getBatch, getMe, getRoutines } from "@/lib/data";
import EnrollmentButton from "@/components/EnrollmentButton";
import Title from "@/components/Title";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, BookOpen, Video, ShieldCheck, User } from "lucide-react";
import { formatTime } from "@/lib/utils";

export default async function BatchDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const batch = await getBatch(params.id);
  
  if (!batch) {
    notFound();
  }

  const user = await getMe();
  const routines = await getRoutines(params.id);

  return (
    <main className="min-h-screen pt-32 pb-20 relative">
       {/* Background Elements */}
       <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-royal-blue/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-royal-gold/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-premium">
        <Link 
            href="/batches" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-royal-gold mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to Batches
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex gap-3 flex-wrap">
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-royal-blue-light border border-white/10 text-royal-gold">
                             Class {batch.class_level}
                        </span>
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-royal-gold/10 border-royal-gold/20 text-royal-gold">
                             {batch.subject}
                        </span>
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                             Live Classes
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
                        {batch.name}
                    </h1>
                     <div className="flex items-center gap-2 text-slate-400">
                        <User className="w-4 h-4" />
                        <span>Instructor: <span className="text-slate-200 font-semibold">{batch.teacher_name || "Saifullah Sir"}</span></span>
                    </div>
                     <p className="text-slate-300 text-lg leading-relaxed">
                        {batch.description || "Master your syllabus with our comprehensive live batch. Join regular classes, clear doubts instantly, and get access to exclusive resources."}
                    </p>
                </div>

                {/* Routine Section */}
                {routines && routines.length > 0 && (
                    <div className="glass-panel p-8 border-white/5 bg-slate-900/40">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                             <Calendar className="w-5 h-5 text-royal-gold" />
                             Weekly Schedule
                         </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {routines.map((routine: any) => (
                                 <div key={routine.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                                     <span className="text-slate-300 font-medium">{routine.day_of_week}</span>
                                     <div className="flex items-center gap-2 text-royal-gold text-sm font-bold">
                                         <Clock className="w-4 h-4" />
                                         {formatTime(routine.start_time)} - {formatTime(routine.end_time)}
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                )}
                
                {/* Features / Details */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 border-white/5 hover:border-royal-gold/20 transition-colors">
                        <Video className="w-8 h-8 text-royal-gold mb-4" />
                        <h4 className="text-lg font-bold text-white mb-2">Live Interactive Classes</h4>
                        <p className="text-slate-400 text-sm">Join via Zoom/Meet, interact directly with the teacher and ask questions in real-time.</p>
                    </div>
                    <div className="glass-panel p-6 border-white/5 hover:border-royal-gold/20 transition-colors">
                        <BookOpen className="w-8 h-8 text-royal-gold mb-4" />
                        <h4 className="text-lg font-bold text-white mb-2">Lecture Sheets & Notes</h4>
                        <p className="text-slate-400 text-sm">Get access to high-quality PDF notes and practice sheets after every chapter.</p>
                    </div>
                 </div>

            </div>

             {/* Right Column: Enrollment Card */}
             <div className="relative">
                 <div className="glass-panel p-8 sticky top-32 border-royal-gold/30 shadow-2xl shadow-royal-blue/10">
                     <div className="mb-6 pb-6 border-b border-white/10">
                         <span className="text-slate-400 text-sm font-medium block mb-1">Monthly Subscription</span>
                         <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold text-white">৳{batch.price_per_month}</span>
                            <span className="text-slate-400 mb-1">/ month</span>
                         </div>
                     </div>

                     <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-slate-300 text-sm">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span>Cancel anytime</span>
                         </div>
                          <div className="flex items-center gap-3 text-slate-300 text-sm">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span>Access to all recordings</span>
                         </div>
                         <div className="flex items-center gap-3 text-slate-300 text-sm">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span>Premium Support Group</span>
                         </div>
                     </div>

                     <EnrollmentButton 
                        itemId={batch.id}
                        itemType="batch"
                        itemTitle={batch.name}
                        price={batch.price_per_month}
                        isFree={false}
                        user={user}
                        actionText="Join Batch Now"
                        className="w-full py-4 text-base bg-royal-gold text-royal-blue-dark hover:bg-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-royal-gold/20"
                     />
                     
                     <p className="mt-4 text-center text-xs text-slate-500">
                         Secure payment via bKash / Nagad
                     </p>
                 </div>
             </div>

        </div>
      </div>
    </main>
  );
}
