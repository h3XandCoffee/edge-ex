import { createGlobalStyle } from 'styled-components';
import './themes.css';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

export default GlobalStyles;
