import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAvailableSizesQtyForColor, setSelectedSize, selectSelectedSize } from '../slices/filtersSlice';

const SizeFilter = ({sizes}) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector(selectSelectedSize);
  

  return (
    <ButtonGroup className="mb-3">
      {sizes.map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? "primary" : "secondary"}
          onClick={() => dispatch(setSelectedSize(size))}
        >
          {size}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SizeFilter;
