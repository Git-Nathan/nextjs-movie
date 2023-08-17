import { Slider } from 'antd'
import {
  WheelEvent as ReactWheelEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { VideoSlider } from './VideoSlider'
import { VideoTimer } from './VideoTimer'

export interface IVideoController {
  className?: string
}

export function VideoPlayer({ className }: IVideoController) {
  // Shared Variables
  const timerDoubleClick = useRef<NodeJS.Timeout>()
  const videoPlayerRef = useRef<ReactPlayer>(null)

  // Video Player
  const [playing, setPlaying] = useState(true)

  const handlePlayPause = () => {
    if (playing) {
      if (hideCursor) {
        setHideCursor(false)
      }
      clearTimeout(timerCursorIdle.current)
      setPlaying(false)
    } else {
      timerCursorIdle.current = setTimeout(() => {
        setHideCursor(true)
      }, 3500)
      setPlaying(true)
    }
  }

  const handleClickCenter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.detail === 1) {
      timerDoubleClick.current = setTimeout(() => {
        handlePlayPause()
      }, 200)
    } else if (e.detail === 2) {
      handleFullscreen()
    }
  }

  // Hide controller
  const [hideCursor, setHideCursor] = useState(false)

  const timerCursorIdle = useRef<NodeJS.Timeout>()

  const handleMouseMove = () => {
    if (hideCursor) {
      setHideCursor(false)
    }
    clearTimeout(timerCursorIdle.current)
    if (playing) {
      timerCursorIdle.current = setTimeout(() => {
        setHideCursor(true)
      }, 3500)
    }
  }

  // Seek
  const rewindHandler = () => {
    if (videoPlayerRef.current != null) {
      const newSecond = videoPlayerRef.current.getCurrentTime() - 10
      setPlayedSeconds(newSecond)
      videoPlayerRef.current.seekTo(newSecond)
    }
  }

  const fastFowardHandler = () => {
    if (videoPlayerRef.current != null) {
      const newSecond = videoPlayerRef.current.getCurrentTime() + 10
      setPlayedSeconds(newSecond)
      videoPlayerRef.current.seekTo(newSecond)
    }
  }

  // Fullscreen
  const handle = useFullScreenHandle()

  const handleFullscreen = () => {
    clearTimeout(timerDoubleClick.current)
    if (handle.active === false) {
      handle.enter()
    } else {
      handle.exit()
    }
  }

  // Volume
  const [volume, setVolume] = useState(1)
  const [stashVolume, setStashVolume] = useState(1)

  const handleDisableScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()
  }, [])

  const handleChangeVolume = (volume: number) => {
    setVolume(volume / 20)
  }

  const handleClickVolume = () => {
    if (volume > 0) {
      setStashVolume(volume)
      setVolume(0)
    } else {
      setVolume(stashVolume)
    }
  }

  const handleOnWheel = (e: ReactWheelEvent) => {
    if (e.deltaY > 0) {
      const newVolumeValue = volume - 0.1
      if (newVolumeValue >= 0) {
        setVolume(newVolumeValue)
      } else {
        setVolume(0)
      }
    } else {
      const newVolumeValue = volume + 0.1
      if (newVolumeValue <= 1) {
        setVolume(newVolumeValue)
      } else {
        setVolume(1)
      }
    }
  }

  const disablePageScroll = () => {
    window.addEventListener('wheel', handleDisableScroll, {
      passive: false,
    })
  }

  const enablePageScroll = () => {
    window.removeEventListener('wheel', handleDisableScroll)
  }

  // Video Slider
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [loadedSeconds, setLoadedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)

  const progressHandler = (state: OnProgressProps) => {
    setPlayedSeconds(state.playedSeconds)
    setLoadedSeconds(state.loadedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleSeek = (second: number) => {
    if (videoPlayerRef.current != null) {
      setPlayedSeconds(second)
      videoPlayerRef.current.seekTo(second, 'seconds')
    }
  }

  const handleOnSeek = (second: number) => {
    setPlayedSeconds(second)
  }

  return (
    <FullScreen handle={handle}>
      <div
        className={
          'video-player relative aspect-[1920/1080] max-h-[80vh] w-full bg-black ' +
          className
        }
        style={handle.active ? { height: '100%', maxHeight: '100%' } : {}}
      >
        <ReactPlayer
          className="absolute left-0 top-0"
          url="https://firebasestorage.googleapis.com/v0/b/youpixels.appspot.com/o/videos%2F1669797638373%C4%90en%20-%20Ai%20mu%E1%BB%91n%20nghe%20kh%C3%B4ng%20(dongvui%20harmony).mp4?alt=media&token=2180ad56-257e-47ec-a11e-6e4d82485d06"
          width="100%"
          height="100%"
          playing={playing}
          ref={videoPlayerRef}
          onProgress={progressHandler}
          onDuration={handleDuration}
          onSeek={handleOnSeek}
          volume={volume}
        />
        <div
          className="absolute left-0 top-0 h-full w-full cursor-none"
          onMouseMove={handleMouseMove}
          onClick={handleClickCenter}
        ></div>
        <div
          className="video-controller absolute left-0 top-0 flex h-full w-full flex-col items-center"
          onMouseMove={handleMouseMove}
          style={
            hideCursor
              ? { opacity: 0, visibility: 'hidden', cursor: 'none' }
              : {}
          }
        >
          <div className="video-controller__top mt-2 flex w-full items-center px-2 md:mt-8 md:px-6">
            <button
              className="h-6 w-6 bg-cover bg-center bg-no-repeat md:h-12 md:w-12"
              type="button"
              style={{ backgroundImage: `url('/icons/arrow-back.svg')` }}
            ></button>
            <div className="ml-2 flex flex-col md:ml-6">
              <div className="title text-base font-bold md:text-[28px]">
                Loki
              </div>
              <div className="text-sm text-[rgba(255,255,255,0.80)] md:text-lg">
                T1:E1 Un glorioso propósito
              </div>
            </div>
          </div>
          <div
            className="video-controller__center pointer-events-none w-full flex-grow md:pointer-events-auto"
            onClick={handleClickCenter}
          ></div>
          <div className="video-controller__bottom relative flex w-full flex-col">
            <div className="absolute bottom-0 left-0 z-0 h-[159px] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,_#000_100%)]"></div>
            <VideoSlider
              duration={duration}
              handleSeek={handleSeek}
              loadedSeconds={loadedSeconds}
              playedSeconds={playedSeconds}
            />
            <div className="z-10 flex h-12 w-full items-center justify-between px-6 md:h-[85px]">
              <div className="video-controller__bottom__left flex items-center">
                <button
                  className="h-[26px] w-[26px] bg-cover bg-center bg-no-repeat md:h-[37px] md:w-[37px]"
                  type="button"
                  style={{ backgroundImage: `url('/icons/replay-10.svg')` }}
                  onClick={rewindHandler}
                />
                <button
                  className="ml-4 h-[26px] w-[26px] bg-cover bg-center bg-no-repeat duration-300 md:ml-8 md:h-[37px] md:w-[37px]"
                  type="button"
                  style={
                    playing
                      ? { backgroundImage: `url('/icons/pause.svg')` }
                      : { backgroundImage: `url('/icons/video-play.svg')` }
                  }
                  onClick={handlePlayPause}
                />
                <button
                  className="ml-4 h-[26px] w-[26px] bg-cover bg-center bg-no-repeat md:ml-8 md:h-[37px] md:w-[37px]"
                  type="button"
                  style={{ backgroundImage: `url('/icons/forward-10.svg')` }}
                  onClick={fastFowardHandler}
                />
                <div className="volume-block ml-8 hidden overflow-hidden md:block">
                  <div className="flex w-[169px] items-center">
                    <button
                      className="h-[37px] w-[37px] bg-cover bg-center bg-no-repeat"
                      type="button"
                      style={{ backgroundImage: `url('/icons/volume.svg')` }}
                      onClick={handleClickVolume}
                    />
                    <div
                      onWheel={handleOnWheel}
                      onMouseEnter={disablePageScroll}
                      onMouseLeave={enablePageScroll}
                    >
                      <Slider
                        className="volume-slider ml-4 w-[100px]"
                        max={20}
                        tooltip={{ open: false }}
                        value={volume * 20}
                        onChange={handleChangeVolume}
                      />
                    </div>
                  </div>
                </div>
                <VideoTimer playedSeconds={playedSeconds} duration={duration} />
              </div>
              <div className="video-controller__bottom__right flex items-center">
                <button
                  className="ml-8  h-[26px] w-[26px] bg-cover bg-center bg-no-repeat md:h-[37px] md:w-[37px]"
                  type="button"
                  style={{ backgroundImage: `url('/icons/fullscreen.svg')` }}
                  onClick={handleFullscreen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  )
}
