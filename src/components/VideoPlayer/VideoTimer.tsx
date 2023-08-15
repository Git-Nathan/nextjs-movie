import { toHoursAndMinutes } from '@/utils/functions'

export interface IVideoTimer {
  playedSeconds: number
  duration: number
}

export function VideoTimer({ playedSeconds, duration }: IVideoTimer) {
  return (
    <span className="text-base">
      <span className="inline-block min-w-[45px]">{`${toHoursAndMinutes(
        Math.floor(playedSeconds),
      )}`}</span>
      <span className="ml-px mr-[2px]">/</span>
      <span className="inline-block min-w-[45px]">{`${toHoursAndMinutes(
        Math.floor(duration),
      )}`}</span>
    </span>
  )
}
