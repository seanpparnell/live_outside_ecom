import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ColorFilter from "../components/ColorFilter";
import SizeFilter from "../components/SizeFilter";
import QuantitySelector from "../components/QuantitySelector";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart, selectCartItem } from "../slices/cartSlice";
import "./ProductScreen.css";
import {
  selectSelectedColorImgPath,
  setSelectedColor,
  setSelectedColorImgPath,
  selectSelectedColor,
  setSelectedSize,
  setAvailableSizesQtyForColor,
  selectAvailableSizesQtyForColor,
  selectQtyForSizeColor,
  setQtyForSizeColor,
  selectSelectedSize,
  selectSelectedQuantity
} from "../slices/filtersSlice";

const ProductScreen = () => {
  
  const { id: productId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log('product:', product)


  const highlightColor = useSelector(selectSelectedColor);
  const availableSizesForColor = useSelector(selectAvailableSizesQtyForColor);
  const colorImgPath = useSelector(selectSelectedColorImgPath);
  const selectedSize = useSelector(selectSelectedSize);
  const selectedQuantity = useSelector(selectSelectedQuantity);


  useEffect(() => {
    if (product && product.variations) {
      // Find the variation with size 'One Size Fits All' for any color
      const oneSizeFitsAllVariation = product.variations.find(
        (variation) =>
          variation.sizes.some((size) => size.size === "One Size Fits All")
      );
  
      // If found, dispatch the size to selectedSize
      if (oneSizeFitsAllVariation) {
        dispatch(setSelectedSize("One Size Fits All"));
  
        // Dispatch quantity for the 'One Size Fits All' variation
        const countInStock = oneSizeFitsAllVariation.sizes.find(
          (size) => size.size === "One Size Fits All"
        ).countInStock;
  
        dispatch(
          setQtyForSizeColor({
            color: "none",
            size: "One Size Fits All",
            qty: countInStock,
          })
        );
      } else {
        // If no 'One Size Fits All' variation found, handle colors
        if (highlightColor === "none") {
          // If there are no colors specified, don't show color filter
          // and use the first color variation to populate sizes
          const defaultColorVariation = product.variations[0];
  
          if (defaultColorVariation) {
            dispatch(
              setAvailableSizesQtyForColor({
                color: defaultColorVariation.color,
                sizes: defaultColorVariation.sizes,
              })
            );
          }
        } else {
          // Find the variation for the selected color
          const selectedVariation = product.variations.find(
            (variation) => variation.color === highlightColor
          );
          if (selectedVariation) {
            dispatch(
              setAvailableSizesQtyForColor({
                color: highlightColor,
                sizes: selectedVariation.sizes,
              })
            );
          }
        }
      }
    }
  }, [highlightColor, product, dispatch]);
  


  const getSizes = (object) => {
    const sizes = [];
    if (object && object.sizes) {
      object.sizes.forEach((i) => {
        sizes.push(i.size);
      });
    }
    return sizes;
  };

  const sizes = getSizes(availableSizesForColor);

  const handleColorChange = (color, selectedSize) => {
    dispatch(setSelectedColorImgPath(color.path));
    dispatch(setSelectedColor(color.color));
  };

  const qty = useSelector(selectQtyForSizeColor);
 
  const maxQty = qty ? qty.qty : 1;

  const qtyForSizeColor = useSelector(selectQtyForSizeColor);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product,
        size: selectedSize,
        color: highlightColor,
        quantity: selectedQuantity,
        image: colorImgPath[0],
        countInStock: qtyForSizeColor.qty,
      })
    );
  };

  return (
    <Container>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
          <ProductCarousel images={colorImgPath} />
            {product.variations && product.variations[0].color !== "none" && (
              <ColorFilter
                availableColors={product.images}
                selectedColor={highlightColor}
                onColorClick={(color) =>
                  handleColorChange(color, selectedSize, availableSizesForColor)
                }
              />
            )}
          </Col>
          {product.variations && product.variations[0].color !== "none" && (
            <SizeFilter sizes={sizes} />
          )}
          <QuantitySelector maxQty={maxQty} />
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} style={{ minWidth: "275px" }}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "in stock" : "out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
