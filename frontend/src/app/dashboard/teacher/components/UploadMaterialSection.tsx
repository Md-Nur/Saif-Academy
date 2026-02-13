import { Upload, Link as LinkIcon, GraduationCap, Users2, Check, CloudUpload } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface UploadMaterialSectionProps {
    uploadData: any;
    setUploadData: (data: any) => void;
    handleUpload: (e: React.FormEvent) => void;
    batches: any[];
    courses: any[];
}

export default function UploadMaterialSection({
    uploadData,
    setUploadData,
    handleUpload,
    batches,
    courses
}: UploadMaterialSectionProps) {
    const [targetType, setTargetType] = useState<"batch" | "course">("batch");

    const selectedIds = targetType === "batch"
        ? (uploadData.batch_ids ? uploadData.batch_ids.split(",") : [])
        : (uploadData.course_ids ? uploadData.course_ids.split(",") : []);

    const toggleSelection = (id: string) => {
        let newIds;
        if (selectedIds.includes(id.toString())) {
            newIds = selectedIds.filter((sid: string) => sid !== id.toString());
        } else {
            newIds = [...selectedIds, id.toString()];
        }

        const joinedIds = newIds.join(",");
        if (targetType === "batch") {
            setUploadData({ ...uploadData, batch_ids: joinedIds });
        } else {
            setUploadData({ ...uploadData, course_ids: joinedIds });
        }
    };

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Upload className="text-royal-gold" />
                Material Distribution
            </h2>
            <div className="glass-panel p-6 md:p-8 border-white/5 bg-white/2">
                <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Resource Details */}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <div className="form-control space-y-2">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource URL</label>
                                    {uploadData.url && (uploadData.url.includes("cloudinary") || uploadData.url.includes("sibbs") || uploadData.url.includes("i.ibb.co")) && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                            <Check size={10} />
                                            File Ready
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-3">
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
                                                        setUploadData({ ...uploadData, url, type: "image" });
                                                        toast.success("Image uploaded to ImgBB!");
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
                                            className="w-full group relative overflow-hidden bg-royal-gold/10 hover:bg-royal-gold/20 border border-royal-gold/30 hover:border-royal-gold rounded-xl py-4 transition-all duration-300 flex items-center justify-center gap-3"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/0 via-royal-gold/5 to-royal-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <CloudUpload className="text-royal-gold group-hover:scale-110 transition-transform" size={20} />
                                            <span className="text-xs font-black text-white uppercase tracking-widest">Upload Image (ImgBB)</span>
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <LinkIcon className="text-slate-600" size={18} />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="...or paste external URL here"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-xs focus:outline-none focus:border-royal-gold transition-all"
                                            value={uploadData.url}
                                            onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Target Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Distribution Targets</label>
                            <div className="flex bg-white/5 rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => setTargetType("batch")}
                                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${targetType === "batch" ? "bg-royal-gold text-royal-blue-dark" : "text-slate-400 hover:text-white"}`}
                                >
                                    Batches
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTargetType("course")}
                                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${targetType === "course" ? "bg-royal-gold text-royal-blue-dark" : "text-slate-400 hover:text-white"}`}
                                >
                                    Courses
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[180px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {(targetType === "batch" ? batches : courses).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleSelection(item.id)}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedIds.includes(item.id.toString()) ? 'bg-royal-gold/10 border-royal-gold/50 text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {targetType === "batch" ? <Users2 size={16} className="text-royal-gold" /> : <GraduationCap size={16} className="text-royal-gold" />}
                                        <div className="text-left">
                                            <p className="text-xs font-bold leading-none mb-1">{item.name || item.title}</p>
                                            <p className="text-[10px] opacity-50">Class {item.class_level || item.classLevel}</p>
                                        </div>
                                    </div>
                                    {selectedIds.includes(item.id.toString()) && (
                                        <div className="bg-royal-gold rounded-full p-1">
                                            <Check size={10} className="text-royal-blue-dark" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {selectedIds.length > 0 && (
                            <p className="text-[10px] text-royal-gold font-medium">Selected {selectedIds.length} {targetType === "batch" ? "batches" : "courses"}</p>
                        )}
                    </div>

                    <div className="lg:col-span-2 pt-4 border-t border-white/5">
                        <button type="submit" className="btn-primary-premium w-full flex items-center justify-center gap-3 py-4 text-sm font-bold">
                            <Upload size={20} />
                            Distribute Resource
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
