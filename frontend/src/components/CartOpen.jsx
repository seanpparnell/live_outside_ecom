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
                  <ListGroup.Item key={item._id}>
                    <Row className='cart-item-row'>
                      <Col sm={3} md={2}>
                        <img style={{height: '50px', width: '50px', objectFit: 'contain'}} src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>Qty: {item.qty}</Col>
                      <Col md={3}>
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
        <Card>
          <ListGroup style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <ListGroup.Item style={{display: 'flex', justifyContent: 'space-between'}}>
              <h6>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h6>
              <h6>$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  )
}

export default CartOpen