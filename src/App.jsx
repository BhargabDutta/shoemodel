// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ShoeCanvas from "./components/ShoeCanvas";
import Hero from "./components/Hero";
import Section from "./components/Section";
import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef([]);
  const [variant, setVariant] = useState("classicRed"); // default variant

// In App.jsx
useEffect(() => {
  let loadedCount = 0;
  const totalModels = 4;

  loadingManager.onStart = () => {
    console.log("Loading started");
  };

  loadingManager.onProgress = (url, loaded, total) => {
    console.log(`Progress: ${Math.round((loaded / total) * 100)}% - ${url}`);
  };

  loadingManager.onLoad = () => {
    console.log("Manager says all items loaded");
    // Small delay to let GLTF parsing finish
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  loadingManager.onError = (url) => {
    console.error(`Error loading: ${url}`);
  };
}, []);
  

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionIndex(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const sections = [
    { id: "hero", type: "hero", title: "The New Motion", subtitle: "Sculpted for speed and comfort.", cta: "" },
    { id: "features", title: "Engineered Performance", subtitle: "Featherlight, breathable, responsive.", align: "right" },
    { id: "materials", title: "Premium Materials", subtitle: "Sustainably sourced, long-lasting.", align: "left" },
    { id: "cta", title: "Limited Release", subtitle: "Secure yours today.", align: "center" },
  ];

  return (
    <>
    {isLoading && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-700">
    <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
  </div>
)}

    <div className={`relative min-h-screen text-white overflow-x-hidden transition-colors duration-500 ${
      variant === "classicRed"
        ? "bg-red-900"
        : variant === "navyBlue"
        ? "bg-blue-700"
        : variant === "skyBlue"
        ? "bg-sky-700"
        : variant === "airZoom"
        ? "bg-yellow-900"
        : "bg-red-900" // fallback
    }`}>
    
      <div className='fixed h-screen w-full'>
      <ShoeCanvas 
      sectionIndex={sectionIndex} 
      isMobile={isMobile} 
      variant={variant}
      loadingManager={loadingManager}
      />
      </div>

      <main className="relative z-10">
        {sections.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            data-index={i}
          >
            {s.type === "hero" ? (
              <Hero 
                title={s.title} 
                subtitle={s.subtitle} 
                cta={s.cta}
                variant={variant}
                setVariant={setVariant}
                 />
            ) : (
              <Section
                title={s.title}
                subtitle={s.subtitle}
                align={s.align}
              />
            )}
          </div>
        ))}
      </main>
    </div>
    </>
  );
}
