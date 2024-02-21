// Product.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import ColorFilter from "./ColorFilter";
import {
  setSelectedColor,
  setSelectedColorImgPath,
  selectAvailableColors,
  setSelectedSize,
} from "../slices/filtersSlice";
import { FaAvianex } from "react-icons/fa";
import { get } from "mongoose";

const Product = ({ product, index, triggerRender }) => {
  const [selectedColorLocal, setSelectedColorLocal] = useState("");
  
  const dispatch = useDispatch();
  
  const availableColorsRedux = useSelector(selectAvailableColors);
  const { _id, name, rating, numReviews, price, variations } = product;
  

  useEffect(() => {
    if (!selectedColorLocal && product.defaultColor) {
      setSelectedColorLocal(product.defaultColor);
    }
  }, [selectedColorLocal, product.defaultColor, triggerRender]);

  const handleColorChange = (color) => {
    setSelectedColorLocal(color);
    dispatch(setSelectedColor({ color, index }));
  };

  const getImagePath = (color) => {
    const selectedColor = availableColorsRedux.find(
      (colorObj) => colorObj.color === color
    );
    return selectedColor ? selectedColor.path : "";
  };

  const saveImgPath = (event) => {
    const selectedSize = selectedColorLocal === "none" ? "One Size Fits All" : ""; // Set size to "One Size Fits All" if color is "none"
    dispatch(setSelectedColorImgPath(getImagePath(selectedColorLocal)));
    dispatch(setSelectedColor(selectedColorLocal));
    dispatch(setSelectedSize(selectedSize)); // Dispatch selected size
  };


  return (
    <Card className="my-3 p-3 rounded product">
      <Link to={`/products/${_id}/${selectedColorLocal}`} onClick={saveImgPath}>
        <Card.Img
          src={getImagePath(selectedColorLocal)}
          alt={name}
          variant="top"
        />
      </Link>
      {variations && variations[0].name !== "none" && (
        <ColorFilter
          availableColors={availableColorsRedux}
          selectedColor={selectedColorLocal}
          onColorClick={handleColorChange}
        />
      )}
      <Card.Body>
        <Link to={`/products/${_id}/${selectedColorLocal}`}>
          <Card.Title className="product-title" as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
