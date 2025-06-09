export function getFanCardStyle(idx: number, total: number) {
  const maxAngle = 10;
  const angleStep = total > 1 ? (maxAngle * 2) / (total - 1) : 0;
  const rotation = total === 1 ? 0 : -maxAngle + idx * angleStep;
  const arcHeight = 6; // Increased arcHeight for a bigger curve
  const center = (total - 1) / 2;
  const yOffset = -Math.pow(idx - center, 2) + arcHeight; // Amplified curve effect

  return {
    rotate: rotation,
    y: yOffset,
    marginLeft: idx === 0 ? 0 : '-1.2rem',
  };
}

export function getComputerFanCardStyle(index: number, total: number, isFlipped = false) {
  const maxAngle = 30; // total spread (e.g. -15° to +15°)
  const angleStep = total > 1 ? maxAngle / (total - 1) : 0;
  const startAngle = -maxAngle / 2;

  const rotation = startAngle + index * angleStep;

  const yOffset = Math.abs(rotation) * -0.5;

  return {
    rotate: isFlipped ? -rotation : rotation,
    y: yOffset,
    zIndex: 100 + index,
  };
}
