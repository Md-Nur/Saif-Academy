import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { getTestimonials } from "@/actions/testimonials";

const Testimonials = async () => {
  // Fetch real testimonials from backend
  const result = await getTestimonials();
  const testimonials = result.success ? result.testimonials : [];

  // Fallback testimonials if none exist in database
  const defaultTestimonials = [
    {
      name: "Rifat Ahmed",
      role: "HSC Student",
      content: "Saifullah Sir's techniques are just incredible. I never thought English could be this easy and fun!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rifat"
    },
    {
      name: "Sumiya Akter",
      role: "SSC Student",
      content: "The interactive classes at Saif Academy helped me build my confidence significantly. Highly recommended!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumiya"
    },
    {
      name: "Tanvir Hasan",
      role: "University Admission",
      content: "The personal care and attention I received here were key to my success in admission tests.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-32 bg-slate-950/50 relative">
      <div className="container-premium relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Hear From Our <span className="text-gradient-gold">Students</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real stories from students who transformed their English skills at Saif Academy.
          </p>
        </div>

        {displayTestimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {displayTestimonials.slice(0, 3).map((t: any, i: number) => (
              <div key={i} className="glass-card p-8 relative group">
                <Quote className="absolute top-6 right-6 text-royal-gold/10 group-hover:text-royal-gold/20 transition-colors" size={48} />

                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, index) => (
                    <Star key={index} size={16} className="fill-royal-gold text-royal-gold" />
                  ))}
                </div>

                <p className="text-slate-300 italic mb-8 relative z-10">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-royal-gold/30 relative">
                    <Image src={t.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-royal-gold text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
