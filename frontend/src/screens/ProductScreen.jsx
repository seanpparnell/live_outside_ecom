import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
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
} from "../slices/filtersSlice";

const ProductScreen = () => {
  const [selectedColorLocal, setSelectedColorLocal] = useState("");

  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const highlightColor = useSelector(selectSelectedColor);
  const availableSizesForColor = useSelector(selectAvailableSizesQtyForColor);
  const colorImgPath = useSelector(selectSelectedColorImgPath);

  useEffect(() => {
    if (highlightColor && product && product.variations) {
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

  const handleColorChange = (color) => {
    setSelectedColorLocal(color);
    dispatch(setSelectedColor(color));
    dispatch(setSelectedColorImgPath(color));
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
            <Image src={colorImgPath} alt={product.name} fluid />
            <ColorFilter
              selectedColor={highlightColor}
              onColorClick={handleColorChange}
            />
          </Col>
          <SizeFilter sizes={sizes} />
          <QuantitySelector />
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
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "in stock" : "out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    // onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
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
