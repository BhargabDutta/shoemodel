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

    <p className="absolute bottom-0 left-0 right-0 mb-10 text-white/50 text-lg tracking-widest">{content.highlight}</p>
  </div>
</section>
    );
  }
  