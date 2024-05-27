import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SubCategoryBar from "../components/SubCategoryBar";
import ProductList from "../components/ProductList";


const CategoryScreen = () => {
  const selectedCategory = useSelector((state) => state.category.categoryId);

  return (
    <>
      <SubCategoryBar />
      <Container style={{ display: "flex" }}>
        <ProductList categoryId={selectedCategory} />
      </Container>
    </>
  );
};

export default CategoryScreen;
