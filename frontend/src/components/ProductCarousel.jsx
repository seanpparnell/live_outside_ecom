import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';


const ProductCarousel = ({images}) => {

console.log(images)
  return (
    <Carousel pause='hover' interval={null} className='bg-primary mb-4'>
      {images.map((image) => (
        <Carousel.Item key={image._id}>
         
            <Image src={image} alt={image} fluid />
            <Carousel.Caption className='carousel-caption'>
              
            </Carousel.Caption>
          
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
