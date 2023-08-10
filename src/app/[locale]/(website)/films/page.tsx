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
import Item from "antd/es/list/Item"
import { MovieBoxs } from "@/components/MovieBoxs"
import { GroupIcon, InfoIcon, PlayIcon, PlusIcon } from "@/assets/icons"
import Link from "next/link"
import { appRouter } from "@/configs"

export default function FilmsPage() {
  const t = useTranslations('Films')
  const { setSelectedID } = useStore()
  const router = useRouter()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [loadingExtraFilms, setLoadingExtraFilms] = useState(true)

  const [dataTrendingTv, setDataTrendingTv] = useState([])
  const [dataUpcoming, setDataUpcoming] = useState([])

  console.log(dataUpcoming);
  

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const resTrending = await api.getTrendingTv(locale)
      setDataTrendingTv(resTrending.results)
      setLoading(false)
    }
    
    getData()
  }, [locale])

  useEffect(() => {
    setLoadingExtraFilms(true)
    const getData = async () => {
      const resPopular = await api.getUpcoming(locale)
      setDataUpcoming(resPopular.results)

      setLoadingExtraFilms(false)
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
        {dataTrendingTv.slice(0, 10).map((item: any) => (
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
        {dataTrendingTv.slice(0, 10).map((item: any) => (
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

      <div className="text-xl font-bold text-white mx-[5%]">
     {t('upcoming')}   
      <Swiper
       slidesPerView={1}
       breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
       }
       }
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="swiperExtra mt-3">
          {dataUpcoming.slice(0,10).map((item : any) => (
            <SwiperSlide key={item.id}>
             <div className="movie-box z-10 relative flex aspect-[240/136] w-full flex-col">
            <Image
              src={getImageUrl(item.backdrop_path)}
              alt={item.title || 'Untitled'}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 20vw"
              priority
              className="left-0 top-0 z-0 h-full w-full rounded-lg object-cover"
            />
            <div className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-[92vw] max-w-[329px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]">
              <div
                className="movie-card__top flex h-[179px] w-[329px] items-end justify-center bg-[cover] bg-no-repeat"
                style={{
                  backgroundImage: `url('${getImageUrl(
                    item.backdrop_path,
                  )}')`,
                }}
              >
                <div
                  className="h-[169px] w-[331px] translate-y-px bg-[cover] bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(16, 17, 22, 0.00) 0%, #1A1D29 100%)`,
                  }}
                ></div>
              </div>
              <div className="movie-card__bottom mx-4 mb-4 flex flex-col">
                <div className="button-field mt-1 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1D29] hover:cursor-pointer">
                    <PlayIcon />
                  </div>
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                    <GroupIcon />
                  </div>
                  <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                    <PlusIcon />
                  </div>
                  <Link
                    href={`${appRouter.detailInfo.index(item.id)}?media=movie`}
                    className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]"
                  >
                    <InfoIcon />
                  </Link>
                </div>
                <div className="mt-4 flex items-center">
                  <div
                    className="h-6 w-6 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/icons/movie.svg')` }}
                  ></div>
                  <Image
                    className="ml-[5px]"
                    src={'/images/ad.png'}
                    width={46}
                    height={24}
                    alt="ad"
                  />
                  <Image
                    className="ml-2"
                    src={'/images/cc.png'}
                    width={34}
                    height={24}
                    alt="cc"
                  />
                  <p className="ml-2 text-highEmphasis">
                    {item.release_date?.slice(0, 4)}
                  </p>
                </div>
                <p className="text-over-5 mt-3 text-xs text-mediumEmphasis">
                  {item.overview}
                </p>
              </div>
            </div>
          </div>
             
            </SwiperSlide>
          ))}
      </Swiper>
        </div>              
    </div>
  )
}

