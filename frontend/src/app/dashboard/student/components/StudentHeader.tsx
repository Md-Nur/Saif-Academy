"use client";

import { Globe, Clock, AlertCircle, Sparkles, CreditCard } from "lucide-react";
import Link from "next/link";

interface StudentHeaderProps {
    t: any;
    lang: "en" | "bn";
    setLang: (lang: "en" | "bn") => void;
    hasBatches: boolean;
    subStatus: 'active' | 'grace' | 'expired';
    daysLeft: number;
    hasEnrollments: boolean;
    setShowPaymentModal: (show: boolean) => void;
}

export default function StudentHeader({
    t,
    lang,
    setLang,
    hasBatches,
    subStatus,
    daysLeft,
    hasEnrollments,
    setShowPaymentModal
}: StudentHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-10 border-royal-gold/20">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="absolute -inset-1 bg-royal-gold rounded-full blur opacity-25"></div>
                    <button
                        onClick={() => setLang(lang === "en" ? "bn" : "en")}
                        className="relative p-3 bg-slate-900 rounded-full text-royal-gold hover:scale-110 transition-transform border border-white/10 flex items-center gap-2 px-4"
                    >
                        <Globe size={20} />
                        <span className="text-sm font-bold">{lang === "en" ? "বাংলা" : "English"}</span>
                    </button>
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight">{t.dashboard}</h1>
                    <p className="text-slate-400">{t.welcome} <span className="text-royal-gold font-bold">{t.academy}</span></p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {hasBatches ? (
                    subStatus === 'active' ? (
                        <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-2xl">
                            <div className="text-right">
                                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">{t.validity}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-white">{daysLeft}</span>
                                    <span className="text-sm text-slate-400">{t.daysRemaining}</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-green-500 flex items-center justify-center relative">
                                <Clock size={20} className="text-green-400" />
                            </div>
                        </div>
                    ) : subStatus === 'grace' ? (
                        <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl animate-pulse">
                            <div className="text-right">
                                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Grace Period</p>
                                <div className="flex items-center justify-end gap-1">
                                    <span className="text-xs font-bold text-slate-300">Pay by 10th</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-amber-500 flex items-center justify-center relative">
                                <AlertCircle size={20} className="text-amber-400" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
                            <AlertCircle size={24} className="text-red-500" />
                            <p className="font-bold text-red-400">{t.expired}</p>
                        </div>
                    )
                ) : !hasEnrollments ? (
                    <div className="bg-slate-500/10 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
                        <Sparkles size={24} className="text-royal-gold animate-pulse" />
                        <Link href="/courses" className="font-bold text-royal-gold">{t.enrollNow}</Link>
                    </div>
                ) : null}

                {hasBatches ? (
                    <button
                        onClick={() => setShowPaymentModal(true)}
                        className="btn-gold flex items-center gap-2 shadow-lg shadow-amber-500/30 w-full md:w-auto justify-center"
                    >
                        <CreditCard size={20} />
                        {t.payFee}
                    </button>
                ) : (
                    <Link
                        href="/batches"
                        className="btn-gold flex items-center gap-2 shadow-lg shadow-amber-500/30 w-full md:w-auto justify-center"
                    >
                        <Sparkles size={20} />
                        {t.enrollFirst}
                    </Link>
                )}
            </div>
        </header>
    );
}
