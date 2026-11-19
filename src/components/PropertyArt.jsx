import { useId } from 'react'

// Original illustrated placeholder shown when a listing has no uploaded photo.
const PALETTES = [
  ['#cfe9ea', '#f7e3b8', '#0e7c86'],
  ['#fbe6c8', '#d6ecec', '#b45309'],
  ['#e5e8f6', '#fdebc9', '#3f4fa3'],
  ['#e0efd8', '#f9e4cf', '#2f7d4f'],
  ['#f6dfe2', '#dcecf0', '#a3374a'],
]

const hash = (s = '') => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

function Flat({ c }) {
  return (
    <g>
      <rect x="95" y="50" width="130" height="150" rx="6" fill="#fff" />
      <rect x="95" y="50" width="130" height="150" rx="6" fill="none" stroke={c} strokeWidth="3" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((k) => (
          <rect key={`${r}${k}`} x={110 + k * 38} y={64 + r * 33} width="24" height="20" rx="3" fill={(r + k) % 3 === 0 ? '#f59e0b' : c} opacity={(r + k) % 3 === 0 ? 0.9 : 0.35} />
        )),
      )}
      <rect x="148" y="170" width="24" height="30" rx="3" fill={c} />
    </g>
  )
}

function House({ c }) {
  return (
    <g>
      <path d="M70 120 160 52l90 68v80H70z" fill="#fff" />
      <path d="M62 124 160 46l98 78" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="92" y="136" width="42" height="64" rx="4" fill={c} opacity="0.85" />
      <rect x="160" y="132" width="52" height="38" rx="4" fill="#f59e0b" opacity="0.85" />
      <path d="M186 132v38M160 151h52" stroke="#fff" strokeWidth="3" />
      <rect x="60" y="196" width="200" height="6" rx="3" fill={c} opacity="0.25" />
    </g>
  )
}

function Office({ c }) {
  return (
    <g>
      <rect x="82" y="86" width="156" height="114" rx="6" fill="#fff" />
      <rect x="100" y="52" width="120" height="40" rx="6" fill={c} opacity="0.85" />
      <text x="160" y="78" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="Outfit, sans-serif">OFFICE</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={96 + (i % 3) * 46} y={106 + Math.floor(i / 3) * 36} width="34" height="24" rx="3" fill={c} opacity={i % 2 ? 0.28 : 0.5} />
      ))}
      <rect x="148" y="170" width="24" height="30" fill="#f59e0b" />
    </g>
  )
}

function Room({ c }) {
  return (
    <g>
      <rect x="72" y="70" width="176" height="130" rx="8" fill="#fff" />
      <rect x="86" y="84" width="46" height="36" rx="4" fill="#f59e0b" opacity="0.85" />
      <path d="M92 150h136v34H92z" fill={c} opacity="0.85" />
      <rect x="92" y="136" width="136" height="20" rx="8" fill={c} opacity="0.5" />
      <rect x="100" y="126" width="34" height="14" rx="6" fill="#fff" />
      <rect x="190" y="126" width="30" height="14" rx="6" fill="#fff" />
      <path d="M92 184v12M228 184v12" stroke={c} strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

const SCENES = { flat: Flat, 'independent-house': House, 'commercial-office': Office, 'sharing-room': Room }

export default function PropertyArt({ category, seed, className = '' }) {
  const gid = useId().replace(/:/g, '')
  const [a, b, c] = PALETTES[hash(seed || category) % PALETTES.length]
  const Scene = SCENES[category] || Flat
  return (
    <svg viewBox="0 0 320 240" className={`h-full w-full ${className}`} role="img" aria-label={`${category} illustration`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="320" height="240" fill={`url(#g${gid})`} />
      <circle cx={250} cy={52} r="22" fill="#fff" opacity="0.65" />
      <circle cx={60} cy={196} r="52" fill="#fff" opacity="0.28" />
      <Scene c={c} />
    </svg>
  )
}
