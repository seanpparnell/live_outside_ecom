import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import './Product.css'

const Product = ({product, index}) => {
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
    <Card ref={productRef} className='my-3 p-3 rounded product'>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
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
        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Product