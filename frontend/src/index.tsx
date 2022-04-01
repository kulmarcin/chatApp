import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App/App';
import Chat from './Chat/Chat';

import { io } from 'socket.io-client';

const uri: string = process.env.REACT_APP_URI || 'http://localhost:8000'
const socket = io(uri);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App socket={socket} />} />
        <Route path="/chat/:room/:user" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
