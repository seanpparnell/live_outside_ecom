import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAvailableSizesQtyForColor,
  setSelectedSize,
  selectSelectedSize,
  setQtyForSizeColor,
  selectSelectedColor,
} from "../slices/filtersSlice";

const SizeFilter = ({ sizes }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(selectSelectedColor);
  const selectedSize = useSelector(selectSelectedSize);
  const availableSizesForColor = useSelector(selectAvailableSizesQtyForColor);

  const handleSizeClick = (size) => {
    dispatch(setSelectedSize(size));
    const selectedSizeQty =
      availableSizesForColor.sizes.find((item) => item.size === size)
        ?.countInStock || 0;
    dispatch(
      setQtyForSizeColor({ color: selectedColor, size, qty: selectedSizeQty })
    );
    console.log(`handleSizeClick:: color:${selectedColor}, size:${selectedSize} ,qty:${selectedSizeQty}`)
  };

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
