import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";

const CategoryScreen = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          selectedCategory
            ? `/api/categories/${selectedCategory.category}`
            : "/api/products"
        );

        console.log("Fetched data:", data);
        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <>
      <h1>
        {selectedCategory
          ? `Products in ${selectedCategory.name}`
          : "All Products"}
      </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={6} sm={6} md={4} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryScreen;
