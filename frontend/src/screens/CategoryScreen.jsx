import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CategoryBar from "../components/CategoryBar";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useGetProductsInCategoryQuery } from "../slices/categoriesApiSlice";

const CategoryScreen = ({selectedCategory}) => {
  console.log("Selected Category:", selectedCategory);
  

  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
    refetch: refetchAllProducts,
  } = useGetProductsQuery();
  
  const categoryId = selectedCategory ? selectedCategory.category : "all";
  const {
    data: productsInCategory,
    isLoading: productsInCategoryLoading,
    error: productsInCategoryError,
    refetch: refetchProductsInCategory,
  } = useGetProductsInCategoryQuery(selectedCategory || { category: null, name: 'All' });

  useEffect(() => {
    if (categoryId === "all") {
      // Fetch products in a specific category
      refetchAllProducts();
      
    } else {
      // Fetch all products when "All" is selected
      refetchProductsInCategory();
    }
  }, [selectedCategory, refetchAllProducts, refetchProductsInCategory]);

  return (
    <>
      {(allProductsLoading || productsInCategoryLoading) && <Loader />}
      {/* {(allProductsError || productsInCategoryError) && (
        <Message variant='danger'>
          {allProductsError?.data?.message ||
            productsInCategoryError?.data?.message ||
            "Error loading products"}
        </Message>
      )} */}
      {!allProductsLoading && !productsInCategoryLoading && (
        <>
          <Container>
            <h1>
              {selectedCategory
                ? `Products in ${selectedCategory.name}`
                : "All Products"}
            </h1>
            {allProducts && (
              <Row>
                {(selectedCategory
                  ? productsInCategory?.products
                  : allProducts || []
                ).map((product) => (
                  <Col key={product._id} xs={6} sm={6} md={3} lg={3} xl={3}>
                    <Product product={product} index={product.position} />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default CategoryScreen;
