"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, BookOpen, Phone, Building } from "lucide-react";
import { toast } from "react-hot-toast";
import { registerUser } from "@/actions/auth";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
    class_level: 6,
    institute_name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser(formData);
      if (result.success) {
        toast.success("Account created successfully!");
        router.refresh();
        router.push(formData.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="glass-panel p-8 rounded-2xl w-full max-w-lg shadow-2xl shadow-royal-blue/20">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 text-center">Create Account</h1>
        <p className="text-center text-slate-400 mb-8">Join <span className="text-royal-gold font-semibold">Saif Academy</span> today</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Saifullah Mansur" 
                className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10 placeholder:text-slate-600"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control space-y-2">
              <label className="text-sm font-semibold text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="saif@example.com" 
                  className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10 placeholder:text-slate-600"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className="text-sm font-semibold text-slate-300">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="tel" 
                  placeholder="01712..." 
                  className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10 placeholder:text-slate-600"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10 placeholder:text-slate-600"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Institute Name</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Dhaka College" 
                className="input input-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10 placeholder:text-slate-600"
                value={formData.institute_name}
                onChange={(e) => setFormData({ ...formData, institute_name: e.target.value })}
                required={false}
              />
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="text-sm font-semibold text-slate-300">Class Level</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-slate-500" size={18} />
              <select 
                className="select select-bordered bg-white/5 border-white/10 text-white focus:border-royal-gold focus:outline-none w-full pl-10"
                value={formData.class_level}
                onChange={(e) => setFormData({ ...formData, class_level: parseInt(e.target.value) })}
              >
                {[6,7,8,9,10,11,12].map(c => (
                  <option key={c} value={c} className="bg-slate-800">Class {c}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn-primary-premium w-full mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-royal-gold font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
