"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { submitPayment } from "@/actions/subscription";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: any;
  setPaymentData: (data: any) => void;
  allSelectableItems: any[];
  translations: any;
  bkash?: string;
  nagad?: string;
  onSuccess: (data: any) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  paymentData,
  setPaymentData,
  allSelectableItems,
  translations: t,
  bkash,
  nagad,
  onSuccess
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitPayment(paymentData);
      if (result.success) {
        toast.success("Payment submitted! Waiting for verification.");
        onClose();
        onSuccess(paymentData);
      } else {
        toast.error(result.error || "Payment submission failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-panel p-8 border border-royal-gold/30 shadow-2xl shadow-royal-gold/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="font-heading font-black text-3xl text-white mb-2 italic uppercase">{t.submit}</h3>
                <div className="h-1 w-20 bg-royal-gold"></div>
              </div>
              <div className="p-3 bg-royal-gold/10 rounded-2xl">
                <CreditCard className="text-royal-gold" size={32} />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-slate-400 text-sm leading-relaxed">
                Please send <span className="text-white font-bold underline decoration-royal-gold/50">{paymentData.amount} BDT</span> via <span className="text-royal-gold font-bold uppercase">{paymentData.payment_method}</span> personal number.
              </p>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentData({ ...paymentData, payment_method: "bkash" })}
                  className={`relative p-4 rounded-xl border transition-all group ${paymentData.payment_method === "bkash"
                    ? "bg-pink-500/10 border-pink-500 shadow-lg shadow-pink-500/20"
                    : "bg-white/5 border-white/10 hover:border-pink-500/50"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentData.payment_method === "bkash" ? "text-pink-400" : "text-slate-500"}`}>bKash Personal</span>
                    {paymentData.payment_method === "bkash" && (
                      <motion.div layoutId="active-method" className="w-2 h-2 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <p className="text-white font-mono font-bold text-lg">{bkash || "017XXXXXXXX"}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentData({ ...paymentData, payment_method: "nagad" })}
                  className={`relative p-4 rounded-xl border transition-all group ${paymentData.payment_method === "nagad"
                    ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/20"
                    : "bg-white/5 border-white/10 hover:border-orange-500/50"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentData.payment_method === "nagad" ? "text-orange-400" : "text-slate-500"}`}>Nagad Personal</span>
                    {paymentData.payment_method === "nagad" && (
                      <motion.div layoutId="active-method" className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <p className="text-white font-mono font-bold text-lg">{nagad || "01XXXXXXXXX"}</p>
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="form-control space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.selectItem}</label>
                {!paymentData.batch_id && !paymentData.course_id ? (
                  <select
                    className="select select-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full h-14 px-4 rounded-lg"
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const item = allSelectableItems.find(i => i.id === selectedId);
                      if (item) {
                        setPaymentData({
                          ...paymentData,
                          batch_id: item.type === 'batch' ? item.id : undefined,
                          course_id: item.type === 'course' ? item.id : undefined,
                          amount: item.price_per_month || item.price || 1500,
                          itemName: item.displayName
                        });
                      }
                    }}
                    required
                  >
                    <option value="" className="bg-slate-900">-- {t.selectItem} --</option>
                    {allSelectableItems.map(item => (
                      <option key={item.id} value={item.id} className="bg-slate-900">
                        {item.displayName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-lg px-6 h-14 flex items-center text-white font-bold">
                    {paymentData.itemName || "Selected Item"}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.trnxId}</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.trnxPlaceholder}
                      className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-6 h-14 font-mono text-lg tracking-widest placeholder:text-slate-700"
                      value={paymentData.trnx_id}
                      onChange={(e) => setPaymentData({ ...paymentData, trnx_id: e.target.value })}
                      required
                    />
                    <div className="absolute right-4 top-4 text-royal-gold/20">
                      <Lock size={20} />
                    </div>
                  </div>
                </div>
                <div className="form-control space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.senderNumber}</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="017XXXXXXXX"
                      className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-6 h-14 font-mono text-lg tracking-widest placeholder:text-slate-700"
                      value={paymentData.sender_number}
                      onChange={(e) => setPaymentData({ ...paymentData, sender_number: e.target.value })}
                      required
                    />
                    <div className="absolute right-4 top-4 text-royal-gold/20">
                      <Send size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.amount}</label>
                  <div className="bg-white/5 border border-white/10 rounded-lg px-6 h-14 flex items-center text-slate-400 font-bold">
                    {paymentData.amount} BDT
                  </div>
                </div>
                <div className="form-control space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.month}</label>
                  <select
                    className="select select-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full h-14 px-4 rounded-lg [&>option]:bg-slate-900 [&>option]:text-white"
                    value={paymentData.month}
                    onChange={(e) => setPaymentData({ ...paymentData, month: e.target.value })}
                    required
                  >
                    {(() => {
                      const now = new Date();
                      const currentDay = now.getDate();
                      const currentMonth = now.toISOString().slice(0, 7);
                      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 7);

                      // Always allow current month and next month payment
                      return (
                        <>
                          <option value={currentMonth}>{new Date(currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} (Current)</option>
                          <option value={nextMonth}>{new Date(nextMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} (Next)</option>
                        </>
                      );
                    })()}
                  </select>
                </div>
              </div>

              {/* Payment Window Notice */}
              {(() => {
                const currentDay = new Date().getDate();
                if (currentDay <= 10) {
                  return (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-400 text-sm font-bold">Standard Payment Window</p>
                        <p className="text-green-300/70 text-xs mt-1">
                          You can pay for this month or next month. Please pay within the first 10 days to avoid service interruption.
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-amber-400 text-sm font-bold">Late Payment</p>
                        <p className="text-amber-300/70 text-xs mt-1">
                          You are paying after the standard window (1st-10th). Please complete payment to maintain access.
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-4 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all"
                >
                  {t.cancel}
                </button>
                <button type="submit" disabled={loading} className="flex-[2] btn-gold py-4 text-lg">
                  {loading ? "Processing..." : t.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
