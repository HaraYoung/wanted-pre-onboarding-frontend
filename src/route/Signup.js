import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";

const SignUpContainer = styled.div`
  text-align: center;
  padding: 0.5em;
`;
const SignUpForm = styled.form`
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  padding: 1em;
`;
const InputItem = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #f4d160;
  padding: 0.5em;
  color: #f6f4eb;
  margin-right: 0.5em;
  margin: 0.2em 0;
`;
const ButtonItem = styled.button`
  margin: 1em 0;
  padding: 0.5em 0.8em;
  border: none;
  border-radius: 4px;
  background-color: #f4d160;
  margin: 0 0.2em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
`;
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
    <SignUpContainer>
      <h1>Signup</h1>
      <SignUpForm onSubmit={postSignup}>
        <InputItem
          data-testid="email-input"
          onChange={onChangeEmail}
          placeholder="Email"
        />
        <InputItem
          data-testid="password-input"
          type="password"
          onChange={onChangePassword}
          placeholder="Password"
        />
        <ButtonItem
          id="signup-button"
          data-testid="signup-button"
          onClick={postSignup}
        >
          회원가입
        </ButtonItem>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default Signup;
