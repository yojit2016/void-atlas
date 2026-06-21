import React from 'react'

export default function SectorIndicator({ sector = "ORION-9" }) {
  return (
    <div className="fixed bottom-8 left-8 z-40 border border-cyan-500/20 bg-black/20 px-4 py-2 backdrop-blur-md">
      <div className="text-xs uppercase tracking-[0.3em] flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-cyan-400/60">Sector</span>
        <span className="text-white font-medium">{sector}</span>
      </div>
    </div>
  )
}
