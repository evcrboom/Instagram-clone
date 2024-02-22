import React, { useState } from "react";
import "./SignUp.css";
import instagramBlack from "../assets/images/instagram login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    function handleChange(event) {
        const { value, name } = event.target;
        if(name === "username") {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    async function handleForm(event){
      event.preventDefault();
      const data = {
        username: username,
        password: password
      };
        try {
          const response =  await axios.post("/register",data);
          console.log(response.data);
          if(response.data.success){
            navigate("/homepage", { state: { username } });
          }
          
        } catch (error) {
          console.log(error.response.data);
          setError(error.response.data.error);
        }
    };
    
  return (
    <div className="sign-up">
      <div className="sign-up__templete">
        <form className="sign-up__form" onSubmit={handleForm}>
          <div className="form__logo">
            <img src={instagramBlack} alt="black-logo" />
          </div>
          <span>Sign up to see photos and videos from your friends.</span>
          <div className="form__input">
            <input type="text" placeholder="Username" name="username" onChange={handleChange} value={username}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password}/>
          </div>
          <div className="sign-up__but">
            <button type="submit">Sign Up</button>
          </div>
          {error && <div className="form__error">{error}</div>}
        </form>
        <div className="sign-up__login">
          Have an account?{" "}
          <span>
            <a href="/">Log in</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
