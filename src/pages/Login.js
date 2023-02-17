import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { url } from "./constant";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) {
      return setError("Мэдээллээ бүрэн бөглөнө үү");
    }

    const changedUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(url + "/user/login", changedUser)
      .then(({ data: { status, result, message } }) => {
        if (status) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/admin/dashboard");
        } else {
          setError(message);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="container">
      <div className="w-25 bg-light p-5" style={{ margin: "0 auto" }}>
        <h3 className="text-center">Orange admin login</h3>
        <hr />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button className="w-100" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
