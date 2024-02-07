import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAvailableSizes, setSelectedSize } from '../slices/filtersSlice';

const SizeFilter = () => {
  const availableSizes = useSelector(selectAvailableSizes);
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="mb-3">
      {availableSizes.map((size) => (
        <Button
          key={size}
          variant="secondary"
          onClick={() => dispatch(setSelectedSize(size))}
        >
          {size}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SizeFilter;
