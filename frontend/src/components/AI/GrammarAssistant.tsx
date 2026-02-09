"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, RefreshCcw, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GrammarAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Mocking AI Response for now
      // In production, this would call a Server Action invoking Gemini API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = `I've analyzed your sentence: "${userMessage}". 
      
      Here's a suggestion:
      - Grammar: Excellent.
      - Style: Consider using more active verbs.
      - Improvement: "I would like to inform you..." -> "I am writing to inform you..."
      
      Keep it up!`;
      
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      toast.error("AI Assistant is currently unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel h-[500px] flex flex-col overflow-hidden border-royal-gold/20 shadow-2xl shadow-amber-500/5">
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-royal-gold/20 rounded-lg">
            <Sparkles size={18} className="text-royal-gold" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-widest">AI Grammar Guru</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Researcher-Grade Intelligence</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors"
        >
          <RefreshCcw size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot size={48} className="text-royal-gold" />
            <div className="space-y-1">
              <p className="text-white font-bold">Ask me anything about English!</p>
              <p className="text-xs text-slate-500 max-w-[200px]">Send a sentence and I'll help you refine its grammar and tone.</p>
            </div>
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-2 rounded-lg h-fit ${msg.role === 'user' ? 'bg-royal-blue text-white' : 'bg-slate-800 text-royal-gold'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-royal-blue/20 text-white border border-royal-blue/30 rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'}`}>
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j} className={line.trim().startsWith('-') ? 'ml-2 border-l border-royal-gold/30 pl-3 my-1 italic text-slate-400' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-royal-gold animate-bounce">
                <Bot size={16} />
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-royal-gold rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-royal-gold rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 bg-royal-gold rounded-full animate-pulse delay-150" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type your sentence here..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-4 pr-14 text-white placeholder:text-slate-600 focus:outline-none focus:border-royal-gold transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2.5 bg-royal-gold rounded-lg text-slate-900 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
