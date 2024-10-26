import React from 'react';
import { Link } from "react-router-dom";
import './PageNotFound.css';
import { useTranslation } from 'react-i18next';

function PageNotFound() {
  const { t, i18n } = useTranslation(); 
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <p>{t('Sahifa topilmadi')}</p>
        <Link to="/">
          <button className="back-button">{t('Bosh sahifaga qaytish')}</button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
