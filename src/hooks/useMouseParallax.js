// src/hooks/useMouseParallax.js
import { useRef, useEffect } from "react";

export default function useMouseParallax(intensity = 30) {
  const bgRef = useRef(null);

  useEffect(() => {
    let rafId;

    const handleMouseMove = (e) => {
      if (!bgRef.current) return;

      // Cancel previous frame
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        const moveX = x * -intensity;
        const moveY = y * -intensity;

        bgRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.12)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return { bgRef };
}