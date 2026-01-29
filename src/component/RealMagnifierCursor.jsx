import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

export default function RealMagnifierCursor({ size = 160, zoom = 2.2 }) {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [ready, setReady] = useState(false);

  const shotRef = useRef(null);       // screenshot canvas
  const lensRef = useRef(null);       // lens canvas
  const rafRef = useRef(null);
  const takingRef = useRef(false);

  const takeShot = async () => {
    if (takingRef.current) return;
    takingRef.current = true;

    try {
      setReady(false);

      const shot = await html2canvas(document.body, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,

        // ✅ IMPORTANT: do NOT capture the magnifier itself
        ignoreElements: (el) =>
          el?.classList?.contains("realMagnifier") || el?.getAttribute?.("data-ignore-shot") === "true",
      });

      shotRef.current = shot;
      setReady(true);
      draw(pos.x, pos.y);
    } catch (err) {
      console.error("Magnifier snapshot failed:", err);
      setReady(false);
    } finally {
      takingRef.current = false;
    }
  };

  const draw = (x, y) => {
    const shot = shotRef.current;
    const lens = lensRef.current;
    if (!shot || !lens) return;

    const ctx = lens.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const lensPx = size * dpr;
    const r = lensPx / 2;

    if (lens.width !== lensPx || lens.height !== lensPx) {
      lens.width = lensPx;
      lens.height = lensPx;
      lens.style.width = `${size}px`;
      lens.style.height = `${size}px`;
    }

    // client -> document coords
    const sx = (x + window.scrollX) * dpr;
    const sy = (y + window.scrollY) * dpr;

    const srcW = lensPx / zoom;
    const srcH = lensPx / zoom;

    const srcX = sx - srcW / 2;
    const srcY = sy - srcH / 2;

    ctx.clearRect(0, 0, lensPx, lensPx);

    // clip circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(r, r, r - 2 * dpr, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // draw zoomed region
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(shot, srcX, srcY, srcW, srcH, 0, 0, lensPx, lensPx);

    // neon tint overlay
    const grad = ctx.createRadialGradient(r * 0.65, r * 0.65, r * 0.1, r, r, r);
    grad.addColorStop(0, "rgba(0,245,255,0.10)");
    grad.addColorStop(0.55, "rgba(255,43,214,0.06)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, lensPx, lensPx);

    ctx.restore();

    // border glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(r, r, r - 2 * dpr, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,245,255,0.55)";
    ctx.lineWidth = 2 * dpr;
    ctx.shadowColor = "rgba(0,245,255,0.35)";
    ctx.shadowBlur = 18 * dpr;
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => draw(e.clientX, e.clientY));
    };

    window.addEventListener("mousemove", move, { passive: true });

    // take shot after first paint
    const t = setTimeout(() => takeShot(), 350);

    // refresh on scroll/resize
    const refresh = () => takeShot();
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, zoom]);

  return (
    <motion.div
      className={`realMagnifier ${ready ? "ready" : ""}`}
      data-ignore-shot="true"
      animate={{ x: pos.x - size / 2, y: pos.y - size / 2 }}
      transition={{ type: "spring", stiffness: 700, damping: 35 }}
    >
      <canvas ref={lensRef} />
      {!ready && <div className="realMagnifierHint">Loading…</div>}
    </motion.div>
  );
}
