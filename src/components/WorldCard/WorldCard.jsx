import React, { useEffect, useRef, useState } from "react";
import "./WorldCard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import SkeletonContent from "../SkeletonContent/SkeletonContent";
import { useTranslation } from "react-i18next";

const WorldCard = ({ data, category }) => {
  const { t, i18n } = useTranslation();
  const [descriptions, setDescriptions] = useState({});

  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const isHeadlineLong = (headline) => {
    const wordCount = (headline?.split(" ") || []).length;
    return wordCount > 12;
  };

  const shortenDescription = (id, description, maxLines) => {
    const lines = description.split("\n").length;
    if (lines > maxLines) {
      return description.split("\n").slice(0, maxLines).join(" ") + "...";
    }
    return description;
  };

  const formDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = i18n.t("months", { returnObjects: true });
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  const getTitleByLanguage = (item) => {
    switch (i18n.language) {
      case "en":
        return item?.title_en_us || item?.title;
      case "uz-cyrl":
        return item?.title_uz_Cyrl || item?.title;
      case "ru":
        return item?.title_ru || item?.title;
      default:
        return item?.title;
    }
  };
  useEffect(() => {
    if (Array.isArray(data?.results) && data.results.length) {
      const newDescriptions = data.results.reduce((acc, item) => {
        const descriptionByLanguage = getTitleByLanguage(item);
        if (descriptionByLanguage) {
          acc[item.id] = shortenDescription(item.id, descriptionByLanguage, 4);
        }
        return acc;
      }, {});
      setDescriptions(newDescriptions);
    }
  }, [data, i18n.language]);

  return (
    <div className="world-card-wrapper">
      <div className="world-card-name">
        <h1>{t(getTitleByLanguage(category))}</h1>
        <div className="swiper-btns">
          <div ref={prevRef} className="custom-prev">
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
          <div ref={nextRef} className="custom-next">
            <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      </div>

      {Array.isArray(data?.results) && data.results.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            730: { slidesPerView: 2, spaceBetween: 15 },
            1078: { slidesPerView: 3, spaceBetween: 20 },
            1425: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {data?.results.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="world-card">
                <Link to={`/news/${item.id}?type=world`}>
                  <div className="world-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                </Link>
                <div className="world-card-content">
                  <p className="world-card-date">{formDate(item.created_at)}</p>
                  <Link to={`/news/${item.id}?type=world`}>
                    <h2 className="world-card-title">
                      {getTitleByLanguage(item)}
                    </h2>
                    {!isHeadlineLong(item.headline) && (
                      <p className="world-card-description">
                        {" "}
                        {descriptions[item.id]}
                      </p>
                    )}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

export default WorldCard;
