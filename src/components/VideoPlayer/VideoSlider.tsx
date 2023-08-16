import { toHoursAndMinutes } from '@/utils/functions'
import { Slider } from 'antd'
import { MouseEvent, useRef, useState } from 'react'

export interface IVideoSlider {
  duration: number
  playedSeconds: number
  loadedSeconds: number
  handleSeek: (second: number) => void
}

export function VideoSlider({
  duration,
  playedSeconds,
  loadedSeconds,
  handleSeek,
}: IVideoSlider) {
  const [tooltipOffset, setTooltipOffset] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [tooltipTime, setTooltipTime] = useState('')
  const [hovering, setHovering] = useState(false)

  const handleMouseMoveSlider = (e: MouseEvent) => {
    if (sliderRef.current) {
      const tooltipPadding = 20
      const rect = sliderRef.current.getBoundingClientRect()
      const target = e.currentTarget
      const offsetX = e.clientX - rect.left
      const divWidth = target.clientWidth
      const xPercent = offsetX / divWidth
      if (xPercent >= 0 && xPercent <= 1) {
        if (offsetX > tooltipPadding && offsetX < divWidth - tooltipPadding) {
          setTooltipOffset(offsetX)
        }
        setTooltipTime(toHoursAndMinutes(Math.floor(xPercent * duration)))
      }
      if (!hovering) {
        setHovering(true)
      }
    }
  }

  const loadedPercent = ((loadedSeconds / duration) * 100).toFixed(2)

  return (
    <div
      className="video-controller__slider-wrapper relative z-10 mx-6"
      onMouseMove={handleMouseMoveSlider}
      onMouseLeave={() => {
        setHovering(false)
      }}
      ref={sliderRef}
    >
      <div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-400"
        style={{ width: `${loadedPercent}%` }}
      ></div>
      <Slider
        className="video-controller__slider m-0"
        max={Math.floor(duration)}
        value={playedSeconds}
        onChange={handleSeek}
        tooltip={{ open: false }}
      />
      {hovering && (
        <div
          className="timer-tooltip absolute -top-6 -translate-x-1/2"
          style={{
            left: tooltipOffset,
          }}
        >
          {tooltipTime}
        </div>
      )}
    </div>
  )
}
