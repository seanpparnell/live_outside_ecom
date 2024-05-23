import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";
import { setProducts, clearProducts } from "../slices/productsSlice";

const ProductList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useGetProductsInCategoryQuery(categoryId);

  useEffect(() => {
    if (categoryId) {
      dispatch(clearProducts()); // Clear products when category changes
      if (products) {
        const variantProducts = products.reduce((acc, product) => {
          if (product.images && product.images.length > 0) {
            product.images.forEach((image, index) => {
              const variantProduct = {
                ...product,
                _id: `${product._id}-${index}`, // Ensure unique ID for variants
                defaultColor: image.color,
                defaultImages: image.path,
              };
              acc.push(variantProduct);
            });
          } else {
            acc.push(product);
          }
          return acc;
        }, []);
        dispatch(setProducts(variantProducts));
      }
    }
  }, [categoryId, dispatch, products]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const productItems = useSelector((state) => state.products.products);
  const shuffledProducts = shuffleArray(productItems);

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error.message}</Message>}
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
