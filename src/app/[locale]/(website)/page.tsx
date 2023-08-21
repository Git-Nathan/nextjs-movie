'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'

// Import Swiper styles
import { Api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import SlideMedia from '@/components/SlideMedia'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const locale = useLocale()

  const { isLoading, data } = useQuery({
    queryKey: ['trendingAll', locale],
    queryFn: () => Api.trending.getTrendingAll(locale),
  })

  if (isLoading) return <AppSpin />

  return (
    <div className="mx-6 mb-6 mt-16 sm:mx-0 sm:mb-8 sm:mt-0">
      <SlideMedia data={data} />

      <div className="mx-[5%] flex flex-row flex-wrap justify-between gap-2 bp-425:mt-6 md:mt-0">
        <Image
          alt=""
          width={200}
          height={100}
          className="bg-opacity-3 aspect-[1.7] max-h-14 w-full min-w-[90px] max-w-[125px] flex-1 rounded-lg border border-solid border-gray-700 bg-cover bg-center bg-no-repeat p-1 backdrop-blur-md sm:!max-h-[133px] sm:max-w-[145px] md:max-w-[236px]"
          src="/images/avt-disney.png"
        ></Image>
        <Image
          alt=""
          width={200}
          height={100}
          className="bg-opacity-3 aspect-[1.7] max-h-14 w-full min-w-[90px] max-w-[125px] flex-1 rounded-lg border border-solid border-gray-700 bg-cover bg-center bg-no-repeat p-1 backdrop-blur-md sm:!max-h-[133px] sm:max-w-[145px] md:max-w-[236px]"
          src="/images/avt-pixar.png"
        ></Image>
        <Image
          alt=""
          width={200}
          height={100}
          className="bg-opacity-3 aspect-[1.7] max-h-14 w-full min-w-[90px] max-w-[125px] flex-1 rounded-lg border border-solid border-gray-700 bg-cover bg-center bg-no-repeat p-1 backdrop-blur-md sm:!max-h-[133px] sm:max-w-[145px] md:max-w-[236px]"
          src="/images/avt-marvel.png"
        ></Image>
        <Image
          alt=""
          width={200}
          height={100}
          className="bg-opacity-3 aspect-[1.7] max-h-14 w-full min-w-[90px] max-w-[125px] flex-1 rounded-lg border border-solid border-gray-700 bg-cover bg-center bg-no-repeat p-1 backdrop-blur-md sm:!max-h-[133px] sm:max-w-[145px] md:max-w-[236px]"
          src="/images/avt-starWars.png"
        ></Image>
        <Image
          alt=""
          width={200}
          height={100}
          className="bg-opacity-3 aspect-[1.7] max-h-14 w-full min-w-[90px] max-w-[125px] flex-1 rounded-lg border border-solid border-gray-700 bg-cover bg-center bg-no-repeat p-1 backdrop-blur-md sm:!max-h-[133px] sm:max-w-[145px] md:max-w-[236px]"
          src="/images/avt-nationalGeographic.png"
        ></Image>
      </div>
    </div>
  )
}
