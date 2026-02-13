"use client";

import { Calendar, Clock, PlayCircle } from "lucide-react";

interface LiveClassBannerProps {
    nextSession: any;
}

export default function LiveClassBanner({ nextSession }: LiveClassBannerProps) {
    if (!nextSession) return null;

    return (
        <section className="glass-panel p-6 border-royal-gold/20 bg-royal-gold/5 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/10 blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10 w-full md:w-auto">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${nextSession.is_live ? "bg-red-500/20 text-red-500 border-red-500/20 animate-pulse" : "bg-royal-gold/20 text-royal-gold border-royal-gold/20"}`}>
                        {nextSession.is_live ? "LIVE NOW" : "UPCOMING CLASS"}
                    </span>
                    <h3 className="text-xl font-bold text-white max-w-md truncate">{nextSession.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded"><Calendar size={12} className="text-royal-gold" /> {new Date(nextSession.start_time).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded"><Clock size={12} className="text-royal-gold" /> {new Date(nextSession.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {(nextSession.batch_name || nextSession.course_title) && (
                        <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {nextSession.batch_name || nextSession.course_title}
                        </span>
                    )}
                </div>
            </div>
            <div className="relative z-10 mt-4 md:mt-0 w-full md:w-auto">
                {nextSession.is_live ? (
                    <a
                        href={nextSession.zoom_link || "#"}
                        target="_blank"
                        className="btn-primary-premium px-8 py-4 flex items-center justify-center gap-3 text-sm uppercase font-black tracking-widest animate-pulse shadow-lg shadow-red-500/20 bg-red-600 border-red-500 hover:bg-red-700 w-full md:w-auto"
                    >
                        <PlayCircle size={20} fill="currentColor" />
                        JOIN LIVE CLASS
                    </a>
                ) : (
                    <div className="text-right bg-slate-900/40 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Starts In</p>
                        <p className="text-2xl font-mono font-bold text-white">
                            {(() => {
                                const diff = new Date(nextSession.start_time).getTime() - new Date().getTime();
                                if (diff < 0) return "Starting...";
                                const totalHours = Math.floor(diff / (1000 * 60 * 60));
                                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                                if (totalHours >= 24) {
                                    const days = Math.floor(totalHours / 24);
                                    const remainingHours = totalHours % 24;
                                    return `${days}d ${remainingHours}h`;
                                }

                                return `${totalHours}h ${mins}m`;
                            })()}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
