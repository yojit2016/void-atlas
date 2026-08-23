export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      style={{ pointerEvents: "auto" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: "#00d4ff",
            boxShadow: "0 0 8px #00d4ff, 0 0 16px #00d4ff44",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: "13px",
            letterSpacing: "0.35em",
            fontWeight: 300,
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
          }}
        >
          Void Atlas
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-10">
        {["Deepfield", "Nebulae", "Signals"].map((label) => (
          <button
            key={label}
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.25em",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s ease, text-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "rgba(0,212,255,0.9)";
              e.target.style.textShadow = "0 0 12px rgba(0,212,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "rgba(255,255,255,0.45)";
              e.target.style.textShadow = "none";
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
