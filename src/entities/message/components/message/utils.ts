export function secondsToHms(d: number) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h.toString().padStart(2, '0') : '';
  const mDisplay = m.toString().padStart(2, '0');
  const sDisplay = s.toString().padStart(2, '0');

  if (hDisplay) return `${hDisplay}:${mDisplay}:${sDisplay}`;
  return `${mDisplay}:${sDisplay}`;
}
