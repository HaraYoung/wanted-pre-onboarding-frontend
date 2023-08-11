import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useApi = () => {
  const navigate = useNavigate();
  const API = "https://www.pre-onboarding-selection-task.shop"; //기본 API URL
  const [todos, setTodos] = useState(null); //todo list가 저장될 상태 값
  const [isEdit, setIsEdit] = useState([]); //todos의 각 아이템의 수정 버튼 클릭 여부 boolean값 배열
  const accessToken = localStorage.getItem("access_token"); //로그인시 발급되는 토큰

  //회원가입 post
  const postSignUp = async (e, emailInputValue, passwordInputValue) => {
    e.preventDefault(); //새로고침 방지
    //email에 '@'포함될 경우 true 반환
    let hasAtSymbol = emailInputValue.includes("@");
    //email : '@' 포함되지 않은 경우, password: 8자 미만일 경우
    if (!hasAtSymbol || passwordInputValue.length < 8) {
      document.getElementById("signup-button").disabled = true;
    } else {
      try {
        const response = await axios.post(`${API}/auth/signup`, {
          email: emailInputValue,
          password: passwordInputValue,
        });
        console.log(response);
        //로그인 페이지로 이동
        navigate("/signin");
      } catch (error) {
        console.log(error);
        //error message alert창 보여줌
        alert(error.response.data.message);
      }
    }
  };

  //로그인 post
  const postSignIn = async (e, emailInputValue, passwordInputValue) => {
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
  //todo list get
  const getTodos = async () => {
    try {
      const response = await axios.get(`${API}/todos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setTodos(response.data);
      setIsEdit(new Array(response.data.length).fill(false));
    } catch (error) {
      console.log(error);
    }
  };
  //todo list 추가하는 함수
  const postTodo = async (e, newTodo) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/todos`,
        {
          todo: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      //todo가 추가되면 todo list를 불러오고 add input 비움
      getTodos();
      document.getElementById("post-input").value = "";
    } catch (error) {
      console.log(error);
    }
  };
  //todo를 수정하는 함수
  const putTodo = async (isCheck, id, todo, editInputValue) => {
    try {
      const response = await axios.put(
        `${API}/todos/${id}`,
        {
          todo: todo,
          isCompleted: isCheck,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      //todo가 추가되면 todo list를 불러오고 editInputValue 값 비움
      getTodos();
      editInputValue = "";
    } catch (error) {
      console.log(error);
    }
  };
  //todo list 삭제하는 함수
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //todo가 삭제되면 todo list 불러옴
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  return {
    todos,
    isEdit,
    setIsEdit,
    postSignUp,
    postSignIn,
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
  };
};
export default useApi;
