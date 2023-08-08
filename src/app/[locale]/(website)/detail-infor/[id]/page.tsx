'use client'

import { api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import { workSans } from '@/fonts'
import { IMovieDetail } from '@/interface'
import { getImageUrl } from '@/utils/functions'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function DetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('Detail')

  // Movie
  const [detail, setDetail] = useState<IMovieDetail>({} as IMovieDetail)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await api.getById(params.id)
      console.log(response)
      setDetail(response)
      setLoading(false)
    }
    getData()
  }, [params.id])

  const renderGenders = detail.genres?.map((item) => item.name).join(', ')

  if (loading) return <AppSpin />

  return (
    <div className="detail-page relative flex w-full justify-center">
      <div
        className="absolute inset-x-0 top-0 z-0 aspect-[1440/980] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(202deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%), linear-gradient(180deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%), url('${getImageUrl(
            detail.backdrop_path,
          )}') `,
        }}
      ></div>
      <div className="z-10 flex min-h-[980px] w-[89%] flex-col">
        <div className="info-field mt-20 flex flex-col justify-center md:mt-[208px] md:w-full">
          <div className="max-w-[741px] text-2xl md:text-4xl">
            {detail.title}
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
          <p className="mt-4 text-xs text-highEmphasis">{renderGenders}</p>
          <div className="button-field mt-10 flex flex-col sm:flex-row">
            <Button
              className={
                'flex h-12 items-center justify-center bg-white px-6 text-base font-bold uppercase hover:bg-neutral-300 sm:justify-start ' +
                workSans.className
              }
              icon={
                <Image
                  width={24}
                  height={24}
                  alt="icon-play"
                  src="/icons/icon-play.svg"
                />
              }
            >
              {t('WATCH NOW')}
            </Button>
            <Button
              className={
                'bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 mt-5 flex h-12 items-center justify-center px-6 text-base font-bold uppercase text-neutral100 hover:bg-neutral-400 sm:ml-5 sm:mt-0 sm:justify-start ' +
                workSans.className
              }
            >
              {t('trailer')}
            </Button>
            <div className="mt-5 flex items-center sm:ml-5 sm:mt-0">
              <Button
                className="flex h-12 !w-12 items-center justify-center rounded-full"
                icon={
                  <Image
                    width={24}
                    height={24}
                    alt="icon-add"
                    src="/icons/add.svg"
                  />
                }
              />
              <Button
                className="ml-5 flex h-12 !w-12 items-center justify-center rounded-full"
                icon={
                  <Image
                    width={24}
                    height={24}
                    alt="icon-group"
                    src="/icons/group.svg"
                  />
                }
              />
            </div>
          </div>
          <p className="text-over-6 mt-6 max-w-[741px] text-xl text-mediumEmphasis">
            {detail.overview}
          </p>
        </div>
        <div className="mt-10 md:mt-[108px]">{t('Similar')}</div>
        <div></div>
      </div>
    </div>
  )
}
