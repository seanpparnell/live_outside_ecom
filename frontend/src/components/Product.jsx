// Product.js

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import './Product.css';

const Product = ({ product, index, onClick }) => {
  const navigate = useNavigate();
  const { id, color } = useParams();
  
  const selectedColorImage = product.images.find((image) => image.color === color);
  const productImgPath = selectedColorImage ? selectedColorImage.path : product.images[0].path;
  const productRef = useRef();

  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            productRef.current.classList.add('fade-in');
          }
        });
      },
      { threshold: 1 } // Adjust the threshold as needed
    );

    // Delay the observation based on the index
    const delay = index * 500; // Adjust the delay as needed

    const timeoutId = setTimeout(() => {
      observer.observe(productRef.current);
    }, delay);

    // Clean up timeout and observer when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [index]);

  return (
    <Card ref={productRef} className='my-3 p-3 rounded product' onClick={onClick}>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={productImgPath} alt={product.name} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title className='product-title' as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Product;
