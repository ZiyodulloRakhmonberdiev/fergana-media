import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SkeletonContent from "../../components/SkeletonContent/SkeletonContent";
import LandingVideos from "../../services/landing/landingVideos";
import ArticleCard from "../../components/DetailedNews/ArticleCard";
import LandingService from "../../services/landing/landingService";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./News.css";

function News() {
  const [articleDetailedData, setArticleDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newsData, setNewsData] = useState([]); // State for news data
  const { id } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  useEffect(() => {
    const loadData = async () => {
      try {
        let results;
        if (type === "world") {
          results = await LandingService.getArticle(id);
          setNewsData(await LandingService.getAllArticles());
        } else if (type === "video") {
          results = await LandingVideos.getVideos();
          const videoData = results?.results?.find((video) => video.id == id);
          setArticleDetailedData(videoData);
          setNewsData(await LandingVideos.getVideos());
          return;
        }
        setArticleDetailedData(results);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, type]);

  return (
    <div className="news-wrapper">
      <div className="container">
        {loading && <SkeletonContent />}
        {!loading && articleDetailedData && (
          <ArticleCard data={articleDetailedData} type={type} />
        )}
        {!loading && newsData && <NewsCard data={newsData} type={type} />}
      </div>
    </div>
  );
}

export default News;
