import React from 'react';
import { useEffect, useState } from "react";
import TopNews from "../../components/topNews/TopNews";
import WorldCard from "../../components/WorldCard/WorldCard";

import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard/VideoCard";
import LandingService from "../../services/landing/landingService";
import LandingVideos from "../../services/landing/landingVideos";
import "./home.css";
import SkeletonContent from "../../components/SkeletonContent/SkeletonContent";

function Home() {
  const [categoryData, setCategoryData] = useState([]);

  const {
    data: worldData,
    loading: worldDataLoading,
    error: worldDataError,
  } = useFetch(LandingService.getAllArticles, false);


  const {
    data: videoData,
    loading: videoDataLoading,
    error: videoDataError,
  } = useFetch(LandingVideos.getVideos, false);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const results = await LandingService.getNavbar();
        setCategoryData(results);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    loadCategory();
  }, []);

  return (
    <div className="home">
      <TopNews />

      {worldDataLoading && <SkeletonContent />}

      {!worldDataLoading &&
        !worldDataError &&
        categoryData?.results?.map((category) => {
          const filteredWorldData = worldData.results.filter((item) =>
            item.categories.includes(category.id)
          );

          return filteredWorldData.length > 0 ? (
            <WorldCard
              key={category.id}
              category={category}
              data={{ results: filteredWorldData }}
            />
          ) : null;
        })}

      {videoDataLoading && <SkeletonContent />}

      <VideoCard data={videoData} loading={videoDataLoading} />
    </div>
  );
}

export default Home;
