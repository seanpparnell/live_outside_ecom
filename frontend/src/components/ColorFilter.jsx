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

const ColorFilter = ({ selectedColor, onColorClick, availableColors }) => {
  
  // availableColors.map((x) => {
  //   console.log(`color: ${x.color}, path: ${x.path}`)
  // })
  
  const dispatch = useDispatch();

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '4px'}}>
      {availableColors.map((x) => (
        <div
        
        key={x.color}
        onClick={() => onColorClick(x)}
        >
          
            <span
              style={{
                display: "inline-block",
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: x.color,
                margin: '0px 3px 0px 3px',
                border: '.5px dotted black'
              }}
              >
              <span style={{
                display: "inline-block",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: 'transparent',
                marginTop: '5px',
                marginLeft: '-5px',
                border: selectedColor === x.color ? "2px solid blue" : "none",
              }}></span>
            </span>
         
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
