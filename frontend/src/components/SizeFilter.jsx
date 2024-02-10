import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAvailableSizesQtyForColor, setSelectedSize, selectSelectedSize, setQtyForSizeColor, selectSelectedColor } from '../slices/filtersSlice';

const SizeFilter = ({sizes}) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(selectSelectedColor);
  const selectedSize = useSelector(selectSelectedSize);
  const availableSizesForColor = useSelector(selectAvailableSizesQtyForColor);

  
    // Function to handle size click
    const handleSizeClick = (size) => {
      // Dispatch the selected size to the Redux store
      dispatch(setSelectedSize(size));
      const selectedSizeQty = availableSizesForColor.sizes.find(item => item.size === size)?.countInStock || 0;
      // Dispatch the quantity for the selected size and color to the Redux store
      dispatch(setQtyForSizeColor({ color: selectedColor, size, qty: selectedSizeQty }));
    }

  return (
    <ButtonGroup className="mb-3">
      {sizes.map((size) => (
        <Button
          key={size}
          variant={size === selectedSize ? "priamry" : "secondary"}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SizeFilter;
