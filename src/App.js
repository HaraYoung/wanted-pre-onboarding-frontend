import { Route, Routes, Link } from "react-router-dom";
import styled from "styled-components";
import SignUp from "./route/Signup";
import SignIn from "./route/SignIn";
import Todo from "./route/Todo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;
const Header = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  margin: 1em;
`;
const LinkItem = styled(Link)`
  background-color: #19a7ce;
  padding: 0.5em 0.3em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border: 1px solid #146c94;
  border-radius: 10px;
  margin: 0 0.2em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 3px 3px 6px 0px inset,
      #19a7ce -3px -3px 6px 1px inset;
  }
`;
const Content = styled.div`
  background-color: #146c94;
  width: 80%;
  min-height: 50vh;
  border-radius: 10px;
  margin-top: 1em;
  h1 {
    font-size: 1.5em;
    padding: none;
  }
`;

function App() {
  return (
    <Container>
      <Header>
        <LinkItem to="signup">회원가입</LinkItem>
        <LinkItem to="signin">로그인</LinkItem>
        <LinkItem to="todo">Todo</LinkItem>
      </Header>
      <Content>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Content>
    </Container>
  );
}

export default App;
