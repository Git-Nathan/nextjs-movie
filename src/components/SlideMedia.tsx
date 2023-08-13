'use client'

import { Button } from 'antd'
import Image from 'next/image'
import {
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { BtnWatchTrailer } from '@/common/BtnWatch'
import { IMediaDetail } from '@/interface'
import { getImageUrl } from '@/utils/functions'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface ISlideMediaProps {
  data: IMediaDetail[]
}

export default function SlideMedia({ data }: ISlideMediaProps) {
  const t = useTranslations('Button')
  const router = useRouter()

  const handleClickInfor = (id: number, type: string) => {
    router.push(`/detail-infor/${id}?` + new URLSearchParams({ media: type }))
  }

  return (
    <>
      <Swiper
        className="slide-desktop"
        spaceBetween={20}
        effect={'fade'}
        centeredSlides={true}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
      >
        {data.slice(0, 10).map((item: any) => (
          <SwiperSlide
            key={item.id}
            className={`swiper relative aspect-[1440/980] max-h-[100vh] w-full bg-[] bg-cover bg-center bg-no-repeat`}
            style={{
              backgroundImage: `linear-gradient(202deg,rgba(26, 29, 41, 0) 0%,rgba(26, 29, 41, 0.79) 59.65%,#1a1d29 100%),
              linear-gradient(180deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%),
              url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`,
            }}
          >
            <div
              className={`homepage__text-banner absolute left-[5%] ${
                item?.overview?.length > 100 ? 'top-[40%]' : 'top-[45%]'
              } ${
                item?.title?.length < 15
                  ? 'text-3xl sm:text-4xl md:text-5xl'
                  : 'text-xl lg:text-3xl'
              } max-w-md uppercase md:max-w-xl lg:max-w-3xl`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview mb-8 mt-5 text-base capitalize md:text-lg lg:text-xl">
                {item.overview}
              </h1>

              <div className="flex">
                <BtnWatchTrailer id={item?.id} media_type={item?.media_type} />
                <Button
                  className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 ml-4 flex h-12 items-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
                  icon={
                    <Image
                      alt=""
                      width={24}
                      height={24}
                      src="/icons/icon-infor.svg"
                    />
                  }
                  onClick={() => {
                    handleClickInfor(item?.id, item?.media_type)
                  }}
                >
                  {t('infor')}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="slide-mobile"
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={80}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {data.slice(0, 10).map((item: any) => (
          <SwiperSlide key={item.id}>
            <div
              className={`swiper relative aspect-[556/835] w-full bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url('${getImageUrl(item.poster_path)}')`,
                borderRadius: '5px',
              }}
            ></div>

            <div className="absolute z-10 flex w-full justify-center">
              <div
                className={`homepage__text-banner absolute bottom-[-79vw] left-0 bp-425:bottom-[-65vw] xs:bottom-[-55vw]
              ${
                item?.title?.length > 15 || item?.name?.length > 15
                  ? 'text-sm bp-375:text-xl'
                  : 'text-xl bp-375:text-2xl'
              }
              w-full text-center uppercase`}
              >
                {item.title || item.name}

                <h1 className="homepage__text-overview mb-8 mt-4 text-xs capitalize bp-375:text-base">
                  {item.overview}
                </h1>

                <div className="flex flex-col flex-wrap sm:flex-row">
                  <BtnWatchTrailer
                    id={item?.id}
                    media_type={item?.media_type}
                  />
                  <Button
                    className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 mt-3 flex h-12 flex-1 items-center justify-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
                    icon={
                      <Image
                        alt=""
                        width={24}
                        height={24}
                        src="/icons/icon-infor.svg"
                      />
                    }
                    onClick={() => {
                      handleClickInfor(item?.id, item?.media_type)
                    }}
                  >
                    {t('infor')}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
