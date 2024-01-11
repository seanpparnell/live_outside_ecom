import React from "react";
import { useState } from "react";
import CategoryScreen from './CategoryScreen';
import CategoryBar from '../components/CategoryBar';
import Carousel from "react-bootstrap/Carousel";
import HomeImage from "../assets/main/home.jpg";
import HomeWinterHero from '../assets/main/homeWinterHero.jpg'
import { Container, Image } from "react-bootstrap";
import Banner from "../components/Banner";

const HomeScreen = () => {
  // const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };


  return (
    <>
      <div>
        <CategoryBar onSelectCategory={handleCategorySelect} />
        <div style={{width: '100%', height: '60%', marginBottom: '25px' }}>
          <Image style={{width: '100%', height: '50%', objectFit: 'cover' }} src={HomeWinterHero} alt="Winter Home"/>
        </div>
      </div>
    <Container>
      <Banner></Banner>
      <CategoryScreen selectedCategory={selectedCategory} />
    </Container>
  </>
  );
};

export default HomeScreen;

const style = {
  carousel: {
    height: '60%',
    width: '100%'
    
  }
}