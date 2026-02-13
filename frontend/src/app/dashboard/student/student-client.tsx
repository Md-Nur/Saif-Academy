"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AlertCircle, HelpCircle, Sparkles, Bot, CloudUpload, Check, Trash2 } from "lucide-react";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from "date-fns";
import { getNextSession } from "@/actions/routine";
import { motion, AnimatePresence } from "framer-motion";
import QuizEngine from "@/components/Practice/QuizEngine";
import GrammarAssistant from "@/components/AI/GrammarAssistant";
import Link from "next/link";
import PaymentModal from "@/components/Dashboard/PaymentModal";
import { uploadSubmission, getMySubmissions } from "@/actions/student";

// Modular Components
import StudentHeader from "./components/StudentHeader";
import LiveClassBanner from "./components/LiveClassBanner";
import WritingLab from "./components/WritingLab";
import PaymentHistory from "./components/PaymentHistory";

const translations = {
  // ... existing translations ...
  en: {
    dashboard: "My Dashboard",
    welcome: "Welcome back to",
    academy: "Saif Academy",
    payFee: "Pay Monthly Fee",
    liveClasses: "Live Classes",
    history: "Payment History",
    daysRemaining: "Days Remaining",
    verified: "Verified",
    pending: "Pending",
    noMaterials: "Please verify your subscription to access Live Classes",
    trnxPlaceholder: "8X9Y7Z...",
    submit: "Submit Payment",
    cancel: "Cancel",
    amount: "Amount",
    month: "Month",
    trnxId: "Transaction ID",
    senderNumber: "Sender Number",
    joinNow: "Join Class",
    validity: "Subscription Validity",
    expired: "Subscription Expired",
    active: "Active",
    practice: "Adaptive Practice",
    handwriting: "Handwriting Upload",
    uploadEssay: "Upload your English Essay (PDF/Image)",
    sendToSir: "Send to Saifullah Sir",
    essayPlaceholder: "Essay Title...",
    quizzes: "Grammar Quizzes",
    selectItem: "Select Batch or Course",
    browseCourses: "Browse All Courses",
    browseBatches: "Browse All Batches",
    enrollNow: "Enroll in a Course",
    enrollFirst: "Join Your First Batch",
  },
  bn: {
    dashboard: "আমার ড্যাশবোর্ড",
    welcome: "স্বাগতম",
    academy: "সাইফ একাডেমি",
    payFee: "মাসিক ফি জমা দিন",
    liveClasses: "লাইভ ক্লাস",
    history: "পেমেন্টের ইতিহাস",
    daysRemaining: "দিন বাকি আছে",
    verified: "যাচাইকৃত",
    pending: "অপেক্ষমান",
    noMaterials: "লাইভ ক্লাস দেখতে আপনার সাবস্ক্রিপশন যাচাই করুন",
    trnxPlaceholder: "ট্রানজিশন আইডি দিন...",
    submit: "জমা দিন",
    cancel: "বাতিল করুন",
    amount: "পরিমাণ",
    month: "মাস",
    trnxId: "ট্রানজিশন আইডি",
    senderNumber: "প্রেরক নম্বর",
    joinNow: "ক্লাসে যোগ দিন",
    validity: "সাবস্ক্রিপশনের মেয়াদ",
    expired: "মেয়াদ শেষ",
    active: "সক্রিয়",
    practice: "অ্যাডাপ্টিভ প্র্যাকটিস",
    handwriting: "হ্যান্ডরাইটিং আপলোড",
    uploadEssay: "আপনার ইংরেজি রচনা আপলোড করুন (PDF/Image)",
    sendToSir: "সাইফ স্যারকে পাঠান",
    essayPlaceholder: "রচনার নাম...",
    quizzes: "গ্রামার কুইজ",
    selectItem: "ব্যাচ বা কোর্স নির্বাচন করুন",
    browseCourses: "সব কোর্স দেখুন",
    browseBatches: "সব ব্যাচ দেখুন",
    enrollNow: "নতুন কোর্সে ভর্তি হউন",
    enrollFirst: "আপনার প্রথম ব্যাচে ভর্তি হউন",
  }
};

export default function StudentDashboardClient({
  initialSubscriptions,
  initialMaterials,
  initialIsSubscribed,
  allBatches = [],
  allCourses = [],
  bkash = "",
  nagad = ""
}: any) {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    trnx_id: "",
    sender_number: "",
    amount: 1500,
    month: new Date().toISOString().slice(0, 7),
    batch_id: undefined as string | undefined,
    course_id: undefined as string | undefined,
    itemName: "" as string,
    payment_method: "bkash"
  });

  const [nextSession, setNextSession] = useState<any>(null);
  const [userSubmissions, setUserSubmissions] = useState<any[]>(initialMaterials?.submissions || []);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    title: "",
    type: "hw" as "hw" | "cw",
    urls: [] as string[],
    batch_id: undefined as string | undefined,
    course_id: undefined as string | undefined
  });

  useEffect(() => {
    async function fetchNextSession() {
      const res = await getNextSession();
      if (res.success && res.nextSession) {
        setNextSession(res.nextSession);
      }
    }
    fetchNextSession();
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const res = await getMySubmissions();
    if (res.success) {
      setUserSubmissions(res.submissions);
    }
  };

  const handleSubmissionUpload = async () => {
    if (!submissionForm.title || submissionForm.urls.length === 0) {
      toast.error("Please provide title and at least one image");
      return;
    }
    if (!submissionForm.batch_id && !submissionForm.course_id) {
      toast.error("Please select a Batch or Course");
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadSubmission(submissionForm);
      if (res.success) {
        toast.success("Submission sent to Saifullah Sir!");
        setSubmissionForm({ ...submissionForm, title: "", urls: [] });
        fetchSubmissions();
      } else {
        toast.error(res.error || "Upload failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const t = translations[lang];

  // Combine batches and courses for selection
  const allSelectableItems = [
    ...allBatches.map((b: any) => ({ ...b, type: 'batch', displayName: `[Batch] ${b.name} - ${b.subject}` })),
    ...allCourses.map((c: any) => ({ ...c, type: 'course', displayName: `[Course] ${c.title} - ${c.subject}` }))
  ];

  // Set default selection for submission form if enrolled
  useEffect(() => {
    if (allSelectableItems.length > 0 && !submissionForm.batch_id && !submissionForm.course_id) {
      const firstItem = allSelectableItems[0];
      if (firstItem.type === 'batch') {
        setSubmissionForm(prev => ({ ...prev, batch_id: firstItem.id, course_id: undefined }));
      } else {
        setSubmissionForm(prev => ({ ...prev, course_id: firstItem.id, batch_id: undefined }));
      }
    }
  }, [allSelectableItems.length]);

  const hasBatches = allBatches.length > 0;
  const hasEnrollments = allSelectableItems.length > 0;

  // Subscription Status State
  const [subStatus, setSubStatus] = useState<'active' | 'grace' | 'expired'>('expired');
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const latestVerified = [...subscriptions]
      .filter((s: any) => s.status?.toLowerCase() === 'verified' && s.batch_id)
      .sort((a: any, b: any) => new Date(b.month).getTime() - new Date(a.month).getTime())[0];

    if (latestVerified) {
      const expiryDate = new Date(latestVerified.month);
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      const now = new Date();
      const diff = expiryDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      setDaysLeft(Math.max(0, days));

      if (days > 0) {
        setSubStatus('active');
      } else {
        const currentDay = now.getDate();
        if (currentDay <= 10) {
          setSubStatus('grace');
        } else {
          setSubStatus('expired');
        }
      }
    } else {
      setDaysLeft(0);
      setSubStatus('expired');
    }
  }, [subscriptions]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enrollId = params.get("enroll");
    const type = params.get("type");
    const title = params.get("title");
    const price = params.get("price");

    if (enrollId && type && title && price) {
      setPaymentData(prev => ({
        ...prev,
        amount: parseInt(price),
        batch_id: type === "batch" ? enrollId : undefined,
        course_id: type === "course" ? enrollId : undefined,
        itemName: title
      }));
      setShowPaymentModal(true);
      toast.success(`Enrolling in ${title}`);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const currentMonthPending = subscriptions.find((s: any) => s.month === paymentData.month && s.status?.toLowerCase() === 'pending');

  return (
    <div className="container-premium pt-28 md:pt-40 space-y-32 min-h-screen">
      <StudentHeader
        t={t}
        lang={lang}
        setLang={setLang}
        hasBatches={hasBatches}
        subStatus={subStatus}
        daysLeft={daysLeft}
        hasEnrollments={hasEnrollments}
        setShowPaymentModal={setShowPaymentModal}
      />

      <LiveClassBanner nextSession={nextSession} />

      <AnimatePresence>
        {currentMonthPending && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4 text-amber-200 overflow-hidden backdrop-blur-md"
          >
            <AlertCircle className="text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-amber-400">Payment Verification in Progress</p>
              <p className="text-sm opacity-80">Your payment for {currentMonthPending.month} (Trnx ID: {currentMonthPending.trnx_id}) is being verified by Saifullah Sir.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <section className="space-y-6">
           
            <WritingLab
                t={t}
                allSelectableItems={allSelectableItems}
                submissionForm={submissionForm}
                setSubmissionForm={setSubmissionForm}
                handleSubmissionUpload={handleSubmissionUpload}
                isUploading={isUploading}
                userSubmissions={userSubmissions}
              />
          </section>

          <section className="space-y-6">
            <div className="space-y-20">
               <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <HelpCircle className="text-royal-gold" />
              {t.quizzes}
            </h2>
            <QuizEngine />
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Sparkles className="text-royal-gold" />
              AI Writing Lab
            </h2>
               
              <GrammarAssistant />
             
            </div>
          </section>
        </div>
      </div>

      <PaymentHistory t={t} subscriptions={subscriptions} />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        allSelectableItems={allSelectableItems}
        translations={t}
        bkash={bkash}
        nagad={nagad}
        onSuccess={(data) => {
          setSubscriptions([...subscriptions, { ...data, status: 'pending', id: Math.random().toString() }]);
        }}
      />
    </div>
  );
}
