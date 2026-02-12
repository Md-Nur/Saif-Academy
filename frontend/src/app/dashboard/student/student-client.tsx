"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { PlayCircle, CreditCard, CheckCircle, AlertCircle, Calendar, Lock, Globe, Clock, FileText, Send, HelpCircle, Sparkles, Bot } from "lucide-react";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from "date-fns";
import { getNextSession } from "@/actions/routine";
import { motion, AnimatePresence } from "framer-motion";
import QuizEngine from "@/components/Practice/QuizEngine";
import GrammarAssistant from "@/components/AI/GrammarAssistant";
import Link from "next/link";
import PaymentModal from "@/components/Dashboard/PaymentModal";

const translations = {
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
  const [materials, setMaterials] = useState(initialMaterials);
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
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

  useEffect(() => {
    async function fetchNextSession() {
      const res = await getNextSession();
      if (res.success && res.nextSession) {
        setNextSession(res.nextSession);
      }
    }
    fetchNextSession();
  }, []);



  const t = translations[lang];

  // Combine batches and courses for selection
  const allSelectableItems = [
    ...allBatches.map((b: any) => ({ ...b, type: 'batch', displayName: `[Batch] ${b.name} - ${b.subject}` })),
    ...allCourses.map((c: any) => ({ ...c, type: 'course', displayName: `[Course] ${c.title} - ${c.subject}` }))
  ];

  const hasEnrollments = allSelectableItems.length > 0;

  // Subscription Status State
  const [subStatus, setSubStatus] = useState<'active' | 'grace' | 'expired'>('expired');
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Basic validity check
    const latestVerified = [...subscriptions]
      .filter((s: any) => s.status === 'verified')
      .sort((a: any, b: any) => new Date(b.month).getTime() - new Date(a.month).getTime())[0];

    if (latestVerified) {
      // Expiry is 1st of next month
      const expiryDate = new Date(latestVerified.month);
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      const now = new Date();
      const diff = expiryDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      setDaysLeft(Math.max(0, days));

      if (days > 0) {
        setSubStatus('active');
      } else {
        // Grace Period Logic: First 10 days of the month
        const currentDay = now.getDate();
        // Check if the latest verified subscription was for the IMMEDIATELY preceding month
        // logic: expiryDate (1st of this month) should be close to now.
        // If expiryDate was months ago, then diff is very negative.
        // We only allow grace if we are in the month immediately following the expiry.
        const isNextMonth = now.getMonth() === expiryDate.getMonth() && now.getFullYear() === expiryDate.getFullYear(); // Wait, if expiry is set to next month 1st...

        // Simpler check: If today is 1st-10th, give grace.
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

      // Clear URL parameters without refresh
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // handlePayment moved to PaymentModal

  const currentMonthPending = subscriptions.find((s: any) => s.month === paymentData.month && s.status === 'pending');

  return (
    <div className="container-premium pt-28 md:pt-40 space-y-32 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-10 border-royal-gold/20">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-royal-gold rounded-full blur opacity-25"></div>
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="relative p-3 bg-slate-900 rounded-full text-royal-gold hover:scale-110 transition-transform border border-white/10 flex items-center gap-2 px-4"
            >
              <Globe size={20} />
              <span className="text-sm font-bold">{lang === "en" ? "বাংলা" : "English"}</span>
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight">{t.dashboard}</h1>
            <p className="text-slate-400">{t.welcome} <span className="text-royal-gold font-bold">{t.academy}</span></p>
          </div>
        </div>


        <div className="flex flex-col items-end gap-2">
          {subStatus === 'active' ? (
            <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-2xl">
              <div className="text-right">
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">{t.validity}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{daysLeft}</span>
                  <span className="text-sm text-slate-400">{t.daysRemaining}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-green-500 flex items-center justify-center relative">
                <Clock size={20} className="text-green-400" />
              </div>
            </div>
          ) : subStatus === 'grace' ? (
            <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl animate-pulse">
              <div className="text-right">
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Grace Period</p>
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-bold text-slate-300">Pay by 10th</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-amber-500 flex items-center justify-center relative">
                <AlertCircle size={20} className="text-amber-400" />
              </div>
            </div>
          ) : (
            <div className="bg-slate-500/10 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              {hasEnrollments ? (
                <>
                  <AlertCircle size={24} className="text-red-500" />
                  <p className="font-bold text-red-400">{t.expired}</p>
                </>
              ) : (
                <>
                  <Sparkles size={24} className="text-royal-gold animate-pulse" />
                  <Link href="/courses" className="font-bold text-royal-gold">{t.enrollNow}</Link>
                </>
              )}
            </div>
          )}

          {hasEnrollments ? (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="btn-gold flex items-center gap-2 shadow-lg shadow-amber-500/30 w-full md:w-auto justify-center"
            >
              <CreditCard size={20} />
              {t.payFee}
            </button>
          ) : (
            <Link
              href="/batches"
              className="btn-gold flex items-center gap-2 shadow-lg shadow-amber-500/30 w-full md:w-auto justify-center"
            >
              <Sparkles size={20} />
              {t.enrollFirst}
            </Link>
          )}
        </div>
      </header>

      {/* Next Live Class Section */}
      {nextSession && (
        <section className="glass-panel p-6 border-royal-gold/20 bg-royal-gold/5 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/10 blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${nextSession.is_live ? "bg-red-500/20 text-red-500 border-red-500/20 animate-pulse" : "bg-royal-gold/20 text-royal-gold border-royal-gold/20"}`}>
                {nextSession.is_live ? "LIVE NOW" : "UPCOMING CLASS"}
              </span>
              <h3 className="text-xl font-bold text-white max-w-md truncate">{nextSession.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded"><Calendar size={12} className="text-royal-gold" /> {new Date(nextSession.start_time).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded"><Clock size={12} className="text-royal-gold" /> {new Date(nextSession.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {(nextSession.batch_name || nextSession.course_title) && (
                <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/5">
                  {nextSession.batch_name || nextSession.course_title}
                </span>
              )}
            </div>
          </div>
          <div className="relative z-10 mt-4 md:mt-0 w-full md:w-auto">
            {nextSession.is_live ? (
              <a
                href={nextSession.zoom_link || "#"}
                target="_blank"
                className="btn-primary-premium px-8 py-4 flex items-center justify-center gap-3 text-sm uppercase font-black tracking-widest animate-pulse shadow-lg shadow-red-500/20 bg-red-600 border-red-500 hover:bg-red-700 w-full md:w-auto"
              >
                <PlayCircle size={20} fill="currentColor" />
                JOIN LIVE CLASS
              </a>
            ) : (
              <div className="text-right bg-slate-900/40 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Starts In</p>
                <p className="text-2xl font-mono font-bold text-white">
                  {(() => {
                    const diff = new Date(nextSession.start_time).getTime() - new Date().getTime();
                    if (diff < 0) return "Starting...";
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    return `${hours}h ${mins}m`;
                  })()}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

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
        <div className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <section className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <HelpCircle className="text-royal-gold" />
                {t.quizzes}
              </h2>
              <QuizEngine />
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Sparkles className="text-royal-gold" />
                AI Writing Lab
              </h2>
              <div className="space-y-20">
                <GrammarAssistant />

                <div className="glass-panel p-10 space-y-8">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="text-royal-gold" />
                    <p className="text-white font-bold">{t.handwriting}</p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={t.essayPlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                    />
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:border-royal-gold/30 transition-all group cursor-pointer">
                      <FileText size={40} className="mx-auto text-slate-600 group-hover:text-royal-gold transition-colors mb-2" />
                      <p className="text-sm text-slate-500 group-hover:text-slate-300">Upload your PDF/Image for Saifullah Sir's review</p>
                      <input type="file" className="hidden" />
                    </div>
                    <button className="w-full btn-gold flex items-center justify-center gap-2">
                      <Send size={18} /> {t.sendToSir}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="my-16">
        <details className="glass-panel border-white/5 overflow-hidden group">
          <summary className="cursor-pointer p-4 flex items-center justify-between hover:bg-white/5 transition-all">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-slate-500" />
              <h3 className="text-sm font-medium text-slate-400">{t.history}</h3>
            </div>
            <div className="text-slate-600 group-open:rotate-180 transition-transform">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </summary>
          <div className="p-4 pt-0 space-y-3 max-h-[400px] overflow-y-auto">
            {subscriptions.length > 0 ? [...subscriptions].reverse().map((sub: any) => (
              <div key={sub.id} className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${sub.status === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <CreditCard size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{sub.month}</p>
                    <p className="text-[9px] text-slate-600 font-mono">{sub.trnx_id}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${sub.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {sub.status === 'verified' ? t.verified : t.pending}
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-600 py-6 text-sm">No payment history found.</p>
            )}
          </div>
        </details>
      </section>
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
