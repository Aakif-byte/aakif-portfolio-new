import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MagnifierCursor() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="magnifier"
      animate={{ x: pos.x - 70, y: pos.y - 70 }}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
    >
      {/* lens highlight */}
      <div className="lensShine" />

      {/* zoom effect layer */}
      <div className="lensZoom" />
    </motion.div>
  );
}
