import React from 'react';
import { useState, useEffect } from 'react';
import './ScrollToTopButton.css';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    )
  );
};

export default ScrollToTopButton;
