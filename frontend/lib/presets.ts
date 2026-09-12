import type { LatLng } from "./types";

export type LocationPreset = {
  id: string;
  label: string;
  coords: LatLng;
};

/**
 * Quick-pick locations around the Newbithon venue (Korea University,
 * College of Informatics / 정운오IT교양관) so the manual-fallback input
 * has something useful to demo with. Coordinates are approximate —
 * double check them against a map before relying on them for real
 * navigation.
 */
export const LOCATION_PRESETS: LocationPreset[] = [
  {
    id: "jeongwoono-it",
    label: "정운오IT교양관 (Newbithon venue)",
    coords: { lat: 37.5898, lng: 127.0326 },
  },
  {
    id: "anam-station",
    label: "안암역 (Anam Station, Line 6)",
    coords: { lat: 37.5863, lng: 127.0297 },
  },
  {
    id: "korea-univ-station",
    label: "고려대역 (Korea Univ. Station, Line 6)",
    coords: { lat: 37.5906, lng: 127.0257 },
  },
  {
    id: "ku-main-gate",
    label: "고려대학교 정문 (KU Main Gate)",
    coords: { lat: 37.5893, lng: 127.0338 },
  },
];
