import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";

const ProductList = ({ categoryId }) => {

  const { data: products, isLoading, error, refetch } = useGetProductsInCategoryQuery(categoryId);

  const flattenProducts = (products) => {
    return products ? products.reduce((acc, product) => {
      if (product.images && product.images.length > 0) {
        product.images.forEach((image, index) => {
          const variantProduct = {
            ...product,
            _id: `${product._id}`,
            defaultColor: image.color,
            defaultImages: image.path
          };
          acc.push(variantProduct);
        });
      } else {
        acc.push(product);
      }
      return acc;
    }, []) : [];
  };
  
  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Create a new array to avoid mutating the original array
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const flattenedProducts = flattenProducts(products);

  const shuffledProducts = flattenedProducts ? shuffleArray(flattenedProducts) : [];


  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!isLoading && !error && (
        <Row>
          {shuffledProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
