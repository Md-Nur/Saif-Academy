import { HelpCircle, Plus, Trash2, HelpCircle as HelpIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getServerQuizQuestions } from "@/actions/quiz";
import { deleteQuizQuestion } from "@/actions/teacher";
import { toast } from "react-hot-toast";

interface QuizManagementProps {
    setIsModalOpen: (open: boolean) => void;
    setEditingItem: (item: any) => void;
    setFormData: (data: any) => void;
}

export default function QuizManagement({
    setIsModalOpen,
    setEditingItem,
    setFormData
}: QuizManagementProps) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const data = await getServerQuizQuestions();
            setQuestions(data || []);
        } catch (err) {
            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this question?")) return;

        const res = await deleteQuizQuestion(id);
        if (res.success) {
            toast.success("Question deleted");
            fetchQuestions();
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <HelpCircle className="text-royal-gold" />
                    Grammar Quiz Bank
                </h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({
                            question: "",
                            options: ["", "", "", ""],
                            correct_answer: 0,
                            explanation: ""
                        });
                        setIsModalOpen(true);
                    }}
                    className="btn-primary-premium px-6 py-3 flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />
                    Add New Question
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-royal-gold"></div>
                </div>
            ) : questions.length === 0 ? (
                <div className="glass-panel p-20 text-center space-y-4">
                    <HelpIcon size={48} className="mx-auto text-slate-700" />
                    <p className="text-slate-500 font-medium">No custom questions added yet. The system is using fallback defaults.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {questions.map((item: any) => (
                        <div key={item.id} className="glass-panel p-6 border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative text-left">
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="pr-12">
                                    <h3 className="text-lg font-bold text-white leading-relaxed">{item.question}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {item.options.map((option: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-lg border text-sm ${idx === item.correct_answer ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/5 text-slate-400'}`}
                                        >
                                            <span className="font-bold mr-2 uppercase">{String.fromCharCode(65 + idx)}.</span> {option}
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-1">Explanation</p>
                                    <p className="text-slate-400 text-sm italic">{item.explanation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
