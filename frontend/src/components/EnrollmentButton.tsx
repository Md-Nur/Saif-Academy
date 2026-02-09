"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface EnrollmentButtonProps {
  itemId: string;
  itemType: 'batch' | 'course';
  itemTitle: string;
  price: number;
  isFree?: boolean;
  videoUrl?: Optional<string>;
  actionText: string;
  className?: string;
  user?: any;
}

type Optional<T> = T | null | undefined;

export default function EnrollmentButton({
  itemId,
  itemType,
  itemTitle,
  price,
  isFree,
  videoUrl,
  actionText,
  className,
  user
}: EnrollmentButtonProps) {
  const router = useRouter();

  const handleAction = () => {
    if (isFree && videoUrl) {
      window.open(videoUrl, '_blank');
      return;
    }

    if (!user) {
      toast.error("Please sign in to enroll");
      router.push("/login");
      return;
    }

    if (user.role === 'teacher') {
      toast.error("Teachers cannot enroll in courses");
      return;
    }

    // Redirect to student dashboard with enrollment info
    // We'll use URL parameters so the dashboard can pick them up
    const params = new URLSearchParams();
    params.set("enroll", itemId);
    params.set("type", itemType);
    params.set("title", itemTitle);
    params.set("price", price.toString());
    
    router.push(`/dashboard/student?${params.toString()}`);
  };

  return (
    <button 
      onClick={handleAction}
      className={cn(
        "flex-1 py-2 px-4 rounded-lg font-bold transition-all shadow-lg text-sm whitespace-nowrap",
        className
      )}
    >
      {actionText}
    </button>
  );
}
