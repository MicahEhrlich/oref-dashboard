import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.sans};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Subtle grid overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(230, 57, 70, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230, 57, 70, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  #root {
    position: relative;
    z-index: 1;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track { background: ${theme.colors.surface}; }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 2px;
  }
`
