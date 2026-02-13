"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "@/actions/auth";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser(formData);
      if (result.success) {
        toast.success("Login successful!");
        router.refresh();
        const destination = result.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
        router.push(destination);
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-2xl w-full max-w-md shadow-2xl shadow-royal-blue/20">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-center text-slate-400 mb-8">Login to your <span className="text-royal-gold font-semibold">Saif Academy</span> account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Email or Phone</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="saif@example.com or 01712345678"
                className="input-premium pl-12 h-14"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-500" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="input-premium pl-12 h-14"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end pt-1">
              <Link href="/forgot-password" className="text-xs text-royal-gold hover:underline font-bold tracking-tight">Forgot Password?</Link>
            </div>
          </div>

          <button
            type="submit"
            className={`btn-primary-premium w-full mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Don't have an account? <Link href="/signup" className="text-royal-gold font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
