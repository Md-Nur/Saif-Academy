import { motion, AnimatePresence } from "framer-motion";

interface SessionModalProps {
    showSessionModal: boolean;
    setShowSessionModal: (show: boolean) => void;
    sessionFormData: { title: string; scheduled_at: string; zoom_link: string };
    setSessionFormData: (data: any) => void;
    handleSessionSubmit: (e: React.FormEvent) => void;
}

export default function SessionModal({
    showSessionModal,
    setShowSessionModal,
    sessionFormData,
    setSessionFormData,
    handleSessionSubmit
}: SessionModalProps) {
    return (
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
                                    onChange={(e) => setSessionFormData({ ...sessionFormData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="text-xs font-bold text-slate-400 mb-2">Scheduled At</label>
                                <input
                                    type="datetime-local"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                    value={sessionFormData.scheduled_at}
                                    onChange={(e) => setSessionFormData({ ...sessionFormData, scheduled_at: e.target.value })}
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
                                    onChange={(e) => setSessionFormData({ ...sessionFormData, zoom_link: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full btn-gold py-3 mt-4">Schedule Session</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
