export function formatName(name: string, length?: number) {
  const maxLength = length || 10;
  if (name.length > maxLength)
    return name.substring(0, maxLength - 2) + '...';
  return name;
}