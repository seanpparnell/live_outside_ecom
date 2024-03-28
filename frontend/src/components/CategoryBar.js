import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategoryId } from "../slices/categorySlice";

const CategoryBar = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  // console.log('categories', categories)
  
  const dispatch = useDispatch();
  
  const handleCategoryClick = (category) => {
    dispatch(addCategoryId(category.parentCategory._id));
  };

  if (isLoading) {
    return <p>Loading categories</p>;
  }

  if (error) {
    return <p>Error loading categories: {error}</p>;
  }

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
