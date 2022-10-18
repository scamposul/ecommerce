import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { addToCartThunk } from "../store/slices/cart.slice";
import "../styles/product-detail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList);
  const [quantity, setQuantity] = useState(1);

  const productDetail = products.find((product) => product.id === Number(id));
  const relatedProducts = products.filter(
    (product) => product.category.id === productDetail.category.id
  );

  const relatedProductsOnly = relatedProducts.filter(
    (product) => product.id !== productDetail.id
  );

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const addToCart = () => {
    const cart = {
      id: id,
      quantity: quantity,
    };
    dispatch(addToCartThunk(cart));
  };
  const navigate = useNavigate();

  return (
    <div className="productDetail">
      <div className="nav">
        <p className="homeLabel">Home</p>
        <br />
        <p className="circle"><i class="fa-solid fa-circle"></i></p>
        <br />
        <p>{productDetail.title}</p>
      </div>
      <div className="all">
        <div className="top">
          <div className="left">
            <img
              src={productDetail?.productImgs}
              alt=""
              className="detailImg"
            />
          </div>
          <div className="right">
            <h1>{productDetail?.title}</h1>
            <h4>Category: {productDetail?.category.name}</h4>
            <p>{productDetail?.description}</p>
            <p className="priceText">Price</p>
            <p>
              <h2>${productDetail?.price}</h2>
            </p>
            <div className="middle">
              <div className="setQuantity">
                <Button onClick={decrease}>-</Button>
                <div className="quantity">{quantity}</div>
                <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
              <div className="addToCart">
                <Button onClick={() => addToCart()}>
                  <i className="fa-solid fa-cart-plus" id="cartIcon"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="bottom">
          <h3>Related products</h3>
          <ul className="relatedProducts">
            {relatedProductsOnly.map((product) => (
              <li
                className="relatedProduct"
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
              >
                <img
                  src={product.productImgs}
                  alt=""
                  width={"50%"}
                  className="productImg"
                />
                <br />
                {product.title}
                <br />${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
