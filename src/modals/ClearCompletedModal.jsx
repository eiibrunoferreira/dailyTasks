// src/modals/ClearCompletedModal.jsx
import React from "react";

export default function ClearCompletedModal({ setShowClearCompletedModal, clearCompletedTasks }) {

  const handleClear = () => {
    clearCompletedTasks();
    setShowClearCompletedModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-amber-700 border-white relative border-b-3 items-center justify-center gap-3 flex flex-col rounded-lg p-6 mx-6.5 w-full max-w-sm shadow-lg max-h-[90vh] overflow-y-auto">

        {/* Botão de fechar (X) */}
        <button
          onClick={() => setShowClearCompletedModal(false)}
          className='cursor-pointer absolute text-xl right-5.5 top-2 bg-amber-700 text-white rounded px-1.5 py-0.5'
        >
          x
        </button>

        {/* Cabeçalho de alerta */}
        <h1 className='w-fit bg-white text-amber-700 rounded px-1.5 py-0.5 font-bold'>
          ATENÇÃO!
        </h1>

        {/* Mensagem principal */}
        <div>
          <h1 className='text text-white font-bold text-center'>
            DESEJA MESMO APAGAR TODAS AS TAREFAS CONCLUÍDAS?
          </h1>
        </div>

        {/* Botão de confirmação */}
        <button
          onClick={handleClear}
          className='cursor-pointer px-7 font-bold bg-amber-800/50 hover:bg-amber-800/80 duration-250 text-white rounded py-0.5'
        >
          SIM
        </button>
      </div>
    </div>
  );
}
