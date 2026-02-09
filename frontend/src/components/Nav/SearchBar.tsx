"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative max-w-xl mx-auto transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}>
      <div className={`flex items-center glass-panel px-6 py-2 border-2 transition-all duration-300 ${isFocused ? 'border-royal-gold shadow-royal-gold/20' : 'border-white/10'}`}>
        <Search className={`${isFocused ? 'text-royal-gold' : 'text-slate-500'} transition-colors`} size={20} />
        <input 
          type="text" 
          placeholder="Search for courses, batches, or subjects..." 
          className="bg-transparent border-none focus:ring-0 text-white w-full px-4 py-2 placeholder:text-slate-600 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-slate-500 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search results dropdown placeholder */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-4 glass-panel p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-slate-400 mb-2">Searching for: <span className="text-royal-gold font-bold">{query}</span></p>
          <div className="h-24 flex items-center justify-center border border-white/5 rounded-lg bg-white/5 italic text-slate-500">
            Real-time search results will appear here...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
