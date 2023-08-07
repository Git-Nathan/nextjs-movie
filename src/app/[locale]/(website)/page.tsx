"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useStore } from "@/store/store";
import { fetchApi } from "@/configs/fetchApi";
import { API_PATHS } from "@/configs/api";
import { APIHost } from "@/utils/contants";

export default function Home() {
  const t = useTranslations("HomePage");
  const { setSelectedID } = useStore();
  const router = useRouter();
  const lang = "en-US";

  const [dataTrendingAll, setDataTrendingAll] = React.useState([]);

  const fetchData = React.useCallback(
    async (url: string, setData: React.Dispatch<any>) => {
      try {
        const res = await fetchApi(url, "get");
        setData(res.results);
      } catch (error) {
        console.log("Error!", error);
      }
    },
    [lang]
  );

  React.useEffect(() => {
    fetchData(`${API_PATHS.trendingAll}?language=${lang}`, setDataTrendingAll);
  }, [fetchData]);

  const handleClickInfor = (name: string) => {
    let newName = name.split(" ").join("").toLowerCase();
    router.push(`/detail-infor/${newName}`);
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickWatch = () => {
    // setVideoKey([]);
    setIsModalOpen(true);
  };

  const [videoKey, setVideoKey] = React.useState<any>([]);
  const [selectedItem, setSelectedItem] = React.useState<any>();

  const key = videoKey.find(
    (item: any) => item.type === "Teaser" || item.type === "Trailer"
  );

  React.useEffect(() => {
    if (selectedItem) {
      fetchData(
        `${APIHost}${selectedItem?.media_type}/${selectedItem?.id}/videos`,
        setVideoKey
      );
    }
  }, [fetchData, selectedItem]);

  // console.log(key);
  return (
    <main>
      <Swiper
        spaceBetween={20}
        effect={"fade"}
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
            className={`swiper relative aspect-[1440/980] w-full bg-center bg-cover bg-no-repeat bg-[]`}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${item.backdrop_path}'), 
              linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0))`,
            }}
          >
            <div
              className={`homepage__text-banner absolute left-20 ${
                item?.overview?.length > 100 ? "top-[40%]" : "top-[45%]"
              } ${
                item?.title?.length < 12 ? "text-8xl" : "text-5xl"
              } max-w-3xl uppercase`}
            >
              {item.title || item.name}

              <h1 className="homepage__text-overview text-xl mt-5 mb-8">
                {item.overview}
              </h1>

              <div className="flex">
                <Button
                  className="home__btn-watch text-base bg-white hover:bg-neutral-300  font-bold h-12 px-6 mr-6 flex items-center"
                  icon={<img src="/icons/icon-play.svg" />}
                  onClick={() => {
                    setSelectedItem(item);
                    handleClickWatch();
                  }}
                >
                  {t("watch")}
                </Button>
                <Button
                  className="home__btn-infor text-base bg-[rgba(0, 0, 0, 0.1)] hover:bg-neutral-400 hover:color-neutral700 text-neutral100 font-bold h-12 px-6 flex items-center"
                  icon={<img src="/icons/icon-infor.svg" />}
                  onClick={() => {
                    setSelectedID(item?.id, item?.media_type);
                    handleClickInfor(item?.title || item?.name);
                  }}
                >
                  {t("infor")}
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
    </main>
  );
}
