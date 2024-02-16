import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedQuantity, setSelectedQuantity } from '../slices/filtersSlice';
import './QuantitySelector.css';

const QuantitySelector = ({ maxQty }) => {
  const dispatch = useDispatch();
  const selectedQuantity = useSelector(selectSelectedQuantity);

  useEffect(() => {
    dispatch(setSelectedQuantity(1)); // Initialize selected quantity to 1 when maxQty changes
  }, [maxQty, dispatch]);

  const incrementQty = () => {
    if (selectedQuantity < maxQty) {
      dispatch(setSelectedQuantity(selectedQuantity + 1)); // Increment selected quantity
    }
  };

  const decrementQty = () => {
    if (selectedQuantity > 1) {
      dispatch(setSelectedQuantity(selectedQuantity - 1)); // Decrement selected quantity
    }
  };

  return (
    <Form.Group className='qty-selector-container'>
      <Form.Label className='form-label'>Qty:</Form.Label>
      <div className="d-flex align-items-center">
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={decrementQty}>
          -
        </Button>
        <span className="mx-2">{selectedQuantity}</span>
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={incrementQty}>
          +
        </Button>
      </div>
    </Form.Group>
  );
};

export default QuantitySelector;
