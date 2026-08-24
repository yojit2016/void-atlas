import React, { useState, useEffect } from 'react';

// =========================================================
// Component 1 — Navbar
// =========================================================
export function Navbar({ onDeepfield, onNebulae, onSignals }) {
  const [hoveredNav, setHoveredNav] = useState(null);

  const navItems = [
    { label: 'DEEPFIELD', action: onDeepfield },
    { label: 'NEBULAE', action: onNebulae },
    { label: 'SIGNALS', action: onSignals },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 44px',
        pointerEvents: 'auto',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: '0 0 8px #00d4ff, 0 0 20px rgba(0,212,255,0.4)',
          }}
        />
        <span
          style={{
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.42em',
            color: 'rgba(255,255,255,0.85)',
            textTransform: 'uppercase',
          }}
        >
          VOID ATLAS
        </span>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '36px' }}>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            onMouseEnter={() => setHoveredNav(item.label)}
            onMouseLeave={() => setHoveredNav(null)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: hoveredNav === item.label ? '#00d4ff' : 'rgba(255,255,255,0.35)',
              textShadow: hoveredNav === item.label ? '0 0 14px rgba(0,212,255,0.65)' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.25s ease, text-shadow 0.25s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// =========================================================
// Component 2 — HeroOverlay
// =========================================================
export function HeroOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none',
        background: 'transparent',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: '72px',
          fontWeight: 200,
          letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.9)',
          margin: 0,
          textTransform: 'uppercase',
        }}
      >
        VOID ATLAS
      </h1>

      <span
        style={{
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.58em',
          color: '#00d4ff',
          textTransform: 'uppercase',
          marginTop: '16px',
        }}
      >
        COSMIC OBSERVATORY
      </span>

      <div
        style={{
          width: '56px',
          height: '1px',
          background: 'rgba(0,212,255,0.18)',
          margin: '24px auto',
        }}
      />

      <p
        style={{
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.95,
          color: 'rgba(255,255,255,0.42)',
          maxWidth: '380px',
          textAlign: 'center',
          margin: 0,
        }}
      >
        An interactive deep-field observatory powered by NASA's public image archive. Explore curated astronomical imagery — nebulae, galaxies, and cosmic structures — captured by Hubble and James Webb.
      </p>

      <span
        style={{
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
          marginTop: '20px',
        }}
      >
        NASA PUBLIC DOMAIN IMAGERY
      </span>

      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.36em',
          color: 'rgba(255,255,255,0.28)',
          textTransform: 'uppercase',
          marginTop: '30px',
          animation: 'voidPulse 2.6s ease-in-out infinite',
        }}
      >
        SCROLL TO EXPLORE ↓
      </span>
    </div>
  );
}

// =========================================================
// Component 3 — NodeDetailModal
// =========================================================
export function NodeDetailModal({ open, onClose, node }) {
  const [btnHover, setBtnHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  const imageSrc = typeof node?.image === 'string' ? node.image : node?.image?.image || '';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: '260px',
        background: 'rgba(2,2,12,0.96)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderTop: '1px solid rgba(0,212,255,0.1)',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'row',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        onMouseEnter={() => setCloseHover(true)}
        onMouseLeave={() => setCloseHover(false)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: closeHover ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
          fontSize: '19px',
          cursor: 'pointer',
          padding: '4px',
          lineHeight: 1,
          transition: 'color 0.2s ease',
          zIndex: 10,
        }}
      >
        ✕
      </button>

      {/* LEFT IMAGE */}
      <div
        style={{
          width: '36%',
          height: '100%',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={node?.title || 'Cosmic Node'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#0a0a1a' }} />
        )}
      </div>

      {/* RIGHT DETAILS */}
      <div
        style={{
          flex: 1,
          padding: '28px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* TOP CONTENT */}
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 200,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {node?.title || 'Cosmic Target'}
          </h2>

          <span
            style={{
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.32em',
              color: '#00d4ff',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '9px',
            }}
          >
            {node?.telescope || 'NASA Observatory'}
          </span>

          <p
            style={{
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: 1.78,
              color: 'rgba(255,255,255,0.48)',
              marginTop: '13px',
              marginRight: '20px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {node?.description || 'Astronomical observation target from NASA public domain imagery catalog.'}
          </p>
        </div>

        {/* BOTTOM CONTENT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => {
              if (node?.sourceUrl) {
                window.open(node.sourceUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.26em',
              color: '#00d4ff',
              textTransform: 'uppercase',
              background: btnHover ? 'rgba(0,212,255,0.07)' : 'transparent',
              border: '1px solid',
              borderColor: btnHover ? '#00d4ff' : 'rgba(0,212,255,0.45)',
              padding: '8px 22px',
              cursor: 'pointer',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            VIEW SOURCE →
          </button>

          <span
            style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.14em',
            }}
          >
            via {node?.sourceName || 'NASA Image Archive'}
          </span>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// Component 4 — BottomCredit
// =========================================================
export function BottomCredit() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '22px',
        left: '30px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        pointerEvents: 'none',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#00d4ff',
          opacity: 0.35,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
          }}
        >
          Powered by NASA Open APIs
        </span>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.12)',
          }}
        >
          Public domain astronomical imagery
        </span>
      </div>
    </div>
  );
}

// =========================================================
// Default Export — VoidAtlasUI
// =========================================================
export default function VoidAtlasUI({
  onDeepfield,
  onNebulae,
  onSignals,
  modalOpen,
  onModalClose,
  activeNode,
}) {
  useEffect(() => {
    if (!document.getElementById('void-atlas-fonts')) {
      const link = document.createElement('link');
      link.id = 'void-atlas-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@200;300;400&display=swap';
      document.head.appendChild(link);
    }

    if (!document.getElementById('void-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'void-pulse-style';
      style.textContent = `
        @keyframes voidPulse {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.65; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      <Navbar onDeepfield={onDeepfield} onNebulae={onNebulae} onSignals={onSignals} />
      <HeroOverlay />
      <NodeDetailModal open={modalOpen} onClose={onModalClose} node={activeNode} />
      <BottomCredit />
    </>
  );
}
