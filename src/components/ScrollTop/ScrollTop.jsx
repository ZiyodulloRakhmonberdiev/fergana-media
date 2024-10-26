import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition && pathname === window.location.pathname) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  return null;
};

export default ScrollToTop;
