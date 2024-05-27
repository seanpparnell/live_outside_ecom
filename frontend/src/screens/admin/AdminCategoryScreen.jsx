// AdminCategoryScreen.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CategoryBar from '../../components/CategoryBar';
import SubCategoryBar from '../../components/SubCategoryBar';
import AdminProductList from '../../components/admin/AdminProductList';

const AdminCategoryScreen = () => {
  const selectedCategory = useSelector((state) => state.category.categoryId);

  return (
    <>
      <SubCategoryBar />
      <Container style={{ display: 'flex' }}>
        <AdminProductList categoryId={selectedCategory} />
      </Container>
    </>
  );
};

export default AdminCategoryScreen;
