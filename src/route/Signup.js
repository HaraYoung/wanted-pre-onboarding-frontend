import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const API = "https://www.pre-onboarding-selection-task.shop/";
  const navigate = useNavigate();
  let emailInputValue = "";
  let passwordInputValue = "";
  const onChangeEmail = (e) => (emailInputValue = e.target.value);
  const onChangePassword = (e) => (passwordInputValue = e.target.value);
  const postSignup = (e) => {
    e.preventDefault();
    //email에 '@'포함될 경우 [@]반환, 그렇지 않다면 []반환
    let hasAtSymbol = emailInputValue.split("").filter((item) => item === "@");
    //email : '@' 포함되지 않은 경우, password: 8자 미만일 경우
    if (hasAtSymbol.length < 1 || passwordInputValue.length < 8) {
      alert("hasAtSymbol false");
      document.getElementById("signup-button").disabled = true;
    } else {
      axios
        .post(`${API}auth/signup`, {
          email: emailInputValue,
          password: passwordInputValue,
        })
        .then(function (response) {
          console.log(response);
          navigate('/signin')
        })
        .catch(function (error) {
          console.log(error);
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
