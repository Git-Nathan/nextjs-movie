'use client'

import { api } from '@/api'
import { MovieBoxs } from '@/components/MovieBoxs'
import { useResultStore } from '@/store/resultsStore'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

export default function ResultPage() {
  // Get search_query
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search_query') as string
  const t = useTranslations('Result')

  // Results
  const {
    listResult,
    loading,
    setListResult,
    setLoading,
    searchContent,
    setSearchContent,
  } = useResultStore()

  useLayoutEffect(() => {
    if (searchQuery !== searchContent) {
      setLoading(true)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [searchContent, searchQuery, setLoading])

  useEffect(() => {
    if (searchQuery !== searchContent) {
      const getResults = async () => {
        const response = await api.getBySearch(searchQuery)
        setListResult(response.results)
        setSearchContent(searchQuery)
      }
      getResults()
    }
  }, [searchContent, searchQuery, setListResult, setSearchContent])

  return (
    <div className="results-page mb-60 flex min-h-[928px] w-full justify-center">
      <div className="flex w-11/12 max-w-[1280px] flex-col">
        <div className="mt-16 text-lg text-[rgba(255,255,255,0.60)] md:mt-[160px] md:text-2xl">
          {t('Results with your search:')}{' '}
          <b className="text-white">“{searchQuery}”</b>
        </div>
        {/* No results found */}
        {listResult.length === 0 && !loading && (
          <div className="mt-8 text-base text-[rgba(255,255,255,0.60)]">
            {t('No results found')}!
          </div>
        )}
        <div className="mt-4 grid min-h-[604px] grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={listResult} loading={loading} />
        </div>
        <div className="mt-4 text-lg text-[rgba(255,255,255,0.60)] md:mt-12 md:text-2xl">
          <b className="text-white">{t('We recommend these similar titles')}</b>
        </div>
        <div className="mt-4 grid min-h-[604px] grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <MovieBoxs data={listResult} loading={loading} />
        </div>
      </div>
    </div>
  )
}
