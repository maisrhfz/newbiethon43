export type DepartureCalc = {
  eventTime: string; // ISO
  totalTravelMinutes: number;
  bufferMinutes: number;
  departureDeadline: string; // ISO
};

/**
 * Given the time an event starts, how long the trip takes, and a personal
 * safety buffer, compute the latest moment it's safe to walk out the door.
 */
export function computeDepartureDeadline(
  eventTime: Date,
  totalTravelMinutes: number,
  bufferMinutes: number
): Date {
  const totalMs = (totalTravelMinutes + bufferMinutes) * 60 * 1000;
  return new Date(eventTime.getTime() - totalMs);
}

export function minutesUntil(target: Date, from: Date = new Date()): number {
  return Math.round((target.getTime() - from.getTime()) / 60000);
}

/** Urgency bucket used to color the departure banner. */
export type Urgency = "plenty" | "soon" | "leave-now" | "late";

export function urgencyFor(minutesLeft: number): Urgency {
  if (minutesLeft <= 0) return "late";
  if (minutesLeft <= 5) return "leave-now";
  if (minutesLeft <= 20) return "soon";
  return "plenty";
}

export function formatClock(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatCountdown(minutes: number): string {
  const sign = minutes < 0 ? "-" : "";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h > 0) return `${sign}${h}h ${m}m`;
  return `${sign}${m}m`;
}
