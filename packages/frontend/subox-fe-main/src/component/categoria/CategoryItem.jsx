import React from "react";
import "./CategoryItem.scss";
const CategoryItem = ({ title, imgSrc, altText, onClick, isActive }) => {
  return (
    <div
    className={`category-item ${isActive ? "active" : ""}`}
    onClick={() => onClick(title)}
  >
    <div className="category-item__image">
      <img src={imgSrc} alt={altText} className="category-item__img" />
    </div>
    <div className="category-item__title">
      <span>{title}</span>
    </div>
  </div>
  
  );
};



export default CategoryItem;
