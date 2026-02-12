import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon, Trash2 } from "lucide-react";

interface QuickLinkModalProps {
    showQuickLinkModal: boolean;
    setShowQuickLinkModal: (show: boolean) => void;
    quickLinkItem: any;
    quickLinkValue: string;
    setQuickLinkValue: (value: string) => void;
    handleQuickLinkUpdate: () => void;
    handleQuickLinkRemove: () => void;
}

export default function QuickLinkModal({
    showQuickLinkModal,
    setShowQuickLinkModal,
    quickLinkItem,
    quickLinkValue,
    setQuickLinkValue,
    handleQuickLinkUpdate,
    handleQuickLinkRemove
}: QuickLinkModalProps) {
    return (
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

                            {quickLinkItem?.meeting_link && (
                                <button
                                    onClick={handleQuickLinkRemove}
                                    className="w-full py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px] text-red-500 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all"
                                >
                                    <Trash2 size={14} />
                                    Remove Link
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
