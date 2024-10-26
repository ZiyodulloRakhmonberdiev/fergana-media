import React, { useEffect, useState } from "react";
import "./NewsCard.css";
import LandingService from "../../services/landing/landingService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsCard = ({ data, type }) => {
  const { t, i18n } = useTranslation(); 
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const results = await LandingService.getNavbar();
        setCategoryData(results?.results || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategory();
  }, []);

  const getCategoryTitle = (categoryId) => {
    const category = categoryData?.find((item) => item.id === categoryId);
    return category ? category : "Unknown Category";
  };

  const formDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = i18n.t("months", { returnObjects: true });
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const filteredData = data?.results?.filter((newsItem) => {
    const newsDate = new Date(newsItem.created_at);
    return newsDate >= oneMonthAgo && newsDate <= today;
  });

  const randomSixNews = filteredData
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 6);

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
    <div className="news-card-wrapper">
      <h1>{type === "video" ? t("So'ngi videolar") : t("So'ngi yangiliklar")}</h1>{" "}
      <div className="new-card-wrapper">
        {randomSixNews?.map((newsItem, index) => (
          <div key={index} className="news-card">
            <img
              src={
                newsItem.image ||
                "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
              }
              alt={type === "video" ? "video" : "news"} 
            />
            <div className="news-card-content">
              <div className="news-card-tag-date">
                <span className="news-card-tag">
                  {newsItem.categories && newsItem.categories.length > 0
                    ? getTitleByLanguage(getCategoryTitle(newsItem.categories[0]))
                    : ""}
                </span>
                <p className="news-card-date">{formDate(newsItem.created_at)}</p>
              </div>
              <Link to={`/news/${newsItem.id}?type=${type}`}>
                <h3>{getTitleByLanguage(newsItem)}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
