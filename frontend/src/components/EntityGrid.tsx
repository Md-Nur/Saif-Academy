import Card from "@/components/Card";
import Title from "@/components/Title";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getBatches, getCourses, getMe } from "@/lib/data";
import EnrollmentButton from "./EnrollmentButton";

interface Entity {
  id: string;
  title?: string;
  name?: string;
  classLevel?: number;
  class_level?: number;
  description?: string;
  desc?: string;
  price?: number;
  price_per_month?: number;
  type?: string;
  course_type?: string;
  is_free?: boolean;
  video_url?: string;
}

interface EntityGridProps {
  items?: Entity[];
  title?: string;
  limit?: number;
  emptyMessage?: string;
  className?: string;
  itemType: 'batch' | 'course';
}

export default async function EntityGrid({ 
  items: initialItems, 
  title, 
  limit, 
  emptyMessage, 
  className, 
  itemType 
}: EntityGridProps) {
  
  // Data Fetching logic moved here
  let items = initialItems;
  const user = await getMe();
  
  if (!items) {
    if (itemType === 'batch') {
      items = await getBatches();
    } else {
      items = await getCourses();
    }
  }

  const displayedItems = limit ? (items || []).slice(0, limit) : (items || []);
  
  const defaultTitle = title || (itemType === 'batch' 
    ? (limit ? "Popular Batches" : "All Batches") 
    : (limit ? "Featured Courses" : "All Courses"));
    
  const defaultEmptyMessage = emptyMessage || (itemType === 'batch' 
    ? "No batches found at the moment." 
    : "No courses found at the moment.");

  return (
    <div className={cn("container-premium relative z-10", className)}>
      <Title>
        <span className="text-gradient-gold">{defaultTitle}</span>
      </Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
        {displayedItems.map((item, i) => {
          const itemTitle = item.name || item.title || "Untitled";
          const isFree = item.is_free === true;
          const price = isFree ? "FREE" : `৳${itemType === 'batch' ? (item.price_per_month || 1000) : (item.price || 2000)}`;
          const priceSuffix = isFree ? "" : (itemType === 'batch' ? "/ month" : "(One-time)");
          const description = item.description || item.desc;
          const actionText = isFree ? "Watch Now" : (itemType === 'batch' ? "Join Batch" : "Enroll Now");
          
          let secondaryTag = itemType === 'batch' ? "Live Classes" : (item.course_type || item.type || "Recorded");
          if (isFree) secondaryTag = "Free Course";

          const secondaryTagClass = (itemType === 'batch' || item.course_type === 'live')
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-royal-gold/10 border-royal-gold/20 text-royal-gold";

          return (
            <Card key={i.toString()} title={itemTitle}>
              <div className="flex justify-between items-start mb-2">
                 <div className="flex flex-col gap-1 items-start w-full">
                   <div className="flex gap-2">
                     {(item.classLevel || item.class_level) && (
                       <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-royal-blue-light border border-white/10 text-royal-gold">
                         Class {item.classLevel || item.class_level}
                       </span>
                     )}
                     <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${secondaryTagClass}`}>
                       {secondaryTag}
                     </span>
                     {isFree && (
                       <span className="px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded bg-red-500/10 border-red-500/20 text-red-400">
                         YouTube
                       </span>
                     )}
                   </div>
                 </div>
              </div>
              <div className="mb-4">
                <span className="text-royal-gold font-bold text-lg">{price}</span>
                <span className="text-slate-500 text-xs ml-1">{priceSuffix}</span>
              </div>
              <p className="mb-4 text-slate-400 text-sm line-clamp-3 leading-relaxed">{description}</p>
              <div className="mt-auto pt-4 flex gap-3">
                <Link 
                  href={`/${itemType === 'batch' ? 'batches' : 'courses'}/${item.id}`}
                  className="flex-1 py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold text-slate-200 text-center"
                >
                  Details
                </Link>
                <EnrollmentButton 
                  itemId={item.id?.toString() || ""}
                  itemType={itemType}
                  itemTitle={itemTitle}
                  price={itemType === "batch" ? (item.price_per_month || 1000) : (item.price || 2000)}
                  isFree={isFree}
                  videoUrl={item.video_url as string || undefined}
                  actionText={actionText}
                  user={user}
                  className={isFree ? "bg-red-600 text-white hover:bg-red-700" : "bg-royal-gold text-royal-blue-light hover:bg-royal-gold-hover hover:text-white"}
                />
              </div>
            </Card>
          );
        })}
        {displayedItems.length === 0 && (
          <div className="col-span-full text-center py-20 px-6 glass-panel">
            <p className="text-slate-300 text-xl font-light">{defaultEmptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
