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

        <div className="mx-[5%] mb-20 text-xl font-bold text-white bp-425:mt-5 xs:mt-0">
          {t('upcoming')}
          <MoviePopover data={dataUpcoming} />
        </div>

        <div className="mx-[5%] mb-20 text-xl font-bold text-white">
          {t('upcoming')}
          <PosterPopover data={dataUpcoming} />
        </div>
      </div>
    </div>
  )
}
