import React from "react";
import { ListGroup, Offcanvas, Button, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchaseCartThunk } from "../store/slices/cart.slice";
import { useEffect } from "react";
import { setCart } from "../store/slices/cart.slice";
import { Link } from "react-router-dom";

const CartSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartThunk(setCart));
  }, []);

  const purchaseCart = () => {
    dispatch(purchaseCartThunk())
  }

  const cart = useSelector((state) => state.cart);
  const sumall = cart.map(item => +item.price * item.productsInCart?.quantity).reduce((prev, curr) => prev + curr, 0);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart (Sidebar)</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Link to={`product/${product.id}`}>
                <p>{product.title}</p>
                <p>${product.price}</p>
                <p> x {product.productsInCart?.quantity}</p>
                <p>Total = {product.price * product.productsInCart?.quantity}</p>
            </Link>
              
            </ListGroup.Item>
          ))}
        </ListGroup>
        <br />
        <footer>
            <h2>Total: ${sumall}</h2>
          <Button onClick={purchaseCart}>Checkout</Button>
        </footer>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
