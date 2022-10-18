import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import { addToCartThunk } from "../store/slices/cart.slice";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productList);

  const [categories, setCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setFilteredCategory(products);
  }, [products]);

  const filterProducts = (categoryId) => {
    const filtered = products.filter(
      (category) => categoryId === category.category.id
    );
    setFilteredCategory(filtered);
  };

  const searchProduct = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCategory(filtered);
  };

  const addToCart = () => {
    const cart = {
      id: id, 
      quantity: quantity
    }
    dispatch(addToCartThunk(cart))
  }

  return (
    <div className="home">
      <div className="categories">
        <Button onClick={() => setFilteredCategory(products)}>All</Button>
        {categories.map((category) => (
          <Button key={category.id} onClick={() => filterProducts(category.id)}>
            {category.name}
          </Button>
        ))}
      </div>
      <br />
      <div className="browserInput">
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="Search product"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="browser"
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={searchProduct}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </Button>
      </InputGroup>
      </div>
      <ul className="productList">
        {filteredCategory.map((product) => (
          <li
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="product"
          >
            <img
              src={product.productImgs?.[0]}
              alt=""
              width={"90%"}
              className="productImages"
            />
            <br />
            <div className="titleCart">
              {product.title}
              <br />${product.price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
