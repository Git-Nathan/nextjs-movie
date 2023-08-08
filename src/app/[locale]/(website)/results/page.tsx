'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useResultStore } from '@/store/resultsStore'
import { MovieBoxs } from '@/components/MovieBoxs'
import { api } from '@/api'

export default function ResultPage() {
  // Get search_query
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search_query') as string
  const t = useTranslations('Result')

  // Results
  const { listResult, loading, setListResult, setLoading } = useResultStore()

  useEffect(() => {
    setLoading(true)
    const getResults = async () => {
      const response = await api.getBySearch(searchQuery)
      setListResult(response.results)
    }
    getResults()
  }, [searchQuery])

  return (
    <div className="results-page flex justify-center min-h-[928px] w-full mb-60">
      <div className="w-11/12 flex flex-col max-w-[1280px]">
        <div className="mt-16 text-lg text-[rgba(255,255,255,0.60)] md:mt-[160px] md:text-2xl">
          {t('Results with your search:')}{' '}
          <b className="text-white">“{searchQuery}”</b>
        </div>
        {/* No results found */}
        {listResult.length === 0 && !loading && (
          <div className="text-base text-[rgba(255,255,255,0.60)] mt-8">
            {t('No results found')}!
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 min-h-[604px] mt-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={listResult} loading={loading} />
        </div>
        <div className="mt-4 text-lg text-[rgba(255,255,255,0.60)] md:mt-12 md:text-2xl">
          <b className="text-white">{t('We recommend these similar titles')}</b>
        </div>
        <div className="grid grid-cols-1 gap-5 min-h-[604px] mt-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={listResult} loading={loading} />
        </div>
      </div>
    </div>
  )
}
