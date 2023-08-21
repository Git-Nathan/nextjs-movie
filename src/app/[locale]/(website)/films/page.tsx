'use client'

import { Api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import MoviePopover from '@/components/MoviePopover'
import PosterPopover from '@/components/PosterPopover'
import SlideMedia from '@/components/SlideMedia'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

export default function FilmsPage() {
  const t = useTranslations('Films')

  const locale = useLocale()

  const { isLoading, data } = useQuery({
    queryKey: ['trending', locale],
    queryFn: () => Api.trending.getTrendingMovie(locale),
  })

  const { data: dataUpcoming } = useQuery({
    queryKey: ['upComing', locale],
    queryFn: () => Api.upComing.getUpComing(locale),
  })

  if (isLoading) return <AppSpin />

  return (
    <div className="overflow-hidden">
      <div className="mx-6 mb-6 mt-16 sm:mx-0 sm:mb-8 sm:mt-0">
        <SlideMedia data={data} />

        <div className="mx-[5%] mb-20 text-xl font-bold text-white">
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
