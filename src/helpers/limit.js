export function limit(val, min, max) {
  if (val > max) return max
  if (val < min) return min
  return val
}

export function limitRange(center, range, min, max) {
  const halfRange = range / 2
  if ((center + halfRange) > max ) return max - halfRange
  if ((center - halfRange) < min ) return min + halfRange
  return center
}