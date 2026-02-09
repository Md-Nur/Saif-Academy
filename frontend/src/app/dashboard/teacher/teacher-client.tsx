"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Users, CheckCircle, Clock, Upload, Link as LinkIcon, FileText, Filter, BarChart3, Layers, Sparkles, FileSearch, Plus, Pencil, Trash2, GraduationCap, Users2, Video } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formatTime } from "@/lib/utils";
import { verifySubscription, uploadMaterial, createBatch, updateBatch, deleteBatch, createCourse, updateCourse, deleteCourse } from "@/actions/teacher";
import { getRoutines, createRoutine, updateRoutine, deleteRoutine, createSession, getSessions } from "@/actions/routine";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherDashboardClient({ initialPendingSubs, initialStats, initialBatches = [], initialCourses = [] }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const batchFilter = searchParams.get("batchId") || "All";
  const courseFilter = searchParams.get("courseId") || "All";
  const monthFilter = searchParams.get("month") || "All";

  const [stats, setStats] = useState(initialStats);
  const [pendingSubs, setPendingSubs] = useState(initialPendingSubs);
  const [uploadData, setUploadData] = useState({ title: "", type: "pdf", url: "", batch_ids: "" });
  
  // Management State
  const [activeTab, setActiveTab] = useState("overview"); // overview, management
  const [mgmtTab, setMgmtTab] = useState("batches"); // batches, courses, routines
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
  const [showQuickLinkModal, setShowQuickLinkModal] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      const dataToSend = { ...formData };

      // Handle multiple video URLs for free courses
      if (mgmtTab === "courses" && formData.is_free && formData.video_urls) {
        dataToSend.video_url = formData.video_urls
          .filter((url: string) => url.trim() !== "")
          .join(",");
        delete dataToSend.video_urls;
      }

      if (mgmtTab === "batches") {
        dataToSend.class_level = parseInt(dataToSend.class_level || dataToSend.classLevel);
        dataToSend.price_per_month = parseInt(dataToSend.price_per_month || dataToSend.price);
        if (editingItem) result = await updateBatch(editingItem.id, dataToSend);
        else result = await createBatch(dataToSend);
      } else {
        dataToSend.classLevel = parseInt(dataToSend.classLevel);
        dataToSend.price = parseFloat(dataToSend.price);
        if (editingItem) result = await updateCourse(editingItem.id, dataToSend);
        else result = await createCourse(dataToSend);
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
        result = await updateBatch(quickLinkItem.id, { meeting_link: quickLinkValue });
      } else {
        result = await updateCourse(quickLinkItem.id, { meeting_link: quickLinkValue });
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
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "overview" ? "bg-royal-gold text-royal-blue-light" : "text-slate-400 hover:text-white"}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("management")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "management" ? "bg-royal-gold text-royal-blue-light" : "text-slate-400 hover:text-white"}`}
          >
            Management
          </button>
        </div>
      </header>

      {activeTab === "overview" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="glass-card p-6 flex items-center space-x-6 hover:bg-white/5 transition-all border-white/5 group">
              <div className="p-4 bg-royal-blue-light rounded-2xl text-royal-gold shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Active Students</p>
                <p className="text-4xl font-black text-white mt-1">{stats.activeStudents}</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center space-x-6 hover:bg-white/5 transition-all border-white/5 group">
              <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 shadow-inner border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Pending Tasks</p>
                <p className="text-4xl font-black text-white mt-1">{stats.pendingPayments}</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center space-x-6 hover:bg-white/5 transition-all border-white/5 group">
              <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 shadow-inner border border-green-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 size={32} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Success Rate</p>
                <p className="text-4xl font-black text-white mt-1">94%</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            <div className="space-y-8">
              <section className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <CheckCircle className="text-royal-gold" />
                    Payment Verifications
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Batch Filter */}
                    <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                      <Filter size={14} className="text-slate-500" />
                      <select 
                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                        value={batchFilter}
                        onChange={(e) => handleFilterChange("batchId", e.target.value)}
                      >
                        <option value="All">All Batches</option>
                        {batchesList.map((batch: any) => (
                          <option key={batch.id} value={batch.id}>{batch.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Course Filter */}
                    <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                      <BarChart3 size={14} className="text-slate-500" />
                      <select 
                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                        value={courseFilter}
                        onChange={(e) => handleFilterChange("courseId", e.target.value)}
                      >
                        <option value="All">All Courses</option>
                        {coursesList.map((course: any) => (
                          <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Month Filter */}
                    <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                      <Clock size={14} className="text-slate-500" />
                      <select 
                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                        value={monthFilter}
                        onChange={(e) => handleFilterChange("month", e.target.value)}
                      >
                        <option value="All">All Months</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const d = new Date();
                          d.setMonth(d.getMonth() - i);
                          const monthStr = d.toISOString().slice(0, 7);
                          return <option key={monthStr} value={monthStr}>{monthStr}</option>;
                        })}
                      </select>
                    </div>

                  </div>
                </div>

                <div className="glass-panel overflow-hidden border-white/5 p-2 shadow-2xl">
                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-0">
                      <thead>
                        <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                          <th className="py-4 pl-6 text-left border-b border-white/10">Student Detail</th>
                          <th className="py-4 text-left border-b border-white/10 w-1/4">Item</th>
                          <th className="py-4 text-left border-b border-white/10">Amount</th>
                          <th className="py-4 text-left text-royal-gold border-b border-white/10">Transaction</th>
                          <th className="py-4 pr-6 text-right border-b border-white/10">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {pendingSubs.map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                            <td className="py-5 pl-6 border-b border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-royal-gold border border-white/10 uppercase text-base">
                                  {sub.user?.name?.substring(0, 1) || "?"}
                                </div>
                                <div>
                                   <p className="text-white font-bold text-sm leading-tight">{sub.user?.name || "Unknown Student"}</p>
                                   <p className="text-[10px] text-slate-500 font-mono italic">{sub.user?.email}</p>
                                </div>
                              </div>
                            </td>
                             <td className="py-5 border-b border-white/5">
                                <div className="flex flex-col gap-1.5 items-start">
                                  <span className="px-3 py-1 bg-royal-blue-light/30 border border-white/10 rounded-md text-[10px] font-bold text-slate-200">
                                    {sub.batch?.name || sub.course?.title || "Monthly Fee"}
                                  </span>
                                  <p className="text-[10px] text-slate-500 font-mono italic opacity-60 uppercase tracking-tighter">{sub.month}</p>
                                </div>
                             </td>
                             <td className="py-5 border-b border-white/5">
                                <p className="font-bold text-white text-sm">৳{sub.amount}</p>
                                <p className="text-[10px] text-slate-500 font-mono italic">
                                  {mounted && sub.created_at ? new Date(sub.created_at).toLocaleString() : "..."}
                                </p>
                             </td>
                             <td className="py-5 border-b border-white/5">
                                <div className="space-y-1">
                                  <p className="font-mono font-bold text-royal-gold tracking-widest text-xs">{sub.trnx_id}</p>
                                  <p className="text-[10px] text-slate-500 font-mono italic opacity-60">From: {sub.sender_number || "N/A"}</p>
                                </div>
                             </td>
                            <td className="py-5 pr-6 text-right border-b border-white/5">
                              <button 
                                onClick={() => handleVerify(sub.id)}
                                className="btn-gold py-2 px-5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-royal-gold/5"
                              >
                                Verify
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden divide-y divide-white/5">
                    {pendingSubs.map((sub: any) => (
                      <div key={sub.id} className="p-5 space-y-5 hover:bg-white/2 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-royal-gold border border-white/10 uppercase text-base">
                              {sub.user?.name?.substring(0, 1) || "?"}
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm leading-tight">{sub.user?.name || "Unknown Student"}</p>
                              <p className="text-[10px] text-slate-500 font-mono italic uppercase tracking-tighter">Student</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 bg-royal-blue-light/20 border border-white/10 rounded-full text-[9px] font-black tracking-widest text-royal-gold">
                            PENDING
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest">Enrollment</p>
                            <p className="text-[11px] font-bold text-slate-300 truncate">{sub.batch?.name || sub.course?.title || "Monthly Fee"}</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest">Billing</p>
                            <p className="text-[11px] font-bold text-slate-300">{sub.month}</p>
                          </div>
                        </div>

                        <div className="bg-slate-900/40 p-3.5 rounded-xl border border-white/5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <p className="text-[9px] uppercase font-black text-royal-gold/70 tracking-widest">TRX ID</p>
                            <p className="text-xs font-mono font-bold text-white tracking-widest">{sub.trnx_id}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
                            <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest">Sender</p>
                            <p className="text-xs font-mono text-slate-400 italic">{sub.sender_number || "N/A"}</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleVerify(sub.id)}
                          className="btn-gold w-full py-3.5 text-xs font-black uppercase tracking-widest shadow-xl shadow-royal-gold/10"
                        >
                          Verify Transaction
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {pendingSubs.length === 0 && (
                    <div className="text-center py-20 text-slate-500 italic">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-5 bg-slate-900/50 rounded-full border border-white/5 shadow-inner">
                          <CheckCircle size={40} className="text-royal-gold opacity-30" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-base mb-1 uppercase tracking-tight">System Optimized</p>
                          <p className="text-xs text-slate-500">No pending verifications detected.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                  <Upload className="text-royal-gold" />
                  Bulk Distribution
                </h2>
                <div className="glass-panel p-8 md:p-12 border-white/5 bg-white/2">
                   <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="form-control space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. English Grammar PDF" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                          value={uploadData.title}
                          onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-control space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Type</label>
                        <select 
                          className="w-full bg-slate-900 border border-white/10 rounded-lg py-3.5 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                          value={uploadData.type}
                          onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                        >
                          <option value="pdf">PDF Document</option>
                          <option value="link">External Link</option>
                          <option value="video">Lecture Video</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="form-control space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource URL</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-4 top-4 text-slate-600" size={18} />
                          <input 
                            type="url" 
                            placeholder="https://..." 
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                            value={uploadData.url}
                            onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-control space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign to Batches (IDs)</label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-4 text-slate-600" size={18} />
                          <input 
                            type="text"
                            placeholder="UUID-1, UUID-2..." 
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                            value={uploadData.batch_ids}
                            onChange={(e) => setUploadData({ ...uploadData, batch_ids: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button type="submit" className="btn-primary-premium w-full flex items-center justify-center gap-3 py-4 text-sm font-bold shadow-royal-blue/20">
                        <Upload size={20} />
                        Distribute Resource to Selected Batches
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        /* Management UI */
        <div className="space-y-24">
          <div className="flex bg-slate-900/50 p-2 rounded-2xl border border-white/5 w-fit">
            <button 
              onClick={() => setMgmtTab("batches")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "batches" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <Users2 size={18} />
              Batches
            </button>
            <button 
              onClick={() => setMgmtTab("courses")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "courses" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <GraduationCap size={18} />
              Courses
            </button>
            <button 
              onClick={() => setMgmtTab("routines")}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all ${mgmtTab === "routines" ? "bg-white/10 text-royal-gold border border-royal-gold/20" : "text-slate-500 hover:text-white"}`}
            >
              <Clock size={18} />
              Routines
            </button>
          </div>

          <div className="grid grid-cols-1 gap-24 my-20">
            {mgmtTab === "batches" ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <Users2 className="text-royal-gold" />
                    Active Batches
                  </h2>
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({
                        subject: "English 1st Paper",
                        price_per_month: 1000,
                        meeting_link: ""
                      });
                      setIsModalOpen(true);
                    }}
                    className="btn-primary-premium px-6 py-3 flex items-center gap-2 text-sm"
                  >
                    <Plus size={18} />
                    Add New Batch
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {batchesList.map((item: any) => (
                    <div key={item.id} className="glass-panel p-6 border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 p-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                         <button 
                           onClick={() => {
                             setQuickLinkItem(item);
                             setQuickLinkValue(item.meeting_link || "");
                             setShowQuickLinkModal(true);
                           }}
                           className="p-2 bg-royal-gold/80 rounded-lg text-royal-blue-dark hover:bg-royal-gold transition-colors"
                           title="Quick Update Link"
                         >
                           <LinkIcon size={18} />
                         </button>
                         <button 
                           onClick={() => {
                             setEditingItem(item);
                             setFormData(item);
                             setIsModalOpen(true);
                           }}
                          className="p-2 bg-royal-blue-light/80 rounded-lg text-white hover:text-royal-gold transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-royal-gold/60">Class {item.class_level || item.classLevel}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-royal-gold transition-colors">{item.name}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-royal-gold font-bold">৳{item.price_per_month}</span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Monthly</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : mgmtTab === "courses" ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <GraduationCap className="text-royal-gold" />
                    Course Catalog
                  </h2>
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({
                        subject: "English 1st Paper",
                        board: "NCTB",
                        price: 1500,
                        course_type: "recorded",
                        is_free: false,
                        video_urls: [""],
                        meeting_link: ""
                      });
                      setIsModalOpen(true);
                    }}
                    className="btn-primary-premium px-6 py-3 flex items-center gap-2 text-sm"
                  >
                    <Plus size={18} />
                    Add New Course
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {coursesList.map((item: any) => (
                    <div key={item.id} className="glass-panel p-6 border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 p-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                         <button 
                           onClick={() => {
                             setQuickLinkItem(item);
                             setQuickLinkValue(item.meeting_link || "");
                             setShowQuickLinkModal(true);
                           }}
                           className="p-2 bg-royal-gold/80 rounded-lg text-royal-blue-dark hover:bg-royal-gold transition-colors"
                           title="Quick Update Link"
                         >
                           <LinkIcon size={18} />
                         </button>
                         <button 
                           onClick={() => {
                             setEditingItem(item);
                             setFormData(item);
                             setIsModalOpen(true);
                           }}
                          className="p-2 bg-royal-blue-light/80 rounded-lg text-white hover:text-royal-gold transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-royal-gold/60">Class {item.classLevel}</span>
                          <div className="flex gap-2">
                            {item.is_free && <span className="bg-green-500/20 text-green-400 text-[8px] font-black px-2 py-0.5 rounded-full border border-green-500/20">FREE</span>}
                            {item.course_type === "live" && <span className="bg-red-500/20 text-red-400 text-[8px] font-black px-2 py-0.5 rounded-full border border-red-500/20">LIVE</span>}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-royal-gold transition-colors">{item.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-royal-gold font-bold">{item.is_free ? "FREE" : `৳${item.price}`}</span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {item.is_free ? "YouTube Video" : (item.course_type === "recorded" ? "Recorded" : "Live")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : mgmtTab === "routines" ? (
              <section className="space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <Clock className="text-royal-gold" />
                    Live Routine & Session Management
                  </h2>
                </div>

                <div className="glass-panel p-8 border-white/5 bg-white/2 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/5 blur-[100px] -mr-32 -mt-32" />
                  <p className="text-slate-400 mb-8 italic relative z-10">Manage your weekly routines and schedule specific live sessions with Zoom links below.</p>
                  
                  {/* Type Selector */}
                  <div className="flex gap-4 mb-8 relative z-10">
                    <button 
                        onClick={() => { setRoutineType("batch"); setRoutines([]); setUpcomingSessions([]); }}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${routineType === "batch" ? "bg-royal-gold text-royal-blue-light" : "bg-slate-900 text-slate-400 border border-white/10"}`}
                    >
                        Batch Routine
                    </button>
                    <button 
                         onClick={() => { setRoutineType("course"); setRoutines([]); setUpcomingSessions([]); }}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${routineType === "course" ? "bg-royal-gold text-royal-blue-light" : "bg-slate-900 text-slate-400 border border-white/10"}`}
                    >
                        Course Routine
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Weekly Routine</h3>
                        <button 
                          onClick={() => {
                            if ((routineType === "batch" && !selectedBatchForRoutine) || (routineType === "course" && !selectedCourseForRoutine)) {
                              toast.error(`Please select a ${routineType} first`);
                              return;
                            }
                            setEditingRoutine(null);
                            setRoutineFormData({ day_of_week: "", start_time: "", end_time: "" });
                            setShowRoutineModal(true);
                          }}
                          className="text-royal-gold text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2"
                        >
                          <Plus size={14} />
                          Add Schedule
                        </button>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs text-slate-500">Select a {routineType} to manage its weekly routine schedule.</p>
                        
                        {routineType === "batch" ? (
                            <select 
                            className="w-full bg-slate-900 border border-white/10 rounded-lg py-3.5 px-4 text-white outline-none focus:border-royal-gold transition-all"
                            value={selectedBatchForRoutine}
                            onChange={(e) => {
                                setSelectedBatchForRoutine(e.target.value);
                                loadRoutines(e.target.value, "batch");
                            }}
                            >
                            <option value="">Select Batch...</option>
                            {batchesList.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        ) : (
                            <select 
                            className="w-full bg-slate-900 border border-white/10 rounded-lg py-3.5 px-4 text-white outline-none focus:border-royal-gold transition-all"
                            value={selectedCourseForRoutine}
                            onChange={(e) => {
                                setSelectedCourseForRoutine(e.target.value);
                                loadRoutines(e.target.value, "course");
                            }}
                            >
                            <option value="">Select Course...</option>
                            {coursesList.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        )}

                        <div className="space-y-3 pt-4">
                           {((routineType === "batch" && selectedBatchForRoutine) || (routineType === "course" && selectedCourseForRoutine)) && routines.length > 0 ? (
                             routines.map((routine: any) => (
                               <div key={routine.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group/item hover:border-royal-gold/20 transition-all">
                                 <div>
                                   <span className="text-sm font-bold text-white block">{routine.day_of_week}</span>
                                   <span className="text-[10px] text-slate-500 uppercase font-black">Recurring Schedule</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className="text-right">
                                     <span className="text-sm font-mono text-royal-gold block">{formatTime(routine.start_time)} - {formatTime(routine.end_time)}</span>
                                   </div>
                                   <button 
                                     onClick={() => {
                                       setEditingRoutine(routine);
                                       setRoutineFormData({
                                         day_of_week: routine.day_of_week,
                                         start_time: routine.start_time,
                                         end_time: routine.end_time
                                       });
                                       setShowRoutineModal(true);
                                     }}
                                     className="p-2 bg-royal-blue-light/80 rounded-lg text-white hover:text-royal-gold transition-colors"
                                   >
                                     <Pencil size={16} />
                                   </button>
                                   <button 
                                     onClick={() => handleDeleteRoutine(routine.id)}
                                     className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors"
                                   >
                                     <Trash2 size={16} />
                                   </button>
                                 </div>
                               </div>
                             ))
                           ) : ((routineType === "batch" && selectedBatchForRoutine) || (routineType === "course" && selectedCourseForRoutine)) ? (
                             <p className="text-center text-slate-500 py-6 text-sm italic">No routines yet. Click "Add Schedule" to create one.</p>
                           ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight border-b border-white/5 pb-2">Live Session Control</h3>
                      <div className="space-y-4">
                         <p className="text-xs text-slate-500">Schedule next live session, set Zoom links, or postpone classes.</p>
                         <button 
                           onClick={() => {
                                if ((routineType === "batch" && !selectedBatchForRoutine) || (routineType === "course" && !selectedCourseForRoutine)) {
                                    toast.error(`Please select a ${routineType} first`);
                                    return;
                                }
                                setShowSessionModal(true);
                           }} 
                           className="btn-primary-premium w-full py-4 text-[10px] uppercase font-black tracking-widest"
                         >
                           Schedule New Session
                         </button>
                         <div className="space-y-3 pt-4 max-h-[400px] overflow-y-auto">
                            {upcomingSessions.map((session: any) => (
                                <div key={session.id} className="p-5 bg-royal-blue-light/20 rounded-2xl border border-white/10 shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-white mb-1">{session.title}</h4>
                                            <p className="text-[10px] text-slate-500 font-mono">
                                                {new Date(session.scheduled_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase border ${session.status === 'scheduled' ? 'bg-royal-gold/20 text-royal-gold border-royal-gold/10' : 'bg-red-500/20 text-red-500 border-red-500/10'}`}>
                                            {session.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-5">
                                        <div className="p-2 bg-slate-950/50 rounded-lg">
                                            <Clock size={16} className="text-royal-gold" />
                                        </div>
                                        <a href={session.zoom_link} target="_blank" className="hover:text-royal-gold truncate max-w-[200px] block">
                                            {session.zoom_link || "No link set"}
                                        </a>
                                    </div>
                                    <div className="flex gap-3">
                                        {/* Future implementation: Edit session */}
                                    </div>
                                </div>
                            ))}
                            {upcomingSessions.length === 0 && (
                                <p className="text-center text-slate-500 py-6 text-sm italic">No upcoming specific sessions scheduled.</p>
                            )}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 italic">Select a tab to manage Batches, Courses, or Routines.</p>
              </div>
            )}
          </div>

        {/* Routine Modal */}
        <AnimatePresence>
            {showRoutineModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowRoutineModal(false)}
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md glass-panel p-8 border border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-6">{editingRoutine ? 'Edit' : 'Add'} Routine</h3>
                    <form onSubmit={handleRoutineSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="text-xs font-bold text-slate-400 mb-2">Day of Week</label>
                            <select 
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                value={routineFormData.day_of_week}
                                onChange={(e) => setRoutineFormData({...routineFormData, day_of_week: e.target.value})}
                                required
                            >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="text-xs font-bold text-slate-400 mb-2">Start Time</label>
                                <input 
                                    type="time" 
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                    value={routineFormData.start_time}
                                    onChange={(e) => setRoutineFormData({...routineFormData, start_time: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="text-xs font-bold text-slate-400 mb-2">End Time</label>
                                <input 
                                    type="time" 
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                    value={routineFormData.end_time}
                                    onChange={(e) => setRoutineFormData({...routineFormData, end_time: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-gold py-3 mt-4">Save Routine</button>
                    </form>
                </motion.div>
            </div>
            )}
        </AnimatePresence>

        {/* Session Modal */}
        <AnimatePresence>
            {showSessionModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowSessionModal(false)}
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md glass-panel p-8 border border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Schedule Live Session</h3>
                    <form onSubmit={handleSessionSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="text-xs font-bold text-slate-400 mb-2">Session Title</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                placeholder="e.g. Special Grammar Class"
                                value={sessionFormData.title}
                                onChange={(e) => setSessionFormData({...sessionFormData, title: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="text-xs font-bold text-slate-400 mb-2">Scheduled At</label>
                            <input 
                                type="datetime-local" 
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                value={sessionFormData.scheduled_at}
                                onChange={(e) => setSessionFormData({...sessionFormData, scheduled_at: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="text-xs font-bold text-slate-400 mb-2">Zoom Link</label>
                            <input 
                                type="url" 
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                placeholder="https://zoom.us/j/..."
                                value={sessionFormData.zoom_link}
                                onChange={(e) => setSessionFormData({...sessionFormData, zoom_link: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="w-full btn-gold py-3 mt-4">Schedule Session</button>
                    </form>
                </motion.div>
            </div>
            )}
        </AnimatePresence>

        {/* Quick Link Modal */}
        <AnimatePresence>
            {showQuickLinkModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowQuickLinkModal(false)}
                />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md glass-panel p-8 border border-royal-gold/30 shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <LinkIcon size={20} className="text-royal-gold" />
                            Update Meeting Link
                        </h3>
                        <button onClick={() => setShowQuickLinkModal(false)} className="text-slate-500 hover:text-white transition-colors">
                            <Trash2 size={20} className="rotate-45" />
                        </button>
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-6 italic">Updating link for: <span className="text-royal-gold font-bold">{quickLinkItem?.name || quickLinkItem?.title}</span></p>

                    <div className="space-y-6">
                        <div className="form-control">
                            <label className="text-[10px] font-black text-royal-gold uppercase tracking-widest mb-2 block">New Zoom/Meeting URL</label>
                            <div className="relative">
                                <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                <input 
                                    type="url" 
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-royal-gold outline-none transition-all shadow-inner"
                                    placeholder="https://zoom.us/j/..."
                                    value={quickLinkValue}
                                    onChange={(e) => setQuickLinkValue(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleQuickLinkUpdate}
                            className="w-full btn-primary-premium py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                        >
                            Update Link Now
                        </button>
                    </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
        </div>
      )}

      {/* Management Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="max-h-[90vh] fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel max-w-2xl w-full my-8 border-royal-gold/30 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-gold via-white to-royal-gold opacity-50 z-20" />
              
              <div className="p-8 md:p-10 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between mb-8 shrink-0">
                  <div>
                    <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">
                      {editingItem ? "Refine" : "Establish"} {mgmtTab === "batches" ? "Batch" : "Course"}
                    </h2>
                    <p className="text-slate-500 text-xs mt-1 font-bold tracking-widest uppercase">Management Intelligence System v2.0</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                  >
                    <Trash2 size={24} className="rotate-45" />
                  </button>
                </div>
                
                <form onSubmit={handleMgmtSubmit} className="space-y-8">
                  <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-8 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">Asset Title/Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter descriptive title..."
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all shadow-inner" 
                          value={formData.name || formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, [mgmtTab === "batches" ? "name" : "title"]: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-control space-y-2 text-left">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Target Class</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 10"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all" 
                          value={formData.class_level || formData.classLevel || ""}
                          onChange={(e) => setFormData({ ...formData, [mgmtTab === "batches" ? "class_level" : "classLevel"]: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-control space-y-2 text-left">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Investment (BDT)</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-royal-gold font-bold">৳</span>
                          <input 
                            type="number" 
                            placeholder="Price..."
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-10 pr-5 text-white focus:border-royal-gold outline-none transition-all" 
                            value={formData.price_per_month || formData.price || ""}
                            onChange={(e) => setFormData({ ...formData, [mgmtTab === "batches" ? "price_per_month" : "price"]: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-control space-y-2 md:col-span-2 text-left">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Intellectual Description</label>
                        <textarea 
                          placeholder="Describe the value proposition..."
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all min-h-[120px] resize-none" 
                          value={formData.description || ""}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="form-control space-y-2 text-left">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Academic Subject</label>
                       <select 
                         className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none appearance-none" 
                         value={formData.subject || "English 1st Paper"}
                         onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                       >
                         <option value="English 1st Paper">English 1st Paper</option>
                         <option value="English 2nd Paper">English 2nd Paper</option>
                       </select>
                     </div>

                     <div className="form-control space-y-2 text-left">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Collaboration Link</label>
                       <input 
                         type="url" 
                         placeholder="Zoom / Meeting Link (Optional)"
                         className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all" 
                         value={formData.meeting_link || ""}
                         onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                       />
                     </div>
                    </div>

                    {mgmtTab === "courses" && (
                      <div className="space-y-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <label className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg transition-all ${formData.course_type !== 'live' ? 'bg-royal-gold/20 border border-royal-gold/30 text-royal-gold' : 'text-slate-400 hover:text-white'}`}>
                              <input 
                                type="radio" name="course_type" className="hidden"
                                checked={formData.course_type !== "live"}
                                onChange={() => setFormData({ ...formData, course_type: "recorded" })}
                              />
                              <Layers size={16} />
                              <span className="text-sm font-bold">Recorded</span>
                            </label>
                            <label className={`flex items-center gap-3 cursor-pointer py-2 px-4 rounded-lg transition-all ${formData.course_type === 'live' ? 'bg-red-500/20 border border-red-500/30 text-red-500' : 'text-slate-400 hover:text-white'}`}>
                              <input 
                                type="radio" name="course_type" className="hidden"
                                checked={formData.course_type === "live"}
                                onChange={() => setFormData({ ...formData, course_type: "live" })}
                              />
                              <Video size={16} />
                              <span className="text-sm font-bold">Live Stream</span>
                            </label>
                          </div>

                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-10 h-6 rounded-full p-1 transition-all ${formData.is_free ? 'bg-green-500' : 'bg-slate-700'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.is_free ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                            <input 
                              type="checkbox" className="hidden"
                              checked={formData.is_free || false}
                              onChange={(e) => setFormData({ ...formData, is_free: e.target.checked, price: e.target.checked ? 0 : (formData.price || 1500) })}
                            />
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">Mark as Free Course</span>
                          </label>
                        </div>

                        {(formData.is_free || formData.course_type === "recorded") && (
                          <div className="space-y-4 pt-4 border-t border-white/10 text-left">
                            <div className="flex items-center justify-between mb-2">
                               <label className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">Video Repository (YouTube)</label>
                               {formData.is_free && (
                                 <button 
                                   type="button"
                                   onClick={() => setFormData({ ...formData, video_urls: [...(formData.video_urls || [""]), ""] })}
                                   className="flex items-center gap-1 text-[10px] font-black text-royal-gold hover:text-white transition-colors"
                                 >
                                   <Plus size={12} /> ADD VIDEO
                                 </button>
                               )}
                            </div>
                            
                            <div className="space-y-3">
                              {(formData.video_urls || [""]).map((url: string, idx: number) => (
                                <div key={idx} className="flex gap-2">
                                  <div className="relative flex-1">
                                    <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input 
                                      type="url" 
                                      placeholder="https://www.youtube.com/watch?v=..."
                                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-300 focus:border-royal-gold outline-none" 
                                      value={url}
                                      onChange={(e) => {
                                        const newUrls = [...(formData.video_urls || [""])];
                                        newUrls[idx] = e.target.value;
                                        setFormData({ ...formData, video_urls: newUrls });
                                      }}
                                    />
                                  </div>
                                  {formData.is_free && formData.video_urls?.length > 1 && (
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const newUrls = formData.video_urls.filter((_: any, i: number) => i !== idx);
                                        setFormData({ ...formData, video_urls: newUrls });
                                      }}
                                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 shrink-0">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 text-sm font-bold border border-white/10 text-slate-400 rounded-xl hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest"
                    >
                      Cancel Operations
                    </button>
                    <button 
                      type="submit" 
                      className="flex-[2] btn-primary-premium py-4 px-12 text-sm font-black uppercase tracking-widest shadow-2xl shadow-royal-blue/20"
                    >
                      Authenticate & Save 
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      
    </div>
  );
}
