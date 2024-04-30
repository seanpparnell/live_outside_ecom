import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // Import 'useSelector'
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";
import {
  setAvailableColors,
  selectAvailableColors,
} from "../slices/filtersSlice";

const ProductList = ({ categoryId }) => {

  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsInCategoryQuery(categoryId);

  const createVariantProduct = (product, image) => {
    const variantProduct = { ...product };
    variantProduct.defaultColor = image.color;
    variantProduct.defaultImages = image.path
    return variantProduct
  };
  

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!isLoading && !error && (
        <Row>
          {products.map((product) => {
            if (product.images && product.images.length > 0) {
              return product.images.map((image, index) => (
                <Col
                  key={`${product._id}-${index}`}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product
                    key={`${product._id}-${index}`}
                    product={createVariantProduct(product, image)}
                    index={index}
                    path={image.path}
                  />
                </Col>
              ));
            } else {
              return (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product key={product._id} product={product} />
                </Col>
              );
            }
          })}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
