import { Users, Clock, BarChart3, CheckCircle, Filter, Video } from "lucide-react";

interface OverviewSectionProps {
    stats: any;
    nextSession: any;
    pendingSubs: any[];
    batchFilter: string;
    courseFilter: string;
    monthFilter: string;
    batchesList: any[];
    coursesList: any[];
    handleFilterChange: (key: string, value: string) => void;
    handleVerify: (id: string) => void;
    handleReject: (id: string) => void;
}

export default function OverviewSection({
    stats,
    nextSession,
    pendingSubs,
    batchFilter,
    courseFilter,
    monthFilter,
    batchesList,
    coursesList,
    handleFilterChange,
    handleVerify,
    handleReject
}: OverviewSectionProps) {
    return (
        <div className="space-y-16">
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
                                <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                                    <Filter size={14} className="text-slate-500" />
                                    <select
                                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                                        value={batchFilter}
                                        onChange={(e) => handleFilterChange("batchId", e.target.value)}
                                    >
                                        <option value="All">All Batches</option>
                                        {batchesList.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                                    <Filter size={14} className="text-slate-500" />
                                    <select
                                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                                        value={courseFilter}
                                        onChange={(e) => handleFilterChange("courseId", e.target.value)}
                                    >
                                        <option value="All">All Courses</option>
                                        {coursesList.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2">
                                    <Clock size={14} className="text-slate-500" />
                                    <input
                                        type="month"
                                        className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
                                        value={monthFilter === "All" ? "" : monthFilter}
                                        onChange={(e) => handleFilterChange("month", e.target.value || "All")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pendingSubs.length > 0 ? (
                                pendingSubs.map((sub: any) => (
                                    <div key={sub.id} className="glass-panel p-6 border-white/5 space-y-6 relative overflow-hidden group hover:border-royal-gold/30 transition-all text-left">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-royal-gold/10 transition-all" />

                                        <div className="flex items-start justify-between relative z-10">
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-royal-gold transition-colors">{sub.user_name}</h3>
                                                <p className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                                                    <Clock size={10} /> {sub.month}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-royal-gold font-black text-xl italic">৳{sub.amount}</span>
                                                <p className="text-[8px] text-slate-500 uppercase tracking-tighter">Verified Amount</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Trnx ID</span>
                                                    <span className="text-xs font-mono text-royal-gold font-bold">{sub.trnx_id}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Sender</span>
                                                    <span className="text-xs font-mono text-white">{sub.sender_number}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Target</span>
                                                    <span className="text-[10px] font-bold text-slate-300 truncate max-w-[120px]">{sub.batch_name || sub.course_title}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <button
                                                    onClick={() => handleVerify(sub.id)}
                                                    className="flex-1 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-600/30 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-green-600/10"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(sub.id)}
                                                    className="flex-1 bg-red-600/5 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center glass-panel border-dashed border-white/5">
                                    <CheckCircle size={48} className="mx-auto text-slate-800 mb-4 opacity-20" />
                                    <p className="text-slate-500 italic">No pending verifications for this filter.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
