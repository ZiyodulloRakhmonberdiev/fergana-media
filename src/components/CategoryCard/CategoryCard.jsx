import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";
import { useTranslation } from "react-i18next";

const CategoryCard = ({ data, category, loading }) => {
  const { t, i18n } = useTranslation();
  const [descriptions, setDescriptions] = useState({});

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

  useEffect(() => {
    if (data?.results?.length) {
      const newDescriptions = data.results.reduce((acc, item) => {
        acc[item.id] = shortenDescription(item.id, item.content, 2);
        return acc;
      }, {});
      setDescriptions(newDescriptions);
    }
  }, [data]);

  const formDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = i18n.t("months", { returnObjects: true });
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="category-card-wrapper">
      <div className="category-card-name">
        <h1>{getTitleByLanguage(category)}</h1>
      </div>

      {Array.isArray(data?.results) && data.results.length > 0 ? (
        <div className="category-card-container">
          {data.results.map((item) => (
            <div className="category-card" key={item.id}>
              <div className="category-card-image">
                <img src={item.image} alt={getTitleByLanguage(item)} />
              </div>
              <div className="category-card-content">
                <p className="category-card-date">
                  {formDate(item.created_at)}
                </p>
                <Link to={`/news/${item.id}`}>
                  <Link
                    to={`/news/${item.id}?type=world`}
                    className="category-card-title"
                  >
                    {getTitleByLanguage(item)}
                  </Link>
                  {!isHeadlineLong(item.headline) && (
                    <p className="category-card-description">
                      {getTitleByLanguage(descriptions[item.id])}
                    </p>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>{t("Bu kategoriyada maqolalar mavjud emas.")}</div>
      )}
    </div>
  );
};

export default CategoryCard;
