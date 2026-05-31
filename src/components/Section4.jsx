// src/components/Section.jsx
import { variantContent } from "../data/variantContent";

export default function Section4({ variant }) {
  const content = variantContent[variant]?.sections.section4 || variantContent.classicRed.sections.section4;

    return (
<section className="h-screen flex items-center px-6 md:px-20">
  <div className="max-w-md">
    <div className="uppercase tracking-[3px] text-sm mb-6 text-white/60">CHAPTER 04</div>
    <h2 className="text-5xl md:text-7xl font-black leading-none mb-10">{content.title}</h2>
    <p className="text-2xl text-white/70 leading-relaxed">{content.subtitle}</p>
    {content.highlight && <p className="mt-12 text-white font-medium text-xl">{content.highlight}</p>}
  </div>
</section>
    );
  }
  