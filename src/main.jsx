import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        {/* Wrap your App component with Provider and pass the store */}
      
          <App />
      
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
