// src/components/Section.jsx
import { variantContent } from "../data/variantContent";

export default function Section5({ variant }) {
  const content = variantContent[variant]?.sections.section5 || variantContent.classicRed.sections.section5;

    return (
<section className="h-screen flex items-center justify-center text-center relative">
  <div className="max-w-2xl">
<div className="relative">
  {/* Base text */}
  <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-wide">
    {content.title}
  </h2>
  
  {/* Overlay text - Corrected using native text stroke and fill properties */}
  <h2 className="absolute top-0 z-[999] text-6xl md:text-8xl font-bold mb-6 tracking-wide [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_white]">
    {content.title}
  </h2>
</div>

    <p className="text-3xl text-white/70 mb-16">{content.subtitle}</p>
    
    <button className="px-16 py-6 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform">
      Choose Your Color
    </button>

    <p className="mt-12 text-white/50 text-lg tracking-widest">{content.highlight}</p>
  </div>
</section>
    );
  }
  