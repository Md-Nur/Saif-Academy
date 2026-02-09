import Image from "next/image";
import heroImg from "../../../public/hero.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-royal-gold/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-royal-blue/30 rounded-full blur-[120px] -z-10" />

      <div className="container-premium relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-1 rounded-full border border-royal-gold/30 bg-royal-gold/10 backdrop-blur-sm mb-4">
              <span className="text-royal-gold text-sm font-semibold tracking-wider uppercase">Excellence in Education</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-heading leading-tight text-white drop-shadow-lg">
              Unlock Your <br/>
              <span className="text-gradient-gold">English Potential</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              When teaching is an <span className="text-royal-gold font-serif italic">art</span>, 
              learning becomes <span className="text-white font-medium">entertaining</span>. 
              Join Saif Academy for professional academic coaching.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/signup" className="btn-primary-premium w-full sm:w-auto text-center">
                Get Started
              </Link>
              <Link href="/courses" className="btn-gold w-full sm:w-auto text-center">
                Browse Courses
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-80">
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest">Students</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-royal-blue to-royal-gold opacity-20 blur-2xl rounded-3xl -z-10 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="glass-panel p-4 rotate-1 group-hover:rotate-0 transition-all duration-500">
               <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src={heroImg} 
                  alt="Saifullah Sir Teaching" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-heading text-2xl italic">"Education is the most powerful weapon."</p>
                </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
