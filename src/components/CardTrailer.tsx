import { api } from '@/api'
import { GroupIcon, InfoIcon, PlayIcon, PlusIcon } from '@/assets/icons'
import { appRouter } from '@/configs'
import { workSans } from '@/fonts'
import { IMovieBox } from '@/interface'
import { Tooltip } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ReactPlayer from 'react-player'

export default function CardTrailer(item: IMovieBox) {
  const t = useTranslations('Tooltip')

  const [keyVideos, setkeyVideos] = useState<any>([])
  const [mouseEvent, seMouseEvent] = useState(false)

  const keyTrailer = keyVideos?.find(
    (item: any) =>
      item.type === 'Teaser' ||
      item.type === 'Trailer' ||
      item.type === 'Opening Credits',
  )

  const handleMouseOver = async () => {
    seMouseEvent(true)
    try {
      const response = await api.getVideoTrailer(item.id, 'movie')
      setkeyVideos(response.results)
    } catch (error) {}
  }

  return (
    <div
      className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-[120%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]"
      onMouseEnter={handleMouseOver}
      onMouseLeave={() => seMouseEvent(false)}
    >
      {mouseEvent && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${keyTrailer?.key}`}
          width="100%"
          height="100%"
          playing
          muted
        />
      )}
      <div className="movie-card__bottom mx-4 my-4 flex flex-col">
        <div className="button-field mt-1 flex items-center">
          <Tooltip
            placement="top"
            title={
              <p
                className={
                  'text-sm font-semibold text-neutral600 ' + workSans.className
                }
              >
                {t('Play')}
              </p>
            }
            arrow={true}
            color="white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1D29] hover:cursor-pointer">
              <PlayIcon />
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <p
                className={
                  'text-sm font-semibold text-neutral600 ' + workSans.className
                }
              >
                {t('Group view')}
              </p>
            }
            arrow={true}
            color="white"
          >
            <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
              <GroupIcon />
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <p
                className={
                  'text-sm font-semibold text-neutral600 ' + workSans.className
                }
              >
                {t('Add to my list')}
              </p>
            }
            arrow={true}
            color="white"
          >
            <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
              <PlusIcon />
            </div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={
              <p
                className={
                  'text-sm font-semibold text-neutral600 ' + workSans.className
                }
              >
                {t('Infomation')}
              </p>
            }
            arrow={true}
            color="white"
          >
            <Link
              href={`${appRouter.detailInfo.index(item.id)}?media=movie`}
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]"
            >
              <InfoIcon />
            </Link>
          </Tooltip>
        </div>
        <div className="mt-4 flex items-center">
          <div
            className="h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/icons/movie.svg')` }}
          ></div>
          <Image
            className="ml-[5px]"
            src={'/images/ad.png'}
            width={46}
            height={24}
            alt="ad"
          />
          <Image
            className="ml-2"
            src={'/images/cc.png'}
            width={34}
            height={24}
            alt="cc"
          />
          <p className="ml-2 text-highEmphasis">
            {item.release_date?.slice(0, 4)}
          </p>
        </div>
        <p className="text-over-5 mt-3 text-xs text-mediumEmphasis">
          {item.overview}
        </p>
      </div>
    </div>
  )
}
