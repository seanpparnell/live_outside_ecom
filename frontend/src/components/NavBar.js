import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image, Badge, NavDropdown, Button } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout, toggleAdminView } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import LogoText from "../assets/main/logoText.png";
import CategoryBar from "./CategoryBar";
import SubCategoryBar from "./SubCategoryBar";

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo, adminView } = useSelector((state) => state.auth);
  const selectedCategory = useSelector((state) => state.category.categoryId);
  const uniqueItemsCount = cartItems.length;
  console.log(selectedCategory)

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

  const toggleAdminViewHandler = () => {
    dispatch(toggleAdminView());
    const categoryRoute = selectedCategory ? `/categories/${selectedCategory}` : "/";
    const adminCategoryRoute = selectedCategory ? `/admin/categories/${selectedCategory}` : "/";
    navigate(adminView ? categoryRoute : adminCategoryRoute);
  };

  return (
    <header style={{ borderBottom: "1px solid grey"}}>
      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        style={{ borderBottom: "1px solid grey" }}
      >
        <Container fluid style={{margin: '0px 40px 0px 40px'}}>
          {userInfo && userInfo.isAdmin && (
            <Button onClick={toggleAdminViewHandler}>{adminView ? "User View" : "Admin View"}</Button>
          )}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img style={{ height: 45 }} src={LogoText} alt="logo" />
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
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      <CategoryBar />
    </header>
  );
};

export default NavBar;
