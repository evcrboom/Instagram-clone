import React, { useState } from "react";
import "./Login.css";
import instagramBlack from "../assets/images/instagram login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const userData = {
        username: username,
        password: password,
      };
      const response = await axios.post("/login", userData);
      console.log(response.data);
      if (response.data.success) {
        navigate("/homepage", { state: { username } });
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className="login">
      <div className="login__templete">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="form__logo">
            <img src={instagramBlack} alt="black-logo" />
          </div>
          <div className="form__input">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="login__but">
            <button type="submit">Log in</button>
          </div>
          {error && <div className="form__error">{error}</div>}
        </form>
        <div className="login__register">
          don't have an account?{" "}
          <span>
            <a href="sign-up">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
