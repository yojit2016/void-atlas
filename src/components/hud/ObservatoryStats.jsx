import React from 'react'

export default function ObservatoryStats() {
  return (
    <div className="fixed right-8 top-28 z-40 w-64 border border-cyan-500/20 bg-black/20 p-4 backdrop-blur-md">
      <div className="space-y-3 text-xs uppercase tracking-[0.3em]">
        <div>
          <p className="text-cyan-400/60 font-semibold">
            Target Coordinates
          </p>
          <p className="mt-1 text-white font-mono">
            LAT: +42.119
          </p>
          <p className="text-white font-mono">
            LON: -18.203
          </p>
        </div>

        <div className="h-px bg-cyan-500/10 my-2" />

        <div>
          <p className="text-cyan-400/60 font-semibold">
            Telemetry
          </p>
          <div className="mt-2 space-y-1.5 font-mono text-white/80">
            <div className="flex justify-between">
              <span>Sensor Temp</span>
              <span className="text-cyan-300 font-medium">-180°C</span>
            </div>
            <div className="flex justify-between">
              <span>Power Level</span>
              <span className="text-green-400 font-medium">98.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
