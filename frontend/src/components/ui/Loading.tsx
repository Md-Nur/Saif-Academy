"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LoadingProps {
  fullPage?: boolean;
}

export default function Loading({ fullPage = true }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? "fixed inset-0 z-[200] bg-slate-950/40 backdrop-blur-md" : "w-full py-20"}`}>
      <div className="relative">
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-royal-gold/20 blur-2xl rounded-full"
        />

        {/* Animated Rings */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-2 border-transparent border-t-royal-gold rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-14 h-14 border-2 border-transparent border-b-royal-gold/60 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
          >
            <Sparkles className="text-royal-gold" size={32} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-royal-gold font-bold tracking-[0.3em] uppercase text-xs animate-pulse">
          Saif Academy
        </span>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent" />
        <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
          Refining Excellence...
        </span>
      </motion.div>
    </div>
  );
}
