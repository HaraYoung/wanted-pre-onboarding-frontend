import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useMatch } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const signinMatch = useMatch("signup");
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      if (signinMatch) navigate("/todo");
    }
  }, []);
  const API = "https://www.pre-onboarding-selection-task.shop";
  let emailInputValue = "";
  let passwordInputValue = "";
  const onChangeEmail = (e) => (emailInputValue = e.target.value);
  const onChangePassword = (e) => (passwordInputValue = e.target.value);
  const postSignup = (e) => {
    e.preventDefault();
    //email에 '@'포함될 경우 true 반환
    let hasAtSymbol = emailInputValue.includes("@");
    //email : '@' 포함되지 않은 경우, password: 8자 미만일 경우
    if (!hasAtSymbol || passwordInputValue.length < 8) {
      document.getElementById("signup-button").disabled = true;
    } else {
      axios
        .post(`${API}/auth/signup`, {
          email: emailInputValue,
          password: passwordInputValue,
        })
        .then(function (response) {
          console.log(response);
          navigate("/signin");
        })
        .catch(function (error) {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };
  return (
    <div>
      <div>Signup</div>
      <form onSubmit={postSignup}>
        <input data-testid="email-input" onChange={onChangeEmail} />
        <input
          data-testid="password-input"
          type="password"
          onChange={onChangePassword}
        />
        <button
          id="signup-button"
          data-testid="signup-button"
          onClick={postSignup}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
