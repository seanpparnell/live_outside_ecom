import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";

const CategoryBar = ({ onSelectCategory }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  
  
  
  const [allProducts, setAllProducts] = useState(true);


// Handles all Products from a given Category
  const handleCategoryClick = (category) => {
    setAllProducts(false);
    onSelectCategory({category: category._id, name: category.name});
  };

  // Set to null or another value that indicates all products
  const handleAllClick = () => {
    onSelectCategory(null);
  };

  return (
    <Container fluid style={{ display: 'flex', width: '100%', height: '50px', backgroundColor: '#bbf4f7', justifyContent: 'center' }}>
      <div style={{ width: '90%', display: 'flex', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{width: '250px', border: '1px solid black', borderRadius: 20}} onClick={handleAllClick}>All</button>
        {categories?.map((category) => (
          <button style={{width: '250px', border: '1px solid black', borderRadius: 20}} key={category._id} name={category.name} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </button>
        ))}
       
      </div>
    </Container>
  );
};

export default CategoryBar;
