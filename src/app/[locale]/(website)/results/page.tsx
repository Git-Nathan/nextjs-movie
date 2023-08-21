'use client'

import { Api } from '@/api'
import { MovieBoxs } from '@/components/MovieBoxs'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export default function ResultPage() {
  // Get search_query
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search_query') as string
  const t = useTranslations('Result')
  const locale = useLocale()

  // Results
  const results = useQuery({
    queryKey: ['results', searchQuery, locale],
    queryFn: () => Api.search.getMulti(searchQuery, locale),
  })

  // Recommend
  const recommend = useQuery({
    queryKey: ['recommend', searchQuery, locale],
    queryFn: () => Api.trending.getTrendingAll(locale),
  })

  return (
    <div className="results-page mb-60 flex min-h-[928px] w-full justify-center">
      <div className="flex w-11/12 max-w-[1280px] flex-col">
        <div className="mt-16 text-lg text-[rgba(255,255,255,0.60)] md:mt-[160px] md:text-2xl">
          {t('Results with your search:')}{' '}
          <b className="text-white">“{searchQuery}”</b>
        </div>
        {/* No results found */}
        {results.data?.length === 0 && !results.isLoading && (
          <div className="mt-8 text-base text-[rgba(255,255,255,0.60)]">
            {t('No results found')}!
          </div>
        )}
        <div className="mt-4 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={results.data || []} loading={results.isLoading} />
        </div>
        <div className="mt-4 text-lg text-[rgba(255,255,255,0.60)] md:mt-12 md:text-2xl">
          <b className="text-white">{t('We recommend these similar titles')}</b>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={recommend.data} loading={recommend.isLoading} />
        </div>
      </div>
    </div>
  )
}
