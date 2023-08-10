'use client'

import { api } from '@/api'
import { GroupIcon, InfoIcon, PlayIcon, PlusIcon } from '@/assets/icons'
import { AppSpin } from '@/common/AppSpin'
import SlideMedia from '@/components/SlideMedia'
import { appRouter } from '@/configs'
import { getImageUrl } from '@/utils/functions'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function FilmsPage() {
  const t = useTranslations('Films')
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [loadingExtraFilms, setLoadingExtraFilms] = useState(true)

  const [dataTrendingTv, setDataTrendingTv] = useState([])
  const [dataUpcoming, setDataUpcoming] = useState([])

  console.log(dataUpcoming)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const resTrending = await api.getTrendingTv(locale)
      setDataTrendingTv(resTrending.results)
      setLoading(false)
    }

    getData()
  }, [locale])

  useEffect(() => {
    setLoadingExtraFilms(true)
    const getData = async () => {
      const resPopular = await api.getUpcoming(locale)
      setDataUpcoming(resPopular.results)

      setLoadingExtraFilms(false)
    }

    getData()
  }, [locale])

  if (loading) return <AppSpin />

  return (
    <div className="mx-6 mb-6 mt-16 overflow-hidden sm:mx-0 sm:mb-8 sm:mt-0">
      <SlideMedia data={dataTrendingTv} />

      <div className="mx-[5%] text-xl font-bold text-white">
        {t('upcoming')}
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 3,
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
          {dataUpcoming.slice(0, 10).map((item: any) => (
            <SwiperSlide key={item.id}>
              <div className="movie-box relative z-10 flex aspect-[240/136] w-full flex-col">
                <Image
                  src={getImageUrl(item.backdrop_path)}
                  alt={item.title || 'Untitled'}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 20vw"
                  priority
                  className="left-0 top-0 z-0 h-full w-full rounded-lg object-cover"
                />
                <div className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-[92vw] max-w-[329px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]">
                  <div
                    className="movie-card__top flex h-[179px] w-[329px] items-end justify-center bg-[cover] bg-no-repeat"
                    style={{
                      backgroundImage: `url('${getImageUrl(
                        item.backdrop_path,
                      )}')`,
                    }}
                  >
                    <div
                      className="h-[169px] w-[331px] translate-y-px bg-[cover] bg-no-repeat"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(16, 17, 22, 0.00) 0%, #1A1D29 100%)`,
                      }}
                    ></div>
                  </div>
                  <div className="movie-card__bottom mx-4 mb-4 flex flex-col">
                    <div className="button-field mt-1 flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1D29] hover:cursor-pointer">
                        <PlayIcon />
                      </div>
                      <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                        <GroupIcon />
                      </div>
                      <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                        <PlusIcon />
                      </div>
                      <Link
                        href={`${appRouter.detailInfo.index(
                          item.id,
                        )}?media=movie`}
                        className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]"
                      >
                        <InfoIcon />
                      </Link>
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
