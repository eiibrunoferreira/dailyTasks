import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Board from './pages/Board'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', 'drag'
  const [prefilledEmail, setPrefilledEmail] = useState('');

  const goToLoginWithEmail = (email) => {
    setPrefilledEmail(email);
    setCurrentPage('login');
  };


  return (
    <>
      {currentPage === 'login' && (
        <Login
          onLogin={() => setCurrentPage('drag')}
          onBackToRegister={() => setCurrentPage('register')}
          prefilledEmail={prefilledEmail}
        />
      )}
      {currentPage === 'register' && (
        <Register onBackToLogin={() => setCurrentPage('login')}
          onGoToLoginWithEmail={goToLoginWithEmail} />
      )}
      {currentPage === 'drag' && <Board />}
    </>
  );
}