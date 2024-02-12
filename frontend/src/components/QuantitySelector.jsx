import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectQtyForSizeColor, setQtyForSizeColor} from '../slices/filtersSlice';
import './QuantitySelector.css';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  
  const dispatch = useDispatch();

  const qtyForSizeColor = useSelector(selectQtyForSizeColor);
  const maxQty = qtyForSizeColor ? qtyForSizeColor.qty : 1;

   useEffect(() => {
      setQuantity(1)
  }, [qtyForSizeColor]);

  const incrementQty = () => {
    if (quantity < maxQty) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

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
