import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/NavBar';
import { useDispatch } from 'react-redux';
import { closeCart } from './slices/cartSlice';
import CartOpen from './components/CartOpen';

const App = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const closeCartHandler = () => {
    console.log('closing cart...')
    dispatch(closeCart());
  }
  return (
    <>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
      {isCartOpen && <CartOpen isOpen={isCartOpen} onClose={closeCartHandler} />}
    </>
  )
}

export default App