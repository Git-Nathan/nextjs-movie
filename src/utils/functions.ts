export const getImageUrl = (imagePath: string) => {
  const url = imagePath
    ? `https://image.tmdb.org/t/p/original${imagePath}`
    : '/images/no-image.png'
  return url
}

export function padWithLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, '0')
}

export function toHoursAndMinutes(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  let result: string = ''

  if (minutes === 0) {
    result = `0:${padWithLeadingZeros(seconds, 2)}`
  } else if (hours === 0) {
    result = `${padWithLeadingZeros(minutes, 2)}:${padWithLeadingZeros(
      seconds,
      2,
    )}`.replace(/^0+/, '')
  } else {
    result = `${padWithLeadingZeros(hours, 2)}:${padWithLeadingZeros(
      minutes,
      2,
    )}:${padWithLeadingZeros(seconds, 2)}`.replace(/^0+/, '')
  }

  return result
}
