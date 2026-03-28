"use client";

import { useReducedMotion } from "motion/react";
import { WORLD_MAP_PATH } from "./world-map-path";

// ─── Equirectangular projection ───────────────────────────────────────────────
const VW = 1440;
const VH = 400;
const lon2x = (lon: number) => ((lon + 180) / 360) * VW;
const lat2y = (lat: number) => ((90 - lat) / 180) * VH;

// ─── BKIA — Bokeo, Laos  lat 20.5 / lon 101.4 ───────────────────────────────
const BKIA = { x: lon2x(101.4), y: lat2y(20.5) };

// ─── Flight routes ────────────────────────────────────────────────────────────
// outPhase / inPhase: fraction of the cycle the plane should already be through
// at page-load time, so planes appear mid-flight immediately (no "launch from BOR").
// Negative begin = animation started before page render → plane is already in transit.
const ROUTES = [
  // SE Asia  (dur ≤ 9s)   outPhase 0.50  inPhase 0.65
  { id: "rKMG", to: [lon2x(102.7), lat2y(25.0)], cp: [lon2x(101),  lat2y(32)],  label: "KMG", begin: 0,    dur: 8,  outPhase: 0.50, inPhase: 0.65 },
  { id: "rHKG", to: [lon2x(114.2), lat2y(22.3)], cp: [lon2x(108),  lat2y(30)],  label: "HKG", begin: 0.8,  dur: 9,  outPhase: 0.50, inPhase: 0.65 },
  { id: "rSIN", to: [lon2x(103.8), lat2y(1.3)],  cp: [lon2x(104),  lat2y(10)],  label: "SIN", begin: 1.0,  dur: 9,  outPhase: 0.50, inPhase: 0.65 },
  { id: "rBKK", to: [lon2x(100.5), lat2y(13.7)], cp: [lon2x(101),  lat2y(17)],  label: "BKK", begin: 0.4,  dur: 7,  outPhase: 0.50, inPhase: 0.65 },
  // NE Asia / Middle East  (dur 10-15s)   outPhase 0.60  inPhase 0.70
  { id: "rPEK", to: [lon2x(116.4), lat2y(39.9)], cp: [lon2x(109),  lat2y(48)],  label: "PEK", begin: 1.4,  dur: 11, outPhase: 0.60, inPhase: 0.70 },
  { id: "rICN", to: [lon2x(127.0), lat2y(37.5)], cp: [lon2x(115),  lat2y(50)],  label: "ICN", begin: 2.4,  dur: 12, outPhase: 0.60, inPhase: 0.70 },
  { id: "rNRT", to: [lon2x(140.4), lat2y(35.7)], cp: [lon2x(122),  lat2y(52)],  label: "NRT", begin: 3.5,  dur: 13, outPhase: 0.60, inPhase: 0.70 },
  { id: "rDXB", to: [lon2x(55.4),  lat2y(25.2)], cp: [lon2x(80),   lat2y(44)],  label: "DXB", begin: 2.0,  dur: 15, outPhase: 0.60, inPhase: 0.70 },
  // Europe / Americas  (dur > 15s)   outPhase 0.70  inPhase 0.75
  { id: "rCDG", to: [lon2x(2.35),  lat2y(49.0)], cp: [lon2x(58),   lat2y(62)],  label: "CDG", begin: 4.5,  dur: 18, outPhase: 0.70, inPhase: 0.75 },
  { id: "rLHR", to: [lon2x(-0.45), lat2y(51.5)], cp: [lon2x(50),   lat2y(64)],  label: "LHR", begin: 5.5,  dur: 19, outPhase: 0.70, inPhase: 0.75 },
  { id: "rJFK", to: [lon2x(-73.8), lat2y(40.6)], cp: [lon2x(-10),  lat2y(68)],  label: "JFK", begin: 7,    dur: 24, outPhase: 0.70, inPhase: 0.75 },
  { id: "rLAX", to: [lon2x(-118.4),lat2y(33.9)], cp: [lon2x(-40),  lat2y(58)],  label: "LAX", begin: 8.5,  dur: 26, outPhase: 0.70, inPhase: 0.75 },
].map((r) => ({
  ...r,
  d:   `M ${BKIA.x.toFixed(1)} ${BKIA.y.toFixed(1)} Q ${r.cp[0].toFixed(1)} ${r.cp[1].toFixed(1)} ${r.to[0].toFixed(1)} ${r.to[1].toFixed(1)}`,
  dIn: `M ${r.to[0].toFixed(1)} ${r.to[1].toFixed(1)} Q ${r.cp[0].toFixed(1)} ${r.cp[1].toFixed(1)} ${BKIA.x.toFixed(1)} ${BKIA.y.toFixed(1)}`,
  dest: { x: r.to[0], y: r.to[1] },
  durS:        `${r.dur}s`,
  // Negative begin = animation was already running when page loaded → plane is mid-flight
  loadBeginS:  `${(r.begin - r.outPhase * r.dur).toFixed(2)}s`,
  inLoadBeginS:`${(r.begin + r.dur / 2 - r.inPhase * r.dur).toFixed(2)}s`,
}));

// ─── Graticule lines ──────────────────────────────────────────────────────────
const PARALLELS = [-60, -30, 0, 30, 60];
const MERIDIANS = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

// ─── Component ────────────────────────────────────────────────────────────────
export function AnimatedGlobe() {
  const reduced = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="h-full w-full"
        preserveAspectRatio="xMaxYMid slice"
      >
        {/* ── Graticule ────────────────────────────────────────────────── */}
        <g stroke="#00AAAC" strokeWidth="0.3" opacity="0.08" fill="none">
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
          opacity="0.07"
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
              strokeWidth="0.8"
              strokeDasharray="5 6"
              strokeDashoffset={reduced ? 0 : 400}
              opacity={reduced ? 0.2 : 0}
            >
              {!reduced && (
                <>
                  <animate
                    attributeName="stroke-dashoffset"
                    values="400;0;0"
                    dur={route.durS}
                    begin={route.loadBeginS}
                    repeatCount="indefinite"
                    keyTimes="0;0.75;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1; 0 0 1 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.14;0.12;0.12;0"
                    dur={route.durS}
                    begin={route.loadBeginS}
                    repeatCount="indefinite"
                    keyTimes="0;0.06;0.60;0.94;1"
                  />
                </>
              )}
            </path>

            {/* Destination dot */}
            <circle cx={route.dest.x} cy={route.dest.y} r="3" fill="#00AAAC" opacity={reduced ? 0.3 : 0}>
              {!reduced && (
                <>
                  <animate attributeName="opacity" values="0;0;0.35;0.25;0"
                    dur={route.durS} begin={route.loadBeginS} repeatCount="indefinite"
                    keyTimes="0;0.72;0.77;0.94;1" />
                  <animate attributeName="r" values="3;3;4.5;3.5;3;0"
                    dur={route.durS} begin={route.loadBeginS} repeatCount="indefinite"
                    keyTimes="0;0.72;0.77;0.84;0.94;1" />
                </>
              )}
            </circle>

            {/* IATA label */}
            <text x={route.dest.x + 7} y={route.dest.y + 4}
              fill="#00AAAC" fontSize="9" fontFamily="ui-monospace, monospace"
              fontWeight="600" opacity={reduced ? 0.3 : 0}>
              {route.label}
              {!reduced && (
                <animate attributeName="opacity" values="0;0;0.28;0.18;0"
                  dur={route.durS} begin={route.loadBeginS} repeatCount="indefinite"
                  keyTimes="0;0.74;0.79;0.94;1" />
              )}
            </text>

            {/* ── Outbound plane: BOR → destination ── */}
            {!reduced && (
              <g opacity="0">
                {/* Visible 3%→96%, fade at both ends to avoid position-snap flash */}
                <animate attributeName="opacity" values="0;0;0.45;0.45;0;0"
                  dur={route.durS} begin={route.loadBeginS} repeatCount="indefinite"
                  calcMode="linear" keyTimes="0;0.005;0.04;0.96;0.995;1" />
                <animateMotion
                  dur={route.durS} begin={route.loadBeginS}
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
                  fill="#00AAAC"
                />
              </g>
            )}

            {/* ── Inbound plane: destination → BOR (offset by half cycle) ── */}
            {!reduced && (
              <g opacity="0">
                {/* Same smooth fade-in/out, visible 3%→96% of the inbound cycle */}
                <animate attributeName="opacity" values="0;0;0.45;0.45;0;0"
                  dur={route.durS} begin={route.inLoadBeginS} repeatCount="indefinite"
                  calcMode="linear" keyTimes="0;0.005;0.04;0.96;0.995;1" />
                <animateMotion
                  dur={route.durS} begin={route.inLoadBeginS}
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
                  fill="#00AAAC"
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
    </div>
  );
}
