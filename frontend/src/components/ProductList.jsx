// ProductList.js
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const ProductList = ({ selectedCategory }) => {
  const categoryId = selectedCategory?.category || null
  console.log(selectedCategory)
  // console.log(categoryId)
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ category: categoryId, name: 'All' });

  useEffect(() => {
    // Fetch products when the selected category changes
    refetch();
  }, [categoryId, refetch]);

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!isLoading && !error && (
        <Row>
          {products.map((product) => (
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
