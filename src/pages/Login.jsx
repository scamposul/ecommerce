import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);
    axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          alert("Invalid credentials");
        }
        if (error.response?.status === 404) {
          alert("Invalid credentials");
        }
        console.log(error.response);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(submit)} className="loginForm">
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formPlaintextEmail"
          id="email"
        >
          <Form.Label column sm="2" id="emailLabel">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formPlaintextPassword"
          id="password"
        >
          <Form.Label column sm="2" id="passwordLabel">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
