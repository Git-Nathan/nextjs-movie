'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Import Swiper styles
import { api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import SlideMedia from '@/components/SlideMedia'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Home() {
  const t = useTranslations('HomePage')
  const { setSelectedID } = useStore()
  const router = useRouter()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)

  const [dataTrendingAll, setDataTrendingAll] = useState([])

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await api.getTrendingAll(locale)
      setDataTrendingAll(response.results)
      setLoading(false)
    }
    getData()
  }, [locale])

  const handleClickInfor = (id: number, type: string) => {
    router.push(`/detail-infor/${id}?` + new URLSearchParams({ media: type }))
  }

  if (loading) return <AppSpin />

  return (
    <div className="mx-6 mb-6 mt-16 sm:mx-0 sm:mb-8 sm:mt-0">
      <SlideMedia data={dataTrendingAll} />

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
