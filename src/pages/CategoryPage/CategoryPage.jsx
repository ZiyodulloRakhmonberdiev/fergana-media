import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LandingService from "../../services/landing/landingService";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./CategoryPage.css";
import SkeletonContent from "../../components/SkeletonContent/SkeletonContent";

function CategoryPage() {
  const [categoryData, setCategoryData] = useState([]);
  const { categoryId } = useParams();

  const {
    data: worldData,
    loading: worldDataLoading,
    error: worldDataError,
  } = useFetch(LandingService.getAllArticles);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const results = await LandingService.getNavbar();
        setCategoryData(results);
      } catch (error) {
        console.error("Kategoriyalarni yuklashda xatolik:", error);
      }
    };
    loadCategory();
  }, []);

  const currentCategoryId = parseInt(categoryId, 10);
  const filteredCategory = categoryData?.results?.find(
    (category) => category.id === currentCategoryId
  );

  const filteredArticles = worldData?.results?.filter((article) =>
    article.categories.includes(currentCategoryId)
  );

  return (
    <div className="category_wrapper">
      {worldDataLoading && <p>{<SkeletonContent/>}</p>}
      {worldDataError && (
        <p>Maqolalarni yuklashda xatolik: {worldDataError.message}</p>
      )}

      {!worldDataLoading && !worldDataError && filteredCategory && (
        <CategoryCard
          loading={worldDataLoading}
          key={filteredCategory.id}
          category={filteredCategory}
          data={{ results: filteredArticles }}
        />
      )}
    </div>
  );
}

export default CategoryPage;
