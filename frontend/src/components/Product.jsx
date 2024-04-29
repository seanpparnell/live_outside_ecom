// Product.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useAsyncError } from "react-router-dom";
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

const Product = ({ product, index}) => {
  const [selectedColorLocal, setSelectedColorLocal] = useState("");
  const [selectedImgPathLocal, setSelectedImgPathLocal] = useState([])
  
  const dispatch = useDispatch();
  
  const { _id, name, rating, numReviews, price, variations, images } = product;

  useEffect(() => {
    if (!selectedColorLocal && product.defaultColor) {
      setSelectedColorLocal(product.defaultColor);
      dispatch(setSelectedColor(product.defaultColor));
      setSelectedImgPathLocal(product.defaultImages);
      dispatch(setSelectedColorImgPath(product.defaultImages)); // Optionally set Redux state here as well
    }
  }, [selectedColorLocal, product.defaultColor]);
  

 const handleColorChange = (x) => {
    setSelectedColorLocal(x.color);
    setSelectedImgPathLocal(x.path);
    dispatch(setSelectedColorImgPath(x.path));
    dispatch(setSelectedColor(x.color));
    console.log('color:', x.color)
    console.log('path:', x.path)
  };

  const saveImgPath = (e) => {}
  

  return (
    <Card className="my-3 p-3 rounded product" style={{ maxWidth: '215px', maxHeight: '400px', minHeight: '400px'}}>
      <Link to={`/products/${_id}`}  style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
        <div style={{height: '200px', width: '100px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Card.Img
            style={{ width: '100%', height: 'auto'}}
            src={selectedImgPathLocal[0]}
            alt={name}
            variant="top"
          />
        </div>
      </Link>
      {variations && variations[0].name !== "none" && (
        <ColorFilter
          availableColors={images}
          selectedColor={selectedColorLocal}
          onColorClick={handleColorChange}
        />
      )}
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

export default Product;
