import { Clip } from "./clips";

export function calculateAverageScore(clips: Clip[]): number {
  return clips.length > 0
    ? clips.reduce((s, c) => s + c.viralityScore, 0) / clips.length
    : 0;
}

export function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function countPlatforms(clips: Clip[]): Record<string, number> {
  return clips.reduce((acc, c) => {
    c.platforms.forEach((p) => {
      acc[p] = (acc[p] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
}

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("");
}
