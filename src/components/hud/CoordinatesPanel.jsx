export default function CoordinatesPanel() {
    return (
        <div className="fixed right-8 top-28 z-40 border border-cyan-500/20 bg-black/20 p-4 backdrop-blur-md">
            <div className="space-y-2 text-xs uppercase tracking-[0.3em]">
                <div>
                    <span className="text-cyan-400/60">
                        Sector
                    </span>
                    <p className="text-white">
                        ORION-9
                    </p>
                </div>

                <div>
                    <span className="text-cyan-400/60">
                        Lat 
                    </span>
                    <p className="text-white">
                        +42.119
                    </p>
                </div>
                <div>
                    <span className="text-cyan-400/60">
                        Lon
                    </span>
                    <p className="text-white">
                        -18.203
                    </p>
                </div>
            </div>
        </div>
    )
}