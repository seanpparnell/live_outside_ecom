import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../slices/cartSlice";
import QuantitySelector from "../components/QuantitySelector";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "./CartScreen.css";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (itemId, newQty) => {
    dispatch(updateCartItemQuantity({ itemId, newQty }));
  };

  const checkoutCartHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div>
      <Container>
        <Row>
          <Col className="title">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <h6>There are no items in your cart</h6>
            ) : (
              <ListGroup variant="flush" className="cart-item">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="row">
                      <Col className="image-name">
                        <Image
                          style={{
                            height: "200px",
                            width: "200px",
                            objectFit: "contain",
                          }}
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col>${item.price}</Col>
                      <Col>
                        <QuantitySelector
                          qty={item.qty}
                          setQty={(newQty) =>
                            handleQuantityChange(item._id, newQty)
                          }
                          maxQty={item.countInStock}
                        />
                      </Col>
                      <Col>
                        <Button
                          type="button"
                          variant="light"
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
          <ListGroup
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h6>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h6>
              <h6>
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutCartHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
};

export default CartScreen;
