import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Board from './pages/Board'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', 'drag'

  return (
    <>
      {currentPage === 'login' && (
        <Login
          onLogin={() => setCurrentPage('drag')}
          onBackToRegister={() => setCurrentPage('register')}
        />
      )}
      {currentPage === 'register' && (
        <Register onBackToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'drag' && <Board />}
    </>
  );
}