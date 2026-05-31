// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ShoeCanvas from "./components/ShoeCanvas";
import Hero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";

import steps from "./assets/steps.webm";
import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef([]);
  const [variant, setVariant] = useState("classicRed"); // default variant

  const minLoadingTimeRef = useRef(false);
  const modelsLoadedRef = useRef(false);

// In App.jsx
// Minimum 5 seconds loading
  useEffect(() => {
    const timer = setTimeout(() => {
      minLoadingTimeRef.current = true;
      checkIfLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Loading Manager Setup
  useEffect(() => {
    loadingManager.onStart = () => console.log("Loading started");
    
    loadingManager.onProgress = (url, loaded, total) => {
      console.log(`Progress: ${Math.round((loaded / total) * 100)}% - ${url}`);
    };

    loadingManager.onLoad = () => {
      console.log("All models loaded successfully");
      modelsLoadedRef.current = true;
      checkIfLoadingComplete();
    };

    loadingManager.onError = (url) => {
      console.error(`Error loading: ${url}`);
      modelsLoadedRef.current = true; // Don't hang forever on error
      checkIfLoadingComplete();
    };
  }, []);

  // Check if both minimum time and models are ready
  const checkIfLoadingComplete = () => {
    if (minLoadingTimeRef.current && modelsLoadedRef.current) {
      setIsLoading(false);
    }
  };
  

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

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[999999] bg-black flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video
            src={steps}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 right-0 top-0 bottom-0 m-auto inset-0 w-48 h-auto object-cover opacity-70"
          />

          {/* Overlay Content */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-white/60 mt-48 text-2xl">
              Walking...
            </p>
          </div>
        </div>
      )}

    <div className={`relative min-h-screen text-white overflow-x-hidden transition-colors duration-500`}>
    
      <div className='fixed h-screen w-full z-20'>
        <ShoeCanvas 
        sectionIndex={sectionIndex} 
        isMobile={isMobile} 
        variant={variant}
        loadingManager={loadingManager}
        />
      </div>

      <main className="relative">

        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index={0}
        >
          <Hero
            variant={variant}
            setVariant={setVariant}
          />
        </div>

        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index={1}
        >
          <Section1 variant={variant}/>
        </div>

        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index={2}
        >
          <Section2 variant={variant}/>
        </div>

        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index={3}
        >
          <Section3 variant={variant}/>
        </div>

        <div
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index={4}
        >
          <Section4 variant={variant}/>
        </div>

        <div
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index={5}
        >
          <Section5 variant={variant}/>
        </div>

      </main>

    </div>
    </>
  );
}
