import React from "react";
import { Navbar, Nav, Container, Image, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector} from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import LogoText from "../assets/main/logoText.png";
import CategoryBar from "./CategoryBar";

const NavBar = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const uniqueItemsCount = cartItems.length

  return (
    <header>
      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        style={{ borderBottom: "1px solid grey" }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "15px",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginRight: "auto",
            marginLeft: "auto",
            transition: "padding 0.3s ease",
          }}
        >
          <div>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img style={{ height: 25 }} src={LogoText} alt="logo" />
              </Navbar.Brand>
            </LinkContainer>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <Nav.Link href="/login">
                  <FaUser />
                </Nav.Link>
                <Container style={{ display: "flex" }}>
                  <Nav.Link href='/cart'>
                    <div style={{ position: "relative", marginRight: "10px" }}>
                      <RiShoppingCartLine
                        className="position-relative"
                        style={{ fontSize: "1.5rem" }}
                      />
                      {uniqueItemsCount > 0 && (
                        <span
                          className="badge badge-pill badge-primary"
                          style={{
                            color: "white",
                            backgroundColor: "#02A751",
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            borderRadius: "100%",
                          }}
                        >
                          {uniqueItemsCount}
                        </span>
                      )}
                    </div>
                  </Nav.Link>
                </Container>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <CategoryBar />
    </header>
  );
};

export default NavBar;
