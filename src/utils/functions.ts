export const getImageUrl = (imagePath: string) => {
  return `https://image.tmdb.org/t/p/original${imagePath}`
}

export function padWithLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0')
}

export function toHoursAndMinutes(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${padWithLeadingZeros(minutes, 2)}:${padWithLeadingZeros(
      seconds,
      2,
    )}`
  }

  return `${padWithLeadingZeros(hours, 2)}:${padWithLeadingZeros(
    minutes,
    2,
  )}:${padWithLeadingZeros(seconds, 2)}`
}
