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
import SideBarFilter from "../components/SideBarFilter";
import { useSelector } from "react-redux";

const CategoryScreen = () => {
  const selectedCategory = useSelector((state) => state.category.categoryId)
 
  return (
    <>
      <SubCategoryBar />
      <Container style={{display: 'flex'}}>
        <SideBarFilter />
        <ProductList categoryId={selectedCategory}/>
      </Container>
    </>
  );
};

export default CategoryScreen;
