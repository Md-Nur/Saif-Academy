"use client";

import { CreditCard } from "lucide-react";

interface PaymentHistoryProps {
    t: any;
    subscriptions: any[];
}

export default function PaymentHistory({ t, subscriptions }: PaymentHistoryProps) {
    return (
        <section className="my-16">
            <details className="glass-panel border-white/5 overflow-hidden group">
                <summary className="cursor-pointer p-4 flex items-center justify-between hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-slate-500" />
                        <h3 className="text-sm font-medium text-slate-400">{t.history}</h3>
                    </div>
                    <div className="text-slate-600 group-open:rotate-180 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                </summary>
                <div className="p-4 pt-0 space-y-3 max-h-[400px] overflow-y-auto">
                    {subscriptions.length > 0 ? [...subscriptions].reverse().map((sub: any) => (
                        <div key={sub.id} className="bg-white/5 p-3 rounded-lg flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${sub.status?.toLowerCase() === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    <CreditCard size={14} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{sub.month}</p>
                                    <p className="text-[9px] text-slate-600 font-mono">{sub.trnx_id}</p>
                                </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${sub.status?.toLowerCase() === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                {sub.status?.toLowerCase() === 'verified' ? t.verified : t.pending}
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-slate-600 py-6 text-sm">No payment history found.</p>
                    )}
                </div>
            </details>
        </section>
    );
}
