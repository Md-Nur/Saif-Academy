import { Users, FileSearch, Clock, Filter } from "lucide-react";

interface UserManagementProps {
    handleSearchUsers: (e: React.FormEvent) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isSearching: boolean;
    searchResults: any[];
    isPromoting: boolean;
    setPromoUserId: (id: string) => void;
    handlePromote: (e: React.FormEvent) => void;
}

export default function UserManagement({
    handleSearchUsers,
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    isPromoting,
    setPromoUserId,
    handlePromote
}: UserManagementProps) {
    return (
        <section className="space-y-12">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                    <Users className="text-royal-gold" />
                    User Access Control
                </h2>
            </div>

            <div className="glass-panel p-8 md:p-12 border-white/5 bg-white/2 shadow-2xl relative overflow-hidden">
                <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                    <div className="text-center space-y-4">
                        <div className="inline-flex p-4 bg-royal-gold/10 rounded-full border border-royal-gold/20 text-royal-gold mb-4">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Find & Promote User</h3>
                        <p className="text-slate-400 text-sm">
                            Search for a student by name, email, or phone number to grant teacher privileges.
                        </p>
                    </div>

                    <form onSubmit={handleSearchUsers} className="flex gap-4">
                        <div className="relative flex-1">
                            <FileSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                            <input
                                type="text"
                                placeholder="Search Name, Email, or Phone..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-royal-gold outline-none transition-all shadow-inner"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="btn-gold px-8 py-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest disabled:opacity-50"
                        >
                            {isSearching ? <Clock className="animate-spin" size={16} /> : <Filter size={16} />}
                            Search
                        </button>
                    </form>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {searchResults.map((user: any) => (
                            <div key={user.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-royal-gold/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-royal-gold border border-white/10 uppercase">
                                        {user.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-tight">{user.name}</p>
                                        <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 font-black uppercase tracking-tighter">
                                                {user.role}
                                            </span>
                                            {user.phone && (
                                                <span className="text-[8px] text-slate-600 font-mono italic">{user.phone}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {user.role !== 'teacher' ? (
                                    <button
                                        onClick={() => {
                                            if (confirm(`Promote ${user.name} to Teacher?`)) {
                                                setPromoUserId(user.id);
                                                handlePromote({ preventDefault: () => { } } as any);
                                            }
                                        }}
                                        disabled={isPromoting}
                                        className="btn-gold py-2 px-4 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-royal-gold/5"
                                    >
                                        Promote
                                    </button>
                                ) : (
                                    <span className="text-royal-gold/50 text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-royal-gold/5 rounded-lg border border-royal-gold/10">
                                        Already Teacher
                                    </span>
                                )}
                            </div>
                        ))}
                        {searchResults.length === 0 && !isSearching && searchQuery && (
                            <p className="text-center text-slate-600 py-10 text-sm italic">No matching students found.</p>
                        )}
                    </div>

                    <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                        <p className="text-[10px] text-amber-500/80 italic text-center">
                            Note: For security, only teachers can access this search portal.
                        </p>
                    </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-royal-gold/5 blur-[80px] rounded-full" />
            </div>
        </section>
    );
}
