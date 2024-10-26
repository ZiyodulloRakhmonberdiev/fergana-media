import React from 'react';
import './SkeletonContent.css'; // Importing the CSS file

const SkeletonContent = () => {
  return (
    <div style={{marginTop: '150px'}} className="content-skeleton">
      <div className="skeleton-box skeleton-line-1"></div>
      <div className="skeleton-box skeleton-line-2"></div>
      <div className="skeleton-box skeleton-line-3"></div>
      <div className="skeleton-box skeleton-line-4"></div>
    </div>
  );
};

export default SkeletonContent;
