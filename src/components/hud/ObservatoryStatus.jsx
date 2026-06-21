export default function ObservatoryStatus({
  count,
  source = "NASA LIVE ARCHIVE",
}) {
  return (
    <div className="fixed left-8 top-28 z-40 w-64 border border-cyan-500/20 bg-black/20 p-4 backdrop-blur-md">
      <div className="space-y-3 text-xs uppercase tracking-[0.3em]">
        <div>
          <p className="text-cyan-400/60">
            Archive Status
          </p>
          <p className="mt-1 text-cyan-300">
            Online
          </p>
        </div> 

        <div>
          <p className="text-cyan-400/60">
            Source
          </p>
          <p className="mt-1 text-white/80">
            {source}
          </p>
        </div>

        <div>
          <p className="text-cyan-400/60">
            Objects
          </p>
          <p className="mt-1 text-white">
            {count}
          </p>
        </div>

        <div>
          <p className="text-cyan-400/60">
            Signal
          </p>
          <p className="mt-1 text-green-400">
            Stable
          </p>
        </div>
      </div>
    </div>
  )
}