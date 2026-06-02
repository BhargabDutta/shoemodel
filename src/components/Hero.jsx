// src/components/Hero.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import redbg from "../assets/red_bg.png";
import navybg from "../assets/navy_bg.png";
import skybg from "../assets/sky_bg.png";
import drops from "../assets/water_drops.png";
import airbg from "../assets/air_bg.png";

import redbgMobile from "../assets/red_bg_mobile.png";
import navybgMobile from "../assets/navy_bg_mobile.png";
import skybgMobile from "../assets/sky_bg_mobile.png";
import airbgMobile from "../assets/air_bg_mobile.png";

import waves from "../assets/waves.png";
import wavesbottom from "../assets/waves2.png";

import zap1 from "../assets/zap1.png";
import zap2 from "../assets/zap2.png";

import leaves1 from "../assets/float_leaves.png";
import tree from "../assets/tree_top.png";
import leaves3 from "../assets/leaves_float2.png";

import useMouseParallax from "../hooks/useMouseParallax";

export default function Hero({ title, subtitle, cta, variant, setVariant }) {
const { bgRef } = useMouseParallax(35);   // ← intensity

  const variants = [
    { key: "classicRed", label: "Iconic" },
    { key: "navyBlue", label: "Refined" },
    { key: "skyBlue", label: "Bold" },
    { key: "airZoom", label: "Breathe" },
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

  const mobileBackgroundImage = useMemo(() => {
  switch (variant) {
    case "classicRed":
      return redbgMobile;
    case "navyBlue":
      return navybgMobile;
    case "skyBlue":
      return skybgMobile;
    case "airZoom":
      return airbgMobile;
    default:
      return redbgMobile;
  }
}, [variant]);

  const showDroplets = variant === "navyBlue";
  const showRed = variant === "classicRed";
  const showSky = variant === "skyBlue";
  const showAir = variant === "airZoom";

    return (
      <section className="relative h-screen flex items-center justify-center overflow-visible">

{/* Global Parallax Background */}
<picture>
  <source
    media="(max-width: 767px)"
    srcSet={mobileBackgroundImage}
  />

  <img
    ref={bgRef}
    src={backgroundImage}
    alt="background"
    className="fixed inset-0 w-full h-full object-cover -z-10 transition-transform"
    style={{
      transition: "none",
      willChange: "transform",
    }}
  />
</picture>

      {/* Droplets Overlay - Only for Navy Blue */}
      {showRed && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none hidden md:block">
          <img src={zap1} alt="" srcset="" className="w-[500px] h-auto absolute left-0 bottom-0 top-0 m-auto" />
          <img src={zap1} alt="" srcset="" className="w-[500px] h-auto absolute right-0 bottom-0 m-auto -rotate-45" />
        </div>
      )}

      {showSky && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none hidden md:block">
          <img src={tree} alt="" srcset="" className="w-[400px] h-auto absolute left-0 -top-10 " />

          <div className="h-fit w-fit absolute right-0 left-0 top-0 bottom-0 m-auto flex flex-col gap-32 items-center justify-center ">
            <div className="flex">
              <img src={leaves1} alt="" srcset="" className="w-[500px] h-auto " />
              <img src={leaves1} alt="" srcset="" className="w-[500px] h-auto " />
            </div>

            <div className="flex">
              <img src={leaves1} alt="" srcset="" className="w-[500px] h-auto " />
              <img src={leaves1} alt="" srcset="" className="w-[500px] h-auto " />
            </div>
          </div>
          <img src={leaves3} alt="" srcset="" className="w-[250px] h-auto absolute -right-20 -top-10 m-auto" />
        </div>
      )}

      {showAir && (
        <div className="h-full w-full absolute left-0 z-[999] pointer-events-none"></div>
      )}

      {showDroplets && (
        <div className="h-full w-full relative left-0 z-[999] pointer-events-none hidden md:block">
          <img src={waves} alt="" srcset="" className="w-[500px] h-auto absolute right-0 -bottom-10" />
          <img src={waves} alt="" srcset="" className="w-[500px] -scale-x-100 h-auto absolute left-0 -bottom-10" />
        </div>
      )}


  {/* CONTENT */}
  <div className="absolute h-full w-full text-center z-30 flex flex-col items-center justify-end px-6 md:px-20 gap-6 mb-20">
    <div className="flex gap-4 justify-center flex-wrap">
      {variants.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setVariant(key)}
          className={`px-4 py-2 rounded-lg font-bold transition
          ${
            variant === key
              ? "bg-white text-black"
              : "bg-black/20 backdrop-blur-sm text-white"
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
  