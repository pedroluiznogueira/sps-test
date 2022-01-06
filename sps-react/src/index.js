import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import LoginComponent from './components/auth/login/Login';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { isAuth } from './components/auth/token/Token';
import RegisterComponent from './components/auth/register/Register';
import { RepoProvider } from './components/context/RepoContext';
import { UserProvider } from './components/context/UserContext';


ReactDOM.render(
  <React.StrictMode>
    <RepoProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="/app" element={<App />} />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </RepoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export function PrivateOutlet() {
  const auth = isAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}