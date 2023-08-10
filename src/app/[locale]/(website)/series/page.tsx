"use client"

import { AppSpin } from "@/common/AppSpin"
import { BtnWatchTrailer } from "@/common/BtnWatch"
import { useStore } from "@/store/store"
import { getImageUrl } from "@/utils/functions"
import { Button } from "antd"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { api } from "@/api"

export default function SeriesPage() {
  const t = useTranslations('HomePage')
  const { setSelectedID } = useStore()
  const router = useRouter()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)

  const [dataTrendingMovie, setDataTrendingMovie] = useState([])

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await api.getTrendingMovie(locale)
      setDataTrendingMovie(response.results)
      setLoading(false)
    }
    getData()
  }, [locale])

  const handleClickInfor = (id: number, type: string) => {
    router.push(`/detail-infor/${id}?` + new URLSearchParams({media: type}))
  }

  if (loading) return <AppSpin />

  return (
    <div className="mx-6 mt-16 mb-6 sm:mx-0 sm:mb-8 sm:mt-0">
      <Swiper
        className="slide-desktop"
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
        {dataTrendingMovie.slice(0, 10).map((item: any) => (
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
              className={`homepage__text-banner absolute left-[5%] ${
                item?.overview?.length > 100 ? 'top-[40%]' : 'top-[45%]'
              } ${
                item?.title?.length < 15
                  ? 'text-3xl sm:text-4xl md:text-5xl'
                  : 'text-xl lg:text-3xl'
              } max-w-md uppercase md:max-w-xl lg:max-w-3xl`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview mb-8 mt-5 text-base capitalize md:text-lg lg:text-xl">
                {item.overview}
              </h1>

              <div className="flex">
                <BtnWatchTrailer id={item?.id} media_type={item?.media_type} />
                <Button
                  className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 ml-4 flex h-12 items-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
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
                    handleClickInfor(item?.id, item?.media_type)
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
        spaceBetween={80}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {dataTrendingMovie.slice(0, 10).map((item: any) => (
          <SwiperSlide key={item.id}>
            <div
              className={`swiper relative aspect-[556/835] w-full bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url('${getImageUrl(item.poster_path)}')`,
                borderRadius: '5px',
              }}
            ></div>

            <div className="absolute z-10 flex w-full justify-center">
              <div
                className={`homepage__text-banner absolute bottom-[-79vw] left-0 bp-425:bottom-[-65vw] xs:bottom-[-55vw]
              ${
                item?.title?.length > 15 || item?.name?.length > 15
                  ? 'text-sm bp-375:text-xl'
                  : 'text-xl bp-375:text-2xl'
              }
              w-full text-center uppercase`}
              >
                {item.title || item.name}

                <h1 className="homepage__text-overview mb-8 mt-4 text-xs capitalize bp-375:text-base">
                  {item.overview}
                </h1>

                <div className="flex flex-col flex-wrap sm:flex-row">
                  <BtnWatchTrailer
                    id={item?.id}
                    media_type={item?.media_type}
                  />
                  <Button
                    className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 mt-3 flex h-12 flex-1 items-center justify-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
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
                      handleClickInfor(item?.id, item?.media_type)
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
