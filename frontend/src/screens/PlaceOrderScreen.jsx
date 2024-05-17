import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import CheckoutSteps from '../components/CheckoutSteps';
import "./CartScreen.css";
import { clearCartItems } from '../slices/cartSlice';



const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart)
  console.log(cart)

  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,

      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error.data.message)
    }
  }

//   const placeOrderHandler = async () => {
//     try {
//         // Transform cartItems to match orderItems schema
//         const transformedCartItems = cart.cartItems.map(item => ({
//             name: item.name,
//             qty: item.qty,
//             image: item.image, // Assuming imgPath is an array of image paths
//             price: item.price, // Assuming itemPrice is the price of the item
//             product: item.compositeKey,
//         }));

//         console.log('Order Items:', transformedCartItems);

//         const res = await createOrder({
//             orderItems: transformedCartItems,
//             shippingAddress: cart.shippingAddress,
//             paymentMethod: cart.paymentMethod,
//             itemsPrice: cart.itemsPrice,
//             shippingPrice: cart.shippingPrice,
//             taxPrice: cart.taxPrice,
//             totalPrice: cart.totalPrice,
//         }).unwrap();
        
//         dispatch(clearCartItems());
//         navigate(`/order/${res._id}`)
//     } catch (error) {
//         toast.error(error.data.message)
//     }
// }

  

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}, {cart.shippingAddress.postalCode},{' '} {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                  {isLoading && <Loader />}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen