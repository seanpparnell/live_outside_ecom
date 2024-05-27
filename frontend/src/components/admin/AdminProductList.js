import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../Message";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsInCategoryQuery } from "../../slices/categoriesApiSlice";
import { setProducts, clearProducts } from "../../slices/productsSlice";

const AdminProductList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsInCategoryQuery(categoryId);
  console.log(products)


  useEffect(() => {
    if (categoryId) {
      dispatch(clearProducts());
      if (products) {
        dispatch(setProducts(products));
      }
    }
  }, [categoryId, dispatch, products]);

  return (
    <Container>
      <h1>Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminProductList;
