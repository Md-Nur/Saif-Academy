import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ConfirmationModalProps {
    showConfirmModal: boolean;
    setShowConfirmModal: (show: boolean) => void;
    confirmReject: () => void;
}

export default function ConfirmationModal({
    showConfirmModal,
    setShowConfirmModal,
    confirmReject
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {showConfirmModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowConfirmModal(false)}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-sm glass-panel p-6 border border-white/10 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Reject Transaction?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Are you sure you want to reject this transaction? This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 py-3 text-sm font-bold border border-white/10 text-slate-400 rounded-xl hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                className="flex-1 py-3 text-sm font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-red-500/20"
                            >
                                Yes, Reject It
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
