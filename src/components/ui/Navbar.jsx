import React from 'react';

export default function Navbar({ scrollController }) {
  const handleNav = (section) => {
    if (scrollController?.scrollToSection) {
      scrollController.scrollToSection(section.toLowerCase());
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: '24px 40px',
        pointerEvents: 'auto',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff66',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '0.4em',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.88)',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Void Atlas
        </span>
      </div>

      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {[
          { label: 'Deepfield', section: 'deepfield' },
          { label: 'Nebulae', section: 'nebulae' },
          { label: 'Signals', section: 'signals' },
        ].map(({ label, section }) => (
          <button
            key={section}
            onClick={() => handleNav(section)}
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '4px 0',
              transition: 'color 0.3s, text-shadow 0.3s',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(0,212,255,0.9)';
              e.currentTarget.style.textShadow = '0 0 14px rgba(0,212,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
