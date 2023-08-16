import { toHoursAndMinutes } from '@/utils/functions'

export interface IVideoTimer {
  playedSeconds: number
  duration: number
}

export function VideoTimer({ playedSeconds, duration }: IVideoTimer) {
  return (
    <span className="ml-4 text-xs md:ml-0 md:text-base">
      <span className="inline-block">{`${toHoursAndMinutes(
        Math.floor(playedSeconds),
      )}`}</span>
      <span className="ml-px mr-[2px]">/</span>
      <span className="inline-block">{`${toHoursAndMinutes(
        Math.floor(duration),
      )}`}</span>
    </span>
  )
}
