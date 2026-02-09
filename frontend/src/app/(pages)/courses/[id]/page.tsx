
import { getCourse, getMe } from "@/lib/data";
import EnrollmentButton from "@/components/EnrollmentButton";
import Link from "next/link";
import { ArrowLeft, PlayCircle, BookOpen, ShieldCheck, Award, Layers } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CourseDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  const user = await getMe();
  const isFree = course.is_free === true;

  // Handle multiple video URLs
  const videoUrls = course.video_url ? course.video_url.split(",") : [];
  const videoEmbedUrls = videoUrls.map((url: string) => {
    let embedUrl = null;
    if (url.includes("youtube.com")) {
      try {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v");
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } catch (e) {
        console.error("Invalid video URL", e);
      }
    } else if (url.includes("youtu.be")) {
      try {
        const parts = url.split("/");
        const videoId = parts[parts.length - 1];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } catch (e) {
        console.error(e);
      }
    }
    return embedUrl;
  }).filter(Boolean);


  return (
    <main className="min-h-screen pt-32 pb-20 relative text-left">
        {/* Background Elements */}
       <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none text-left">
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-royal-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-premium text-left">
        <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-royal-gold mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-10">
                {/* Header */}
                 <div className="space-y-4">
                    <div className="flex gap-3 flex-wrap">
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-royal-blue-light border border-white/10 text-royal-gold">
                             Class {course.classLevel}
                        </span>
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-royal-gold/10 border-royal-gold/20 text-royal-gold">
                             {course.subject}
                        </span>
                         {isFree && (
                            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded bg-red-500/10 border-red-500/20 text-red-400">
                                Free on YouTube
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
                        {course.title}
                    </h1>
                     <p className="text-slate-300 text-lg leading-relaxed">
                        {course.description || "In-depth recorded course covering all essential topics. Master the concepts at your own pace with our premium video lectures."}
                    </p>
                </div>

                {/* Video Previews */}
                {videoEmbedUrls.length > 0 && (
                    <div className="space-y-8">
                        {videoEmbedUrls.map((embedUrl, idx) => (
                            <div key={idx} className="space-y-4">
                                {videoEmbedUrls.length > 1 && (
                                    <h3 className="text-lg font-bold text-royal-gold flex items-center gap-2">
                                        <PlayCircle className="w-5 h-5" />
                                        Lecture {idx + 1}
                                    </h3>
                                )}
                                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video relative group">
                                    <iframe 
                                        src={embedUrl!} 
                                        title={`Course Video ${idx + 1}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                 {/* Course Highlights */}
                 <div className="glass-panel p-8 border-white/5 bg-slate-900/40">
                     <h3 className="text-xl font-bold text-white mb-6">Course Highlights</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="flex gap-4">
                             <div className="w-12 h-12 rounded-lg bg-royal-blue/20 flex items-center justify-center shrink-0">
                                 <Layers className="w-6 h-6 text-royal-gold" />
                             </div>
                             <div>
                                 <h4 className="text-white font-bold mb-1">Complete Board Syllabus</h4>
                                 <p className="text-sm text-slate-400">Covers {course.board} board curriculum comprehensively.</p>
                             </div>
                         </div>
                         <div className="flex gap-4">
                             <div className="w-12 h-12 rounded-lg bg-royal-blue/20 flex items-center justify-center shrink-0">
                                 <PlayCircle className="w-6 h-6 text-royal-gold" />
                             </div>
                             <div>
                                 <h4 className="text-white font-bold mb-1">High Quality Video</h4>
                                 <p className="text-sm text-slate-400">Crystal clear audio and 1080p video production.</p>
                             </div>
                         </div>
                         <div className="flex gap-4">
                             <div className="w-12 h-12 rounded-lg bg-royal-blue/20 flex items-center justify-center shrink-0">
                                 <Award className="w-6 h-6 text-royal-gold" />
                             </div>
                             <div>
                                 <h4 className="text-white font-bold mb-1">Expert Instruction</h4>
                                 <p className="text-sm text-slate-400">Learn from top educators with years of experience.</p>
                             </div>
                         </div>
                     </div>
                 </div>

            </div>

             {/* Right Column: Enrollment Card */}
             <div className="relative">
                 <div className="glass-panel p-8 sticky top-32 border-royal-gold/30 shadow-2xl shadow-royal-blue/10">
                     <div className="mb-6 pb-6 border-b border-white/10">
                         <span className="text-slate-400 text-sm font-medium block mb-1">One-time Payment</span>
                         <div className="flex items-end gap-2">
                             {isFree ? (
                                <span className="text-4xl font-extrabold text-white">Free</span>
                             ) : (
                                <span className="text-4xl font-extrabold text-white">৳{course.price}</span>
                             )}
                         </div>
                         {!isFree && <span className="text-xs text-slate-500 mt-2 block">Full course access</span>}
                     </div>

                     <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-slate-300 text-sm">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span>Lifetime Access</span>
                         </div>
                          <div className="flex items-center gap-3 text-slate-300 text-sm">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span>Self-paced learning</span>
                         </div>
                     </div>

                     <EnrollmentButton 
                        itemId={course.id}
                        itemType="course"
                        itemTitle={course.title}
                        price={course.price}
                        isFree={isFree}
                        videoUrl={course.video_url || undefined}
                        actionText={isFree ? "Watch on YouTube" : "Enroll Now"}
                        user={user}
                        className={`w-full py-4 text-base ${isFree ? "bg-red-600 hover:bg-red-700 text-white" : "bg-royal-gold text-royal-blue-dark hover:bg-white"} hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
                     />
                     
                     {!isFree && (
                        <p className="mt-4 text-center text-xs text-slate-500">
                             Secure payment via bKash / Nagad
                        </p>
                     )}
                 </div>
             </div>

        </div>
      </div>
    </main>
  );
}
