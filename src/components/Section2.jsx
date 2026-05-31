// src/components/Section.jsx
import { variantContent } from "../data/variantContent";

export default function Section2({ variant }) {
  const content = variantContent[variant]?.sections.section2 || variantContent.classicRed.sections.section2;

    return (
<section className="h-screen flex items-center justify-center px-6 md:px-20">
  <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl">
    <div>
      <div className="text-[180px] font-black text-white/70 blur-[2px] leading-none -mt-10">
        Pure
      </div>

      <h2 className="text-5xl md:text-7xl font-black tracking-tighter -mt-12">{content.title}</h2>
    </div>
  </div>
</section>
    );
  }
  