import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux";
import { Container, Toast } from "react-bootstrap";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";



const App = () => {

  return (
    <>
        <NavBar />
        <main>
          <div>
            <Outlet/>
          </div>
        </main>
        <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
