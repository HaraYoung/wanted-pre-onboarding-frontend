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
  const API = "https://www.pre-onboarding-selection-task.shop"; //기본 API URL
  const navigate = useNavigate();
  const signinMatch = useMatch("signin");
  //화면이 처음 마운트될 때 JWT 토큰 확인
  useEffect(() => {
    //access_token이 로컬 스토리지에 있다면
    if (localStorage.getItem("access_token")) {
      //sign in 페이지일 경우 todo 페이지로 리다이렉트
      if (signinMatch) navigate("/todo");
    }
  }, []);
  let emailInputValue = ""; //email input 입력 값
  let passwordInputValue = ""; //password input 입력 값
  const onChangeEmail = (e) => (emailInputValue = e.target.value); //email input change event
  const onChangePassword = (e) => (passwordInputValue = e.target.value); //password input change event
  //로그인시 동작하는 함수
  const postSignin = async (e) => {
    e.preventDefault(); //새로고침 방지
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
        //응답받은 JWT 로컬 스토리지에 저장
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        //todo 페이지로 이동
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
