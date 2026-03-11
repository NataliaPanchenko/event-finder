import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --title-color: rgb(88, 88, 88);
    --text-color: #888;
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
