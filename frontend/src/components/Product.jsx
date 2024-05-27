import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import ColorFilter from "./ColorFilter";
import {
  setSelectedColor,
  setSelectedColorImgPath,
} from "../slices/filtersSlice";

const Product = ({ product }) => {
  const [selectedColorLocal, setSelectedColorLocal] = useState("");
  const [selectedImgPathLocal, setSelectedImgPathLocal] = useState([]);
  
  const dispatch = useDispatch();
  
  const { originalId, name, rating, numReviews, price, variations, images } = product;

  useEffect(() => {
    if (!selectedColorLocal && product.defaultColor) {
      setSelectedImgPathLocal(product.defaultImages);
    }
  }, [selectedColorLocal, product.defaultColor]);
  

 const handleColorChange = (x) => {
    setSelectedColorLocal(x.color);
    setSelectedImgPathLocal(x.path);
    dispatch(setSelectedColorImgPath(x.path));
    dispatch(setSelectedColor(x.color));
  };

  const handleProductClick = () => {
    if (!selectedColorLocal && product.defaultColor) {
      dispatch(setSelectedColorImgPath(product.defaultImages));
      dispatch(setSelectedColor(product.defaultColor));
    }
  };
  

  return (
    <Card className="my-3 p-3 rounded product" style={{ maxWidth: '215px', maxHeight: '400px', minHeight: '400px'}}>
      <Link to={`/products/${originalId}`} onClick={() => handleProductClick(product)} style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
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
          defaultColor={product.defaultColor}
        />
      )}
      <Card.Body>
        <Link to={`/products/${originalId}`}>
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
