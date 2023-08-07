import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";

const SignInContainer = styled.div`
  text-align: center;
  padding: 0.5em;
`;
const SignInForm = styled.form`
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
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 3px 3px 6px 0px inset,
      #f4d160 -3px -3px 6px 1px inset;
  }
`;

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
      console.log(emailInputValue, passwordInputValue);
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
    <SignInContainer>
      <h1>SignIn</h1>
      <SignInForm onSubmit={postSignin}>
        <InputItem
          data-testid="email-input"
          onChange={onChangeEmail}
          placeholder="Email"
        />
        <InputItem
          data-testid="password-input"
          minLength={8}
          type="password"
          onChange={onChangePassword}
          placeholder="Password"
        />
        <ButtonItem
          id="signin-button"
          data-testid="signin-button"
          onClick={postSignin}
        >
          로그인
        </ButtonItem>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;
