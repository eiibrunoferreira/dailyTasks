import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';
import logo from "../assets/images/logo.png";

export default function Login({ onLogin, onBackToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus(); // foco automático no input de email
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim() && !password.trim()) {
      newErrors.email = true;
      newErrors.password = true;
      alert('Preencha os campos Email e Senha');
    } else if (!email.trim()) {
      newErrors.email = true;
      alert('Preencha o campo Email');
    } else if (!password.trim()) {
      newErrors.password = true;
      alert('Preencha o campo Senha');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      alert(`Bem-vindo, ${response.data.name}!`);
      onLogin();

    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        // erro retornado pelo backend
        alert(message);
        if (
          error.response.status === 401 ||
          message.toLowerCase().includes('email') ||
          message.toLowerCase().includes('senha')
        ) {
          setErrors({
            email: true,
            password: true,
          })
        }
      } else {
        alert('Erro ao conectar com o servidor');
      }
    }
  };

  const clearError = (field) =>
    setErrors(prev => ({ ...prev, [field]: false }));

  const rightBorder = (hasError) =>
    `border-r-4 transition-colors duration-300 ${hasError ? 'border-amber-700' : 'border-slate-300'}`;

  const inputBase =
    "p-3 pl-9 w-full rounded-md bg-slate-700 placeholder-slate-200 outline-none";

  const wrapperBase =
    "relative flex items-center transition-transform duration-200 ease-in-out focus-within:scale-105 origin-center";

  return (
    <div className="h-screen overflow-auto bg-slate-900 text-white flex flex-col gap-25 pt-16">
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="w-80 h-auto -mb-24" />
        </div>

        <div className="max-h-screen flex flex-col justify-center items-center px-5">
          <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Entrar</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className={wrapperBase}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 text-slate-300 z-10 pointer-events-none"
                />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    clearError('email');
                  }}
                  onFocus={() => clearError('email')}
                  className={`${inputBase} ${rightBorder(!!errors.email)}`}
                />
              </div>

              <div className={wrapperBase}>
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 text-slate-300 z-10 pointer-events-none"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    clearError('password');
                  }}
                  onFocus={() => clearError('password')}
                  className={`${inputBase} ${rightBorder(!!errors.password)}`}
                />
              </div>

              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-700/80 p-3 rounded-md font-semibold cursor-pointer"
              >
                ENTRAR
              </button>
            </form>
          </div>

          <div className="flex mt-7 flex-col gap-1.5 items-center justify-center w-full max-w-md">
            <h2>Não tem uma conta?</h2>
            <button
              onClick={onBackToRegister}
              className="bg-amber-700 p-2 rounded-md cursor-pointer w-full transition-transform duration-200 ease-in-out hover:scale-105"
            >
              CADASTRE-SE
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex items-end">
        <div className="bg-amber-700 w-full h-5"></div>
      </div>
    </div>
  );
}
