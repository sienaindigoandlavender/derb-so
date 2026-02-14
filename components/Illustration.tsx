interface IllustrationProps {
  id: string;
  caption: string;
  inline?: boolean;
}

// SVG illustrations - simple, diagrammatic, instructional
const illustrations: Record<string, React.ReactNode> = {
  "drainage-paths": (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="100" height="120" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="150" y="40" width="100" height="120" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="280" y="40" width="100" height="120" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="40" y="60" width="60" height="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="none" />
      <rect x="170" y="60" width="60" height="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="none" />
      <rect x="300" y="60" width="60" height="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="none" />
      <path d="M70 160 L70 180 L200 180 L200 160" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M200 180 L330 180 L330 160" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="70" cy="160" r="4" fill="currentColor" />
      <circle cx="200" cy="160" r="4" fill="currentColor" />
      <circle cx="330" cy="160" r="4" fill="currentColor" />
      <text x="70" y="30" textAnchor="middle" fontSize="10" fill="currentColor">Property A</text>
      <text x="200" y="30" textAnchor="middle" fontSize="10" fill="currentColor">Property B</text>
      <text x="330" y="30" textAnchor="middle" fontSize="10" fill="currentColor">Property C</text>
      <text x="200" y="195" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">Shared drainage channel</text>
    </svg>
  ),

  "temperature-zones": (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 200 L50 50 L200 50 L200 200" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M200 200 L200 50 L350 50 L350 200" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M40 50 L200 20 L360 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="50" y1="120" x2="350" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
      <rect x="150" y="50" width="100" height="150" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="6 3" />
      <text x="100" y="80" fontSize="9" fill="currentColor">32°C</text>
      <text x="100" y="145" fontSize="9" fill="currentColor">26°C</text>
      <text x="100" y="190" fontSize="9" fill="currentColor">24°C</text>
      <text x="280" y="80" fontSize="9" fill="currentColor">35% RH</text>
      <text x="280" y="145" fontSize="9" fill="currentColor">45% RH</text>
      <text x="280" y="190" fontSize="9" fill="currentColor">55% RH</text>
      <path d="M200 180 L200 60" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" opacity="0.5" />
      <text x="200" y="240" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">Cool air sinks through courtyard; moisture collects at ground level</text>
    </svg>
  ),

  "water-trap": (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="175" y="20" width="50" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M175 60 L175 100 Q175 140 200 140 Q225 140 225 100 L225 60" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M177 90 L177 100 Q177 138 200 138 Q223 138 223 100 L223 90" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
      <rect x="223" y="80" width="80" height="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="200" y="15" textAnchor="middle" fontSize="10" fill="currentColor">From drain</text>
      <text x="340" y="100" fontSize="10" fill="currentColor">To sewer</text>
      <text x="200" y="155" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.6">Water seal</text>
      <text x="80" y="95" fontSize="9" fill="currentColor">Sewer gases</text>
      <path d="M120 100 L165 100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
      <text x="130" y="120" fontSize="8" fill="currentColor" opacity="0.6">blocked by water</text>
    </svg>
  ),

  "evaporation-cycle": (
    <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="140" x2="360" y2="140" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="135" x2="60" y2="145" stroke="currentColor" strokeWidth="1" />
      <line x1="140" y1="135" x2="140" y2="145" stroke="currentColor" strokeWidth="1" />
      <line x1="220" y1="135" x2="220" y2="145" stroke="currentColor" strokeWidth="1" />
      <line x1="300" y1="135" x2="300" y2="145" stroke="currentColor" strokeWidth="1" />
      <text x="60" y="160" textAnchor="middle" fontSize="9" fill="currentColor">Day 1</text>
      <text x="140" y="160" textAnchor="middle" fontSize="9" fill="currentColor">Day 3</text>
      <text x="220" y="160" textAnchor="middle" fontSize="9" fill="currentColor">Day 5</text>
      <text x="300" y="160" textAnchor="middle" fontSize="9" fill="currentColor">Day 7</text>
      <rect x="45" y="60" width="30" height="70" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="45" y="80" width="30" height="50" fill="currentColor" fillOpacity="0.2" />
      <rect x="125" y="60" width="30" height="70" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="125" y="100" width="30" height="30" fill="currentColor" fillOpacity="0.2" />
      <rect x="205" y="60" width="30" height="70" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="205" y="115" width="30" height="15" fill="currentColor" fillOpacity="0.2" />
      <rect x="285" y="60" width="30" height="70" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="60" y="50" textAnchor="middle" fontSize="8" fill="currentColor">Sealed</text>
      <text x="140" y="50" textAnchor="middle" fontSize="8" fill="currentColor">Sealed</text>
      <text x="220" y="50" textAnchor="middle" fontSize="8" fill="currentColor">Weak</text>
      <text x="300" y="50" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.6">Open</text>
      <path d="M60 75 L60 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      <path d="M140 75 L140 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      <path d="M220 75 L220 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  ),

  "cat-territory": (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="340" height="180" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="130" y1="30" x2="130" y2="210" stroke="currentColor" strokeWidth="0.5" />
      <line x1="240" y1="30" x2="240" y2="210" stroke="currentColor" strokeWidth="0.5" />
      <line x1="30" y1="100" x2="370" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="30" y1="160" x2="370" y2="160" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="80" cy="65" r="35" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.05" />
      <circle cx="185" cy="130" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.05" />
      <circle cx="305" cy="75" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.05" />
      <circle cx="305" cy="185" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.05" />
      <circle cx="80" cy="185" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="currentColor" fillOpacity="0.05" />
      <circle cx="80" cy="65" r="4" fill="currentColor" />
      <circle cx="185" cy="130" r="4" fill="currentColor" />
      <circle cx="305" cy="75" r="4" fill="currentColor" />
      <circle cx="50" cy="235" r="3" fill="currentColor" />
      <text x="60" y="238" fontSize="9" fill="currentColor">Food source</text>
      <circle cx="150" cy="235" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="3 1" fill="none" />
      <text x="165" y="238" fontSize="9" fill="currentColor">Colony territory</text>
    </svg>
  ),

  "food-chain": (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="30" y="40" fontSize="10" fill="currentColor" fontWeight="500">Food sources</text>
      <text x="30" y="100" fontSize="10" fill="currentColor" fontWeight="500">Predators</text>
      <text x="30" y="160" fontSize="10" fill="currentColor" fontWeight="500">Prey</text>
      <rect x="140" y="25" width="60" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="170" y="42" textAnchor="middle" fontSize="8" fill="currentColor">Markets</text>
      <rect x="220" y="25" width="60" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="250" y="42" textAnchor="middle" fontSize="8" fill="currentColor">Restaurants</text>
      <rect x="300" y="25" width="60" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="330" y="42" textAnchor="middle" fontSize="8" fill="currentColor">Residents</text>
      <rect x="200" y="85" width="80" height="30" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <text x="240" y="105" textAnchor="middle" fontSize="9" fill="currentColor">Cats</text>
      <rect x="160" y="145" width="50" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="185" y="162" textAnchor="middle" fontSize="8" fill="currentColor">Rats</text>
      <rect x="230" y="145" width="50" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="255" y="162" textAnchor="middle" fontSize="8" fill="currentColor">Mice</text>
      <rect x="300" y="145" width="50" height="25" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="325" y="162" textAnchor="middle" fontSize="8" fill="currentColor">Insects</text>
      <path d="M170 50 L220 85" stroke="currentColor" strokeWidth="1" />
      <path d="M250 50 L240 85" stroke="currentColor" strokeWidth="1" />
      <path d="M330 50 L260 85" stroke="currentColor" strokeWidth="1" />
      <path d="M220 115 L195 145" stroke="currentColor" strokeWidth="1" />
      <path d="M240 115 L250 145" stroke="currentColor" strokeWidth="1" />
      <path d="M260 115 L310 145" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),

  "sound-propagation": (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="40" width="80" height="140" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="270" y="40" width="80" height="140" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="130" y="40" width="140" height="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="none" />
      <circle cx="200" cy="160" r="6" fill="currentColor" />
      <circle cx="200" cy="160" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
      <circle cx="200" cy="160" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
      <circle cx="200" cy="160" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      <circle cx="200" cy="160" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M200 160 L200 50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <path d="M200 50 L200 30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text x="215" y="35" fontSize="8" fill="currentColor" opacity="0.6">Sound rises</text>
      <path d="M200 160 L130 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <path d="M130 120 L130 100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M200 160 L270 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <path d="M270 120 L270 100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="200" y="210" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">Courtyard amplifies and redirects sound vertically</text>
    </svg>
  ),

  "daily-rhythm": (
    <svg viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="140" x2="380" y2="140" stroke="currentColor" strokeWidth="1" />
      {[0, 4, 8, 12, 16, 20, 24].map((hour, i) => (
        <g key={hour}>
          <line x1={50 + i * 55} y1="135" x2={50 + i * 55} y2="145" stroke="currentColor" strokeWidth="1" />
          <text x={50 + i * 55} y="158" textAnchor="middle" fontSize="8" fill="currentColor">{hour}:00</text>
        </g>
      ))}
      <path
        d="M50 100 Q80 60 110 80 Q140 100 165 50 Q190 30 220 70 Q250 90 275 85 Q300 80 330 60 Q360 50 380 80"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="78" cy="65" r="3" fill="currentColor" />
      <text x="78" y="45" textAnchor="middle" fontSize="7" fill="currentColor">Fajr</text>
      <circle cx="165" cy="50" r="3" fill="currentColor" />
      <text x="165" y="30" textAnchor="middle" fontSize="7" fill="currentColor">Markets</text>
      <circle cx="330" cy="60" r="3" fill="currentColor" />
      <text x="330" y="40" textAnchor="middle" fontSize="7" fill="currentColor">Evening</text>
      <text x="30" y="100" fontSize="8" fill="currentColor" transform="rotate(-90 30 100)">Activity</text>
    </svg>
  ),
};

export function Illustration({ id, caption, inline = true }: IllustrationProps) {
  const svg = illustrations[id];

  if (!svg) {
    return null;
  }

  return (
    <figure className={`illustration ${inline ? 'illustration--inline' : ''}`}>
      <div className="illustration-inner">
        <div className="text-foreground" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {svg}
        </div>
        {caption && (
          <figcaption>{caption}</figcaption>
        )}
      </div>
    </figure>
  );
}
