import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";

const GlobalStyle = createGlobalStyle`
	html, body {
    padding: 0;
    margin: 0;
    background-color: #AFD3E2;
    color: #f6f1f1;
  }
  a{
    text-decoration: none;
    color: #f6f1f1;
  }
  ul,li{
    list-style: none;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);
