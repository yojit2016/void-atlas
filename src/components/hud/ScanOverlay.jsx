export default function ScanOverlay() {
    return (
        <div 
            className="
            pointer-events-none
            fixed
            inset-0
            z-30
            opacity-20
            "
            style={{
                backgroundImage:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                backgroundSize: "100% 8px",
            }}
            />
        )
    }