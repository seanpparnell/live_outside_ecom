import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/NavBar";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Header />
        <main>
          <div>
            <Outlet />
          </div>
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default App;
