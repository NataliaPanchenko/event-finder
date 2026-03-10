import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --titel-color: rgb(88, 88, 88);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
`;
