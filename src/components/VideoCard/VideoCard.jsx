import React, { useEffect, useRef, useState } from "react";
import "./VideoCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import images from "../../images";
import { Link } from "react-router-dom";
import SkeletonContent from "../SkeletonContent/SkeletonContent";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const VideoCard = ({ data, category, loading }) => {
  const { t, i18n } = useTranslation();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");
  const [selectedVideoDescription, setSelectedVideoDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (swiperInstanceRef.current && prevRef.current && nextRef.current) {
      swiperInstanceRef.current.params.navigation.prevEl = prevRef.current;
      swiperInstanceRef.current.params.navigation.nextEl = nextRef.current;
      swiperInstanceRef.current.navigation.destroy();
      swiperInstanceRef.current.navigation.init();
      swiperInstanceRef.current.navigation.update();
    }
  }, [prevRef, nextRef]);

  const handleVideoClick = (url, title, intro, id) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&"'>]+)/
    );

    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      setSelectedVideoUrl(embedUrl);
      setSelectedVideoTitle(title);
      setSelectedVideoDescription(intro);
      setItemId(id);
      setIsModalOpen(true);
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl(null);
  };

  const formDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = i18n.t("months", { returnObjects: true });
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  // Function to get YouTube video thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    } else {
      return null;
    }
  };

  const truncateTitle = (title, maxLines = 4) => {
    const maxLength = 120;
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  const getTitleByLanguage = (item, field = "title") => {
    switch (i18n.language) {
      case "en":
        return item?.[`${field}_en_us`] || item?.[field];
      case "uz-cyrl":
        return item?.[`${field}_cyrl`] || item?.[field];
      case "ru":
        return item?.[`${field}_ru`] || item?.[field];
      default:
        return item?.[field];
    }
  };

  return (
    <div className="video-card-wrapper">
      <div className="video-card-name">
        <h1>{t("Videolar")}</h1>
        <div className="swiper-btns">
          <div ref={prevRef} className="custom-prev">
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
          <div ref={nextRef} className="custom-next">
            <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      </div>

      {loading && <SkeletonContent />}

      {!loading && Array.isArray(data?.results) && data.results.length > 0 && (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={false}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            730: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1078: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1425: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {data?.results.map((item) => {
            const videoThumbnail = getYouTubeThumbnail(item.url);
            const cover = item.cover || videoThumbnail;
            console.log(item);

            return (
              <SwiperSlide key={item.id}>
                <div className="video-card">
                  <div
                    className="video-card-image"
                    style={{ background: !cover ? "black" : "none" }}
                  >
                    <button
                      onClick={() =>
                        handleVideoClick(
                          item.url,
                          getTitleByLanguage(item, "title"),
                          getTitleByLanguage(item, "intro"),
                          item.id
                        )
                      }
                      style={{ border: "none", background: "none" }}
                    >
                      {cover ? (
                        <img
                          className="video-card-image-images"
                          src={cover}
                          alt={item.title}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "black",
                          }}
                        />
                      )}
                      <div class="video-card-youtube-icon">
                        <div class="play-button"></div>
                      </div>
                    </button>
                  </div>

                  <div className="video-card-content">
                    <p className="video-card-date">
                      {formDate(item.created_at)}
                    </p>
                    <Link to={`/news/${item.id}?type=video`}>
                      <h2 className="video-card-title">
                        {getTitleByLanguage(truncateTitle(item))}
                      </h2>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <Modal
        videoUrl={selectedVideoUrl}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedVideoTitle}
        description={selectedVideoDescription}
        id={itemId}
      />
    </div>
  );
};

export default VideoCard;
