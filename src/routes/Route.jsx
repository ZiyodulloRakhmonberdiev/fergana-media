import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "./../pages/home/Home";
import News from "./../pages/News/News";
import PageNotFound from "./../components/pageNotFound/PageNotFound";
import CategoryPage from "../pages/CategoryPage/CategoryPage";

function RoutesWrap() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </>
    )
  );
}

export default RoutesWrap;
