'use client'

import { Button, Modal } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { API_PATHS } from '@/configs/api'
import { fetchApi } from '@/configs/fetchApi'
import { useStore } from '@/store/store'
import { APIHost } from '@/utils/contants'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Home() {
  const t = useTranslations('HomePage')
  const { setSelectedID } = useStore()
  const router = useRouter()
  const lang = 'en-US'

  const [dataTrendingAll, setDataTrendingAll] = React.useState([])

  const fetchData = React.useCallback(
    async (url: string, setData: React.Dispatch<any>) => {
      try {
        const res = await fetchApi(url, 'get')
        setData(res.results)
      } catch (error) {
        console.log('Error!', error)
      }
    },
    [lang],
  )

  React.useEffect(() => {
    fetchData(`${API_PATHS.trendingAll}?language=${lang}`, setDataTrendingAll)
  }, [fetchData])

  const handleClickInfor = (name: string) => {
    let newName = name.split(' ').join('').toLowerCase()
    router.push(`/detail-infor/${newName}`)
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleClickWatch = () => {
    // setVideoKey([]);
    setIsModalOpen(true)
  }

  const [videoKey, setVideoKey] = React.useState<any>([])
  const [selectedItem, setSelectedItem] = React.useState<any>()

  const key = videoKey.find(
    (item: any) => item.type === 'Teaser' || item.type === 'Trailer',
  )

  React.useEffect(() => {
    if (selectedItem) {
      fetchData(
        `${APIHost}${selectedItem?.media_type}/${selectedItem?.id}/videos`,
        setVideoKey,
      )
    }
  }, [fetchData, selectedItem])

  // console.log(key);
  return (
    <>
      <Swiper
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
        {dataTrendingAll.map((item: any) => (
          <SwiperSlide
            key={item.id}
            className={`swiper relative aspect-[1440/980] w-full bg-[] bg-cover bg-center bg-no-repeat`}
            style={{
              backgroundImage: `linear-gradient(202deg,rgba(26, 29, 41, 0) 0%,rgba(26, 29, 41, 0.79) 59.65%,#1a1d29 100%),
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
                <Button
                  className="home__btn-watch mr-6 flex h-12  items-center bg-white px-6 text-base font-bold hover:bg-neutral-300"
                  icon={<img src="/icons/icon-play.svg" />}
                  onClick={() => {
                    setSelectedItem(item)
                    handleClickWatch()
                  }}
                >
                  {t('watch')}
                </Button>
                <Button
                  className="home__btn-infor bg-[rgba(0, 0, 0, 0.1)] hover:color-neutral700 flex h-12 items-center px-6 text-base font-bold text-neutral100 hover:bg-neutral-400"
                  icon={<img src="/icons/icon-infor.svg" />}
                  onClick={() => {
                    setSelectedID(item?.id, item?.media_type)
                    handleClickInfor(item?.title || item?.name)
                  }}
                >
                  {t('infor')}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        destroyOnClose
        width={920}
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <iframe
          width="920"
          height="550"
          src={`https://www.youtube.com/embed/${key?.key}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  )
}
