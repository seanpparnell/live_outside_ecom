import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import SubCategoryBar from "../components/SubCategoryBar";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";

const CategoryScreen = ({selectedCategory}) => {
  const { categoryName } = useParams();
  return (
    <>
      <Container>
        <SubCategoryBar selectedCategory={selectedCategory} />
        <ProductList selectedCategory={selectedCategory}/>
      </Container>
    </>
  );
};

export default CategoryScreen;
