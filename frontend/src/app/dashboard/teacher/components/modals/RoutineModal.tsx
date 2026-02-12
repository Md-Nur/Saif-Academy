import { motion, AnimatePresence } from "framer-motion";

interface RoutineModalProps {
    showRoutineModal: boolean;
    setShowRoutineModal: (show: boolean) => void;
    editingRoutine: any;
    routineFormData: { day_of_week: string; start_time: string; end_time: string };
    setRoutineFormData: (data: any) => void;
    handleRoutineSubmit: (e: React.FormEvent) => void;
}

export default function RoutineModal({
    showRoutineModal,
    setShowRoutineModal,
    editingRoutine,
    routineFormData,
    setRoutineFormData,
    handleRoutineSubmit
}: RoutineModalProps) {
    return (
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
                                    onChange={(e) => setRoutineFormData({ ...routineFormData, day_of_week: e.target.value })}
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
                                        onChange={(e) => setRoutineFormData({ ...routineFormData, start_time: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="text-xs font-bold text-slate-400 mb-2">End Time</label>
                                    <input
                                        type="time"
                                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white"
                                        value={routineFormData.end_time}
                                        onChange={(e) => setRoutineFormData({ ...routineFormData, end_time: e.target.value })}
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
    );
}
