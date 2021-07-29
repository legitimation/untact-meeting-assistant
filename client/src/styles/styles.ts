import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}
    html {
      scroll-behavior: smooth;
    }
    input {
        all: unset
    }
    * {
        box-sizing: border-box;
    }
    body {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
    }
    a {
        text-decoration: none;
        margin: 0;
        padding: 0;
    }
    div {
      font-size: 18px;
    }
`;
