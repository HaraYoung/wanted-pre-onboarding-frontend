import { Route, Routes, Link } from "react-router-dom";

import SignUp from "./route/Signup";
import SignIn from './route/SignIn';
import Todo from './route/Todo';

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="signup">회원가입</Link>
      <Link to="signin">로그인</Link>
      <Link to="todo">Todo</Link>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </div>
  );
}

export default App;
