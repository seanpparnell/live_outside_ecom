import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const CategoryBar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Run this effect only once when the component mounts

  const handleCategoryClick = (category) => {
    setSelectedCategory(category._id);
    onSelectCategory({category: category._id, name: category.name});
  };

  const handleAllClick = () => {
    setSelectedCategory(null); // Set to null or another value that indicates all products
    onSelectCategory(null);
  };

  return (
    <Container fluid style={{ display: 'flex', width: '100%', height: '50px', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'lightblue', width: '60%', display: 'flex', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handleAllClick}>All</button>
        {categories.map((category) => (
          <button key={category._id} name={category.name} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </button>
        ))}
       
      </div>
    </Container>
  );
};

export default CategoryBar;
