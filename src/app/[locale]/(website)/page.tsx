'use client'

import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { api } from '@/api'
import { AppSpin } from '@/common/AppSpin'
import BtnWatchTrailer from '@/common/BtnWatch'
import { useStore } from '@/store/store'
import { getImageUrl } from '@/utils/functions'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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

  // const handleClickInfor = (name: string) => {
  //   let newName = name.split(' ').join('').toLowerCase()
  //   router.push(`/detail-infor/${newName}`)
  // }

  const handleClickInfor = (id: number) => {
    router.push(`/detail-infor/${id}`)
  }

  if (loading) return <AppSpin />

  return (
    <div className="mx-6 my-6">
      {/* <Swiper
        spaceBetween={20}
        effect={'fade'}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
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
            className={`swiper relative aspect-[1440/980] w-full bg-[] bg-cover bg-center bg-no-repeat`}
            style={{
              backgroundImage: `linear-gradient(202deg,rgba(26, 29, 41, 0) 0%,rgba(26, 29, 41, 0.79) 59.65%,#1a1d29 100%),
              linear-gradient(180deg, rgba(26, 29, 41, 0.00) 0%, rgba(26, 29, 41, 0.79) 59.65%, #1A1D29 100%),
              url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`,
            }}
          >
            <div
              className={`homepage__text-banner absolute left-20 ${
                item?.overview?.length > 100 ? 'top-[40%]' : 'top-[45%]'
              } ${
                item?.title?.length < 12 ? 'text-8xl' : 'text-5xl'
              } max-w-3xl uppercase`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview mb-8 mt-5 text-xl">
                {item.overview}
              </h1>

              <div className="flex">
               <BtnWatchTrailer id={item?.id} media_type={item?.media_type} />
                <Button
                  className="home__btn-infor text-base bg-[rgba(0, 0, 0, 0.1)] hover:bg-neutral-400 hover:color-neutral700 text-neutral100 font-bold h-12 px-6 flex items-center"
                  icon={<Image alt="" width={24} height={24} src="/icons/icon-infor.svg" />}
                  onClick={() => {
                    setSelectedID(item?.id, item?.media_type)
                    // handleClickInfor(item?.title || item?.name)
                    handleClickInfor(item?.id)
                  }}
                >
                  {t('infor')}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <Swiper
        className="slide-mobile"
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
        pagination={true}
        spaceBetween={80}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {dataTrendingAll.slice(0, 10).map((item: any) => (
          <SwiperSlide
            key={item.id}
            // className='w-full'
          >
            <div
              className={`swiper relative aspect-[556/835] w-full bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url('${getImageUrl(item.poster_path)}')`,
                borderRadius: '5px',
              }}
            ></div>

            <div className="absolute z-10 flex w-full justify-center">
              <div
                className={`homepage__text-banner absolute bottom-[-230px] left-0 w-full text-center text-lg uppercase`}
              >
                {item.title || item.name}

                <h1 className="homepage__text-overview mb-8 mt-5 text-xs">
                  {item.overview}
                </h1>

                <div className="flex">
                  <BtnWatchTrailer
                    id={item?.id}
                    media_type={item?.media_type}
                  />
                  <Button
                    className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 flex h-12 items-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
                    icon={
                      <Image
                        alt=""
                        width={24}
                        height={24}
                        src="/icons/icon-infor.svg"
                      />
                    }
                    onClick={() => {
                      setSelectedID(item?.id, item?.media_type)
                      // handleClickInfor(item?.title || item?.name)
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
    </div>
  )
}
