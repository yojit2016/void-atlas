import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NodeDetailModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const data = item.image ? item.image : item;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#040814]/90 text-white shadow-2xl shadow-cyan-900/40 flex flex-col md:flex-row z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white/80 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center justify-center text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Image Container */}
          <div className="w-full md:w-3/5 relative min-h-[280px] md:min-h-[450px] bg-black/50 overflow-hidden flex items-center justify-center p-4">
            <img
              src={data.image}
              alt={data.title}
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg border border-cyan-500/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent opacity-60 md:hidden" />
          </div>

          {/* Details & Telemetry Column */}
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-cyan-400/90 font-mono">
                  {data.sourceName || "Deep Space Target"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4">
                {data.title}
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/70 font-light mb-6">
                {data.description || "High-resolution astronomical telemetry captured by modern space observatories."}
              </p>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 font-mono text-xs">
                <div>
                  <span className="text-white/40 uppercase block mb-1">Telescope</span>
                  <span className="text-cyan-200">{data.telescope || "Hubble / JWST"}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Object Class</span>
                  <span className="text-cyan-200">{data.objectType || "Nebula"}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Constellation</span>
                  <span className="text-cyan-200">{data.constellation || "Deep Space"}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Captured</span>
                  <span className="text-cyan-200">{data.captureDate || "2024"}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center gap-4">
              {data.sourceUrl && (
                <a
                  href={data.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all text-xs uppercase tracking-widest text-center font-mono font-medium"
                >
                  View Archive Record ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
