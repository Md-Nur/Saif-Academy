"use client";
import { useState, useEffect } from "react";
import { Search, X, BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [batches, setBatches] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [batchesRes, coursesRes] = await Promise.all([
          axios.get(`${API_URL}/batches/`),
          axios.get(`${API_URL}/courses/`)
        ]);
        setBatches(batchesRes.data || []);
        setCourses(coursesRes.data || []);
      } catch (error) {
        console.error("Search data fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredResults = {
    batches: batches.filter(b =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.subject.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3),
    courses: courses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subject.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)
  };

  const hasResults = filteredResults.batches.length > 0 || filteredResults.courses.length > 0;

  return (
    <div className={`relative max-w-2xl mx-auto transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}>
      <div className={`flex items-center glass-panel px-6 py-3 border-2 transition-all duration-300 ${isFocused ? 'border-royal-gold shadow-royal-gold/20 bg-white/5' : 'border-white/10 bg-white/2'}`}>
        <Search className={`${isFocused ? 'text-royal-gold' : 'text-slate-500'} transition-colors`} size={22} />
        <input
          type="text"
          placeholder="Search for courses, batches, or subjects..."
          className="bg-transparent border-none focus:ring-0 text-white w-full px-4 py-2 placeholder:text-slate-600 outline-none text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          // Using a small timeout to allow clicking links before blur hides them
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-4 glass-panel p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300 border-royal-gold/30">
          {!hasResults && !isLoading ? (
            <div className="p-8 text-center text-slate-500 italic">
              No matches found for "{query}"
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {filteredResults.batches.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-royal-gold px-4 py-2 opacity-70">Batches</p>
                  {filteredResults.batches.map(batch => (
                    <Link
                      key={batch.id}
                      href={`/batches/${batch.id}`}
                      onMouseDown={(e) => e.preventDefault()} // Prevents blur from hiding dropdown before click
                      className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-white font-bold group-hover:text-royal-gold transition-colors">{batch.name}</p>
                          <p className="text-xs text-slate-500">{batch.subject} • {batch.class_level}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-700 group-hover:text-royal-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}

              {filteredResults.courses.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-royal-gold px-4 py-2 opacity-70">Courses</p>
                  {filteredResults.courses.map(course => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      onMouseDown={(e) => e.preventDefault()} // Prevents blur from hiding dropdown before click
                      className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <p className="text-white font-bold group-hover:text-royal-gold transition-colors">{course.title}</p>
                          <p className="text-xs text-slate-500">{course.subject} • {course.classLevel}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-700 group-hover:text-royal-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}

              <div className="p-4 mt-2 border-t border-white/5 text-center">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter italic">Found {filteredResults.batches.length + filteredResults.courses.length} entries</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
