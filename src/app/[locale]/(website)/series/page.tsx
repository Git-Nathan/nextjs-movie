'use client'

import { api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import MoviePopover from '@/components/MoviePopover'
import PosterPopover from '@/components/PosterPopover'
import SlideMedia from '@/components/SlideMedia'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function SeriesPage() {
  const t = useTranslations('Films')
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [loadingExtraFilms, setLoadingExtraFilms] = useState(true)

  const [dataTrendingMovie, setDataTrendingMovie] = useState([])
  const [dataUpcoming, setDataUpcoming] = useState([])

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const resTrending = await api.getTrendingMovie(locale)
      setDataTrendingMovie(resTrending.results)
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
    <div className="overflow-hidden">
      <div className="mx-6 mb-6 mt-16 sm:mx-0 sm:mb-8 sm:mt-0">
        <SlideMedia data={dataTrendingMovie} />

        <div className="mx-[5%] mb-20 text-xl font-bold text-white">
          {t('upcoming')}
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
            {dataUpcoming.slice(0, 7).map((item: any) => (
              <SwiperSlide key={item.id}>
                <MoviePopover {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mx-[5%] mb-20 text-xl font-bold text-white">
          {t('upcoming')}
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
            {dataUpcoming.slice(0, 7).map((item: any) => (
              <SwiperSlide key={item.id}>
                <PosterPopover {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
