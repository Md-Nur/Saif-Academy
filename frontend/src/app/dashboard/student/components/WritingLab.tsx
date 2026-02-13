"use client";

import { FileText, CloudUpload, Trash2, Send, Check } from "lucide-react";
import { toast } from "react-hot-toast";

interface WritingLabProps {
    t: any;
    allSelectableItems: any[];
    submissionForm: any;
    setSubmissionForm: (form: any) => void;
    handleSubmissionUpload: () => void;
    isUploading: boolean;
    userSubmissions: any[];
}

export default function WritingLab({
    t,
    allSelectableItems,
    submissionForm,
    setSubmissionForm,
    handleSubmissionUpload,
    isUploading,
    userSubmissions
}: WritingLabProps) {
    return (
        <div className="glass-panel p-10 space-y-8">
            <div className="flex items-center gap-3 mb-2">
                <FileText className="text-royal-gold" />
                <p className="text-white font-bold">{t.handwriting}</p>
            </div>

            <div className="space-y-4">
                <select
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all text-sm"
                    value={submissionForm.batch_id || submissionForm.course_id || ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        const item = allSelectableItems.find(i => i.id === val);
                        if (item?.type === 'batch') {
                            setSubmissionForm({ ...submissionForm, batch_id: val, course_id: undefined });
                        } else {
                            setSubmissionForm({ ...submissionForm, course_id: val, batch_id: undefined });
                        }
                    }}
                >
                    <option value="" className="bg-slate-900 italic text-slate-500">{t.selectItem}</option>
                    {allSelectableItems.map(item => (
                        <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                            {item.displayName}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <button
                        onClick={() => setSubmissionForm({ ...submissionForm, type: "hw" })}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${submissionForm.type === 'hw' ? 'bg-royal-gold text-royal-blue-dark' : 'bg-white/5 text-slate-400 border border-white/5'}`}
                    >
                        Homework
                    </button>
                    <button
                        onClick={() => setSubmissionForm({ ...submissionForm, type: "cw" })}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${submissionForm.type === 'cw' ? 'bg-royal-gold text-royal-blue-dark' : 'bg-white/5 text-slate-400 border border-white/5'}`}
                    >
                        Classwork
                    </button>
                </div>

                <input
                    type="text"
                    placeholder={t.essayPlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                    value={submissionForm.title}
                    onChange={(e) => setSubmissionForm({ ...submissionForm, title: e.target.value })}
                />

                <div className="space-y-3">
                    <div className="relative group">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const formData = new FormData();
                                formData.append("image", file);

                                const apiKey = process.env.NEXT_PUBLIC_IMGBB;
                                if (!apiKey) {
                                    toast.error("ImgBB API key not found");
                                    return;
                                }

                                try {
                                    toast.loading("Uploading image to ImgBB...");
                                    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                                        method: "POST",
                                        body: formData,
                                    });
                                    const result = await response.json();
                                    toast.dismiss();

                                    if (result.success) {
                                        const url = result.data.url;
                                        const originalFilename = file.name || "Document";
                                        setSubmissionForm({
                                            ...submissionForm,
                                            urls: [...submissionForm.urls, url],
                                            title: submissionForm.title || originalFilename
                                        });
                                        toast.success("Image added to submission!");
                                    } else {
                                        toast.error("Upload failed: " + result.error.message);
                                    }
                                } catch (error) {
                                    toast.dismiss();
                                    toast.error("An error occurred during upload");
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="w-full group relative overflow-hidden bg-royal-gold/10 hover:bg-royal-gold/20 border border-royal-gold/30 hover:border-royal-gold rounded-xl py-3 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/0 via-royal-gold/5 to-royal-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <CloudUpload className="text-royal-gold group-hover:scale-110 transition-transform" size={18} />
                            <span className="text-xs font-black text-white uppercase tracking-widest">Add Image (ImgBB)</span>
                        </button>
                    </div>

                    {submissionForm.urls.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 pb-4">
                            {submissionForm.urls.map((url: string, idx: number) => (
                                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 group">
                                    <img src={url} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setSubmissionForm({ ...submissionForm, urls: submissionForm.urls.filter((_: any, i: number) => i !== idx) })}
                                        className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} className="text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="url"
                            placeholder="...or paste file link here"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all text-sm"
                            value={submissionForm.urls.length > 0 ? submissionForm.urls[0] : ""}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSubmissionForm({
                                    ...submissionForm,
                                    urls: val ? [val, ...submissionForm.urls.slice(1)] : submissionForm.urls.slice(1)
                                });
                            }}
                        />
                        {submissionForm.urls.length > 0 && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                                <Check size={14} />
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleSubmissionUpload}
                    disabled={isUploading}
                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isUploading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-royal-blue-dark"></div> : <Send size={18} />}
                    {t.sendToSir}
                </button>
            </div>

            {userSubmissions.length > 0 && (
                <div className="pt-6 border-t border-white/5 space-y-3">
                    <p className="text-[10px] font-black text-royal-gold uppercase tracking-widest">Recent Submissions</p>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {userSubmissions.map((sub: any) => (
                            <div key={sub.id} className="bg-white/2 border border-white/5 p-3 rounded-lg flex items-center justify-between group">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <div className={`p-1.5 rounded-md ${sub.type === 'hw' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                        <FileText size={12} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-white truncate">{sub.title}</p>
                                        <p className="text-[9px] text-slate-500">{new Date(sub.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <a href={sub.urls[0]} target="_blank" rel="noopener noreferrer" className="text-[10px] text-royal-gold hover:underline">View</a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
