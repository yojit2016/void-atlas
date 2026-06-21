import React, { useState, useEffect } from 'react'

export default function AtlasClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-40 border border-cyan-500/20 bg-black/20 px-4 py-2 backdrop-blur-md">
      <div className="text-xs uppercase tracking-[0.3em] font-mono flex items-center gap-3">
        <span className="text-cyan-400/60">Observatory Time</span>
        <span className="text-white font-medium">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
      </div>
    </div>
  )
}
