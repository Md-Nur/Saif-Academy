import { motion, AnimatePresence } from "framer-motion";
import { Trash2, HelpCircle, CheckCircle2, Plus } from "lucide-react";

interface QuizQuestionModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    formData: any;
    setFormData: (data: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function QuizQuestionModal({
    isOpen,
    setIsOpen,
    formData,
    setFormData,
    handleSubmit
}: QuizQuestionModalProps) {
    const handleOptionChange = (idx: number, value: string) => {
        const newOptions = [...(formData.options || ["", "", "", ""])];
        newOptions[idx] = value;
        setFormData({ ...formData, options: newOptions });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto font-sans">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel max-w-2xl w-full my-8 border-royal-gold/30 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-gold via-white to-royal-gold opacity-50 z-20" />

                        <div className="p-5 md:p-8 flex flex-col h-full overflow-hidden">
                            <div className="flex items-center justify-between mb-8 shrink-0">
                                <div>
                                    <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter flex items-center gap-3">
                                        <HelpCircle className="text-royal-gold" />
                                        Quiz Question
                                    </h2>
                                    <p className="text-slate-500 text-[10px] mt-1 font-bold tracking-[0.2em] uppercase">Create or refine grammar challenges</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                                >
                                    <Trash2 size={24} className="rotate-45" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-8 custom-scrollbar mb-8 pb-4">
                                    <div className="form-control space-y-2">
                                        <label className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">The Question</label>
                                        <textarea
                                            placeholder="Enter your grammar question here..."
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white focus:border-royal-gold outline-none transition-all min-h-[100px] resize-none shadow-inner"
                                            value={formData.question || ""}
                                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Options & Correct Answer</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {(formData.options || ["", "", "", ""]).map((opt: string, idx: number) => (
                                                <div key={idx} className={`relative group flex items-center gap-3 p-1 rounded-xl border transition-all ${formData.correct_answer === idx ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-slate-900/50 border-white/5'}`}>
                                                    <div
                                                        onClick={() => setFormData({ ...formData, correct_answer: idx })}
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all ${formData.correct_answer === idx ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-800 text-slate-600 hover:text-slate-400'}`}
                                                    >
                                                        {formData.correct_answer === idx ? <CheckCircle2 size={20} /> : <span className="font-bold">{String.fromCharCode(65 + idx)}</span>}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                                        className="flex-1 bg-transparent border-none py-3 px-2 text-white outline-none placeholder:text-slate-700 font-medium"
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-control space-y-2">
                                        <label className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em]">Explanation</label>
                                        <textarea
                                            placeholder="Why is this the correct answer?"
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-slate-300 focus:border-royal-gold outline-none transition-all min-h-[120px] resize-none italic"
                                            value={formData.explanation || ""}
                                            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 shrink-0">
                                    <button
                                        type="submit"
                                        className="w-full btn-primary-premium py-5 text-sm font-black uppercase tracking-[0.2em] shadow-royal-gold/20 flex items-center justify-center gap-3 group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">Deploy to Quiz Bank</span>
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
