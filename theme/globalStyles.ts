import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
a {
  color: inherit;
  text-decoration: none;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul, li {
  list-style: none;
}

`;

export default GlobalStyle;
