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
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {availableColors.map((colorObj) => (
        <div
          
          key={colorObj.color}
          onClick={() => {
            onColorClick(colorObj.color);
            dispatch(setSelectedColor(colorObj.color));
            dispatch(setSelectedColorImgPath(colorObj.path))
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: colorObj.color,
              marginRight: "5px",
              border: selectedColor === colorObj.color ? "2px solid blue" : "none",
            }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
