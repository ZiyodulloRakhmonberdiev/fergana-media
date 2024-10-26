import React from "react";
import "./ViewAllButton.css"; // Make sure to add the corresponding CSS

const ViewAllButton = ({ onClick }) => {
  return (
    <button className="view-all-button" onClick={onClick}>
      Xammasini ko‘rish <span className="arrow">→</span>
    </button>
  );
};

export default ViewAllButton;
