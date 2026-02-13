import EntityGrid from "@/components/ui/EntityGrid";
import HeroSection from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import Testimonials from "@/components/Home/Testimonials";
import FloatingContact from "@/components/FloatingContact";
import SearchBar from "@/components/layout/Nav/SearchBar";
import Link from "next/link";

// ... existing imports ...

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />

      <div className="container-premium -mt-12 relative z-20">
        <SearchBar />
      </div>

      <Features />

      <div className="bg-slate-900/30 py-16">
        <EntityGrid itemType="batch" limit={3} className="my-32" />
      </div>

      <div className="bg-slate-900/10 py-16">
        <EntityGrid itemType="course" limit={3} className="my-32" />
      </div>

      <Testimonials />

      <section className="py-32 bg-gradient-to-b from-slate-950 to-royal-blue relative overflow-hidden">
        <div className="container-premium text-center">
          <div className="glass-panel max-w-4xl mx-auto border-royal-gold/20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-slate-300 mb-8 text-lg">Join hundreds of successful students and master English with our expert coaching.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-primary-premium flex items-center justify-center">
                Enroll Now
              </Link>
              <Link
                href="https://wa.me/YOUR_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingContact />
    </main>
  );
}
