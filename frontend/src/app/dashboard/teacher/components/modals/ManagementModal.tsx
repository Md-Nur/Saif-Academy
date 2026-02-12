import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Link as LinkIcon, Layers, Video, Plus } from "lucide-react";

interface ManagementModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    editingItem: any;
    mgmtTab: string;
    formData: any;
    setFormData: (data: any) => void;
    handleMgmtSubmit: (e: React.FormEvent) => void;
}

export default function ManagementModal({
    isModalOpen,
    setIsModalOpen,
    editingItem,
    mgmtTab,
    formData,
    setFormData,
    handleMgmtSubmit
}: ManagementModalProps) {
    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel max-w-2xl w-full my-8 border-royal-gold/30 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-gold via-white to-royal-gold opacity-50 z-20" />

                        <div className="p-5 md:p-6 flex flex-col h-full overflow-hidden">
                            <div className="flex items-center justify-between mb-6 shrink-0">
                                <div>
                                    <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">
                                        {editingItem ? "Edit" : "Create New"} {mgmtTab === "batches" ? "Batch" : "Course"}
                                    </h2>
                                    <p className="text-slate-500 text-xs mt-1 font-bold tracking-widest uppercase">Fill in the details below</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                                >
                                    <Trash2 size={24} className="rotate-45" />
                                </button>
                            </div>

                            <form onSubmit={handleMgmtSubmit} className="flex-1 flex flex-col min-h-0">
                                <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6 custom-scrollbar mb-4 pb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-royal-gold uppercase tracking-wider">Name / Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. English Grammar Masterclass"
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all shadow-inner"
                                                value={formData.name || formData.title || ""}
                                                onChange={(e) => setFormData({ ...formData, [mgmtTab === "batches" ? "name" : "title"]: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="form-control space-y-2 text-left">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Class Level</label>
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
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price (BDT)</label>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-royal-gold font-bold">৳</span>
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 1000"
                                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-10 pr-5 text-white focus:border-royal-gold outline-none transition-all"
                                                    value={formData.price_per_month || formData.price || ""}
                                                    onChange={(e) => setFormData({ ...formData, [mgmtTab === "batches" ? "price_per_month" : "price"]: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-control space-y-2 md:col-span-2 text-left">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
                                            <textarea
                                                placeholder={`What will students learn in this ${mgmtTab === 'batches' ? 'batch' : 'course'}?`}
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all min-h-[120px] resize-none"
                                                value={formData.description || ""}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-control space-y-2 text-left">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
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
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zoom / Meeting Link</label>
                                            <input
                                                type="url"
                                                placeholder="https://zoom.us/j/..."
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
                                                                {(formData.video_urls || [""]).length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newUrls = (formData.video_urls || [""]).filter((_: any, i: number) => i !== idx);
                                                                            setFormData({ ...formData, video_urls: newUrls });
                                                                        }}
                                                                        className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500 transition-all hover:text-white"
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

                                <div className="pt-6 border-t border-white/10 shrink-0">
                                    <button
                                        type="submit"
                                        className="w-full btn-primary-premium py-5 text-sm font-black uppercase tracking-[0.2em] shadow-royal-gold/20 flex items-center justify-center gap-3"
                                    >
                                        {editingItem ? "Update Institutional Data" : "Deploy New Asset"}
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
