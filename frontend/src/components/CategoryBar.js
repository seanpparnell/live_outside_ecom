import React, { useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { Link } from "react-router-dom";

const CategoryBar = ({ onSelectCategory }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return <p>loading categories</p>;
  }

  if (error) {
    return <p>Error loadind categories:{error}</p>;
  }

  const handleCategoryClick = (category) => {
    onSelectCategory(category.parentCategory._id);
    console.log(category.parentCategory._id);
  };

  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0 10px 0",
        }}
      >
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/categories/${category.parentCategory.name}`} 
            onClick={() => handleCategoryClick(category)}
          >
            {category.parentCategory.name}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default CategoryBar;
