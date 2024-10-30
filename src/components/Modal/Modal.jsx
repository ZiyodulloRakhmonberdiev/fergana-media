import React from "react";
import "./Modal.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Modal = ({ videoUrl, title, description, isOpen, onClose, id }) => {
  const { t, i18n } = useTranslation();
  if (!isOpen) return null;

  
  

  const truncateTitle = (title, maxLines = 4) => {
    const maxLength = 260;
    if (title?.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className="modal-overlays" onClick={onClose}>
      <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="iframe-wrapper">
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
        <h2>{title}</h2>
        <p>{truncateTitle(description)}</p>
        <Link to={`/news/${id}?type=video`} className="button">
          <div className="arrow"></div>
          <span>{t("Maqolani o'qish")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
