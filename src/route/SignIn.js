import React from "react";

const SignIn = () => {
  return (
    <div>
      <div>SignIn</div>
      <form>
        <input data-testid="email-input" />
        <input data-testid="password-input" minLength={8} />
        <button data-testid="signin-button">로그인</button>
      </form>
    </div>
  );
};

export default SignIn;

// 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현

// 이메일 조건: @ 포함
// 비밀번호 조건: 8자 이상
// 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행
// (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위,
// 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)
// 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여

// 보안 상 실제 사용하고 계신 이메일과 패스워드말고 테스트용 이메일, 패스워드 사용을 권장.
