import React, { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "../../components/NewsCard/NewsCard";
import ArticleCard from "../../components/DetailedNews/ArticleCard";
import LandingService from "../../services/landing/landingService";
import { useParams } from "react-router-dom";
import SkeletonContent from "../../components/SkeletonContent/SkeletonContent";
import useFetch from "../../hooks/useFetch";

function VideoComponent() {
  const [articleDetailedData, setArticleDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    const loadArticles = async () => {
      try {
        const results = await LandingService.getArticle(id);
        setArticleDetailedData(results);
      } catch (error) {
        setError("Error fetching articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [id]);

  const {
    data: newsData,
    loading: newsDataLoading,
    error: newsDataError,
  } = useFetch(LandingService.getAllArticles, false);
  

  return (
    <div className="news-wrapper">
      {loading && <SkeletonContent />}
      {error && <div className="error-message">{error}</div>}
      {!loading && articleDetailedData && (
        <ArticleCard data={articleDetailedData} />
      )}
      {!newsDataLoading && !newsDataError && <NewsCard data={newsData} />}
      {newsDataError && <div className="error-message">{newsDataError}</div>}
    </div>
  );
}

export default VideoComponent;
