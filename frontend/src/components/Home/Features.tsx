import { BookOpen, Users, Award, Zap } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="text-royal-gold" size={32} />,
    title: "Expert Mentorship",
    description: "Learn from Saifullah Sir and other seasoned professionals with years of academic excellence."
  },
  {
    icon: <Users className="text-royal-gold" size={32} />,
    title: "Interactive Batches",
    description: "Small batch sizes to ensure personalized attention and collaborative learning."
  },
  {
    icon: <Award className="text-royal-gold" size={32} />,
    title: "Certified Excellence",
    description: "Get recognized for your progress with our verified certificates and performance tracking."
  },
  {
    icon: <Zap className="text-royal-gold" size={32} />,
    title: "Rapid Learning",
    description: "Our unique teaching methodology helps you grasp complex concepts faster and more effectively."
  }
];

const Features = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container-premium relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Why Choose <span className="text-gradient-gold">Saif Academy</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We provide a premium learning environment designed to help you excel in your academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 group hover:bg-royal-gold/5 transition-all duration-500 hover:-translate-y-2 border-white/5"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-royal-gold/20 transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-royal-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
    </section>
  );
};

export default Features;
