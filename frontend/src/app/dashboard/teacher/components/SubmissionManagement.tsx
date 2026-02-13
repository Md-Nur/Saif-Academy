import { FileText, Trash2, Calendar, User, ExternalLink, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { getSubmissions, deleteSubmission } from "@/actions/teacher";
import { toast } from "react-hot-toast";

interface SubmissionManagementProps {
    batches: any[];
    courses: any[];
}

export default function SubmissionManagement({ batches = [], courses = [] }: SubmissionManagementProps) {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterBatchId, setFilterBatchId] = useState("All");
    const [filterCourseId, setFilterCourseId] = useState("All");

    const fetchSubmissions = async () => {
        setLoading(true);
        const res = await getSubmissions();
        if (res.success) {
            setSubmissions(res.submissions);
        } else {
            toast.error(res.error || "Failed to load submissions");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this submission?")) return;
        const res = await deleteSubmission(id);
        if (res.success) {
            toast.success("Deleted successfully");
            fetchSubmissions();
        } else {
            toast.error(res.error || "Delete failed");
        }
    };

    const getTargetName = (sub: any) => {
        if (sub.batch_id) {
            const batch = batches.find((b: any) => b.id === sub.batch_id);
            return batch ? batch.name : `Batch: ${sub.batch_id.slice(0, 8)}`;
        }
        if (sub.course_id) {
            const course = courses.find((c: any) => c.id === sub.course_id);
            return course ? course.title : `Course: ${sub.course_id.slice(0, 8)}`;
        }
        return "N/A";
    };

    const filteredSubmissions = submissions.filter((sub: any) => {
        const batchMatch = filterBatchId === "All" || sub.batch_id === filterBatchId;
        const courseMatch = filterCourseId === "All" || sub.course_id === filterCourseId;
        return batchMatch && courseMatch;
    });

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <FileText className="text-royal-gold" />
                    Student HW/CW Submissions
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-white/5 rounded-lg">
                        <Filter size={14} className="text-royal-gold" />
                        <select
                            value={filterBatchId}
                            onChange={(e) => setFilterBatchId(e.target.value)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none"
                        >
                            <option value="All" className="bg-slate-900">All Batches</option>
                            {batches.map(b => (
                                <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-white/5 rounded-lg">
                        <Filter size={14} className="text-royal-gold" />
                        <select
                            value={filterCourseId}
                            onChange={(e) => setFilterCourseId(e.target.value)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none"
                        >
                            <option value="All" className="bg-slate-900">All Courses</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id} className="bg-slate-900">{c.title}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={fetchSubmissions}
                        className="p-2 bg-royal-gold/10 text-royal-gold hover:bg-royal-gold hover:text-royal-blue-dark rounded-lg transition-all"
                        title="Refresh Submissions"
                    >
                        <Calendar size={16} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-royal-gold"></div>
                </div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="glass-panel p-20 text-center space-y-4">
                    <FileText size={48} className="mx-auto text-slate-700" />
                    <p className="text-slate-500 font-medium text-lg uppercase tracking-widest">No submissions found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubmissions.map((sub: any) => (
                        <div key={sub.id} className="glass-panel p-6 border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <button
                                    onClick={() => handleDelete(sub.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${sub.type === 'hw' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-purple-500/20 text-purple-400 border border-purple-500/20'}`}>
                                        {sub.type === 'hw' ? 'Homework' : 'Classwork'}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-bold">{new Date(sub.created_at).toLocaleDateString()}</span>
                                </div>

                                <h3 className="text-lg font-bold text-white leading-tight pr-8">{sub.title}</h3>

                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <User size={14} className="text-royal-gold" />
                                        <span className="text-xs font-medium">{sub.user?.name || 'Unknown Student'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <FileText size={14} />
                                        <span className="text-[10px] uppercase font-bold tracking-tight text-slate-400">
                                            {getTargetName(sub)}
                                        </span>
                                    </div>
                                </div>

                                {sub.urls && sub.urls.length > 0 ? (
                                    <div className="space-y-2 mt-4">
                                        {sub.urls.map((url: string, index: number) => (
                                            <a
                                                key={index}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full btn-gold py-2 rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                <ExternalLink size={12} /> {sub.urls.length > 1 ? `Open Image ${index + 1}` : 'Open Image'}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-slate-500 text-[10px] mt-4 uppercase font-bold">No images attached</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
