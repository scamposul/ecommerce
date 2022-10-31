import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useState } from "react";
import "../styles/nav-left.css"

const MyNav = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" title="Home">
            <h1>e-commerce</h1>
          </Navbar.Brand>
          <Nav className="navLeft">
            <Nav.Link as={Link} to="/login" title="Login">
              <i class="fa-solid fa-user"></i>{" "}
            </Nav.Link>
            <Nav.Link as={Link} to="/purchase" title="Purchases">
              <i class="fa-solid fa-box-archive"></i>
            </Nav.Link>
            <Nav.Link onClick={handleShow} title="Cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            <Nav.Link onClick={logout} title="Logout">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </Nav.Link>
          </Nav>
        </Container>
        <CartSidebar
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </Navbar>
    </div>
  );
};

export default MyNav;
