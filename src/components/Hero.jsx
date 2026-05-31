// src/components/Hero.jsx
import { useMemo } from "react";
import redbg from "../assets/red_bg.png";
import navybg from "../assets/navy_bg.png";
import skybg from "../assets/sky_bg.png";
import droplets from "../assets/droplets.png";
import airbg from "../assets/air_bg.png";

import waves from "../assets/waves.png";
import wavesbottom from "../assets/waves2.png";

import zap1 from "../assets/zap1.png";
import zap2 from "../assets/zap2.png";

export default function Hero({ title, subtitle, cta, variant, setVariant }) {
  const variants = [
    { key: "classicRed", label: "Classic Red" },
    { key: "navyBlue", label: "Navy Blue" },
    { key: "skyBlue", label: "Sky Blue" },
    { key: "airZoom", label: "Air Zoom" },
  ];

  // Map variant to background image
  const backgroundImage = useMemo(() => {
    switch (variant) {
      case "classicRed":
        return redbg;
      case "navyBlue":
        return navybg;
      case "skyBlue":
        return skybg;
      case "airZoom":
        return airbg;
      default:
        return redbg;
    }
  }, [variant]);

  const showDroplets = variant === "navyBlue";
  const showRed = variant === "classicRed";
  const showSky = variant === "skyBlue";
  const showAir = variant === "airZoom";
    return (
      <section className="relative h-screen flex items-center justify-center overflow-visible">

        {/* Dynamic Background Image */}
        <img 
          src={backgroundImage} 
          alt="variant background" 
          className="w-full h-full fixed -z-10"
        />

      {/* Droplets Overlay - Only for Navy Blue */}
      {showRed && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none">
          <img src={zap1} alt="" srcset="" className="w-[500px] h-auto absolute left-0 bottom-0 top-0 m-auto" />
          <img src={zap1} alt="" srcset="" className="w-[500px] h-auto absolute right-0 bottom-0 m-auto -rotate-45" />
        </div>
      )}

      {showSky && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none"></div>
      )}

      {showAir && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none"></div>
      )}

      {showDroplets && (
        <div className="h-full w-full relative left-0 z-[999] pointer-events-none">
          {/* <div className="absolute z-[999] bottom-0 h-28 w-full bg-gradient-to-t from-blue-950 to-transparent"></div> */}
          <img src={waves} alt="" srcset="" className="w-[500px] h-auto absolute right-0 -bottom-10" />
          <img src={waves} alt="" srcset="" className="w-[500px] -scale-x-100 h-auto absolute left-0 -bottom-10" />
        </div>
      )}

        {/* BIG TITLE BEHIND SHOE */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="
              text-[20vw]
              font-black
              uppercase
              leading-none
              text-white/15
              select-none
            "
          >
            MOTION
          </h1>
        </div> */}

  {/* CONTENT */}
  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-30">

    <p className="text-xl text-white/70 mb-8">
      Sculpted for speed and comfort
    </p>

    <div className="flex gap-4 justify-center flex-wrap">
      {variants.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          className={`px-4 py-2 rounded-lg font-bold border-2 transition
          ${
            variant === key
              ? "border-white bg-white text-black"
              : "border-gray-500 bg-transparent text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>

  </div>
      </section>
    );
  }
  