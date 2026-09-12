// Small shared types, kept in sync by hand with the backend's lib/geo.ts and
// lib/transit.ts. The frontend never does any geo/transit math itself — all
// of that lives in the backend project — so it only needs the shapes.

export type LatLng = { lat: number; lng: number };

export type TransportMode = "walk" | "transit" | "drive";
