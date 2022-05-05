import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { SignIn } from './SignIn/SignIn';
import { Lot } from './Lot/Lot';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Lot />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
