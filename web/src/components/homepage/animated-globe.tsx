"use client";

import { useReducedMotion, motion } from "motion/react";
import { WORLD_MAP_PATH } from "./world-map-path";

// ─── Equirectangular projection ───────────────────────────────────────────────
const VW = 1440;
const VH = 400;
const lon2x = (lon: number) => ((lon + 180) / 360) * VW;
const lat2y = (lat: number) => ((90 - lat) / 180) * VH;

// ─── BKIA — Bokeo, Laos  lat 20.5 / lon 101.4 ───────────────────────────────
const BKIA = { x: lon2x(101.4), y: lat2y(20.5) };

// ─── Flight routes ────────────────────────────────────────────────────────────
// begin/dur are in seconds (numbers). inBegin = begin + dur/2 → inbound plane
// starts at the destination halfway through each cycle so outbound & inbound
// planes are always in the air simultaneously on different routes.
const ROUTES = [
  // SE Asia
  { id: "rKMG", to: [lon2x(102.7), lat2y(25.0)], cp: [lon2x(101),  lat2y(32)],  label: "KMG", begin: 0,    dur: 8  },
  { id: "rHKG", to: [lon2x(114.2), lat2y(22.3)], cp: [lon2x(108),  lat2y(30)],  label: "HKG", begin: 0.8,  dur: 9  },
  { id: "rSIN", to: [lon2x(103.8), lat2y(1.3)],  cp: [lon2x(104),  lat2y(10)],  label: "SIN", begin: 1.0,  dur: 9  },
  { id: "rBKK", to: [lon2x(100.5), lat2y(13.7)], cp: [lon2x(101),  lat2y(17)],  label: "BKK", begin: 0.4,  dur: 7  },
  // NE Asia
  { id: "rPEK", to: [lon2x(116.4), lat2y(39.9)], cp: [lon2x(109),  lat2y(48)],  label: "PEK", begin: 1.4,  dur: 11 },
  { id: "rICN", to: [lon2x(127.0), lat2y(37.5)], cp: [lon2x(115),  lat2y(50)],  label: "ICN", begin: 2.4,  dur: 12 },
  { id: "rNRT", to: [lon2x(140.4), lat2y(35.7)], cp: [lon2x(122),  lat2y(52)],  label: "NRT", begin: 3.5,  dur: 13 },
  // Middle East
  { id: "rDXB", to: [lon2x(55.4),  lat2y(25.2)], cp: [lon2x(80),   lat2y(44)],  label: "DXB", begin: 2.0,  dur: 15 },
  // Europe
  { id: "rCDG", to: [lon2x(2.35),  lat2y(49.0)], cp: [lon2x(58),   lat2y(62)],  label: "CDG", begin: 4.5,  dur: 18 },
  { id: "rLHR", to: [lon2x(-0.45), lat2y(51.5)], cp: [lon2x(50),   lat2y(64)],  label: "LHR", begin: 5.5,  dur: 19 },
  // Americas
  { id: "rJFK", to: [lon2x(-73.8), lat2y(40.6)], cp: [lon2x(-10),  lat2y(68)],  label: "JFK", begin: 7,    dur: 24 },
  { id: "rLAX", to: [lon2x(-118.4),lat2y(33.9)], cp: [lon2x(-40),  lat2y(58)],  label: "LAX", begin: 8.5,  dur: 26 },
].map((r) => ({
  ...r,
  d:   `M ${BKIA.x.toFixed(1)} ${BKIA.y.toFixed(1)} Q ${r.cp[0].toFixed(1)} ${r.cp[1].toFixed(1)} ${r.to[0].toFixed(1)} ${r.to[1].toFixed(1)}`,
  dIn: `M ${r.to[0].toFixed(1)} ${r.to[1].toFixed(1)} Q ${r.cp[0].toFixed(1)} ${r.cp[1].toFixed(1)} ${BKIA.x.toFixed(1)} ${BKIA.y.toFixed(1)}`,
  dest: { x: r.to[0], y: r.to[1] },
  // String versions for SVG attributes
  durS:     `${r.dur}s`,
  beginS:   `${r.begin}s`,
  inBeginS: `${r.begin + r.dur / 2}s`,   // inbound plane offset by half cycle
}));

// ─── Graticule lines ──────────────────────────────────────────────────────────
const PARALLELS = [-60, -30, 0, 30, 60];
const MERIDIANS = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

// ─── Component ────────────────────────────────────────────────────────────────
export function AnimatedGlobe() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        {/* ── Graticule ────────────────────────────────────────────────── */}
        <g stroke="#00AAAC" strokeWidth="0.4" opacity="0.12" fill="none">
          {PARALLELS.map((lat) => (
            <line key={`p${lat}`} x1={0} y1={lat2y(lat)} x2={VW} y2={lat2y(lat)} />
          ))}
          {MERIDIANS.map((lon) => (
            <line key={`m${lon}`} x1={lon2x(lon)} y1={0} x2={lon2x(lon)} y2={VH} />
          ))}
        </g>

        {/* ── Real land masses (Natural Earth 110m) ────────────────────── */}
        <path
          d={WORLD_MAP_PATH}
          fill="#00AAAC"
          stroke="#00AAAC"
          strokeWidth="0.3"
          strokeLinejoin="round"
          opacity="0.1"
        />

        {/* ── Flight routes + planes ──────────────────────────────────── */}
        {ROUTES.map((route) => (
          <g key={route.id}>
            {/* Hidden inbound path (dest → BOR) for rotate="auto" orientation fix */}
            <path id={`${route.id}-in`} d={route.dIn} fill="none" stroke="none" />

            {/* Dashed arc — stays visible while either plane is in transit */}
            <path
              id={route.id}
              d={route.d}
              fill="none"
              stroke="#00AAAC"
              strokeWidth="1.2"
              strokeDasharray="5 6"
              strokeDashoffset={reduced ? 0 : 400}
              opacity={reduced ? 0.3 : 0}
            >
              {!reduced && (
                <>
                  <animate
                    attributeName="stroke-dashoffset"
                    values="400;0;0"
                    dur={route.durS}
                    begin={route.beginS}
                    repeatCount="indefinite"
                    keyTimes="0;0.72;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1; 0 0 1 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.22;0.18;0"
                    dur={route.durS}
                    begin={route.beginS}
                    repeatCount="indefinite"
                    keyTimes="0;0.06;0.85;1"
                  />
                </>
              )}
            </path>

            {/* Destination dot */}
            <circle cx={route.dest.x} cy={route.dest.y} r="3" fill="#00AAAC" opacity={reduced ? 0.5 : 0}>
              {!reduced && (
                <>
                  <animate attributeName="opacity" values="0;0;0.5;0.35;0"
                    dur={route.durS} begin={route.beginS} repeatCount="indefinite"
                    keyTimes="0;0.70;0.75;0.90;1" />
                  <animate attributeName="r" values="3;3;5;3.5;3;0"
                    dur={route.durS} begin={route.beginS} repeatCount="indefinite"
                    keyTimes="0;0.70;0.75;0.82;0.90;1" />
                </>
              )}
            </circle>

            {/* IATA label */}
            <text x={route.dest.x + 7} y={route.dest.y + 4}
              fill="#007a7c" fontSize="9" fontFamily="ui-monospace, monospace"
              fontWeight="600" opacity={reduced ? 0.5 : 0}>
              {route.label}
              {!reduced && (
                <animate attributeName="opacity" values="0;0;0.35;0.2;0"
                  dur={route.durS} begin={route.beginS} repeatCount="indefinite"
                  keyTimes="0;0.72;0.77;0.90;1" />
              )}
            </text>

            {/* ── Outbound plane: BOR → destination ── */}
            {!reduced && (
              <g opacity="0">
                <animate attributeName="opacity" values="0;0.45;0.45;0"
                  dur={route.durS} begin={route.beginS} repeatCount="indefinite"
                  calcMode="linear" keyTimes="0;0.04;0.88;1" />
                <animateMotion
                  dur={route.durS} begin={route.beginS}
                  repeatCount="indefinite" rotate="auto"
                  calcMode="spline" keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                >
                  <mpath href={`#${route.id}`} />
                </animateMotion>
                <path
                  d="M 6 0 L 1 -1 L -5 -0.7 L -5 0.7 L 1 1 Z
                     M -0.5 -1 L -2.5 -5.5 L -3.8 -5 L -1.5 -1 Z
                     M -0.5 1  L -2.5  5.5 L -3.8  5 L -1.5  1 Z
                     M -4 -0.7 L -5.2 -2.5 L -5.8 -2.2 L -4.8 -0.7 Z
                     M -4  0.7 L -5.2  2.5 L -5.8  2.2 L -4.8  0.7 Z"
                  fill="#007a7c"
                />
              </g>
            )}

            {/* ── Inbound plane: destination → BOR (offset by half cycle) ── */}
            {!reduced && (
              <g opacity="0">
                <animate attributeName="opacity" values="0;0.95;0.95;0"
                  dur={route.durS} begin={route.inBeginS} repeatCount="indefinite"
                  calcMode="linear" keyTimes="0;0.04;0.88;1" />
                <animateMotion
                  dur={route.durS} begin={route.inBeginS}
                  repeatCount="indefinite" rotate="auto"
                  calcMode="spline" keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                >
                  <mpath href={`#${route.id}-in`} />
                </animateMotion>
                <path
                  d="M 6 0 L 1 -1 L -5 -0.7 L -5 0.7 L 1 1 Z
                     M -0.5 -1 L -2.5 -5.5 L -3.8 -5 L -1.5 -1 Z
                     M -0.5 1  L -2.5  5.5 L -3.8  5 L -1.5  1 Z
                     M -4 -0.7 L -5.2 -2.5 L -5.8 -2.2 L -4.8 -0.7 Z
                     M -4  0.7 L -5.2  2.5 L -5.8  2.2 L -4.8  0.7 Z"
                  fill="#007a7c"
                />
              </g>
            )}
          </g>
        ))}

        {/* ── BKIA beacon ─────────────────────────────────────────────── */}
        {!reduced && (
          <>
            <circle cx={BKIA.x} cy={BKIA.y} r="6" fill="none" stroke="#00AAAC" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="6;20;6" dur="3s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={BKIA.x} cy={BKIA.y} r="10" fill="none" stroke="#00AAAC" strokeWidth="1" opacity="0.25">
              <animate attributeName="r" values="10;26;10" dur="3s" begin="0.7s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" begin="0.7s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        <circle cx={BKIA.x} cy={BKIA.y} r="4.5" fill="#00AAAC" opacity="0.95" />
        <text x={BKIA.x + 9} y={BKIA.y - 7} fill="#007a7c" fontSize="10"
          fontFamily="ui-monospace, monospace" fontWeight="700" opacity="0.9" letterSpacing="0.05em">
          BOR
        </text>
      </svg>
    </motion.div>
  );
}
