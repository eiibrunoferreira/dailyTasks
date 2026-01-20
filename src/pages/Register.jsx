import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import EmailAlreadyExistsModal from '../modals/EmailAlreadyExistsModal';
import ToastModal from '../modals/ToastModal';
import api from '../services/api';
import logo from "../assets/images/logo.png";

export default function Register({ onBackToLogin, onGoToLoginWithEmail }) {
  const [isEmailAlreadyExistsModalOpen, setIsEmailAlreadyExistsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'error',
  });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };



  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current?.focus(); // foco automático no input de nome
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim() && !email.trim() && !password.trim()) {
      showToast('Preencha TODOS os campos...');
      newErrors.name = true;
      newErrors.email = true;
      newErrors.password = true;
      newErrors.confirmPassword = true;
    }

    else if (!name.trim()) {
      newErrors.name = true;
      showToast('Preencha o campo NOME');
    }

    else if (!email.trim()) {
      newErrors.email = true;
      showToast('Preencha o campo EMAIL');
    }

    else if (!emailRegex.test(email)) {
      newErrors.email = true;
      showToast('Digite um E-MAIL válido');
    }

    else if (!password.trim()) {
      newErrors.password = true;
      showToast('Preencha o campo SENHA');
    }

    else if (password.length < 8) {
      newErrors.password = true;
      showToast('A SENHA deve ter no mínimo 8 caracteres!');
    }

    else if (password !== confirmPassword) {
      newErrors.password = true;
      newErrors.confirmPassword = true;
      showToast('As SENHAS não conferem!');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.post('/Register', {
        name,
        email,
        password,
      });

      showToast('Cadastro realizado com sucesso!', 'success');
      onBackToLogin();

    } catch (error) {
      if (error.response?.status === 409) {
        showToast('EMAIL já cadastrado!');
        setIsEmailAlreadyExistsModalOpen(true);
        setErrors({ email: true });
      } else {
        showToast('Erro ao cadastrar usuário');
      }
    }
  };


  const clearError = (field) => setErrors(prev => ({ ...prev, [field]: false }));
  const rightBorder = (hasError) =>
    `border-r-4 transition-colors duration-300 ${hasError ? 'border-amber-700' : 'border-slate-300'}`;
  const inputBase = "p-3 pl-9 w-full rounded-md bg-slate-700 placeholder-slate-200 outline-none";
  const wrapperBase = "relative flex items-center transition-transform duration-200 ease-in-out focus-within:scale-105 origin-center";

  return (
    <div className="h-screen overflow-auto bg-slate-900 text-white flex flex-col gap-25 pt-16">
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-80 h-auto -mb-24" />
        </div>
        <div className="max-h-screen flex flex-col justify-center items-center px-5">
          <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Registro</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              {/* Nome */}
              <div className={wrapperBase}>
                <FontAwesomeIcon icon={faUser} className="absolute left-3 text-slate-300 z-10 pointer-events-none" />
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError('name'); }}
                  onFocus={() => clearError('name')}
                  className={`${inputBase} ${rightBorder(!!errors.name)}`}
                />
              </div>

              {/* Email */}
              <div className={wrapperBase}>
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 text-slate-300 z-10 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                  onFocus={() => clearError('email')}
                  className={`${inputBase} ${rightBorder(!!errors.email)}`}
                />
              </div>

              {/* Senha */}
              <div className={wrapperBase}>
                <FontAwesomeIcon icon={faLock} className="absolute left-3 text-slate-300 z-10 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                  onFocus={() => clearError('password')}
                  className={`${inputBase} ${rightBorder(!!errors.password)}`}
                />
              </div>

              {password.length > 0 && password.length < 8 && (
                <p className="text-xs text-amber-500 -mt-3 ml-1">
                  A senha deve ter no mínimo 8 caracteres
                </p>
              )}

              {/* Confirmar Senha */}
              <div className={wrapperBase}>
                <FontAwesomeIcon icon={faLock} className="absolute left-3 text-slate-300 z-10 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                  onFocus={() => clearError('confirmPassword')}
                  className={`${inputBase} ${rightBorder(!!errors.confirmPassword)}`}
                />
              </div>

              {confirmPassword.length > 0 && confirmPassword !== password && (
                <p className="text-xs text-amber-500 -mt-3 ml-1">
                  As senhas não são iguais...
                </p>
              )}

              <button type="submit" className="bg-amber-700 hover:bg-amber-700/80 p-3 rounded-md font-semibold cursor-pointer">
                CADASTRAR
              </button>
            </form>
          </div>

          <div className="flex mt-7 flex-col gap-1.5 items-center justify-center">
            <h2>Já tem uma conta?</h2>
            <button
              onClick={onBackToLogin}
              className="bg-amber-700 p-2 px-4 rounded-md cursor-pointer w-full transition-transform duration-200 ease-in-out hover:scale-105"
            >
              VOLTAR PARA LOGIN
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-end">
        <div className="bg-amber-700 w-full h-5"></div>
      </div>
      {isEmailAlreadyExistsModalOpen && <EmailAlreadyExistsModal
        name={name}
        email={email}
        onClose={() => setIsEmailAlreadyExistsModalOpen(false)}
        onGoToLogin={onGoToLoginWithEmail}
      />}

      <ToastModal
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

    </div>
  );
}