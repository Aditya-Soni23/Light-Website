(() => {
  const FRAME_COUNT = 300;
  const canvas = document.getElementById('frame-canvas');
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

  const images = new Array(FRAME_COUNT);
  let currentFrame = 0;
  let targetFrame = 0;
  let lastRenderedFrame = -1;

  function getFrameSrc(index) {
    const pad = String(index + 1).padStart(3, '0');
    return `frames/ezgif-frame-${pad}.jpg`;
  }

  // Preload frames
  function preloadImages() {
    // 1. Load frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      if (lastRenderedFrame === -1) {
        renderFrame(0);
      }
    };

    // 2. Preload remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    }
  }

  // Find the exact frame or the closest loaded frame to avoid any blank frames
  function getBestAvailableImage(index) {
    const target = images[index];
    if (target && target.complete && target.naturalWidth > 0) {
      return target;
    }

    // Bidirectional scan for the nearest ready frame
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
        return images[prev];
      }
      const next = index + offset;
      if (next < FRAME_COUNT && images[next]?.complete && images[next].naturalWidth > 0) {
        return images[next];
      }
    }

    return images[0]?.complete ? images[0] : null;
  }

  // Draw frame with cover scaling to fill screen seamlessly
  function renderFrame(index) {
    const img = getBestAvailableImage(index);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    if (!iw || !ih) return;

    // Cover scale factor
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * 0.5;
    const dy = (ch - dh) * 0.5;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    lastRenderedFrame = index;
  }

  // Handle canvas sizing and retina scaling
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    if (lastRenderedFrame !== -1) {
      renderFrame(lastRenderedFrame);
    } else {
      renderFrame(0);
    }
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
  preloadImages();

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1.2,
    wheelMultiplier: 1.0,
  });

  // Calculate normalized scroll progress [0, 1]
  function getProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    const scrollY = lenis.animatedScroll ?? window.scrollY ?? 0;
    return Math.max(0, Math.min(1, scrollY / maxScroll));
  }

  // Main animation frame loop
  function raf(time) {
    lenis.raf(time);

    const progress = getProgress();
    targetFrame = progress * (FRAME_COUNT - 1);

    // Smooth frame lerping for continuous fluidity
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) < 0.01) {
      currentFrame = targetFrame;
    } else {
      currentFrame += diff * 0.22;
    }

    const frameToRender = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrame)));
    if (frameToRender !== lastRenderedFrame) {
      renderFrame(frameToRender);
    }

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();
