// src/components/Section1.jsx
import { variantContent } from "../data/variantContent";

export default function Section1({ variant }) {
  const content = variantContent[variant]?.sections.section1 || variantContent.classicRed.sections.section1;

  return (
<section className="h-screen w-full flex items-center justify-end px-6 md:px-0 relative overflow-hidden bg-gradient-to-b from-transparent via-black/20 to-transparent">
  <div className="w-full text-right p-10 backdrop-blur-sm bg-black/20">
    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">{content.title}</h2>
    <p className="text-2xl text-white/70 mb-8">{content.subtitle}</p>
    {content.highlight && <div className="inline-block px-6 py-2 border border-white text-sm tracking-widest">{content.highlight}</div>}
  </div>
</section>
  );
}