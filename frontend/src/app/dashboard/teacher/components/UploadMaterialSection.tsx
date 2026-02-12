import { Upload, Link as LinkIcon, FileText } from "lucide-react";

interface UploadMaterialSectionProps {
    uploadData: any;
    setUploadData: (data: any) => void;
    handleUpload: (e: React.FormEvent) => void;
}

export default function UploadMaterialSection({
    uploadData,
    setUploadData,
    handleUpload
}: UploadMaterialSectionProps) {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Upload className="text-royal-gold" />
                Bulk Distribution
            </h2>
            <div className="glass-panel p-8 md:p-12 border-white/5 bg-white/2">
                <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="form-control space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Title</label>
                            <input
                                type="text"
                                placeholder="e.g. English Grammar PDF"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                                value={uploadData.title}
                                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Type</label>
                            <select
                                className="w-full bg-slate-900 border border-white/10 rounded-lg py-3.5 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                                value={uploadData.type}
                                onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                            >
                                <option value="pdf">PDF Document</option>
                                <option value="link">External Link</option>
                                <option value="video">Lecture Video</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="form-control space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource URL</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-4 text-slate-600" size={18} />
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                                    value={uploadData.url}
                                    onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign to Batches (IDs)</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-4 text-slate-600" size={18} />
                                <input
                                    type="text"
                                    placeholder="UUID-1, UUID-2..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-royal-gold transition-all"
                                    value={uploadData.batch_ids}
                                    onChange={(e) => setUploadData({ ...uploadData, batch_ids: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button type="submit" className="btn-primary-premium w-full flex items-center justify-center gap-3 py-4 text-sm font-bold shadow-royal-blue/20">
                            <Upload size={20} />
                            Distribute Resource to Selected Batches
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
