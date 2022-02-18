import React, { useState } from "react";
import { Form, Container, Card, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { updateAuth } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const submitLogin = (e) => {
    e.preventDefault();
    history.push("/overview");

    /*
    axios
      .post("http://localhost:5012/b12apiauth/checkLogin", { ...loginForm })
      .then(({ data }) => {
        // console.log(data);
        if (data.state) {
          dispatch(updateAuth({ user: data.name, username: data.username }));
          const Toast_Success = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1000,
          });

          Toast_Success.fire({
            icon: "success",
            title: "<h1>Login successfully.</h1>",
          }).then(() => history.push("/overview"));
        } else {
          const Toast_Error = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
          });
          Toast_Error.fire({
            icon: "error",
            title: "<h1>Login failed!!</h1>",
          });
        }
      });
      */
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <Card className="card-outline card-primary">
          <Card.Header className="text-center">
            <div className="h1">
              <b>B12</b> Industry 4.0
            </div>
          </Card.Header>
          <Card.Body>
            <p className="login-box-msg">Sign in to start your session</p>
            <Form onSubmit={submitLogin}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={({ target: { value: username } }) =>
                    setLoginForm({ ...loginForm, username })
                  }
                  // required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={({ target: { value: password } }) =>
                    setLoginForm({ ...loginForm, password })
                  }
                  // required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </InputGroup>
              <div>
                <Button type="submit" className="btn-block">
                  Sign In
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
