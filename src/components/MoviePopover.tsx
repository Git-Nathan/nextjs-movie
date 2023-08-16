import { IMovieBox } from '@/interface'
import { getImageUrl } from '@/utils/functions'
import { Popover } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CardTrailer from './CardTrailer'

export interface IMoviePopoverProps {
  data: IMovieBox[]
}

export default function MoviePopover({ data }: IMoviePopoverProps) {
  const t = useTranslations('Tooltip')

  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="swiperExtra mt-3"
    >
      {data.slice(0, 7).map((item) => (
        <SwiperSlide className="relative hover:z-50" key={item.id}>
          <div className="movie-box relative flex aspect-[240/136] w-full flex-col hover:z-10">
            <Popover
              mouseEnterDelay={0.4}
              content={
                <div
                  className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-[92vw] max-w-[329px] -translate-x-1/2 -translate-y-24 
                flex-col overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]"
                >
                  <CardTrailer {...item} />
                </div>
              }
              placement="top"
              arrow={false}
            >
              <Image
                src={getImageUrl(item.backdrop_path)}
                alt={item.title || 'Untitled'}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 20vw"
                priority
                className="left-0 top-0 z-0 h-full w-full rounded-lg object-cover"
              />
            </Popover>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
