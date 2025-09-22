// app/api/weather/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // keep a process cache (not Edge)

// ---------- ENV & Defaults ----------
const BASE =
  process.env.OPEN_METEO_BASE ?? "https://api.open-meteo.com/v1/forecast";
const DEFAULT_LAT = 20.2893;
const DEFAULT_LON = 100.1019;

const CACHE_TTL = Number(process.env.WEATHER_CACHE_TTL ?? 600); // seconds
const STALE_TTL = Number(process.env.WEATHER_STALE_TTL ?? 300); // seconds
const RESPONSE_CACHE = `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`;

function toNum(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
const FIXED_LAT = toNum(process.env.WEATHER_LAT, DEFAULT_LAT);
const FIXED_LON = toNum(process.env.WEATHER_LON, DEFAULT_LON);

// ---------- Types ----------
type WeatherPayload = {
  latitude: number;
  longitude: number;
  timezone: string;
  temperature: number; // °C
  humidity: number; // %
  weather_code: number; // WMO
  updatedAt: number; // ms
};

type CacheEntry = {
  data: WeatherPayload;
  freshUntil: number; // unix seconds
  staleUntil: number; // unix seconds
  inflight?: Promise<void>;
};

// Single-location cache (since we use fixed lat/lon)
const CACHE_KEY = "weather";
const cache = new Map<string, CacheEntry>();

async function fetchOpenMeteo(
  lat: number,
  lon: number,
): Promise<WeatherPayload> {
  const qs = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    timezone: "Asia/Vientiane",
  });
  const url = `${BASE}?${qs.toString()}`;
  const r = await fetch(url, { next: { revalidate: CACHE_TTL } });
  if (!r.ok) throw new Error(await r.text());
  const data = await r.json();
  const cur = data.current ?? {};
  console.log(data)
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone ?? "Asia/Vientiane",
    temperature: Math.round(Number(cur.temperature_2m ?? 0)),
    humidity: Math.round(Number(cur.relative_humidity_2m ?? 0)),
    weather_code: Number(cur.weather_code ?? 1),
    updatedAt: Date.now(),
  };
}

async function ensureEntry(): Promise<CacheEntry> {
  const nowSec = Math.floor(Date.now() / 1000);
  const entry = cache.get(CACHE_KEY);

  // 1) Fresh
  if (entry && nowSec <= entry.freshUntil) return entry;

  // 2) Stale → return immediately, refresh in background
  if (entry && nowSec <= entry.staleUntil) {
    if (!entry.inflight) {
      entry.inflight = (async () => {
        try {
          const data = await fetchOpenMeteo(FIXED_LAT, FIXED_LON);
          cache.set(CACHE_KEY, {
            data,
            freshUntil: nowSec + CACHE_TTL,
            staleUntil: nowSec + CACHE_TTL + STALE_TTL,
          });
        } catch {
          // keep stale if refresh fails
        } finally {
          const e = cache.get(CACHE_KEY);
          if (e) e.inflight = undefined;
        }
      })();
    }
    return entry;
  }

  // 3) Miss or expired → fetch now (coalesce concurrent)
  let active = entry;
  if (!active) {
    active = {
      data: {
        latitude: FIXED_LAT,
        longitude: FIXED_LON,
        timezone: "Asia/Vientiane",
        temperature: 0,
        humidity: 0,
        weather_code: 1,
        updatedAt: 0,
      },
      freshUntil: 0,
      staleUntil: 0,
    };
    cache.set(CACHE_KEY, active);
  }

  if (!active.inflight) {
    active.inflight = (async () => {
      const data = await fetchOpenMeteo(FIXED_LAT, FIXED_LON);
      cache.set(CACHE_KEY, {
        data,
        freshUntil: nowSec + CACHE_TTL,
        staleUntil: nowSec + CACHE_TTL + STALE_TTL,
      });
    })();
  }

  await active.inflight;
  return cache.get(CACHE_KEY)!;
}

export async function GET() {
  try {
    const entry = await ensureEntry();
    const nowSec = Math.floor(Date.now() / 1000);
    const freshness =
      nowSec <= entry.freshUntil
        ? "fresh"
        : nowSec <= entry.staleUntil
          ? "stale"
          : "revalidating";

    return NextResponse.json(entry.data, {
      headers: {
        "Cache-Control": RESPONSE_CACHE,
        "X-Weather-Cache": freshness,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "weather error" },
      { status: 500 },
    );
  }
}
