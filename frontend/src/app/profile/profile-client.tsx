"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, School, GraduationCap, Globe, Save } from "lucide-react";
import { updateProfile } from "@/actions/auth";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    title: "Profile Settings",
    subtitle: "Manage your account information",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    institute: "Institute Name",
    classLevel: "Class Level",
    role: "Account Role",
    save: "Save Changes",
    cancel: "Cancel",
    readOnly: "Read Only",
    optional: "Optional",
  },
  bn: {
    title: "প্রোফাইল সেটিংস",
    subtitle: "আপনার অ্যাকাউন্ট তথ্য পরিচালনা করুন",
    name: "পুরো নাম",
    email: "ইমেইল ঠিকানা",
    phone: "ফোন নম্বর",
    institute: "প্রতিষ্ঠানের নাম",
    classLevel: "ক্লাস লেভেল",
    role: "অ্যাকাউন্ট রোল",
    save: "পরিবর্তন সংরক্ষণ করুন",
    cancel: "বাতিল করুন",
    readOnly: "শুধুমাত্র পড়ুন",
    optional: "ঐচ্ছিক",
  },
};

export default function ProfileClient({ user }: any) {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    institute_name: user.institute_name || "",
    class_level: user.class_level || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone || null,
        institute_name: formData.institute_name || null,
        class_level: formData.class_level ? parseInt(formData.class_level) : null,
      });

      if (result.success) {
        toast.success(lang === "en" ? "Profile updated successfully!" : "প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 max-w-4xl mx-auto">
      <div className="glass-panel p-8 md:p-12 border-royal-gold/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight mb-2">
              {t.title}
            </h1>
            <p className="text-slate-400">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="p-3 bg-slate-900 rounded-full text-royal-gold hover:scale-110 transition-transform border border-white/10 flex items-center gap-2 px-4"
          >
            <Globe size={20} />
            <span className="text-sm font-bold">{lang === "en" ? "বাংলা" : "English"}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14} />
              {t.name}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} />
              {t.email}
              <span className="text-[10px] text-slate-600 normal-case">({t.readOnly})</span>
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-500 cursor-not-allowed opacity-50"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} />
              {t.phone}
              <span className="text-[10px] text-slate-600 normal-case">({t.optional})</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
              placeholder="+880 1XXX-XXXXXX"
            />
          </div>

          {/* Institute Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <School size={14} />
              {t.institute}
              <span className="text-[10px] text-slate-600 normal-case">({t.optional})</span>
            </label>
            <input
              type="text"
              value={formData.institute_name}
              onChange={(e) => setFormData({ ...formData, institute_name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
              placeholder="Your school or college name"
            />
          </div>

          {/* Class Level */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap size={14} />
              {t.classLevel}
              <span className="text-[10px] text-slate-600 normal-case">({t.optional})</span>
            </label>
            <input
              type="number"
              value={formData.class_level}
              onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-royal-gold transition-all"
              placeholder="9, 10, 11, 12..."
              min="1"
              max="12"
            />
          </div>

          {/* Role (Read-only) */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14} />
              {t.role}
              <span className="text-[10px] text-slate-600 normal-case">({t.readOnly})</span>
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-slate-500 opacity-50 capitalize">
              {user.role}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-4 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] btn-gold py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {isSubmitting ? "Saving..." : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
