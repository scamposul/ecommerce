import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);
  const navigate = useNavigate();

console.log(purchases);
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
  return (
    <div>
      <div className="nav">
        <p onClick={() => navigate('/')} className='homeLabel'>Home</p>
        <br />
        <p className="circle">
          <i class="fa-solid fa-circle"></i>
        </p>
        <br />
        <p>
          <b>Purchases</b>
        </p>
      </div>
      <ul className="purchases">
        <ListGroup>
          {purchases.map((purchase) => (
            <ListGroup.Item key={purchase.id}>
              <b>{Date(purchase.createdAt)}</b>
              {purchase.cart.products.map((product) => (
                <li
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="productPurchased"
                  key={product.id}
                >
                  <p>{product.title}</p>
                  <br />
                  <p>X{product.productsInCart.quantity}</p>
                  <br />
                  <p>${product.price}</p>
                </li>
              ))}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ul>
    </div>
  );
};

export default Purchases;
