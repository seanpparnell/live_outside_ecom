// ProductList.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";

const ProductList = ({ categoryId }) => {
  const [selectedProduct, setSelectedProduct] = useState({
    productId: null,
    colorPath: '',
  });

  const handleImageClick = (productId, colorPath) => {
    setSelectedProduct({
      productId,
      colorPath,
    });
  };

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsInCategoryQuery(categoryId);
  console.log(products);

  useEffect(() => {
    refetch();
  }, [categoryId, refetch]);

  return (
      <Container>
        {/* This is my Product List */}
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {!isLoading && !error && (
          <Row>
            {products.map((product) => {
              // If the product has color variations, render a card for each variation
              if (product.images && product.images.length > 1) {
                return product.images.map((image, index) => (
                  <Col key={`${product._id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/products/${product._id}/${image.color}`}>
                      <Product key={`${product._id}-${index}`} product={createVariantProduct(product, image)} index={index} onClick={() => handleImageClick(product._id, image.path)} />
                    </Link>
                  </Col>
                ));
              } else {
                // If there is only one color or no color information, render a single card
                return (
                  <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/products/${product._id}`}>
                      <Product key={product._id} product={product} onClick={() => handleImageClick(product._id, product.image)}  />
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
        )}
      </Container>
  );
};

// Helper function to create a new product object with a specific color
const createVariantProduct = (product, image) => {
  const variantProduct = { ...product };
  variantProduct.defaultColor = image.color;
  variantProduct.images = [image];
  return variantProduct;
};

export default ProductList;
