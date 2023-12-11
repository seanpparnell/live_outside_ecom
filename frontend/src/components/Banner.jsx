import React from "react";
import { Container, Image } from "react-bootstrap";
import BannerImage from "../assets/main/banner1.jpg";
import './Banner.css'

const Banner = () => {
  return (
    <Container className="banner-container">
      <div>
        <div>
          <Image className="image-side"
            src={BannerImage}
            alt="Let's Help You Get Outside"
          />
        </div>
        <div style={{ backgroundColor: "#31A653" }}>
          <Container style={{ padding: "50px", color: "white" }}>
            <h2>Let Us Help You</h2>
            <p>
              We provide top of the line products to help out customers be
              prepared to explore any adventure on any terrain.
            </p>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
