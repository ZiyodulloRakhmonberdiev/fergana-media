import React from "react";
import { Link } from "react-router-dom";
import "./topNews.css";
import useFetch from "./../../hooks/useFetch";
import LandingService from "../../services/landing/landing";
import SkeletonContent from "./../SkeletonContent/SkeletonContent";
import { useTranslation } from "react-i18next";

function TopNews() {
  const { data, loading, error } = useFetch(LandingService.getTopNews);
  const { t, i18n } = useTranslation();

  if (loading)
    return <div style={{ marginTop: "150px" }}>{<SkeletonContent />}</div>;
  if (error) return <div>{error.message}</div>;

  const topNews = data?.results?.slice(0, 2);
  const bottomNews = data?.results?.slice(2, 5);
  const sideNews = data?.results?.slice(5, 8);

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
                {topNews?.map((news, index) => (
                  <div className="top-news-card" key={index}>
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
                      <p className="description">
                        {getTitleByLanguage(news)}
                        ...
                      </p>
                    </div>
                  </div>
                ))}
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
                    <p className="description">
                      {getTitleByLanguage(news)}
                      ...
                    </p>
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
                    {/* <p>{news.category}</p> */}
                    <span>{formDate(news.created_at)}</span>
                  </div>
                  <Link to={`/news/${news.id}?type=world`}>
                    {getTitleByLanguage(news)}
                  </Link>
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
