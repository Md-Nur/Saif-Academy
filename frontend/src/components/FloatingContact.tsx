"use client";
import { MessageCircle, Phone } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <a 
        href="https://wa.me/YOUR_NUMBER" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href="tel:YOUR_NUMBER" 
        className="w-14 h-14 bg-royal-gold rounded-full flex items-center justify-center text-royal-blue shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Call Us"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

export default FloatingContact;
