// Elegant placeholder — replace src with your actual screenshot path
export default function ImagePlaceholder({ label = 'Screenshot', aspect = '16/9', color = '#3B82F6', src, alt }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: aspect,
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
        background: `linear-gradient(135deg, #0F172A 0%, #1E293B 60%, rgba(${hexToRgb(color)}, 0.08) 100%)`,
      }}
    >
      {src ? (
        <img src={src} alt={alt || label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <>
          {/* Blueprint grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(${hexToRgb(color)}, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(${hexToRgb(color)}, 0.12) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
          {/* Center label */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            <div style={{
              width: '2px', height: 'clamp(24px, 3vw, 40px)',
              background: `rgba(${hexToRgb(color)}, 0.3)`,
            }} />
            <span style={{
              fontSize: '0.65rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: `rgba(${hexToRgb(color)}, 0.5)`,
              fontFamily: 'Satoshi, Inter, sans-serif',
            }}>
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
