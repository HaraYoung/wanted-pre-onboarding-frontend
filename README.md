# wanted-pre-onboarding-frontend
원티드 프리온보딩 프론트엔드 인턴쉽 - 선발 과제

## 1. 지원자의 성명

박세영

## 2. 프로젝트의 실행 방법

```
git clone git@github.com:HaraYoung/wanted-pre-onboarding-frontend.git
```

```
npm install
```

```
npm start
```
## 3. 프로젝트 구조
```

📦 src
├── 📂 route
│   │    ├── 📄 SignIn.js
│   │    ├── 📄 SignUp.js
│   │    └── 📄 Todo.js
├── 📄 useApi.js
├── 📄 App.js
├── 📄 index.js

```

## 4. 데모 영상
### 📌회원가입 및 로그인
  ![Alt text](wanted-internship-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85_%EB%A1%9C%EA%B7%B8%EC%9D%B8_%EB%8D%B0%EB%AA%A8.gif)
  - 이메일과 비밀번호의 유효성 검사 기능 구현
    - 이메일 : '@' 포함
    - 비밀번호 : 8자 이상
  
  -  입력된 이메일과 비밀번호가 유효성 검사를 통과힞 못할 경우 버튼 비활성화

  -  로그인 성공 시 todo 페이지로 리다이렉트

  -  로그인 성공 시 응답받은 JWT 로컬 스토리지에 저장

  -  로컬 스토리지에 토큰이 있을 때 로그인 또는 회원가입 페이지에 접속할 경우 todo 페이지로 리다이렉트

  -  로컬 스토리지에 토큰이 없을 때 todo 페이지에 접속할 경우 로그인 페이지로 리다이렉트
### 📌todo
  ![Alt text](wanted-internship-todo_%EB%8D%B0%EB%AA%A8.gif)
  -  새로운 todo 입력 후 추가 버튼 클릭 혹은 엔터 입력 시 todo list에 추가
  
  -  check box 클릭 시 todo 완료 여부를 수정

  -  수정 버튼 클릭 시 수정 모드로 변환
     - 수정 모드에서 수정된 todo 입력 후 제출 클릭 시 수정된 입력 값 반영
     - 수정 모드에서 취소 버튼 또는 수정하지 않은 todo 상태에서 제출 버튼 클릭 시 수정 모드 해제

  -  삭제 버튼 클릭 시 todo list에서 삭제

## 5. 사용한 라이브러리

- react-router-dom
- axios
- styled-components
