import { Api } from '@/api'
import { GroupIcon, InfoIcon, PlayIcon, PlusIcon } from '@/assets/icons'
import { appRouter } from '@/configs'
import { IMovieBox } from '@/interface'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ReactPlayer from 'react-player'

export default function CardTrailer(item: IMovieBox) {
  const [mouseEvent, setMouseEvent] = useState(false)

  const { data } = useQuery({
    queryKey: ['trailerCard', item.id],
    queryFn: () => Api.trailer.getTrailer(item.id, "movie"),
  })

  return (
    <div
      className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-full -translate-x-1/2 -translate-y-1/2 flex-col 
      overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]"
      onMouseEnter={() => setMouseEvent(true)}
      onMouseLeave={() => setMouseEvent(false)}
    >
      {mouseEvent ? (
        <div className="pointer-events-none relative mb-2">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${data?.key}`}
            width="100%"
            height="100%"
            playing
            muted
          />
          <div className="absolute z-10 h-full w-full"></div>
        </div>
      ) : (
        <div className="mb-2 h-[200px] w-full"></div>
      )}
      <div className="movie-card__bottom mx-4 mb-4 flex flex-col">
        <div className="button-field mt-1 flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A1D29] hover:cursor-pointer">
            <PlayIcon />
          </div>
          <div className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
            <GroupIcon />
          </div>
          <div className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
            <PlusIcon />
          </div>
          <Link
            href={`${appRouter.detailInfo.index(item.id)}?media=movie`}
            className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]"
          >
            <InfoIcon />
          </Link>
        </div>
        <div className="mt-4 flex items-center">
          <div
            className="h-6 w-6 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/icons/movie.svg')`,
            }}
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
        <p className="text-over-3 mt-3 text-xs text-mediumEmphasis">
          {item.overview}
        </p>
      </div>
    </div>
  )
}
