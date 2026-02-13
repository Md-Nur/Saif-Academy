"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { resetPassword } from "@/actions/auth";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        token: "",
        new_password: "",
        confirm_password: "",
    });

    useEffect(() => {
        if (token) {
            setFormData(prev => ({ ...prev, token }));
        }
    }, [token]);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-panel p-8 rounded-2xl w-full max-w-md text-center space-y-4 border-red-500/20">
                    <AlertCircle className="text-red-500 mx-auto" size={48} />
                    <h1 className="text-2xl font-bold text-white">Invalid Request</h1>
                    <p className="text-slate-400">No reset token found. Please request a new link.</p>
                    <a href="/forgot-password" className="btn-primary-premium block">Request Link</a>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.new_password !== formData.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }
        if (formData.new_password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const result = await resetPassword({
                token: formData.token,
                new_password: formData.new_password
            });
            if (result.success) {
                toast.success("Password reset successful!");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                toast.error(result.error || "Reset failed");
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
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Create New Password</h1>
                <p className="text-slate-400 mb-8 text-sm">Please enter a strong new password for your account.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control space-y-2">
                        <label className="text-sm font-semibold text-slate-300">New Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-4 text-slate-500" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input-premium pl-12 h-14"
                                value={formData.new_password}
                                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Confirm Password</label>
                        <div className="relative flex items-center">
                            <CheckCircle className="absolute left-4 text-slate-500" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input-premium pl-12 h-14"
                                value={formData.confirm_password}
                                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn-primary-premium w-full mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
