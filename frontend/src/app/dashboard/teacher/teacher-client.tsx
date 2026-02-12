"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Users, CheckCircle, Clock, Upload, Link as LinkIcon, FileText, Filter, BarChart3, Layers, Sparkles, FileSearch, Plus, Pencil, Trash2, GraduationCap, Users2, Video, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formatTime } from "@/lib/utils";
import { verifySubscription, rejectSubscription, getSubscriptions, uploadMaterial, createBatch, updateBatch, deleteBatch, createCourse, updateCourse, deleteCourse, promoteUser, findUsers, removeBatchLink, removeCourseLink } from "@/actions/teacher";
import { getRoutines, createRoutine, updateRoutine, deleteRoutine, createSession, getSessions, getTeacherNextSession } from "@/actions/routine";
import { motion, AnimatePresence } from "framer-motion";

// Modular Components
import OverviewSection from "./components/OverviewSection";
import UploadMaterialSection from "./components/UploadMaterialSection";
import TransactionsSection from "./components/TransactionsSection";
import BatchManagement from "./components/BatchManagement";
import CourseManagement from "./components/CourseManagement";
import RoutineManagement from "./components/RoutineManagement";
import UserManagement from "./components/UserManagement";

// Modals
import RoutineModal from "./components/modals/RoutineModal";
import SessionModal from "./components/modals/SessionModal";
import QuickLinkModal from "./components/modals/QuickLinkModal";
import ManagementModal from "./components/modals/ManagementModal";
import ConfirmationModal from "./components/modals/ConfirmationModal";

export default function TeacherDashboardClient({ initialPendingSubs, initialStats, initialBatches = [], initialCourses = [] }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const batchFilter = searchParams.get("batchId") || "All";
  const courseFilter = searchParams.get("courseId") || "All";
  const monthFilter = searchParams.get("month") || "All";

  const [stats, setStats] = useState(initialStats);
  const [pendingSubs, setPendingSubs] = useState(initialPendingSubs);
  const [allSubs, setAllSubs] = useState<any[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subsFilter, setSubsFilter] = useState("All");
  const [uploadData, setUploadData] = useState({ title: "", type: "pdf", url: "", batch_ids: "" });

  // Management State
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview"); // overview, management, transactions
  const [mgmtTab, setMgmtTab] = useState(searchParams.get("mgmt") || "batches"); // batches, courses, routines
  const [batchesList, setBatchesList] = useState(initialBatches);
  const [coursesList, setCoursesList] = useState(initialCourses);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  // Routine Management State
  const [selectedBatchForRoutine, setSelectedBatchForRoutine] = useState<string>("");
  const [selectedCourseForRoutine, setSelectedCourseForRoutine] = useState<string>("");
  const [routineType, setRoutineType] = useState<"batch" | "course">("batch");
  const [routines, setRoutines] = useState<any[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [editingRoutine, setEditingRoutine] = useState<any>(null);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [routineFormData, setRoutineFormData] = useState({ day_of_week: "", start_time: "", end_time: "" });
  const [sessionFormData, setSessionFormData] = useState({ title: "", scheduled_at: "", zoom_link: "" });
  const [quickLinkItem, setQuickLinkItem] = useState<any>(null);
  const [quickLinkValue, setQuickLinkValue] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ id: string; type: string } | null>(null);
  const [showQuickLinkModal, setShowQuickLinkModal] = useState(false);

  const fetchTransactions = async (status: string) => {
    setSubsLoading(true);
    try {
      const res = await getSubscriptions(status === "All" ? "" : status.toLowerCase());
      if (res.success) {
        setAllSubs(res.subscriptions || []);
      }
    } catch (err) {
      toast.error("Failed to load history");
    } finally {
      setSubsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "transactions") {
      fetchTransactions(subsFilter);
    }
  }, [activeTab, subsFilter]);

  // Update URL when activeTab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Update URL when mgmtTab changes
  const handleMgmtTabChange = (tab: string) => {
    setMgmtTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mgmt", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const [promoUserId, setPromoUserId] = useState("");
  const [isPromoting, setIsPromoting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [nextSession, setNextSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    async function fetchNext() {
      const res = await getTeacherNextSession();
      if (res.success && res.nextSession) {
        setNextSession(res.nextSession);
      }
    }
    fetchNext();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      const result = await verifySubscription(id);
      if (result.success) {
        toast.success("Subscription verified!");
        setPendingSubs(pendingSubs.filter((s: any) => s.id !== id));
        setStats({ ...stats, pendingPayments: stats.pendingPayments - 1 });
      } else {
        toast.error(result.error || "Verification failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleReject = async (id: string) => {
    setConfirmAction({ id, type: "reject" });
    setShowConfirmModal(true);
  };

  const confirmReject = async () => {
    if (!confirmAction) return;
    setShowConfirmModal(false);

    try {
      const result = await rejectSubscription(confirmAction.id);
      if (result.success) {
        toast.success("Subscription rejected");
        setPendingSubs(pendingSubs.filter((s: any) => s.id !== confirmAction.id));
        setStats({ ...stats, pendingPayments: stats.pendingPayments - 1 });
      } else {
        toast.error(result.error || "Rejection failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setConfirmAction(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const batchList = uploadData.batch_ids.split(",").map(id => id.trim()).filter(id => id !== "");
      if (batchList.length === 0) {
        toast.error("Please provide at least one Batch ID");
        return;
      }
      const result = await uploadMaterial({ ...uploadData, batch_id: batchList[0] });
      if (result.success) {
        toast.success(`Resource distributed!`);
        setUploadData({ title: "", type: "pdf", url: "", batch_ids: "" });
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleMgmtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let result;

      // Handle multiple video URLs for free courses
      let videoUrl = formData.video_url;
      if (mgmtTab === "courses" && formData.is_free && formData.video_urls) {
        videoUrl = formData.video_urls
          .filter((url: string) => url.trim() !== "")
          .join(",");
      }

      if (mgmtTab === "batches") {
        // Construct clean payload for Batch
        const batchPayload = {
          name: formData.name || formData.title,
          class_level: parseInt(formData.class_level || formData.classLevel),
          subject: formData.subject || "English 1st Paper",
          price_per_month: parseInt(formData.price_per_month || formData.price || "0"),
          description: formData.description,
          meeting_link: formData.meeting_link
        };

        if (editingItem) result = await updateBatch(editingItem.id, batchPayload);
        else result = await createBatch(batchPayload);
      } else {
        // Construct clean payload for Course
        const coursePayload = {
          title: formData.title || formData.name,
          description: formData.description,
          classLevel: parseInt(formData.classLevel || formData.class_level),
          board: formData.board || "Dhaka", // Default or from form
          subject: formData.subject || "English 1st Paper",
          price: parseFloat(formData.price || formData.price_per_month || "0"),
          course_type: formData.course_type || "recorded",
          is_free: formData.is_free || false,
          video_url: videoUrl,
          instituteName: formData.instituteName,
          meeting_link: formData.meeting_link
        };

        if (editingItem) result = await updateCourse(editingItem.id, coursePayload);
        else result = await createCourse(coursePayload);
      }

      if (result.success) {
        toast.success(`${mgmtTab === "batches" ? "Batch" : "Course"} saved successfully!`);
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
        // In a real app, revalidatePath would refresh data, but we update locally for better UX
        window.location.reload();
      } else {
        toast.error(result.error || "Save failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const result = mgmtTab === "batches" ? await deleteBatch(id) : await deleteCourse(id);
      if (result.success) {
        toast.success("Deleted successfully!");
        window.location.reload();
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleQuickLinkUpdate = async () => {
    if (!quickLinkItem) return;
    try {
      let result;
      if (mgmtTab === "batches") {
        const batchPayload = {
          name: quickLinkItem.name,
          class_level: quickLinkItem.class_level,
          subject: quickLinkItem.subject || "English 1st Paper",
          price_per_month: quickLinkItem.price_per_month,
          description: quickLinkItem.description,
          meeting_link: quickLinkValue
        };
        result = await updateBatch(quickLinkItem.id, batchPayload);
      } else {
        const coursePayload = {
          title: quickLinkItem.title,
          description: quickLinkItem.description,
          classLevel: quickLinkItem.classLevel,
          board: quickLinkItem.board || "Dhaka",
          subject: quickLinkItem.subject || "English 1st Paper",
          price: quickLinkItem.price,
          course_type: quickLinkItem.course_type,
          is_free: quickLinkItem.is_free,
          video_url: quickLinkItem.video_url,
          instituteName: quickLinkItem.instituteName,
          meeting_link: quickLinkValue
        };
        result = await updateCourse(quickLinkItem.id, coursePayload);
      }

      if (result.success) {
        toast.success("Meeting link updated!");
        setShowQuickLinkModal(false);
        window.location.reload();
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleQuickLinkRemove = async () => {
    if (!quickLinkItem) return;
    if (!confirm("Are you sure you want to remove this meeting link?")) return;

    try {
      let result;
      if (mgmtTab === "batches") {
        result = await removeBatchLink(quickLinkItem.id);
      } else {
        result = await removeCourseLink(quickLinkItem.id);
      }

      if (result.success) {
        toast.success("Meeting link removed!");
        setShowQuickLinkModal(false);
        window.location.reload();
      } else {
        toast.error(result.error || "Removal failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoUserId) return;
    setIsPromoting(true);
    try {
      const result = await promoteUser(promoUserId);
      if (result.success) {
        toast.success("User promoted to teacher successfully!");
        setPromoUserId("");
      } else {
        toast.error(result.error || "Promotion failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPromoting(false);
    }
  };

  const handleSearchUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await findUsers(searchQuery);
      if (result.success) {
        setSearchResults(result.users || []);
        if (result.users?.length === 0) {
          toast.error("No users found matching your search.");
        }
      } else {
        toast.error(result.error || "Search failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred during search");
    } finally {
      setIsSearching(false);
    }
  };

  // Routine Handlers

  const loadRoutines = async (id: string, type: "batch" | "course") => {
    if (!id) return;
    const routineRes = await getRoutines(id, type);
    const sessionRes = await getSessions(id, type);

    if (routineRes.success) {
      setRoutines(routineRes.routines || []);
    } else {
      toast.error(routineRes.error || "Failed to load routines");
    }

    if (sessionRes.success) {
      setUpcomingSessions(sessionRes.sessions || []);
    }
  };

  const handleRoutineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const dataToSend: any = { ...routineFormData };

      if (routineType === "batch") dataToSend.batch_id = selectedBatchForRoutine;
      else dataToSend.course_id = selectedCourseForRoutine;

      const result = editingRoutine
        ? await updateRoutine(editingRoutine.id, dataToSend)
        : await createRoutine(dataToSend);

      if (result.success) {
        toast.success(`Routine ${editingRoutine ? 'updated' : 'created'} successfully!`);
        setShowRoutineModal(false);
        setEditingRoutine(null);
        setRoutineFormData({ day_of_week: "", start_time: "", end_time: "" });
        loadRoutines(routineType === "batch" ? selectedBatchForRoutine : selectedCourseForRoutine, routineType);
      } else {
        toast.error(result.error || "Operation failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteRoutine = async (routineId: string) => {
    if (!confirm("Delete this routine?")) return;
    try {
      const result = await deleteRoutine(routineId);
      if (result.success) {
        toast.success("Routine deleted!");
        loadRoutines(routineType === "batch" ? selectedBatchForRoutine : selectedCourseForRoutine, routineType);
      } else {
        toast.error(result.error || "Delete failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend: any = { ...sessionFormData };
      if (routineType === "batch") dataToSend.batch_id = selectedBatchForRoutine;
      else dataToSend.course_id = selectedCourseForRoutine;

      const result = await createSession(dataToSend);

      if (result.success) {
        toast.success("Session scheduled!");
        setShowSessionModal(false);
        setSessionFormData({ title: "", scheduled_at: "", zoom_link: "" });
        loadRoutines(routineType === "batch" ? selectedBatchForRoutine : selectedCourseForRoutine, routineType);
      } else {
        toast.error(result.error || "Failed to schedule session");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Synchronize local state when initialPendingSubs changes (e.g., due to server-side filtering)
  useEffect(() => {
    setPendingSubs(initialPendingSubs);
  }, [initialPendingSubs]);

  return (
    <div className="container-premium pt-28 md:pt-40 space-y-32 min-h-screen">
      <header className="glass-panel p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-royal-blue/10 border-white/5">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-tight">Saifullah Sir's <span className="text-royal-gold">Command Center</span></h1>
          <p className="text-slate-400">Total Operational Control: Students, Payments, & Intelligence.</p>
        </div>
        <div className="flex bg-slate-900 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => handleTabChange("overview")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "overview" ? "bg-royal-gold text-royal-blue-light" : "text-slate-400 hover:text-white"}`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabChange("management")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "management" ? "bg-royal-gold text-royal-blue-light" : "text-slate-400 hover:text-white"}`}
          >
            Management
          </button>
          <button
            onClick={() => handleTabChange("transactions")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "transactions" ? "bg-royal-gold text-royal-blue-light" : "text-slate-400 hover:text-white"}`}
          >
            Transactions
          </button>
        </div>
      </header>

      {activeTab === "overview" ? (
        <div className="space-y-16">
          <OverviewSection
            stats={stats}
            nextSession={nextSession}
            pendingSubs={pendingSubs}
            batchFilter={batchFilter}
            courseFilter={courseFilter}
            monthFilter={monthFilter}
            batchesList={batchesList}
            coursesList={coursesList}
            handleFilterChange={handleFilterChange}
            handleVerify={handleVerify}
            handleReject={handleReject}
          />
          <UploadMaterialSection
            uploadData={uploadData}
            setUploadData={setUploadData}
            handleUpload={handleUpload}
          />
        </div>
      ) : activeTab === "transactions" ? (
        <TransactionsSection
          subsFilter={subsFilter}
          setSubsFilter={setSubsFilter}
          fetchTransactions={fetchTransactions}
          subsLoading={subsLoading}
          allSubs={allSubs}
          handleVerify={handleVerify}
          handleReject={handleReject}
        />
      ) : (
        /* Management UI */
        <div className="space-y-24">
          <div className="flex bg-slate-900/50 p-2 rounded-2xl border border-white/5 w-fit">
            <button
              onClick={() => handleMgmtTabChange("batches")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "batches" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <Users2 size={18} />
              Batches
            </button>
            <button
              onClick={() => handleMgmtTabChange("courses")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "courses" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <GraduationCap size={18} />
              Courses
            </button>
            <button
              onClick={() => handleMgmtTabChange("routines")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "routines" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <Clock size={18} />
              Routines
            </button>
            <button
              onClick={() => handleMgmtTabChange("users")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "users" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <Users size={18} />
              Users
            </button>
          </div>

          <div className="grid grid-cols-1 gap-24 my-20">
            {mgmtTab === "batches" ? (
              <BatchManagement
                batchesList={batchesList}
                setEditingItem={setEditingItem}
                setFormData={setFormData}
                setIsModalOpen={setIsModalOpen}
                setQuickLinkItem={setQuickLinkItem}
                setQuickLinkValue={setQuickLinkValue}
                setShowQuickLinkModal={setShowQuickLinkModal}
                handleDelete={handleDelete}
              />
            ) : mgmtTab === "courses" ? (
              <CourseManagement
                coursesList={coursesList}
                setEditingItem={setEditingItem}
                setFormData={setFormData}
                setIsModalOpen={setIsModalOpen}
                setQuickLinkItem={setQuickLinkItem}
                setQuickLinkValue={setQuickLinkValue}
                setShowQuickLinkModal={setShowQuickLinkModal}
                handleDelete={handleDelete}
              />
            ) : mgmtTab === "routines" ? (
              <RoutineManagement
                routineType={routineType}
                setRoutineType={setRoutineType}
                setRoutines={setRoutines}
                setUpcomingSessions={setUpcomingSessions}
                selectedBatchForRoutine={selectedBatchForRoutine}
                setSelectedBatchForRoutine={setSelectedBatchForRoutine}
                selectedCourseForRoutine={selectedCourseForRoutine}
                setSelectedCourseForRoutine={setSelectedCourseForRoutine}
                batchesList={batchesList}
                coursesList={coursesList}
                routines={routines}
                loadRoutines={loadRoutines}
                setEditingRoutine={setEditingRoutine}
                setRoutineFormData={setRoutineFormData}
                setShowRoutineModal={setShowRoutineModal}
                handleDeleteRoutine={handleDeleteRoutine}
                setShowSessionModal={setShowSessionModal}
                upcomingSessions={upcomingSessions}
              />
            ) : (
              <UserManagement
                handleSearchUsers={handleSearchUsers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearching={isSearching}
                searchResults={searchResults}
                isPromoting={isPromoting}
                setPromoUserId={setPromoUserId}
                handlePromote={handlePromote}
              />
            )}
          </div>
        </div>
      )}

      <RoutineModal
        showRoutineModal={showRoutineModal}
        setShowRoutineModal={setShowRoutineModal}
        editingRoutine={editingRoutine}
        routineFormData={routineFormData}
        setRoutineFormData={setRoutineFormData}
        handleRoutineSubmit={handleRoutineSubmit}
      />

      <SessionModal
        showSessionModal={showSessionModal}
        setShowSessionModal={setShowSessionModal}
        sessionFormData={sessionFormData}
        setSessionFormData={setSessionFormData}
        handleSessionSubmit={handleSessionSubmit}
      />

      <QuickLinkModal
        showQuickLinkModal={showQuickLinkModal}
        setShowQuickLinkModal={setShowQuickLinkModal}
        quickLinkItem={quickLinkItem}
        quickLinkValue={quickLinkValue}
        setQuickLinkValue={setQuickLinkValue}
        handleQuickLinkUpdate={handleQuickLinkUpdate}
        handleQuickLinkRemove={handleQuickLinkRemove}
      />

      <ManagementModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingItem={editingItem}
        mgmtTab={mgmtTab}
        formData={formData}
        setFormData={setFormData}
        handleMgmtSubmit={handleMgmtSubmit}
      />

      <ConfirmationModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        confirmReject={confirmReject}
      />



    </div >
  );
}
