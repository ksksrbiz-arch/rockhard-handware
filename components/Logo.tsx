export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-44 h-44 md:w-56 md:h-56' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16';
  return (
    <a href="/" className={`inline-block relative ${dim} select-none flex-shrink-0`} aria-label="Rockhard Handware home">
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5c5852" />
            <stop offset="50%" stopColor="#3d3a36" />
            <stop offset="100%" stopColor="#2a2724" />
          </linearGradient>
          <filter id="emboss" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
          </filter>
        </defs>
        {/* Outer chamfered shield */}
        <path
          d="M 25 30 L 175 30 L 188 50 L 188 145 L 175 165 L 100 180 L 25 165 L 12 145 L 12 50 Z"
          fill="url(#metal)"
          stroke="#1a1816"
          strokeWidth="2"
        />
        {/* Inner panel */}
        <path
          d="M 35 42 L 165 42 L 175 58 L 175 140 L 165 152 L 100 165 L 35 152 L 25 140 L 25 58 Z"
          fill="none"
          stroke="#1a1816"
          strokeWidth="1.5"
        />
        {/* Bolts */}
        {[[35,50],[165,50],[35,150],[165,150]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#1a1816" />
        ))}
        {/* Text rows */}
        <text x="100" y="72" textAnchor="middle" fill="#d8d2c5" fontFamily="Oswald, Impact, sans-serif" fontSize="20" fontWeight="700" letterSpacing="1">ROCKHARD</text>
        {/* Center RH banner */}
        <rect x="55" y="82" width="90" height="36" fill="#1a1816" stroke="#5c5852" strokeWidth="1"/>
        <text x="100" y="108" textAnchor="middle" fill="#d8d2c5" fontFamily="Oswald, Impact, sans-serif" fontSize="22" fontWeight="700" letterSpacing="3">RH</text>
        <text x="100" y="135" textAnchor="middle" fill="#d8d2c5" fontFamily="Oswald, Impact, sans-serif" fontSize="18" fontWeight="700" letterSpacing="1">HANDWARE</text>
        <text x="100" y="155" textAnchor="middle" fill="#e8651b" fontFamily="Oswald, Impact, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2">— BUILT FOR GLORY —</text>
      </svg>
    </a>
  );
}
