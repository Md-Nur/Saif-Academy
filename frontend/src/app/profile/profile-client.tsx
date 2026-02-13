"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, School, GraduationCap, Globe, Save, Camera, Loader2 } from "lucide-react";
import { updateProfile } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { uploadToImgBB } from "@/lib/imgbb";
import { motion, AnimatePresence } from "framer-motion";

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
    profilePic: "Profile Picture",
    changePic: "Change Photo",
    uploading: "Uploading...",
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
    profilePic: "প্রোফাইল ছবি",
    changePic: "ছবি পরিবর্তন করুন",
    uploading: "আপলোড হচ্ছে...",
  },
};

export default function ProfileClient({ user, userStats }: any) {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    institute_name: user.institute_name || "",
    class_level: user.class_level || "",
    profile_picture: user.profile_picture || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
        profile_picture: formData.profile_picture || null,
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToImgBB(file);
      if (url) {
        setFormData({ ...formData, profile_picture: url });
        toast.success(lang === "en" ? "Photo uploaded! Save to persist changes." : "ছবি আপলোড হয়েছে! পরিবর্তন সেভ করুন।");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Upload error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container-premium pt-28 md:pt-40 pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-3">
              <span className="text-gradient-gold">{t.title.split(' ')[0]}</span> {t.title.split(' ').slice(1).join(' ')}
            </h1>
            <p className="text-slate-400 text-lg">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl text-royal-gold hover:scale-105 active:scale-95 transition-all border border-royal-gold/20 flex items-center gap-3 px-6 shadow-xl"
          >
            <Globe size={20} className="animate-pulse" />
            <span className="text-sm font-black uppercase tracking-widest">{lang === "en" ? "বাংলা" : "English"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card flex flex-col items-center text-center relative overflow-hidden group py-12"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/10 blur-[50px] -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-blue-light/20 blur-[50px] -ml-16 -mb-16" />

              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-3xl border-4 border-royal-gold/30 p-1.5 bg-slate-950 overflow-hidden relative shadow-2xl shadow-royal-gold/20 group-hover:border-royal-gold transition-colors duration-500"
                >
                  {formData.profile_picture ? (
                    <img
                      src={formData.profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-[1.25rem]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-royal-gold/20">
                      <User size={80} />
                    </div>
                  )}

                  <AnimatePresence>
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20"
                      >
                        <Loader2 className="text-royal-gold animate-spin" size={32} />
                        <span className="text-[10px] text-royal-gold font-black uppercase tracking-[0.2em]">{t.uploading}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Camera size={32} className="text-royal-gold" />
                      <span className="text-xs font-black uppercase tracking-widest">{t.changePic}</span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                  </label>
                </motion.div>

                <div className="absolute -bottom-3 -right-3 bg-royal-gold text-royal-blue-dark p-3 rounded-2xl shadow-2xl border-4 border-slate-950 transform group-hover:rotate-12 transition-transform duration-300">
                  <Camera size={20} />
                </div>
              </div>

              <h2 className="text-2xl font-heading font-black text-white px-6 truncate w-full">{formData.name}</h2>
              <p className="text-sm font-mono text-royal-gold/60 mt-1 uppercase tracking-widest">{user.role}</p>

              <div className="mt-8 flex gap-2">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {user.status || 'Verified Student'}
                </div>
              </div>
            </motion.div>

            <div className="glass-panel p-6 border-white/5">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-royal-gold uppercase mb-1">Enrolled</p>
                  <p className="text-xl font-black text-white">
                    {userStats ? userStats.total_enrollments : "0"}
                  </p>
                </div>
                {userStats?.attendance_percentage !== null && userStats?.attendance_percentage !== undefined ? (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-royal-gold uppercase mb-1">Attendance</p>
                    <p className="text-xl font-black text-white">{userStats.attendance_percentage}%</p>
                  </div>
                ) : (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-royal-gold uppercase mb-1">Batches</p>
                    <p className="text-xl font-black text-white">
                      {userStats ? userStats.enrolled_batches : "0"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="glass-panel border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-30" />

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Section: Personal Info */}
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-royal-gold/10 flex items-center justify-center border border-royal-gold/20">
                      <User size={20} className="text-royal-gold" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">
                        {t.name}
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-gold transition-colors" size={18} />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-premium pl-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                        <span>{t.email}</span>
                        <span className="text-[9px] text-royal-gold/40 normal-case">{t.readOnly}</span>
                      </label>
                      <div className="relative group opacity-60">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="input-premium pl-12 cursor-not-allowed bg-slate-900/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                        <span>{t.phone}</span>
                        <span className="text-[9px] text-slate-700 normal-case">{t.optional}</span>
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-gold transition-colors" size={18} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-premium pl-12"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                        <span>{t.role}</span>
                        <span className="text-[9px] text-royal-gold/40 normal-case">{t.readOnly}</span>
                      </label>
                      <div className="relative group opacity-60">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                        <div className="input-premium pl-12 capitalize flex items-center bg-slate-900/50">
                          {user.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Section: Academic Info */}
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 pt-10 border-t border-white/5"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <GraduationCap size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Academic Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                        <span>{t.institute}</span>
                        <span className="text-[9px] text-slate-700 normal-case">{t.optional}</span>
                      </label>
                      <div className="relative group">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-gold transition-colors" size={18} />
                        <input
                          type="text"
                          value={formData.institute_name}
                          onChange={(e) => setFormData({ ...formData, institute_name: e.target.value })}
                          className="input-premium pl-12"
                          placeholder="Your school or college name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 flex items-center justify-between">
                        <span>{t.classLevel}</span>
                        <span className="text-[9px] text-slate-700 normal-case">{t.optional}</span>
                      </label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-gold transition-colors" size={18} />
                        <input
                          type="number"
                          value={formData.class_level}
                          onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                          className="input-premium pl-12"
                          placeholder="9, 10, 11, 12..."
                          min="1"
                          max="12"
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>

                <div className="flex gap-4 pt-10 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-5 rounded-2xl text-slate-500 font-black uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all text-xs"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-gold py-5 shadow-2xl shadow-royal-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Save size={20} />
                    )}
                    <span className="text-sm font-black uppercase tracking-[0.2em]">{isSubmitting ? "Processing..." : t.save}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
