import React from "react";


export default function ShowDetailsModal({ email, name }) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white border-b-2 mx-3.5 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <h1>Olá {name}, este email: {email} já está cadastrasto!</h1>
        <h2>Queres voltar para a tela de Login?</h2>
      </div>
    </div>
  );
}