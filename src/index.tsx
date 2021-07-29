import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from './providers/SocketProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
