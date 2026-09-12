export function formatClock(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function minutesUntil(targetDate: Date | string | number): number {
  const diffMs = new Date(targetDate).getTime() - Date.now();
  return Math.floor(diffMs / (1000 * 60));
}

export function urgencyFor(minutes: number): "low" | "medium" | "high" {
  if (minutes <= 5) return "high";
  if (minutes <= 15) return "medium";
  return "low";
}