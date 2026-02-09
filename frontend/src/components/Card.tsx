import Image from "next/image";
import { ReactNode } from "react";

const gradients = [
  "from-blue-600 to-indigo-900",
  "from-amber-500 to-orange-700",
  "from-emerald-500 to-teal-900",
  "from-purple-600 to-indigo-900",
  "from-pink-600 to-rose-900",
  "from-cyan-600 to-blue-900",
];

const Card = ({
  children,
  imgUrl,
  title,
}: {
  children: ReactNode;
  imgUrl?: string; // Made optional
  title?: string;
}) => {
  // Simple deterministic gradient selection based on title length
  const gradientIndex = title ? title.length % gradients.length : 0;
  const selectedGradient = gradients[gradientIndex];

  return (
    <div className="glass-card group h-full flex flex-col overflow-hidden p-0">
      <div className={`relative h-48 w-72 md:w-96 overflow-hidden bg-gradient-to-br ${selectedGradient} flex items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

        
        <h3 className="relative z-10 text-2xl md:text-3xl font-heading font-bold text-white leading-tight drop-shadow-lg">
          {title}
        </h3>
      </div>
      
      <div className="p-8 flex-grow flex flex-col bg-slate-900/20 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};

export default Card;
