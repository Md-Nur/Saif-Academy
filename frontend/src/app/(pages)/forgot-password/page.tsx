"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/actions/auth";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await forgotPassword(email);
            if (result.success) {
                setSubmitted(true);
                toast.success("Reset link sent!");
            } else {
                toast.error(result.error || "Failed to send reset link");
            }
        } catch (err: any) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-royal-blue-dark/50">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md shadow-2xl shadow-royal-blue/20">
                <Link href="/login" className="text-slate-500 hover:text-royal-gold transition-colors flex items-center gap-2 mb-6 text-sm group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>

                <h1 className="text-3xl font-heading font-bold text-white mb-2">Reset Password</h1>
                <p className="text-slate-400 mb-8 text-sm">Enter your email address and we'll send you a link to reset your password.</p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control space-y-2">
                            <label className="text-sm font-semibold text-slate-300">Email Address</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 text-slate-500" size={20} />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="input-premium pl-12 h-14"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn-primary-premium w-full mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                ) : (
                    <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center space-y-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <Mail className="text-green-500" size={24} />
                        </div>
                        <p className="text-sm text-green-200">
                            Check your email! If an account exists for <span className="text-white font-bold">{email}</span>, you will receive a password reset link shortly.
                        </p>
                        <p className="text-[10px] text-slate-500 italic">
                            Note: During development, check the backend console for the link.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
