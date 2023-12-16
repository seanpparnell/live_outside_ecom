import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../slices/cartSlice'
import { Container, Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa';
import Message from './Message';
import './CartOpen.css'

const CartOpen = ({isOpen, onClose}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('open');
    } else {
      setAnimationClass('close');
    }
  }, [isOpen]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));

  };
  
  return (
    <div className={`cart-open-container ${animationClass}`}>
      <Container>
        <div className='x-close'>
          <h3 onClick={onClose}>X</h3>
        </div>

        <Row>
          <Col>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <h6>There are no items in your cart</h6>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CartOpen