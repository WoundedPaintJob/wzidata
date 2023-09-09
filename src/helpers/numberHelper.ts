export function formatNumber(numb: number): string {
  if (!numb) return '0';
  return numb.toLocaleString(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
}

export function formatPercentage(numb: number): string {
  if (!numb) return '0%';
  return (
    (numb * 100).toLocaleString(undefined, { maximumFractionDigits: 1 }) + '%'
  );
}
export function formatTime(time: number): string {
  return String(time).padStart(2, '0');
}
