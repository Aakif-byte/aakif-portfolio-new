import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NeonCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const md = () => setDown(true);
    const mu = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
    };
  }, []);

  return (
    <>
      {/* ring */}
      <motion.div
        className={`neoRing ${down ? "down" : ""}`}
        animate={{ x: pos.x - 18, y: pos.y - 18 }}
        transition={{ type: "spring", stiffness: 650, damping: 35 }}
      />

      {/* dot */}
      <motion.div
        className="neoDot"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 1200, damping: 45 }}
      />

      {/* glow trail */}
      <motion.div
        className="neoGlow"
        animate={{ x: pos.x - 40, y: pos.y - 40 }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
      />
    </>
  );
}
