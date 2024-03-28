import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import LogoText from "../assets/main/logoText.png";
import CategoryBar from "./CategoryBar";

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const uniqueItemsCount = cartItems.length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header style={{ borderBottom: "1px solid grey"}}>
      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        style={{ borderBottom: "1px solid grey" }}
      >
        <Container fluid style={{margin: '0px 30px 0px 30px'}}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img style={{ height: 25 }} src={LogoText} alt="logo" />
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="ml-auto">
            <Nav.Link href="/cart">
              <div style={{ position: "relative" }}>
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <FaUser />
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <CategoryBar />
    </header>
  );
};

export default NavBar;
