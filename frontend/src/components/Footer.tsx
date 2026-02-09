import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail } from 'lucide-react';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-white">
              SAIF <span className="text-royal-gold">ACADEMY</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Empowering students with linguistic excellence and confidence. When teaching is an art, learning becomes entertaining.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <Link 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-royal-gold hover:text-royal-blue transition-all duration-300 border border-white/10"
                >
                  <Icon size={18}/>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "All Batches", "My Batches", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-slate-400 hover:text-royal-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-gold scale-0 group-hover:scale-100 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              {["FAQ", "Terms of Service", "Privacy Policy", "Refund Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-slate-400 hover:text-royal-gold transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4 text-sm">Stay updated with our latest courses and offers.</p>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-royal-gold transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-royal-gold transition-all"
              />
              <button className="mt-3 w-full btn-gold text-sm py-2 px-4">Subscribe</button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Saif Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Made with ❤️ for</span>
            <span className="text-royal-gold font-bold">Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  