import React from "react";
import "./ArticleCard.css";
import images from "../../images";
import { useTranslation } from "react-i18next";

const ArticleCard = ({ data, type }) => {
  const { i18n } = useTranslation();
  const formDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = i18n.t("months", { returnObjects: true });
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url?.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = getYouTubeVideoId(data?.url); // Extract videoId from the URL
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const isVideo = type === "video";
  const isWorld = type === "world";

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
    <div className="article-container">
      <h1 className="article-header">{getTitleByLanguage(data)}</h1>

      {isVideo && videoId ? (
        <div className="video-wrapper">
          <iframe
            src={embedUrl}
            title={getTitleByLanguage(data)}
            width="100%"
            height="400"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : isWorld ? (
        <>
          <div className="article-image-container">
            <img
              src={data?.image || images.placeholder}
              alt="news"
              className="article-image"
            />
          </div>
          <p className="article-date">
            {formDate(data?.created_at)}
          </p>
          <p className="article-title">{getTitleByLanguage(data)}</p>
          <p className="article-content">{getTitleByLanguage(data)}</p>
        </>
      ) : (
        <div>{t("Ma'lumot mavjud emas")}</div>
      )}
    </div>
  );
};

export default ArticleCard;
