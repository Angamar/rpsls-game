export function getFanCardStyle(idx: number, total: number) {
  const maxAngle = 10;
  const angleStep = total > 1 ? (maxAngle * 2) / (total - 1) : 0;
  const rotation = total === 1 ? 0 : -maxAngle + idx * angleStep;
  const arcHeight = 2;
  const center = (total - 1) / 2;
  const marginBottom = -Math.pow(idx - center, 2) + arcHeight;
  return {
    rotate: `${rotation}deg`,
    marginBottom: `${marginBottom}rem`,
    marginLeft: idx === 0 ? 0 : '-1.5rem',
  };
}
