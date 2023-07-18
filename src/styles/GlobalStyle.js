import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  input {
    background-color: transparent;
    outline: none;
    font-size: 1em;
    vertical-align: middle;
  }

  img{
    display:block;
    border:0;
  }
`;

export default GlobalStyle;
