// src/components/Section.jsx
import { variantContent } from "../data/variantContent";

export default function Section3({ variant }) {
  const content = variantContent[variant]?.sections.section3 || variantContent.classicRed.sections.section3;

    return (
<section className="h-screen relative flex items-center justify-center overflow-hidden w-full">
  <div className="absolute" />
  <div className="relative text-center px-6 w-full h-full">
    <div className="absolute inset-0 flex items-center justify-center">
      <h1
        className="
          text-[20vw]
          font-black
          uppercase
          leading-none
          text-white
          select-none
        "
      >
        {content.title}
      </h1>
    </div>
    {/* <h2 className="text-6xl md:text-9xl font-black tracking-[-4px] mb-8">{content.title}</h2> */}
    <div className="absolute z-[999] left-0 right-0 bottom-32 m-auto text-center">
      <p className="text-3xl text-white/80 ">{content.subtitle}</p>
      <div className="text-xl tracking-widest border-t border-white/30 pt-6 inline-block">
        {content.highlight}
      </div>
    </div>

  </div>

</section>
    );
  }
  