import React from "react";


export default function ShowDetailsModal({ email, name, onGoToLogin, onClose }) {

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white border-b-2 mx-6 p-3.5 py-5 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <h1>Olá {name}, este email:</h1>
        <h1>{email}</h1>
        <br />
        <h1 className="font-bold">JÁ ESTÁ CADASTRATO!</h1>
        <br />
        <button
          onClick={() => onGoToLogin(email)}
          className="bg-amber-700 text-sm mt-1.5 py-2 px-2 text-start rounded-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
        >
          IR PARA A TELA DE LOGIN
        </button>
        <br />
        <button
          onClick={onClose}
          className="bg-amber-700 text-sm mt-3 py-2 px-2 text-start rounded-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
        >
          CONTINUAR CADASTRANDO
        </button>
      </div>
    </div>
  );
}