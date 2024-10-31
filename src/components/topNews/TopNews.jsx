import React from "react";
import { Link } from "react-router-dom";
import "./topNews.css";
import useFetch from "./../../hooks/useFetch";
import LandingService from "../../services/landing/landing";
import SkeletonContent from "./../SkeletonContent/SkeletonContent";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function TopNews() {
  const { data, loading, error } = useFetch(LandingService.getTopNews);
  // const { data: news } = useFetch(LandingService.getNews);
  const { t, i18n } = useTranslation();

  if (loading)
    return <div style={{ marginTop: "150px" }}>{<SkeletonContent />}</div>;
  if (error) return <div>{error.message}</div>;

  const topNews = data?.results; // 4 ta yangilik
  const bottomNews = data?.results?.slice(1, 3);
  const sideNews = data?.results?.slice(4, 6);

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

  return (
    <div className="top-news-wrap">
      <div className="container">
        <h1 className="title">{t("Top yangiliklar")}</h1>
        <div className="news-layout">
          <div className="main-news-wrapper">
            <div className="top-news">
              <section className="main-news">
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="mySwiper"
                  autoplay= {{
                    delay: 4000, 
                    disableOnInteraction: false, // Continue autoplay after interaction
                }}
                >
                  {topNews?.map((news, index) => (
                    <SwiperSlide key={index}>
                      <Link className="top-news-card" to={`/news/${news.id}?type=world`}>
                        <div className="img-wrapper">
                          <img
                            src={news.image || "default_image_path.jpg"}
                            alt={news.title}
                          />
                          <div className="overlay">
                            <div className="category">
                              {/* <span>{formDate(news.created_at)}</span> */}
                            </div>
                            <Link
                              to={`/news/${news.id}?type=world`}
                              className="title"
                            >
                              {getTitleByLanguage(news)}
                            </Link>
                          </div>
                        </div>
                      </Link>
                      <div className="news-info"></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            </div>
            <div className="bottom-news">
              {bottomNews?.map((news, index) => (
                <div className="news-card" key={index}>
                  <div className="img-wrapper">
                    <img
                      src={news.image || "default_image_path.jpg"}
                      alt={news.title}
                    />
                  </div>
                  <div className="news-info">
                    <div className="category">
                      <span>{formDate(news.created_at)}</span>
                    </div>
                    <Link to={`/news/${news.id}?type=world`}>
                      {getTitleByLanguage(news)}
                    </Link>
                    <p className="description">{getTitleByLanguage(news)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-news">
            {sideNews?.map((news, index) => (
              <div className="side-news-card" key={index}>
                <div className="img-wrapper">
                  <img
                    src={news.image || "default_image_path.jpg"}
                    alt={news.title}
                  />
                </div>
                <div className="news-info">
                  <div className="category">
                    <span>{formDate(news.created_at)}</span>
                  </div>
                  <Link to={`/news/${news.id}?type=world`}>
                    {getTitleByLanguage(news)}
                  </Link>
                  <p className="description">{getTitleByLanguage(news)}...</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default TopNews;
