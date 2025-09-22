import type { Lang } from "@/types/language";

function canonical(code: number): number {
  if ([1, 2, 3].includes(code)) return 1; // Cloudy
  if ([45, 48].includes(code)) return 45; // Fog
  if ([51, 53, 55, 56, 57].includes(code)) return 51; // Drizzle
  if ([61, 63, 65, 66, 67].includes(code)) return 61; // Rain
  if ([71, 73, 75, 77].includes(code)) return 71; // Snow
  if ([80, 81, 82].includes(code)) return 80; // Rain showers
  if ([95, 96, 97, 98, 99].includes(code)) return 95; // Thunder
  return code; // 0 clear etc.
}

const DICT: Record<
  number,
  { icon: string; lo: string; gb: string; zh: string }
> = {
  0: { icon: "☀️", lo: "ແຈ້ງ", gb: "Clear", zh: "晴" },
  1: { icon: "⛅️", lo: "ມີເມກ", gb: "Cloudy", zh: "多云" },
  45: { icon: "🌫️", lo: "ໝອກ", gb: "Fog", zh: "雾" },
  51: { icon: "🌦️", lo: "ຝົນປອຍ", gb: "Drizzle", zh: "毛毛雨" },
  61: { icon: "🌧️", lo: "ຝົນ", gb: "Rain", zh: "雨" },
  71: { icon: "🌨️", lo: "ຫິມະ", gb: "Snow", zh: "雪" },
  80: { icon: "🌦️", lo: "ຝົນປອຍ", gb: "Rain showers", zh: "阵雨" },
  95: { icon: "⛈️", lo: "ພາຍຸຟ້າຮ້ອງ", gb: "Thunderstorm", zh: "雷暴" },
};

export function describeWeather(code: number, lang: Lang) {
  const key = canonical(code);
  const entry = DICT[key] ?? DICT[1];
  const text = lang === "lo" ? entry.lo : lang === "zh" ? entry.zh : entry.gb;
  return { icon: entry.icon, text };
}

export function placeLabel(lang: Lang) {
  if (lang === "lo") return "ຕົ້ນເຜິ້ງ, ບໍ່ແກ້ວ, ລາວ";
  // Use English for gb & zh to avoid incorrect transliterations
  return "Ton Pheung, Bokeo, Laos";
}
