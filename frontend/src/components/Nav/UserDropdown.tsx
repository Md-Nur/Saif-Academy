"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { logoutUser } from "@/actions/auth";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export default function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
         toast.success("Logged out successfully");
        onLogout();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-royal-gold/50 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-royal-gold/20 border border-royal-gold/30 flex items-center justify-center">
            <User size={16} className="text-royal-gold" />
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-bold text-white max-w-[100px] sm:max-w-[150px] truncate">{user.name}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</span>
          </div>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
                />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 w-64 glass-panel bg-slate-900/95 border-white/10 shadow-2xl z-50 overflow-hidden"
                >
                <div className="p-1 border-b border-white/10">
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>

                <div className="p-1.5">
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
                  >
                    <Settings size={14} className="text-slate-400 group-hover:text-royal-gold transition-colors" />
                    <span className="text-sm text-white">Profile Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-left group"
                  >
                    <LogOut size={14} className="text-slate-400 group-hover:text-red-400 transition-colors" />
                    <span className="text-sm text-white group-hover:text-red-400 transition-colors">Logout</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 border border-red-500/30 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <LogOut className="text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Confirm Logout</h3>
                  <p className="text-sm text-slate-400">Are you sure you want to logout?</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/30 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
