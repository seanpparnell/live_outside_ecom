// QuantitySelector.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './QuantitySelector.css'

const QuantitySelector = ({ qty, setQty, maxQty}) => {
  const incrementQty = () => {
    if (qty < maxQty) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <Form.Group className='qty-selector-container'>
      <Form.Label className='form-label'>Qty:</Form.Label>
      <div className="d-flex align-items-center">
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={decrementQty}>
          -
        </Button>
        <span className="mx-2">{qty}</span>
        <Button className='inc-dec-qty' variant="outline-secondary" onClick={incrementQty}>
          +
        </Button>
      </div>
    </Form.Group>
  );
};

export default QuantitySelector;
