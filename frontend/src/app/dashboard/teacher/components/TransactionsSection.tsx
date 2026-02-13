import { CheckCircle } from "lucide-react";

interface TransactionsSectionProps {
    subsFilter: string;
    setSubsFilter: (status: string) => void;
    fetchTransactions: (status: string) => void;
    subsLoading: boolean;
    allSubs: any[];
    handleVerify: (id: string) => void;
    handleReject: (id: string) => void;
}

export default function TransactionsSection({
    subsFilter,
    setSubsFilter,
    fetchTransactions,
    subsLoading,
    allSubs,
    handleVerify,
    handleReject
}: TransactionsSectionProps) {
    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <h2 className="text-3xl font-heading font-black text-white flex items-center gap-3">
                    <CheckCircle className="text-royal-gold" />
                    All <span className="text-royal-gold">Transactions</span>
                </h2>

                {/* Status Filter */}
                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10 gap-1">
                    {["All", "Verified", "Pending", "Rejected"].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setSubsFilter(status);
                                if (status !== "All") fetchTransactions(status.toLowerCase());
                            }}
                            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${subsFilter === status
                                ? status === "Verified"
                                    ? "bg-green-500 text-white"
                                    : status === "Rejected"
                                        ? "bg-red-500 text-white"
                                        : status === "Pending"
                                            ? "bg-amber-500 text-white"
                                            : "bg-royal-gold text-royal-blue-light"
                                : "text-slate-400 hover:text-white"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions Table */}
            <div className="glass-panel p-0 overflow-hidden border-white/5">
                {subsLoading ? (
                    <div className="p-20 text-center">
                        <div className="inline-block w-12 h-12 border-4 border-royal-gold/20 border-t-royal-gold rounded-full animate-spin"></div>
                        <p className="text-slate-400 mt-4">Loading transactions...</p>
                    </div>
                ) : allSubs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-white/10">
                                <tr>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Item</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Month</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="text-left p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {allSubs.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div>
                                                <p className="text-white font-bold text-sm">{sub.user?.name || "Unknown"}</p>
                                                <p className="text-slate-500 text-xs">{sub.user?.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-white text-sm font-medium">
                                                    {sub.batch?.name || sub.course?.title || "N/A"}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {sub.batch ? "Batch" : sub.course ? "Course" : ""}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-royal-gold font-bold text-sm">৳{sub.amount}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-slate-300 text-sm font-mono">{sub.month}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-slate-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded inline-block">
                                                {sub.trnx_id}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${sub.status?.toLowerCase() === "verified"
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/20"
                                                    : sub.status?.toLowerCase() === "rejected"
                                                        ? "bg-red-500/20 text-red-400 border border-red-500/20"
                                                        : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                                                    }`}
                                            >
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {sub.status?.toLowerCase() === "pending" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleVerify(sub.id)}
                                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-green-500/20"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(sub.id)}
                                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-red-500/20"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {sub.status?.toLowerCase() !== "pending" && (
                                                <p className="text-slate-600 text-xs italic">No actions</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-white/5">
                            <CheckCircle size={40} className="text-slate-600" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-lg font-medium">No {subsFilter.toLowerCase()} transactions found</p>
                            <p className="text-slate-600 text-sm mt-2">
                                {subsFilter === "All" ? "No payment transactions yet" : `Try selecting a different filter`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
