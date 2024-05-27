// SubCategoryBar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryId } from '../slices/categorySlice';
import { useLocation } from 'react-router-dom';

const SubCategoryBar = () => {
  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.category.subCategories);
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');

  const handleSubCategoryClick = (subCategoryId) => {
    dispatch(addCategoryId(subCategoryId));
  };

  const sortedSubCategories = [...subCategories].sort((a, b) => a.order - b.order);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {sortedSubCategories.length > 0 ? (
        sortedSubCategories.map((subCategory) => (
          <div
            key={subCategory._id}
            onClick={() => handleSubCategoryClick(subCategory._id)}
            style={{ cursor: 'pointer' }}
          >
            {subCategory.name.split(' ')[0]}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SubCategoryBar;
