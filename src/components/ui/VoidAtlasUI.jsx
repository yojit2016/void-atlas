import React, { useState, useEffect } from 'react';

// =========================================================
// Component 1 — Navbar
// =========================================================
export function Navbar() {
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
    </nav>
  );
}

// =========================================================
// Component 2 — HeroOverlay
// =========================================================
export function HeroOverlay() {
  return (
    <>
      {/* TOP TITLE LAYER */}
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
          justifyContent: 'flex-start',
          paddingTop: '8vh',
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
      </div>

      {/* BOTTOM DESCRIPTION LAYER */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '52px',
          background: 'linear-gradient(to top, rgba(2,2,12,0.85) 0%, transparent 100%)',
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.95,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: '420px',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          An interactive deep-field observatory powered by NASA's public image archive. Explore curated astronomical imagery — nebulae, galaxies, and cosmic structures — captured by Hubble and James Webb.
        </p>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            marginTop: '16px',
          }}
        >
          NASA PUBLIC DOMAIN IMAGERY
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.36em',
            color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            marginTop: '20px',
            animation: 'voidPulse 2.6s ease-in-out infinite',
          }}
        >
          SCROLL TO EXPLORE ↓
        </div>
      </div>
    </>
  );
}

// =========================================================
// Component 3 — NodeDetailModal
// =========================================================
export function NodeDetailModal({ open, onClose, node }) {
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
          {/* Object name */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '20px',
              fontWeight: 200,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}
          >
            {node?.title}
          </h2>

          {/* Telescope */}
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.32em',
              color: '#00d4ff',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '8px',
            }}
          >
            {node?.telescope || 'Hubble Space Telescope'}
          </span>

          {/* Constellation / object type row */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '10px' }}>
            {node?.constellation && (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                ◆ {node.constellation}
              </span>
            )}
            {node?.objectType && (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                ◆ {node.objectType}
              </span>
            )}
            {node?.captureDate && (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                ◆ {node.captureDate}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: 1.78,
              color: 'rgba(255,255,255,0.48)',
              marginTop: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {node?.description}
          </p>
        </div>

        {/* BOTTOM CONTENT */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '16px',
          }}
        >
          <a
            href={node?.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.28em',
              color: '#00d4ff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(0,212,255,0.45)',
              padding: '9px 24px',
              display: 'inline-block',
              transition: 'background 0.25s ease, borderColor 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
              e.currentTarget.style.borderColor = '#00d4ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)';
            }}
          >
            VIEW ON {node?.sourceName?.toUpperCase() || 'NASA'} →
          </a>

          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.14em',
            }}
          >
            {node?.sourceName || 'NASA Image Archive'}
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
      <Navbar />
      <HeroOverlay />
      <NodeDetailModal open={modalOpen} onClose={onModalClose} node={activeNode} />
      <BottomCredit />
    </>
  );
}
