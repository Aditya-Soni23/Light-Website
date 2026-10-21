import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { SectionId } from "../config";

interface CinematicBackgroundProps {
  activeSection?: SectionId;
}

const TOTAL_FRAMES = 300;

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ activeSection }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  function getFrameSrc(index: number): string {
    const pad = String(index + 1).padStart(3, "0");
    const rawBase = import.meta.env.BASE_URL || "./";
    const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
    return `${base}frames/ezgif-frame-${pad}.jpg`;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Helper: Find exact loaded frame or closest available frame
    const getBestAvailableImage = (index: number): HTMLImageElement | null => {
      const direct = imagesRef.current[index];
      if (direct && direct.complete && direct.naturalWidth > 0) {
        return direct;
      }

      // Bidirectional search for nearest loaded frame to eliminate any flicker
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0) {
          const img = imagesRef.current[prev];
          if (img && img.complete && img.naturalWidth > 0) return img;
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES) {
          const img = imagesRef.current[next];
          if (img && img.complete && img.naturalWidth > 0) return img;
        }
      }

      const first = imagesRef.current[0];
      return first && first.complete && first.naturalWidth > 0 ? first : null;
    };

    // Render a given frame index to canvas with cover scaling
    const renderFrame = (index: number) => {
      const img = getBestAvailableImage(index);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      if (!iw || !ih) return;

      // Cover scaling: fill canvas while preserving aspect ratio, centered
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
      lastRenderedFrameRef.current = index;
    };

    // Handle high-DPI canvas resizing
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const frameToDraw = lastRenderedFrameRef.current >= 0 ? lastRenderedFrameRef.current : 0;
      renderFrame(frameToDraw);
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    // 1. Immediately load frame 0 for instant display
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    imagesRef.current[0] = firstImg;
    firstImg.onload = () => {
      if (lastRenderedFrameRef.current === -1) {
        renderFrame(0);
      }
    };

    // 2. Preload remaining frames progressively
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      imagesRef.current[i] = img;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    }

    // 3. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Helper to calculate normalized scroll progress [0, 1]
    const getProgress = (): number => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      const scrollY = lenis.animatedScroll ?? window.scrollY ?? 0;
      return Math.max(0, Math.min(1, scrollY / maxScroll));
    };

    // 4. Main animation loop using RAF
    const raf = (time: number) => {
      lenis.raf(time);

      const progress = getProgress();
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Smooth frame interpolation (lerp)
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) < 0.01) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.22;
      }

      const frameToRender = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
      );

      if (frameToRender !== lastRenderedFrameRef.current) {
        renderFrame(frameToRender);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return (
    <div
      id="cinematic-bg-container"
      className="cinematic-background fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        id="cinematic-animation-mount-target"
        className="absolute inset-0 w-full h-full pointer-events-none"
        data-active-section={activeSection}
      >
        {/* Fullscreen smooth frame canvas */}
        <canvas
          ref={canvasRef}
          id="sequence-canvas"
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {/* Subtle, restrained ambient vignette / atmosphere to ensure foreground text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 pointer-events-none" />

        {/* Fine, delicate ambient grain overlay for tactile visual realism */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
};
