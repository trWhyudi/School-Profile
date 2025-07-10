import { useState, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

export const Context = createContext();

const Apps = () => {
  const [isAuth, setIsAuth] = useState(() => {
    return !!localStorage.getItem("authToken");
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Context.Provider value={{isAuth, setIsAuth, user, setUser}}>
        <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Apps />
  </BrowserRouter>
);
