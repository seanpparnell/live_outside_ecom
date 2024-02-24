import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedQuantity, setSelectedQuantity } from '../slices/filtersSlice';
import './QuantitySelector.css';

const QuantitySelector = ({ maxQty, initialQty, setQty }) => {
  const dispatch = useDispatch();
  const selectedQuantity = useSelector(selectSelectedQuantity);


  console.log('selectedQty',selectedQuantity);
  

  const [selectedQty, setSelectedQty] = useState(initialQty);

  useEffect(() => {
    
      dispatch(setSelectedQuantity(1));
  }, [maxQty, dispatch]);

  const incrementQty = () => {
    if (!initialQty && selectedQuantity < maxQty) {
      dispatch(setSelectedQuantity(selectedQuantity + 1)); 
    } 
    else if (selectedQty < maxQty) {
      const newQuantity = selectedQty + 1;
      setSelectedQty(newQuantity);
      setQty(newQuantity);
    }
  };

  const decrementQty = () => {
    if (!initialQty && selectedQuantity > 1) {
      dispatch(setSelectedQuantity(selectedQuantity - 1));
    } 
    else if (selectedQty > 1) {
      const newQuantity = selectedQty - 1;
      setSelectedQty(newQuantity);
      setQty(newQuantity)
    }
  };

  return (
    <Form.Group className='qty-selector-container'>
      <Form.Label className='form-label'>Qty:</Form.Label>
      <div className="d-flex align-items-center">
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={decrementQty}>
          -
        </Button>
        <span className="mx-2">{initialQty ? initialQty : selectedQuantity}</span>
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={incrementQty}>
          +
        </Button>
      </div>
    </Form.Group>
  );
};

export default QuantitySelector;
