import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import "./ProductCarousel.css";

const ProductCarousel = ({ images }) => {
  console.log(images);
  return (
    <Carousel
      pause="hover"
      interval={null}
      className="bg-primary mb-4 carousel"
    >
      {images.map((image) => (
        <Carousel.Item key={image._id}>
          <Image style={{display: 'flex'}} src={image} alt={image} fluid />
          <Carousel.Caption className="carousel-caption"></Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
