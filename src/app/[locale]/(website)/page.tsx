'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import Image from "next/image"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useStore } from '@/store/store'
import BtnWatchTrailer from '@/common/BtnWatch'
import { AppSpin } from '@/common/AppSpin'
import { useEffect, useState } from 'react'
import { api } from '@/api'
import { getImageUrl } from '@/utils/functions'

export default function Home() {
  const t = useTranslations('HomePage')
  const { setSelectedID } = useStore()
  const router = useRouter()
  const lang = 'en-US'

  const [loading, setLoading] = useState(true)

  const [dataTrendingAll, setDataTrendingAll] = useState([])

  useEffect(() => {
  setLoading(true)
  const getData = async () => {
    const response = await api.getTrendingAll()
    setDataTrendingAll(response.results) 
    setLoading(false)         
  }
  getData()
}, [])

  const handleClickInfor = (id: number) => {
    router.push(`/detail-infor/${id}`)
  }

  if (loading) return <AppSpin />

  return (
    <div className='my-6 mx-6 sm:mt-0 sm:mb-8 sm:mx-0'>
      <Swiper
      className='slide-desktop'
        spaceBetween={20}
        effect={'fade'}
        centeredSlides={true}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
      >
        {dataTrendingAll.slice(0, 10).map((item: any) => (
          <SwiperSlide
            key={item.id}
            className={`swiper relative aspect-[1440/980] w-full bg-center bg-cover bg-no-repeat bg-[]`}
            style={{
              backgroundImage: `linear-gradient(202deg,rgba(26, 29, 41, 0) 0%,rgba(26, 29, 41, 0.79) 59.65%,#1a1d29 100%),
              linear-gradient(180deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%),
              url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`,
            }}
          >
            <div
              className={`homepage__text-banner absolute left-[5%] ${
                item?.overview?.length > 100 ? 'top-[40%]' : 'top-[45%]'
              } ${
                item?.title?.length < 15 ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-xl lg:text-3xl'
              } uppercase max-w-md md:max-w-xl lg:max-w-3xl`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview text-base md:text-lg lg:text-xl mt-5 mb-8 capitalize">
                {item.overview}
              </h1>

              <div className="flex">
               <BtnWatchTrailer id={item?.id} media_type={item?.media_type} />
                <Button
                  className="home__btn-infor ml-4 text-base bg-[rgba(0, 0, 0, 0.1)] hover:bg-neutral-400 hover:color-neutral700 text-neutral100 font-bold h-12 px-6 flex items-center"
                  icon={<Image alt="" width={24} height={24} src="/icons/icon-infor.svg" />}
                  onClick={() => {
                    setSelectedID(item?.id, item?.media_type)
                    handleClickInfor(item?.id)
                  }}
                >
                  {t('infor')}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className='slide-mobile'
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={80}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {dataTrendingAll.slice(0, 10).map((item: any) => (
          <SwiperSlide
            key={item.id}
          >
            <div className={`swiper relative aspect-[556/835] w-full bg-center bg-cover bg-no-repeat`}
            style={{
              backgroundImage: `url('${getImageUrl(item.poster_path)}')`,borderRadius: "5px"
            }}>
            </div>

           <div className='flex justify-center w-full absolute z-10'>
           <div
              className={`homepage__text-banner absolute left-0 bottom-[-79vw] bp-425:bottom-[-65vw] xs:bottom-[-55vw]
              ${item?.title?.length > 15 || item?.name?.length > 15 ? "text-sm bp-375:text-xl" : "text-xl bp-375:text-2xl"}
              w-full uppercase text-center`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview text-xs bp-375:text-base mt-4 mb-8 capitalize">
                {item.overview}
              </h1>

              <div className="flex flex-wrap flex-col sm:flex-row">
               <BtnWatchTrailer id={item?.id} media_type={item?.media_type} />
                <Button
                  className="home__btn-infor justify-center mt-3 flex-1 text-base bg-[rgba(0, 0, 0, 0.1)] hover:bg-neutral-400 hover:color-neutral700 text-neutral100 font-bold h-12 px-6 flex items-center"
                  icon={<Image alt="" width={24} height={24} src="/icons/icon-infor.svg" />}
                  onClick={() => {
                    setSelectedID(item?.id, item?.media_type)
                    handleClickInfor(item?.id)
                  }}
                >
                  {t('infor')}
                </Button>
              </div>
            </div>
           </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex flex-wrap gap-2 flex-row bp-425:mt-6 md:mt-0 justify-between mx-[5%]'>
        <Image alt='' width={200} height={100}
        className='rounded-lg w-full aspect-[1.7] flex-1 max-w-[125px] sm:max-w-[145px] md:max-w-[236px] min-w-[90px] max-h-14 sm:!max-h-[133px] border border-solid border-gray-700 bg-opacity-3 backdrop-blur-md p-1 bg-cover bg-center bg-no-repeat' 
              src="/images/avt-disney.png"></Image>
       <Image alt='' width={200} height={100}
        className='rounded-lg w-full aspect-[1.7] flex-1 max-w-[125px] sm:max-w-[145px] md:max-w-[236px] min-w-[90px] max-h-14 sm:!max-h-[133px] border border-solid border-gray-700 bg-opacity-3 backdrop-blur-md p-1 bg-cover bg-center bg-no-repeat'  
        src="/images/avt-pixar.png"></Image>
               <Image alt='' width={200} height={100}
        className='rounded-lg w-full aspect-[1.7] flex-1 max-w-[125px] sm:max-w-[145px] md:max-w-[236px] min-w-[90px] max-h-14 sm:!max-h-[133px] border border-solid border-gray-700 bg-opacity-3 backdrop-blur-md p-1 bg-cover bg-center bg-no-repeat' 
         src="/images/avt-marvel.png"></Image>
               <Image alt='' width={200} height={100}
        className='rounded-lg w-full aspect-[1.7] flex-1 max-w-[125px] sm:max-w-[145px] md:max-w-[236px] min-w-[90px] max-h-14 sm:!max-h-[133px] border border-solid border-gray-700 bg-opacity-3 backdrop-blur-md p-1 bg-cover bg-center bg-no-repeat'  
        src="/images/avt-starWars.png"></Image>
               <Image alt='' width={200} height={100}
        className='rounded-lg w-full aspect-[1.7] flex-1 max-w-[125px] sm:max-w-[145px] md:max-w-[236px] min-w-[90px] max-h-14 sm:!max-h-[133px] border border-solid border-gray-700 bg-opacity-3 backdrop-blur-md p-1 bg-cover bg-center bg-no-repeat'  
        src="/images/avt-nationalGeographic.png"></Image>
      </div>
    </div>
  )
}