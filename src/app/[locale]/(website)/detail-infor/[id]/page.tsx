'use client'

import { Api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import { BtnWatchTrailer } from '@/common/BtnWatch'
import { MovieBoxs } from '@/components/MovieBoxs'
import { workSans } from '@/fonts'
import { getImageUrl } from '@/utils/functions'
import { useQuery } from '@tanstack/react-query'
import { Button, Tooltip } from 'antd'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const media = searchParams.get('media') as string

  // Detail
  const detail = useQuery({
    queryKey: ['detail', params.id, locale],
    queryFn: () => Api.media.getById(params.id, locale, media),
  })

  // ListSimilar
  const similar = useQuery({
    queryKey: ['similar', params.id, locale],
    queryFn: () => Api.media.getSimilal(params.id, locale, media),
  })

  console.log(similar)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (detail.isLoading) return <AppSpin />

  return (
    <div className="detail-page relative mb-40 flex w-full justify-center overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 z-0 aspect-[1440/980] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(202deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%), linear-gradient(180deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%), url('${getImageUrl(
            detail.data.backdrop_path,
          )}') `,
        }}
      ></div>
      <div className="z-10 flex min-h-[980px] w-[89%] flex-col">
        <div className="info-field mt-20 flex flex-col justify-center md:mt-[208px] md:w-full">
          <div className="max-w-[741px] text-2xl md:text-4xl">
            {detail.data.title}
          </div>
          <div className="mt-4 flex items-center">
            <Image src={'/images/ad.png'} width={46} height={24} alt="ad" />

            <Image
              className="ml-2"
              src={'/images/cc.png'}
              width={34}
              height={24}
              alt="cc"
            />
          </div>
          <p className="mt-4 text-xs text-highEmphasis">{detail.data.genres}</p>
          <div className="button-field mt-10 flex flex-col sm:flex-row">
            <BtnWatchTrailer id={detail.data.id} media_type={media} />

            <Button
              className={
                'bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 mt-5 flex h-[34px] items-center justify-center px-6 text-base font-bold uppercase text-neutral100 hover:!border-neutral-400 hover:bg-neutral-400 sm:ml-5 sm:mt-0 sm:h-12 sm:justify-start ' +
                workSans.className
              }
            >
              {t('Detail.trailer')}
            </Button>
            <div className="mt-5 flex items-center sm:ml-5 sm:mt-0">
              <Tooltip
                placement="top"
                title={
                  <p
                    className={
                      'text-sm font-semibold text-neutral600 ' +
                      workSans.className
                    }
                  >
                    {t('Tooltip.Add to my list')}
                  </p>
                }
                arrow={true}
                color="white"
              >
                <Button
                  className="flex h-12 !w-12 items-center justify-center rounded-full hover:!border-white"
                  icon={
                    <Image
                      width={24}
                      height={24}
                      alt="icon-add"
                      src="/icons/add.svg"
                    />
                  }
                />
              </Tooltip>

              <Tooltip
                placement="top"
                title={
                  <p
                    className={
                      'text-sm font-semibold text-neutral600 ' +
                      workSans.className
                    }
                  >
                    {t('Tooltip.Group view')}
                  </p>
                }
                arrow={true}
                color="white"
              >
                <Button
                  className="ml-5 flex h-12 !w-12 items-center justify-center rounded-full hover:!border-white"
                  icon={
                    <Image
                      width={24}
                      height={24}
                      alt="icon-group"
                      src="/icons/group.svg"
                    />
                  }
                />
              </Tooltip>
            </div>
          </div>
          <p className="text-over-6 mt-6 max-w-[741px] text-xl text-mediumEmphasis">
            {detail.data.overview}
          </p>
        </div>
        <div className="mt-10 md:mt-[108px]">{t('Detail.Similar')}</div>
        <div className="mt-4 grid min-h-[604px] grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MovieBoxs
            data={similar.data?.results || []}
            loading={similar.isLoading}
          />
        </div>
      </div>
    </div>
  )
}
