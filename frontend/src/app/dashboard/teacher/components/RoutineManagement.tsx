import { Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface RoutineManagementProps {
    routineType: "batch" | "course";
    setRoutineType: (type: "batch" | "course") => void;
    setRoutines: (routines: any[]) => void;
    setUpcomingSessions: (sessions: any[]) => void;
    selectedBatchForRoutine: string;
    setSelectedBatchForRoutine: (id: string) => void;
    selectedCourseForRoutine: string;
    setSelectedCourseForRoutine: (id: string) => void;
    batchesList: any[];
    coursesList: any[];
    routines: any[];
    loadRoutines: (id: string, type: "batch" | "course") => void;
    setEditingRoutine: (routine: any) => void;
    setRoutineFormData: (data: any) => void;
    setShowRoutineModal: (show: boolean) => void;
    handleDeleteRoutine: (id: string) => void;
    setShowSessionModal: (show: boolean) => void;
    upcomingSessions: any[];
}

export default function RoutineManagement({
    routineType,
    setRoutineType,
    setRoutines,
    setUpcomingSessions,
    selectedBatchForRoutine,
    setSelectedBatchForRoutine,
    selectedCourseForRoutine,
    setSelectedCourseForRoutine,
    batchesList,
    coursesList,
    routines,
    loadRoutines,
    setEditingRoutine,
    setRoutineFormData,
    setShowRoutineModal,
    handleDeleteRoutine,
    setShowSessionModal,
    upcomingSessions
}: RoutineManagementProps) {
    return (
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
    );
}
