import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NodeModal({ node, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const data = node.image ? node.image : node;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8 flex items-center justify-center pointer-events-auto"
      >
        <div
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl flex flex-col md:flex-row items-center gap-6 p-6"
          style={{
            background: "rgba(2, 2, 12, 0.92)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0, 212, 255, 0.2)",
            borderLeft: "1px solid rgba(0, 212, 255, 0.1)",
            borderRight: "1px solid rgba(0, 212, 255, 0.1)",
            boxShadow: "0 -10px 40px rgba(0, 212, 255, 0.15)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-lg p-2"
            aria-label="Close detail modal"
          >
            ✕
          </button>

          {/* Left Thumbnail */}
          <div className="w-full md:w-1/3 aspect-video md:aspect-square overflow-hidden rounded-xl bg-black/50 border border-white/10 flex-shrink-0">
            <img
              src={data.image || data.url}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text Content */}
          <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
            <div>
              <span
                className="text-xs uppercase tracking-widest block mb-1 font-mono"
                style={{ color: "#00d4ff" }}
              >
                {data.telescope || data.sourceName || "Deep Space Target"}
              </span>

              <h3
                className="text-xl md:text-2xl font-light text-white mb-3"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {data.title}
              </h3>

              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed mb-4">
                {data.description ||
                  "High-resolution astronomical telemetry captured by modern space observatories."}
              </p>
            </div>

            {/* Bottom Link */}
            <div className="flex justify-end pt-2">
              {data.sourceUrl && (
                <a
                  href={data.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono hover:underline"
                  style={{ color: "#00d4ff" }}
                >
                  View on {data.sourceName || "NASA"} →
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
