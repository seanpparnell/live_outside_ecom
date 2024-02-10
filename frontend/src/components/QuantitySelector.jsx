import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectQtyForSizeColor, setQtyForSizeColor} from '../slices/filtersSlice';
import './QuantitySelector.css';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const qtyForSizeColor = useSelector(selectQtyForSizeColor);

  // Calculate the maximum quantity based on the selected color, size, and quantity
  const maxQty = qtyForSizeColor ? qtyForSizeColor.qty : 1;

   // Effect to reset quantity to 1 when qtyForSizeColor changes
   useEffect(() => {
    // Reset quantity to 1 when qtyForSizeColor changes
      setQuantity(1)
  }, [qtyForSizeColor]);

  // Initialize the quantity state

  // Function to increment the quantity
  const incrementQty = () => {
    console.log('Incrementing quantity...');
    // Increase the quantity if it's less than the maximum
    if (quantity < maxQty) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Function to decrement the quantity
  const decrementQty = () => {
    console.log('Decrementing quantity...');
    // Decrease the quantity if it's greater than 1
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  console.log('quantity:', quantity);

  return (
    <Form.Group className='qty-selector-container'>
      <Form.Label className='form-label'>Qty:</Form.Label>
      <div className="d-flex align-items-center">
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={decrementQty}>
          -
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={incrementQty} disabled={quantity === maxQty}>
          +
        </Button>
      </div>
    </Form.Group>
  );
};

export default QuantitySelector;
