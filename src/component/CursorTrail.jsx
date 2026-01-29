import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [down, setDown] = useState(false);
  const [clicks, setClicks] = useState([]);
  const idRef = useRef(1);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const md = () => setDown(true);
    const mu = () => setDown(false);

    const click = (e) => {
      const id = idRef.current++;
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      // remove burst after animation
      setTimeout(() => setClicks((prev) => prev.filter((c) => c.id !== id)), 520);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <>
      {/* Neon ring */}
      <motion.div
        className={`cursorRing ${down ? "down" : ""}`}
        animate={{ x: pos.x - 18, y: pos.y - 18 }}
        transition={{ type: "spring", stiffness: 520, damping: 28 }}
      />

      {/* Center dot */}
      <motion.div
        className="cursorCore"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 900, damping: 35 }}
      />

      {/* Orbiting mini dot */}
      <motion.div
        className="cursorOrb"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <div className="orbDot" />
      </motion.div>

      {/* Click burst */}
      {clicks.map((c) => (
        <motion.div
          key={c.id}
          className="cursorBurst"
          initial={{ opacity: 0.9, scale: 0.3 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ left: c.x, top: c.y }}
        />
      ))}
    </>
  );
}
