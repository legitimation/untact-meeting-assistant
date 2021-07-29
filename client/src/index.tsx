import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { SocketContextProvider } from './providers/SocketProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root'),
);
