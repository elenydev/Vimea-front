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

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  box-shadow: none;
  transition: background-color 5000s ease-in-out 0s;
  background-color: transparent;
  color: #fff;
}

input:-internal-autofill {
  background-color: transparent !important;
  -webkit-text-fill-color: #fff !important;
}

input:-internal-autofill-selected {
  background-color: transparent !important;
  -webkit-text-fill-color: #fff !important;
}


`;

export default GlobalStyle;
