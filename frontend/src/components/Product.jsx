// Product.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import ColorFilter from "./ColorFilter";
import {
  setSelectedColor,
  setSelectedImagePath,
  selectSelectedImagePath,
  selectAvailableColors,
} from "../slices/colorSlice";

const Product = ({ product, index, triggerRender }) => {
  const { _id, name, rating, numReviews, price, images, availableColors } =
    product;
  const availableColorsRedux = useSelector(selectAvailableColors);
  const [selectedColorLocal, setSelectedColorLocal] = useState("");
  const dispatch = useDispatch();

  // Update local state and dispatch to Redux
  const handleColorChange = (color) => {
    setSelectedColorLocal(color);
    dispatch(setSelectedColor({ color, index })); // Pass the index to identify the specific variant product
  };

  const getImagePath = (color) => {
    const selectedColor = availableColorsRedux.find(
      (colorObj) => colorObj.color === color
    );
    return selectedColor ? selectedColor.path : "";
  };

  useEffect(() => {
    // If no color is selected and there is a defaultColor, use the defaultColor
    if (!selectedColorLocal && product.defaultColor) {
      setSelectedColorLocal(product.defaultColor);
    }
  }, [selectedColorLocal, product.defaultColor, triggerRender]);

  return (
    <Card className="my-3 p-3 rounded product">
      {/* Color filter for the product */}
      <ColorFilter
        availableColors={availableColorsRedux}
        selectedColor={selectedColorLocal}
        onColorClick={handleColorChange}
      />

      <Link to={`/products/${_id}`}>
        {/* Use the path from availableColors directly */}
        <Card.Img
          src={getImagePath(selectedColorLocal)}
          alt={name}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${_id}`}>
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



// Helper function to get the image path based on the selected color
const getImagePath = (selectedColor, availableColors) => {
  const selectedColorObj = availableColors.find(
    (colorObj) => colorObj.color === selectedColor
  );
  return selectedColorObj ? selectedColorObj.path : "";
};

export default Product;
