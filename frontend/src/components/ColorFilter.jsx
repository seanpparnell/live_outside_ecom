// ColorFilter.js
import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAvailableColors,
  setSelectedColor,
  setSelectedColorImgPath,
  selectSelectedColor
} from "../slices/filtersSlice";

const ColorFilter = ({ selectedColor, onColorClick }) => {
  
  const availableColors = useSelector(selectAvailableColors);
  
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="mb-3">
      {availableColors.map((colorObj) => (
        <Button
          key={colorObj.color}
          variant={colorObj.color === selectedColor ? "primary" : "secondary"}
          onClick={() => {
            onColorClick(colorObj.color);
            dispatch(setSelectedColor(colorObj.color));
            dispatch(setSelectedColorImgPath(colorObj.path))
          }}
        >
          {colorObj.color}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ColorFilter;
