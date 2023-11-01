import React, {useState, useEffect} from 'react'
import { Row, Col} from 'react-bootstrap';
import axios from 'axios'

import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
    console.log(products)
  }, [])


  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={6} sm={6} md={4} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen