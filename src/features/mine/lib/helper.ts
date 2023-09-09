export function mineMultiplierAtLevel(level: number, revision: number): number {
  const val = 0.3 * level * level + level + 2.0;
  if (revision < 13) return val;
  if (level == 1) return val * 0.3;
  if (level == 2) return val * 0.6;
  if (level == 3) return val * 0.8;
  return val;
}
