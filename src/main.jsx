import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";

//Passing background settings into config for color mode
const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "black")(props),
      color: mode("gray.800", "whiteAlpha.900")(props)
    }
  }) 
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles });

export default theme;

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(  
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>);