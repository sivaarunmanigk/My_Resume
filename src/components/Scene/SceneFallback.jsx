/**
 * 2D CSS fallback when WebGL is unavailable.
 * Shows a stylised ECU diagram using pure CSS.
 */
export default function SceneFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--color-bg-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-label="ECU diagram illustration"
    >
      {/* Animated grid background */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F2ECE4" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ECU schematic drawing */}
      <svg
        viewBox="0 0 400 260"
        style={{
          width: 'min(400px, 90vw)',
          filter: 'drop-shadow(0 0 20px rgba(217,98,43,0.3))',
        }}
        aria-hidden="true"
      >
        {/* ECU housing */}
        <rect x="60" y="60" width="240" height="140" rx="4"
          fill="#0D0C0A" stroke="#2A2218" strokeWidth="1.5" />

        {/* PCB */}
        <rect x="75" y="75" width="210" height="110" rx="2"
          fill="#0A160A" stroke="#1A2A1A" strokeWidth="0.5" />

        {/* MCU chip */}
        <rect x="110" y="100" width="60" height="60" rx="2"
          fill="#0D0D0D" stroke="#3A3A3A" strokeWidth="0.5" />
        <text x="140" y="132" textAnchor="middle" fontSize="6"
          fill="#5A5A5A" fontFamily="monospace">S32K144</text>

        {/* CAN transceiver */}
        <rect x="200" y="110" width="40" height="22" rx="1"
          fill="#0D0D0D" stroke="#2A2A2A" strokeWidth="0.5" />
        <text x="220" y="123" textAnchor="middle" fontSize="5"
          fill="#3A3A3A" fontFamily="monospace">TJA1042</text>

        {/* PCB traces */}
        <line x1="170" y1="130" x2="200" y2="121" stroke="#B87333" strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="125" x2="280" y2="125" stroke="#D9622B" strokeWidth="1.5" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
        </line>

        {/* Connector block */}
        <rect x="290" y="95" width="18" height="70" rx="1"
          fill="#1A1614" stroke="#2A2218" strokeWidth="0.5" />
        {[0, 7, 14, 21, 28, 35, 42, 49, 56].map((y, i) => (
          <rect key={i} x="288" y={100 + y} width="22" height="4" rx="0.5"
            fill="none" stroke="#3A3A3A" strokeWidth="0.3" />
        ))}

        {/* Status LEDs */}
        <circle cx="280" cy="82" r="3" fill="#D9622B">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="292" cy="82" r="3" fill="#D9622B" opacity="0.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Label: ECU_01 */}
        <text x="75" y="72" fontSize="6" fill="#5A4A3A" fontFamily="monospace"
          letterSpacing="1">ECU_01 · NXP S32K144</text>

        {/* CAN bus line */}
        <line x1="0" y1="200" x2="400" y2="200"
          stroke="#2A1A0A" strokeWidth="2" strokeDasharray="6,3" />
        <text x="200" y="215" textAnchor="middle" fontSize="7"
          fill="#3A2A1A" fontFamily="monospace" letterSpacing="2">CAN BUS · 500 kbps</text>

        {/* CAN packet animation */}
        <circle r="4" fill="#D9622B" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite"
            path="M 70,200 L 310,200" />
        </circle>
      </svg>

      {/* Fallback label */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'var(--color-text-faint)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        WEBGL UNAVAILABLE · 2D FALLBACK ACTIVE
      </div>
    </div>
  );
}
