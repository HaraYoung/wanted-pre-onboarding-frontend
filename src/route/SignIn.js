import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useMatch } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const signinMatch = useMatch("signin");
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
  const postSignin = async (e) => {
    e.preventDefault();
    //email에 '@'포함될 경우 true 할당
    let hasAtSymbol = emailInputValue.includes("@");
    //email : '@' 포함되지 않은 경우, password: 8자 미만일 경우
    if (!hasAtSymbol || passwordInputValue.length < 8) {
      document.getElementById("signin-button").disabled = true;
    } else {
      try {
        const response = await axios.post(`${API}/auth/signin`, {
          email: emailInputValue,
          password: passwordInputValue,
        });
        console.log(response);
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        navigate("/todo");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div>SignIn</div>
      <form onSubmit={postSignin}>
        <input data-testid="email-input" onChange={onChangeEmail} />
        <input
          data-testid="password-input"
          minLength={8}
          type="password"
          onChange={onChangePassword}
        />
        <button
          id="signin-button"
          data-testid="signin-button"
          onClick={postSignin}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
