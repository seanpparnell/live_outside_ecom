import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";  // Import 'useSelector'
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";
import { setAvailableColors, selectAvailableColors } from "../slices/colorSlice";

const ProductList = ({ categoryId }) => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsInCategoryQuery(categoryId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await refetch();
        if (result.data && result.data.length > 0) {
          const colors = result.data
            .flatMap((product) =>
              product.images.map((image) => ({ color: image.color, path: image.path }))
            )
            .filter((color, index, self) => self.findIndex((c) => c.color === color.color) === index);

          dispatch(setAvailableColors(colors));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId, refetch, dispatch]);

  // Use 'useSelector' to get the actual value of 'availableColors'
  const availableColorsRedux = useSelector(selectAvailableColors);

  // Add a state to trigger re-renders when availableColors are updated
  const [triggerRender, setTriggerRender] = useState(false);

  useEffect(() => {
    // Trigger re-render when availableColors are updated
    setTriggerRender((prev) => !prev);
  }, [availableColorsRedux]);  // Use 'availableColorsRedux' instead of 'selectAvailableColors'

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
                  <Product
                    key={`${product._id}-${index}`}
                    product={createVariantProduct(product, image)}
                    index={index}
                    path={image.path}
                    triggerRender={triggerRender}
                  />
                </Col>
              ));
            } else {
              // If there is only one color or no color information, render a single card
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

// Helper function to create a new product object with a specific color
const createVariantProduct = (product, image) => {
  const variantProduct = { ...product };
  variantProduct.defaultColor = image.color;
  variantProduct.images = [image];
  return variantProduct;
};

export default ProductList;
