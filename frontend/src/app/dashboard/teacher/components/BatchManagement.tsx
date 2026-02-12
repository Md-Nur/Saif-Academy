import { Users2, Plus, Link as LinkIcon, Pencil, Trash2 } from "lucide-react";

interface BatchManagementProps {
    batchesList: any[];
    setEditingItem: (item: any) => void;
    setFormData: (data: any) => void;
    setIsModalOpen: (open: boolean) => void;
    setQuickLinkItem: (item: any) => void;
    setQuickLinkValue: (value: string) => void;
    setShowQuickLinkModal: (show: boolean) => void;
    handleDelete: (id: string) => void;
}

export default function BatchManagement({
    batchesList,
    setEditingItem,
    setFormData,
    setIsModalOpen,
    setQuickLinkItem,
    setQuickLinkValue,
    setShowQuickLinkModal,
    handleDelete
}: BatchManagementProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <Users2 className="text-royal-gold" />
                    Active Batches
                </h2>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({
                            subject: "English 1st Paper",
                            price_per_month: 1000,
                            meeting_link: ""
                        });
                        setIsModalOpen(true);
                    }}
                    className="btn-primary-premium px-6 py-3 flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />
                    Add New Batch
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {batchesList.map((item: any) => (
                    <div key={item.id} className="glass-panel p-6 border-white/5 bg-white/2 hover:bg-white/5 transition-all group relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 p-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <button
                                onClick={() => {
                                    setQuickLinkItem(item);
                                    setQuickLinkValue(item.meeting_link || "");
                                    setShowQuickLinkModal(true);
                                }}
                                className="p-2 bg-royal-gold/80 rounded-lg text-royal-blue-dark hover:bg-royal-gold transition-colors"
                                title="Quick Update Link"
                            >
                                <LinkIcon size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    setEditingItem(item);
                                    setFormData(item);
                                    setIsModalOpen(true);
                                }}
                                className="p-2 bg-royal-blue-light/80 rounded-lg text-white hover:text-royal-gold transition-colors"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-600 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-royal-gold/60">Class {item.class_level || item.classLevel}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-royal-gold transition-colors">{item.name}</h3>
                            <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-royal-gold font-bold">৳{item.price_per_month}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Monthly</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
