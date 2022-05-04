import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";

const Login = ({ onChange, onSubmit }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    onChange(e);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    onChange(e);
  };

  const navigate = useNavigate();

  return (
    <>
      <Header>
        <div
          className="header__sign-button"
          onClick={() => navigate("/react-around-auth/signup")}
        >
          Sign Up
        </div>
      </Header>

      <div className="popup__container">
        <div className="popup__form popup__form_login">
          <form
            className="popup__form-submit"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <h2 className="popup__form-title popup__form-title_login">
              Log in
            </h2>

            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
              className="popup__form-input popup__form-input_login"
              value={email || ""}
              onChange={handleEmailChange}
              required
            />

            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Password"
              className="popup__form-input popup__form-input_login"
              value={password || ""}
              onChange={handlePasswordChange}
              required
            />

            <button
              type="submit"
              className="popup__form-save-button popup__form-save-button_login"
            >
              Log in
            </button>
            <div
              className="popup__form-save-button popup__form-save-button_sign"
              onClick={() => navigate("/react-around-auth/signup")}
            >
              Not a member yet? Sign up here!
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

/*

<button
          className="header__sign-button"
          onClick={() => {
            <Navigate to="/react-around-auth/signup" />;
          }}
        >
          Sign Up
        </button>

            <button
              type="button"
              className="popup__form-save-button popup__form-save-button_sign"
              onClick={(e) => {
                e.preventDefault();
                <Navigate to="/react-around-auth/signup" />;
              }}
            >
              Not a member yet? Sign up here!
            </button> */
